const User = require("../models/User");
const Post = require("../models/Posts")
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { post } = require("../routes/authRout");


const generateAccesToken = (id, roles) => {
	const payload = {
		id, roles
	}
	return jwt.sign(payload, secret, { expiresIn: "15m" });
}

// realisation for login register and get post
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
	//getting all the posts of person
	async getUserPost(req, res) {
		//finding post due to user id  in database
		let post = await Post.findById(req.user.id)
		res.send(post)
	}
	async getAllPosts(req, res) {
		const posts = await Post.find({})
		res.send(posts)
	}
	async createPost(req, res) {
		const { name, description } = req.post;
		const user = await User.findById(req.user.id)
		const newPost = new Post({
			Owner: user.username,
			Name: name,
			Description: description,
		});
		await newPost.save();
	}
}

module.exports = new authController();
