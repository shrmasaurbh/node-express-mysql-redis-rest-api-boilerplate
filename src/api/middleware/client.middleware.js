const { check,body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");
// const db.users = require("../models/UserModel");
const db = require('../../config/connections');

exports.addClientMiddleware = [
    // Validate fields.
    check("client_name").exists().trim().isLength({ min: 3 }).withMessage("name name must be specified."),
    check("client_number").exists().trim().isNumeric().withMessage("Phone number is not valid").custom(async (value) => { console.log(value)
            return await db.clients.findOne({ where: {client_number: parseInt(value)}}).then((user) => {
                console.log("user==================",typeof value)
                if (user) {
                    return Promise.reject("Phone mobile_number already in use");
                }
            });
        }),
    check("client_email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
        .normalizeEmail().isEmail().withMessage("Email must be a valid email address."),
    check("alternate_number").optional().trim().isNumeric().withMessage("Phone number is not valid"),
    
    ];
