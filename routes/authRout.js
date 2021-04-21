const Router = require("express");
const controller = require("../Constrollers/authController");
const router = Router();

router.post("/login", controller.login);
router.post("/registration", controller.registration);
router.get("/getPosts", controller.getPosts);

module.exports = router;
