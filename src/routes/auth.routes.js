var express = require('express');
var router = express.Router();

const userAuth = require("../api/controllers/user/AuthController");
const authenticate = require('../api/middleware/authorization').destroyAuth;
const middleware = require("../api/middleware/auth.middleware");

router.post("/register",   middleware.registerMiddleware, userAuth.userRegister);
router.post("/login", middleware.loginMiddleware, userAuth.userLogin);
router.get("/logout", authenticate);
router.post("/forgot_password", middleware.forgotpwMiddleware, userAuth.forgotPassword);
router.patch("/change_password", middleware.changepwMiddleware, userAuth.changePassword);
router.post("/test", userAuth.test);

module.exports = router;
