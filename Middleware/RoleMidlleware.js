const jwt = require("jsonwebtoken");
const { secret } = require("../config");
//checking if user has the role
module.exports = function (roles) {
	return function (req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1];

			if (!token) return res.status(403).json({ message: "User is not authorized" });
			const { roles: userRoles, id: id } = jwt.verify(token, secret);
			let hasRole = false;
			userRoles.forEach(role => {
				if (roles == role) hasRole = true;
			});
			if (!hasRole) return res.status(403).json({ message: "You don`t have permission" })
			next();
		} catch (e) {
			console.log(e);
			return res.status(403).json({ message: "User is not authorized" });
		}
	}
}