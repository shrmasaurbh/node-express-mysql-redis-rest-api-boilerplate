var express = require('express');
var router = express.Router();

const userAuth = require("../api/controllers/user/AuthController");
const middleware = require("../api/middleware/auth.middleware");

router.post("/register",   middleware.registerMiddleware, userAuth.userRegister);
router.post("/login", middleware.loginMiddleware, userAuth.userLogin);
router.post("/test", userAuth.test);

module.exports = router;
