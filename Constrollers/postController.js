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
		let isAdmin = false;
		req.user.roles.forEach(role => {
			if (role == 'ADMIN') isAdmin = true;
		});
		const postName = req.body.name;
		const user = await User.findById(req.user.id);
		if (!isAdmin) {
			const result = await Post.findOneAndDelete({ Name: postName, Owner: user.username });
			deleteStatus(result, res);
		}
		if (!req.body.owner) {
			const result = await Post.findOneAndDelete({ Name: postName, Owner: req.body.owner });
			deleteStatus(result, res);
		}
		else {
			const result = await Post.findOneAndDelete({ Name: postName, Owner: user.username });
			deleteStatus(result, res);
		}
	}
	async updatePost(req, res) {

	}
}
function deleteStatus(result, response) {
	if (!result) return response.json({ message: "Can't delete post post" });
	else return response.json({ message: "Succefully deleted post" });
}

module.exports = new postController();