const Router = require("express");
const router = Router();
//controllers
const authController = require("../Controllers/authController");
const postController = require("../Controllers/postController");

const { check } = require("express-validator");
const roleMiddleware = require("../Middleware/RoleMidlleware");

router.post("/login", authController.login);
router.post(
	"/registration",
	[
		check("username", "The name can't be empty").notEmpty(),
		check(
			"password",
			"password can't be shorter than 4 or longer than 10"
		).isLength({ min: 4, max: 10 }),
	],
	authController.registration
);
//routs for posts
router.get("/allPosts", roleMiddleware(['admin']), postController.getAllPosts);
router.get("/myPosts", roleMiddleware(['admin', 'user']), postController.getUserPost);
router.post("/createPost", roleMiddleware(['admin', 'user']), postController.createPost);
router.delete("/deletePost", roleMiddleware(['admin', 'user']), postController.deletePost);
router.put("/editPost", roleMiddleware(['admin', 'user']), postController.updatePost)

module.exports = router;
