
const { body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");
// const db.users = require("../models/UserModel");
const db = require('../../config/connections');

exports.addProjectMiddleware = [
	// Validate fields.
	body("project_name").exists().trim().isLength({ min: 3 }).withMessage("Project name must be specified"),
	body("builder_name").exists().trim().isLength({ min: 3 }).withMessage("Builder name must be specified"),
	body("location").optional().trim().isLength({ min: 3 }).withMessage("location is not proper"),
	body("project_addedby").exists().isNumeric(),
	body("region_id").exists().isNumeric().withMessage("Region id is not proper"),
	body("project_id_99").optional().isNumeric(),
	];


exports.updateProjectMiddleware = [
	// Validate fields.
	body("project_name").exists().trim().isLength({ min: 3 }).withMessage("Project name must be specified"),
	body("builder_name").exists().trim().isLength({ min: 3 }).withMessage("Builder name must be specified"),
	body("location").optional().trim().isLength({ min: 3 }).withMessage("location is not proper"),
	body("project_addedby").exists().isNumeric(),
	body("region_id").exists().isNumeric().withMessage("Region id is not proper"),
	body("project_id_99").optional().isNumeric(),
	body("project_status").exists().isBoolean(),
	];
