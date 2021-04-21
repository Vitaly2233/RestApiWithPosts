const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: "Something wrong with registration" });
			}
			const { username, password } = req.body;
			const candidat = await User.findOne({ username });
			if (candidat !== null) {
				return res
					.status(400)
					.json({ message: "There is already user with the username" });
			}
			var hashedPas = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: "user" });
			const user = new User({
				username,
				password: hashedPas,
				roles: [userRole.value],
			});
			await user.save();
			console.log("Succefully added");
		} catch (a) {
			res.status(400).json({ message: "registration error" });
		}
	}
	async login(req, res) {
		try {
		} catch (a) {
			res.status(400).json({ message: "login error" });
		}
	}
	async getPosts(req, res) { }
}

module.exports = new authController();
