const { validationResult } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../../../helpers/apiResponse");
// const UserDB = require("../../models/UsersModel_remove");
// const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const db = require('../../../config/connections');


module.exports = {

    async test(req, res) {
        var meta ={
                    "status": 200,
                    "message" : "TEST DONE"
                }
        var data = {}
        apiResp.apiResp( req, res, data, meta =meta );
        
    },
    // userLogout(req, res) {
    //     var meta ={
    //                 "status": 200,
    //                 "message" : "TEST DONE"
    //             }
    //     var data = {}
    //     userData.token = jwt.distroy(jwtPayload);
        
    //     apiResp.apiResp( req, res, data, meta =meta );
        
    // },
    async userRegister(req, res) {
        try {
            var err = {};
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                err.message = errors.errors

                apiResp.apiErr( req, res, 300, err);

                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {

                //hash input password
                const hash = bcrypt.hashSync(req.body.password, 10)
                var user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        mobile_number: parseInt(req.body.mobile_number),
                        is_active: 1
                    };
                console.log(user)
						// Save user.
				user = await db.users.create(user).then(data => {
                    var meta ={
                        "status": 201,
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
        var err = {
            message : ""
        };
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            err.message = errors.errors

            apiResp.apiErr( req, res, 300, err);

        } else {
            try{

               var user = await db.users.findOne({ where: {mobile_number: req.body.mobile_number} })
                if (user != null) {
                    user = user.dataValues
               console.log("user", user.password)
                    //Compare given password with db's hash.
                    bcrypt.compare(req.body.password, user.password, function(err, match) {
                        var err = {}

                        if (match) {
		                
                            //Check account confirmation.
                            if (user.is_active) {
                                // Check User's account active or not.
                                    let userData = {
                                        id: user.id,
                                        name: user.name,
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
                                    apiResp.apiResp( req, res, userData, meta );
                            } else {
                                err.message = "User is not active";
                                apiResp.apiErr( req, res, 400, err);
                            }
                        } else {
                            
                            err.message = "Incorrect Password";
                            apiResp.apiErr( req, res, 400, err);
                        }
                    });
                } else {
                    err.message = "User is not found";
                    apiResp.apiErr( req, res, 400,err);
                }
            
            }
            catch (err) {
                console.log("ddddddddd")
                apiResp.apiErr( req, res, 300,err);
            }
        }
    },

    async forgotPassword(req, res) {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("last1",errors)
            var err ={
                message : errors.errors
            }

            apiResp.apiErr( req, res, 400, err);

            // Display sanitized values/errors messages.
            // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            var meta ={
                        "status": 200,
                        message : "Phone number is found"
                        // "error" : false
                    }
            apiResp.apiResp( req, res, [], meta =meta );
        }
    },

    async changePassword(req, res) {
            
        var err = {};
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            err.message = errors.errors

            apiResp.apiErr( req, res, 400, err);

            // Display sanitized values/errors messages.
            // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {

            //hash input password
            const hash = bcrypt.hashSync(req.body.password, 10)

            try {

                user = await db.users.update(
                                            { password: hash },
                                            { where: { mobile_number: req.body.mobile_number } }
                                        )

                if(user[0]){
                    apiResp.apiResp( req, res, [], meta =meta );

                }else{
                    meta.status = 400;
                    meta.message = "Password is not Changed";
                    apiResp.apiResp( req, res, [], meta =meta );

                }
            }
            catch (err) {
                apiResp.apiErr( req, res, 400, err);
            }



                
        }
    },
}

