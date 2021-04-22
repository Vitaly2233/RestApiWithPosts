const User = require("../models/User");
const Post = require("../models/Posts")
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { post } = require("../routes/authRout");

class postController {
	async getUserPost(req, res) {
		const user = await User.findById(req.user.id);
		const posts = await Post.find({ Owner: user.username })
		if (posts.length === 0) {
			res.send("You don't have any posts")
			return;
		}
		res.send(posts)
	}
	async getAllPosts(req, res) {
		const posts = await Post.find({})
		res.send(posts)
	}
	async createPost(req, res) {
		const { name, description } = req.body;
		const user = await User.findById(req.user.id);
		const posts = await Post.findOne({ Name: name, Owner: user.username });
		if (posts !== null) {
			return res.json({ message: `There is already post with the name: ${name}, your description for post:, ${description}` });
		}
		const newPost = new Post({
			Owner: user.username,
			Name: name,
			Description: description,
		});
		await newPost.save();
		return res.json({ message: "Succesfully saved your post" });
	}
	async deletePost(req, res) {
		console.log("here");
		// const postName = req.body.name;
		// const user = await User.findById(req.user.id);
		// await Post.findOneAndDelete({ Name: postName, Owner: user.username }, (err) => {
		// 	if (err) return res.json({ message: "Can't delete your post" });
		// 	else return res.json({ message: "Succefully deleted your post" });
		// });
	}
}

module.exports = new postController();