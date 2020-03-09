
const { body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");
// const db.users = require("../models/UserModel");
const db = require('../../config/connections');

exports.addLeadMiddleware = [
	// Validate fields.
	body("username").exists().trim().isLength({ min: 3 }).withMessage("name name must be specified."),
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
	];

