const Router = require("express");
const controller = require("../Constrollers/authController");
const router = Router();
const { check } = require("express-validator");
const roleMiddleware = require("../Middleware/RoleMidlleware");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

router.post("/login", controller.login);
router.post(
	"/registration",
	[
		check("username", "The name can't be empty").notEmpty(),
		check(
			"password",
			"password can't be shorter than 4 or longer than 10"
		).isLength({ min: 4, max: 10 }),
	],
	controller.registration
);
router.get("/allPosts", roleMiddleware(['ADMIN']), controller.getAllPosts);
router.get("/Posts", AuthMiddleware, controller.getUserPost);

module.exports = router;
