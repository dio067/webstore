import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send(`<div>
        <form method="POST">
        <input name="email" placeholder="email">
        <input name="password" placeholder="password">
        <input name="passwordConfirmation" placeholder="password confirmation">
        <button type="submit" >Sign Up</button>
        </form>
        </div>`);
});
app.post("/", (req, res) => {
	console.log(req.body);
	res.send("Account Created");
});
app.listen(4000, () => {
	console.log("Listening..");
});
