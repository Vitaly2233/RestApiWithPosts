const User = require("../models/User");
const Post = require("../models/Posts")

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
			if (role == 'admin') isAdmin = true;
		});
		const postName = req.body.name;
		const user = await User.findById(req.user.id);
		if (!isAdmin) {
			const result = await Post.findOneAndDelete({ Name: postName, Owner: user.username });
			sendStatus(result, res, "delete");
			return;
		}
		if (req.body.owner) {
			const result = await Post.findOneAndDelete({ Name: postName, Owner: req.body.owner });
			sendStatus(result, res, "delete");
			return;
		}
		else {
			const result = await Post.findOneAndDelete({ Name: postName, Owner: user.username });
			sendStatus(result, res, "delete");
			return;
		}
	}
	async updatePost(req, res) {
		const { name, newDescription } = req.body;
		let isAdmin = false;
		const user = await User.findById(req.user.id);
		req.user.roles.forEach(role => {
			if (role == 'ADMIN') isAdmin = true;
		});
		if (!isAdmin) {
			console.log(newDescription);
			const result = await Post.findOneAndUpdate({ Name: name, Owner: user.username }, { Description: newDescription })
			sendStatus(result, res, "update");
			return;
		}
		if (req.body.owner) {
			const result = await Post.findOneAndUpdate({ Owner: req.body.owner, Name: name }, { Description: newDescription });
			sendStatus(result, res, "update");
			return;
		}
		else {
			const result = await Post.findOneAndUpdate({ Name: name }, { Description: newDescription });
			sendStatus(result, res, "update");
			return;
		}
	}
}
function sendStatus(result, response, operation) {
	if (!result) return response.json({ message: `Can't ${operation} post, probably you wrote something wrong` });
	else return response.json({ message: `Succefully ${operation}ed post` });
}


module.exports = new postController();