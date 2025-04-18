const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send(console.log("Hi There!"));
});
app.listen(3000, () => {
	console.log("Listening..");
});
