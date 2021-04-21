const jwt = require("jsonwebtoken");
const { secret } = require("../config");
module.exports = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const post = req.body;
		if (!token) return res.status(403).json({ message: "You are not authorized" });
		const decodedData = jwt.verify(token, secret);
		req.user = decodedData;
		req.post = post;
		next();
	} catch (e) {
		console.log(e);
		return res.status(403).json({ message: "You are not authorized" });
	}
}