import express from "express";
import bodyParser from "body-parser";
import usersRepo from "./repositories/users.js";
import cookieSession from "cookie-session";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["ksdajfkjjdflkajsd"],
	})
);
app.get("/signup", (req, res) => {
	res.send(`<div>
        <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <input name="passwordConfirmation" placeholder="password confirmation">
        <button type="submit" >Sign Up</button>
        </form>
        </div>`);
});
app.post("/signup", async (req, res) => {
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

app.get("/signout", (req, res) => {
	req.session = null;
	res.send("Your logged out");
});

app.get("/signin", (req, res) => {
	res.send(`<div>
        <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <button type="submit" >Sign In</button>
        </form>
        </div>`);
});

app.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email, password });

	if (!user) {
		res.send("User not found");
	}

	if (user.password != password) {
		res.send("Invaild Password");
	}
	res.send("Your signed in");
});
app;
app.listen(4000, () => {
	console.log("Listening..");
});
