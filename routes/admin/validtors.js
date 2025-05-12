import { check } from "express-validator";
import usersRepo from "../../repositories/users.js";

const validtors = {
	requireTitle: check("title")
		.trim()
		.isLength({ min: 5, max: 40 })
		.withMessage("Must be between 5 charcters and 40"),
	requirePrice: check("price")
		.trim()
		.toFloat()
		.isFloat({ min: 1 })
		.withMessage("Must be a valid number"),
	requireEmail: check("email")
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Must be a Vaild Email")
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error("Email in use");
			}
		}),
	requirePassword: check("password")
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password must be between 5 to 20 charcters"),
	requirePasswordConfirmation: check("passwordConfirmation")
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password must be between 5 to 20 charcters")
		.custom(async (passwordConfirmation, { req }) => {
			if (req.body.password !== passwordConfirmation) {
				throw new Error("Passwords must match");
			}
		}),
	requireEmailExist: check("email")
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Email not found")
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email });
			if (!user) {
				throw new Error("Email not Found");
			}
		}),
	requirePasswordValid: check("password")
		.trim()
		.custom(async (password, { req }) => {
			const user = await usersRepo.getOneBy({ email: req.body.email });
			if (!user) {
				throw new Error("Invalid password");
			}

			const validPassword = await usersRepo.comparePasswords(
				user.password,
				password
			);
			if (!validPassword) {
				throw new Error("Invalid password");
			}
		}),
};

export default validtors;
