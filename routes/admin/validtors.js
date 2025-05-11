import { check } from "express-validator";
import usersRepo from "../../repositories/users.js";

export default {
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
};
