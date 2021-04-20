require("dotenv").config();
const userModel = require("./models/authSchema");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

app.post("/token", (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ name: user.name });
		res.json({ accessToken: accessToken });
	});
});

app.delete("/logout", (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
});

app.post("/login", async (req, res) => {
	// Authenticate User

	const { username, password } = req.body;
	const accessToken = generateAccessToken(userData);
	const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN);
	const user = new userModel({
		username: username,
		password: password,
		token: refreshToken,
	});
	console.log(user);
	user.save((err) => {
		if (err) console.log("error", err);
	});

	res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.TOKEN, { expiresIn: "15m" });
}

app.listen(4000);
