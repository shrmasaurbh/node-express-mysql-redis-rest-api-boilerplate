const { body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");
// const db.users = require("../models/UserModel");
const db = require('../../config/connections');

exports.registerMiddleware = [
	// Validate fields.
	body("name").exists().trim().isLength({ min: 3 }).withMessage("name name must be specified."),
	body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {mobile_number: parseInt(value)}}).then((user) => {
				console.log("user==================",typeof value)
				if (user) {
					return Promise.reject("Phone mobile_number already in use");
				}
			});
		}),
	body("email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
		.normalizeEmail().isEmail().withMessage("Email must be a valid email address."),
	body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.")
		.custom((value, { req }) => {
		  if (value !== req.body.password) {
		    throw new Error('Password confirmation does not match password');
		  }
		  return true;
		}),
	// Sanitize fields.
	// sanitizeBody("name").escape(),
	// sanitizeBody("email").escape(),
	// sanitizeBody("password").escape(),
	// sanitizeBody("mobile_number").escape(),
	];

exports.loginMiddleware = [
	// Validate fields.
	body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid"),
	
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// Sanitize fields.
	// sanitizeBody("mobile_number").escape(),
	// sanitizeBody("password").escape(),
	]

exports.forgotpwMiddleware = [
	// Validate fields.
	body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {mobile_number: parseInt(value)}}).then((user) => {
				console.log("user==================",value)
				if (!user) {
					return Promise.reject("Phone number not found");
				}
			});
		})
	];


exports.changepwMiddleware = [
	// Validate fields.
	body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {mobile_number: parseInt(value)}}).then((user) => {
				console.log("user==================",typeof value)
				if (!user) {
					return Promise.reject("Phone number not found");
				}
			});
		}),
	body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.")
		.custom((value, { req }) => {
		  if (value !== req.body.password) {
		    throw new Error('Password confirmation does not match password');
		  }
		  return true;
		}),
	// Sanitize fields.
	// sanitizeBody("password").escape(),
	// sanitizeBody("mobile_number").escape(),
	];

exports.userUpdateMiddleware = [
	// Validate fields.
	body("name").optional().trim().isLength({ min: 3 }).withMessage("name name must be specified."),
	body("mobile_number").optional().trim().isNumeric().withMessage("Phone number is not valid").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {mobile_number: parseInt(value)}}).then((user) => {
				console.log("user==================",typeof value)
				if (user) {
					return Promise.reject("Phone mobile_number already in use");
				}
			});
		}),
	body("email").optional().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
		.normalizeEmail().isEmail().withMessage("Email must be a valid email address."),
	
	// Sanitize fields.
	// sanitizeBody("name").escape(),
	// sanitizeBody("email").escape(),
	// sanitizeBody("password").escape(),
	// sanitizeBody("mobile_number").escape(),
	];
