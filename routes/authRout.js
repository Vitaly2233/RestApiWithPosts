const Router = require("express");
const router = Router();
//controllers
const authController = require("../Constrollers/authController");
const postController = require("../Constrollers/postController");

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
router.get("/allPosts", roleMiddleware(['ADMIN']), postController.getAllPosts);
router.get("/myPosts", roleMiddleware(['ADMIN', 'user']), postController.getUserPost);
router.post("/createPost", roleMiddleware(['ADMIN', 'user']), postController.createPost);
router.delete("/deletePost", roleMiddleware(['ADMIN', 'user']), postController.deletePost);
router.put("/editPost", roleMiddleware(['ADMIN', 'user']), postController.updatePost)

module.exports = router;
