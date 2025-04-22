const express = require("express");

const app = express();

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

const bodyParser = (req, res, next) => {
	if (req.method === "POST") {
		req.on("data", (data) => {
			const parsed = data.toString("utf8").split("$");
			const formData = {};
			for (let pair of parsed) {
				const [key, value] = pair.split("=");
				formData[key] = value;
			}
			req.body = formData;
			next();
		});
	} else {
		next();
	}
	res.send("Account Created");
};
app.post("/", (req, res) => {
	res.send("Account Created");
});
app.listen(4000, () => {
	console.log("Listening..");
});
