const jwt = require("jsonwebtoken");
const { secret } = require("../config");
//checking if user has the role
module.exports = function (roles) {
	return function (req, res, next) {
		try {
			/* #swagger.security = [{
			"Bearer": []
			}] */
			try {
				const token = req.headers.authorization.split(" ")[1];
			} catch (e) {
				return res.json("You are noy loggined, to log in wrile 'Bearer ' and then your token you've taked after you're logged in")
			}

			if (!token) return res.status(403).json({ message: "User is not authorized" });
			const { roles: userRoles, id: id } = jwt.verify(token, secret);
			let hasRole = false;
			roles.forEach(role => {
				userRoles.forEach(userRole => {
					if (userRole == role) hasRole = true
				})
			});
			if (!hasRole) return res.status(403).json({ message: "You don`t have permission" });
			req.user = { roles: userRoles, id: id }
			next();
		} catch (e) {
			console.log(e);
			return res.status(403).json({ message: "User is not authorized" });
		}
	}
}