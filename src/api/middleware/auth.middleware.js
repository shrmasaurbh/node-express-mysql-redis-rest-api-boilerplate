
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const UserDB = require("../models/UserModel");

exports.registerMiddleware = [
	// Validate fields.
	body("firstName").exists().trim().isLength({ min: 3 }).withMessage("First name must be specified."),
	body("lastName").exists().trim().isLength({ min: 3 }).withMessage("Last name must be specified."),
	body("phoneNo").trim().isNumeric().withMessage("Phone number is not valid").custom(async (value) => { console.log(value)
			return await UserDB.findOne({ where: {phoneNo: value}}).then((user) => {
				// console.log("user",user)
				if (user) {
					return Promise.reject("Phone number already in use");
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
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	];

exports.loginMiddleware = [
	// Validate fields.
	body("phoneNo").trim().isNumeric().withMessage("Phone number is not valid"),
	
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// Sanitize fields.
	sanitizeBody("phoneNo").escape(),
	sanitizeBody("password").escape(),
	];