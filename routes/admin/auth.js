import express from "express";
import { check, validationResult } from "express-validator";
import usersRepo from "../../repositories/users.js";
import signupTemplate from "../../view/admin/signup.js";
import signinTemplate from "../../view/admin/signin.js";
import validtors from "./validtors.js";

const router = express();

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
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.send(signupTemplate({ req, errors }));
		}
		const { email, password, passwordConfirmation } = req.body;

		// Create a user in the users repo
		const user = await usersRepo.create({ email, password });

		// Store the id of the user inside the cookie
		req.session.userId = user.id;

		res.send("Account Created");
	}
);

router.get("/signout", (req, res) => {
	req.session = null;
	res.send("Your logged out");
});

router.get("/signin", (req, res) => {
	res.send(signinTemplate({ req }));
});

router.post(
	"/signin",
	[validtors.requireEmailExist, validtors.requirePasswordValid],
	async (req, res) => {
		const { email, password } = req.body;
		const errors = validationResult(req);

		console.log(errors);

		if (!errors.isEmpty()) {
			return res.send(signinTemplate({ req, errors }));
		}
		res.send("Your signed In");
	}
);
export default router;
