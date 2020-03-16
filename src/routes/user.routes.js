var express = require('express');
var router = express.Router();
const userCont = require("../api/controllers/user/UserController");
const middleware = require("../api/middleware/auth.middleware");
const authenticate = require('../api/middleware/authorization').authenticate;


router
  .route('/list')
  // .all(authenticate)
  .get(userCont.userAll)
  // .delete(userCont.userAll)

router
  .route('/autocomplete')
  .all(authenticate)
  .get(userCont.userListAutocomplete)


router
  .route('/:user_id')
  // .all(authenticate)
  .get(userCont.userDetails)
  .patch(userCont.userUpdate)
  .delete(userCont.userDelete)
// router.get("/users", authenticate,userCont.userAll);
// router
//   .route('/:userId')
//   .get(authorize(LOGGED_USER), controller.get)
//   .post(authorize(LOGGED_USER), controller.remove)
//   .put(authorize(LOGGED_USER), controller.remove)
//   .patch(authorize(LOGGED_USER), controller.remove)
//   .delete(authorize(LOGGED_USER), controller.remove)
module.exports = router;
