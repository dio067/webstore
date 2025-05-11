import express from "express";
import { check, validationResult } from "express-validator";
import usersRepo from "../../repositories/users.js";
import signupTemplate from "../../view/admin/signup.js";
import signinTemplate from "../../view/admin/signin.js";
import validtors from "./validtors.js";

const router = express();

router.get("/signup", (req, res) => {
	res.send(signupTemplate());
});
router.post(
	"/signup",
	[
		validtors.requireEmail,
		validtors.requirePassword,
		validtors.requirePasswordConfirmation,
	],

	async (req, res) => {
		const error = validationResult(req);

		console.log(error);
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
	res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });
	const passwordComparsion = await usersRepo.comparePasswords(
		user.password,
		password
	);

	if (!user) {
		return res.send("User not found");
	}

	if (!passwordComparsion) {
		return res.send("Invaild Password");
	}
	res.send("Your signed In");
});
export default router;
