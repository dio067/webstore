import express from "express";
import bodyParser from "body-parser";
import usersRepo from "./repositories/users.js";
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["ksdajfkjjdflkajsd"],
	})
);

app.use(authRouter);

app.listen(4000, () => {
	console.log("Listening..");
});
