const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");


const generateAccesToken = (id, roles) => {
	const payload = {
		id, roles
	}
	return jwt.sign(payload, secret, { expiresIn: "30m" });
}

// realisation for login register
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
		} catch (a) {
			// #swagger.responses[400] = { description: 'Problem with the registration.' }
			res.status(400).json({ message: "registration error" });
		}
	}
	async login(req, res) {
		try {

			const { username, password } = req.body;
			const user = await User.findOne({ username: username });
			if (!user) {
				return res.status(400).json({ message: "Can't find the user" })
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: "Wrong password" });
			}
			const token = generateAccesToken(user._id, user.roles);
			return res.json({ token })
		} catch (a) {
			res.status(400).json({ message: "login error" });
			console.log(a);
		}
	}
}

module.exports = new authController();
