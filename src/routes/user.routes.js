var express = require('express');
var router = express.Router();

const userCont = require("../api/controllers/user/UserController");
const middleware = require("../api/middleware/auth.middleware");
const authenticate = require('../api/middleware/authorization').authenticate;


router
  .route('/')
  .all(authenticate)
  .get(userCont.userAll)

// router.get("/users", authenticate,userCont.userAll);
// router
//   .route('/:userId')

//   .get(authorize(LOGGED_USER), controller.get)
//   .post(authorize(LOGGED_USER), controller.remove)
//   .put(authorize(LOGGED_USER), controller.remove)
//   .patch(authorize(LOGGED_USER), controller.remove)
//   .delete(authorize(LOGGED_USER), controller.remove)


module.exports = router;







// router.post("auth/register", AuthController.userRegister);
// router.post("/user", emp.dddd);
// router.route('user')
//   .post(emp.validate('createUser'), emp.dddd);
// router.put("users/:id", UserController.userUpdate);
// router.delete("users/:id", UserController.userDelete);
// router.post("/login", AuthController.login);
// router.post("/verify-otp", AuthController.verifyConfirm);
// router.post("/resend-verify-otp", AuthController.resendConfirmOtp);

