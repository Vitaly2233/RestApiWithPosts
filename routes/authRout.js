const Router = require("express");
const controller = require("../Constrollers/authController");
const router = Router();
const { check } = require("express-validator");

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
router.get("/getPosts", controller.getPosts);

module.exports = router;
