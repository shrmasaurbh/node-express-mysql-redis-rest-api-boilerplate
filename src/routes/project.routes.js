var express = require('express');
var router = express.Router();
const projectCont = require("../api/controllers/projects/ProjectController");
// const middleware = require("../api/middleware/auth.middleware");
const authenticate = require('../api/middleware/authorization').authenticate;
const middleware = require("../api/middleware/project.middleware");


router
  .route('/list')
  .all(authenticate)
  .post(projectCont.getProjectsListing)
  // .delete(projectCont.projectAll)

router
  .route('/add')
  .all(authenticate)
  .post(middleware.addProjectMiddleware, projectCont.projectAdd)

router
  .route('/autocomplete')
  .all(authenticate)
  .get(projectCont.projectListAutocomplete)

router
  .route('/:project_id')
  .all(authenticate)
  .get(projectCont.projectDetails)
  .put(middleware.updateProjectMiddleware, projectCont.projectUpdate)
  .delete(projectCont.projectDelete)
// router.get("/projects", authenticate,userCont.userAll);
// router
//   .route('/:userId')
//   .get(authorize(LOGGED_USER), controller.get)
//   .post(authorize(LOGGED_USER), controller.remove)
//   .put(authorize(LOGGED_USER), controller.remove)
//   .patch(authorize(LOGGED_USER), controller.remove)
//   .delete(authorize(LOGGED_USER), controller.remove)
module.exports = router;
