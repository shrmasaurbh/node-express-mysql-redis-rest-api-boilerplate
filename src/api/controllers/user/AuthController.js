const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../../../helpers/apiResponse");
const UserDB = require("../../models/UserModel");
// const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');


module.exports = {

    async userRegister(req, res) {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            	console.log("last1",errors)
                var err ={
                    message : errors.errors
                }

                apiResp.apiErr( req, res, 300, err);

                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {

                //hash input password
                const hash = bcrypt.hashSync(req.body.password, 10)
                var user = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phoneNo: req.body.phoneNo,
                        isActive: 1
                    };
                console.log(user)
						// Save user.
				user = await UserDB.create(user).then(data => {
                    var meta ={
                        "status": 200,
                        // "error" : false
                    }
                    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    console.log(data)
                    apiResp.apiResp( req, res, data, meta =meta );

                })
                .catch(err => {
                    console.log("last",err)
                    apiResp.apiErr( req, res, 300, err);

                })
            }
        } catch (err) {
            //throw error in json response with status 500.
        	console.log(err);
            apiResp.apiErr( req, res, 300, err);

        }
    },

    async userLogin(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var err ={
                    message : errors.errors
                }

                apiResp.apiErr( req, res, 300, err);

            } else {
                try{

                    await UserDB.findOne({ where: {phoneNo: req.body.phoneNo} }).then(user => {
                        if (user) {
                            //Compare given password with db's hash.
                            bcrypt.compare(req.body.password, user.password, function(err, match) {
                                if (match) {
    			                
                                    //Check account confirmation.
                                    if (user.isActive) {
                                        // Check User's account active or not.
                                            let userData = {
                                                id: user.id,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                email: user.email,
                                            };
                                            //Prepare JWT token for authentication
                                            const jwtPayload = userData;
                                            const jwtData = {
                                                expiresIn: CONFIG.jwt_expiration,
                                            };
                                            const secret = CONFIG.jwt_encryption;
                                            console.log(jwtData)
                                            console.log(secret)
                                            //Generated JWT token with Payload and secret.
                                            userData.secret = secret;
                                            userData.jwtData = jwtData;
                                            userData.token = jwt.sign(jwtPayload, secret, jwtData);
                                             var meta ={
                                                    "status": 200,
                                                    // "error" : false
                                                }
                                                // console.log(meta)
                                                // throw new Error('Invalid object');
                                                
                                                apiResp.apiResp( req, res, userData, meta );
                                    } else {
                                        apiResp.apiErr( req, res, 300);
                                    }
                                } else {
                                    apiResp.apiErr( req, res, 300);
                                }
                            });
                        } else {
                            apiResp.apiErr( req, res, 300);
                        }
                    });
                }
                catch (err) {
                    apiResp.apiErr( req, res, 300);
                }
            }
        } catch (err) {
            apiResp.apiErr( req, res, 300, err);

        }
    },
}

