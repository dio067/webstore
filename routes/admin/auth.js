import express from "express";
import { check, validationResult } from "express-validator";
import middlewares from "./middlewares.js";
import usersRepo from "../../repositories/users.js";
import signupTemplate from "../../view/admin/signup.js";
import signinTemplate from "../../view/admin/signin.js";
import validtors from "./validtors.js";

const router = express.Router();

router.get("/signup", (req, res) => {
	res.send(signupTemplate({ req }));
});
router.post(
	"/signup",
	[
		validtors.requireEmail,
		validtors.requirePassword,
		validtors.requirePasswordConfirmation,
	],
	middlewares.handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password, passwordConfirmation } = req.body;

		// Create a user in the users repo
		const user = await usersRepo.create({ email, password });

		// Store the id of the user inside the cookie
		req.session.userId = user.id;

		res.redirect("/admin/products");
	}
);

router.get("/signout", (req, res) => {
	req.session = null;
	return res.send("Your logged out");
});

router.get("/signin", (req, res) => {
	res.send(signinTemplate({ req }));
});

router.post(
	"/signin",
	[validtors.requireEmailExist, validtors.requirePasswordValid],
	middlewares.handleErrors(signinTemplate),
	async (req, res) => {
		const { email } = req.body;

		const user = await usersRepo.getOneBy({ email });

		req.session.userId = user.id;

		res.redirect("/admin/products");
	}
);
export default router;
