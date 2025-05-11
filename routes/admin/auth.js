import express from "express";
import usersRepo from "../../repositories/users.js";

const router = express();

router.get("/signup", (req, res) => {
	res.send(`<div>
        <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <input name="passwordConfirmation" placeholder="password confirmation">
        <button type="submit" >Sign Up</button>
        </form>
        </div>`);
});
router.post("/signup", async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send("email in use");
	}
	if (password !== passwordConfirmation) {
		return res.send("passwords must match");
	}

	// Create a user in the users repo
	const user = await usersRepo.create({ email, password });

	// Store the id of the user inside the cookie
	req.session.userId = user.id;

	res.send("Account Created");
});

router.get("/signout", (req, res) => {
	req.session = null;
	res.send("Your logged out");
});

router.get("/signin", (req, res) => {
	res.send(`<div>
        <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <button type="submit" >Sign In</button>
        </form>
        </div>`);
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
