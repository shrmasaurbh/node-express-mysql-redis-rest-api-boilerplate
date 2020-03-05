"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var _require2 = require("express-validator"),
    sanitizeBody = _require2.sanitizeBody;
//helper file to prepare responses.


var apiResponse = require("../../../helpers/apiResponse");
var UserDB = require("../../models/UserModel");
// const utility = require("../helpers/utility");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

module.exports = {
    test: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var meta, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            meta = {
                                "status": 200,
                                "message": "TEST DONE"
                            };
                            data = {};

                            apiResp.apiResp(req, res, data, meta = meta);

                        case 3:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function test(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return test;
    }(),

    // userLogout(req, res) {
    //     var meta ={
    //                 "status": 200,
    //                 "message" : "TEST DONE"
    //             }
    //     var data = {}
    //     userData.token = jwt.distroy(jwtPayload);

    //     apiResp.apiResp( req, res, data, meta =meta );

    // },
    userRegister: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var err, errors, hash, user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            err = {};
                            // Extract the validation errors from a request.

                            errors = validationResult(req);

                            if (errors.isEmpty()) {
                                _context2.next = 8;
                                break;
                            }

                            err.message = errors.errors;

                            apiResp.apiErr(req, res, 300, err);

                            // Display sanitized values/errors messages.
                            // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                            _context2.next = 14;
                            break;

                        case 8:

                            //hash input password
                            hash = bcrypt.hashSync(req.body.password, 10);
                            user = {
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                mobile_number: parseInt(req.body.mobile_number),
                                is_active: 1
                            };

                            console.log(user);
                            // Save user.
                            _context2.next = 13;
                            return UserDB.create(user).then(function (data) {
                                var meta = {
                                    "status": 201
                                    // "error" : false
                                };
                                console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                                console.log(data);
                                apiResp.apiResp(req, res, data, meta = meta);
                            }).catch(function (err) {
                                console.log("last", err);
                                apiResp.apiErr(req, res, 300, err);
                            });

                        case 13:
                            user = _context2.sent;

                        case 14:
                            _context2.next = 20;
                            break;

                        case 16:
                            _context2.prev = 16;
                            _context2.t0 = _context2["catch"](0);

                            //throw error in json response with status 500.
                            console.log(_context2.t0);
                            apiResp.apiErr(req, res, 300, _context2.t0);

                        case 20:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 16]]);
        }));

        function userRegister(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return userRegister;
    }(),
    userLogin: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var err, errors, user;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            err = {
                                message: ""
                            };
                            // Extract the validation errors from a request.

                            errors = validationResult(req);

                            if (errors.isEmpty()) {
                                _context3.next = 7;
                                break;
                            }

                            err.message = errors.errors;

                            apiResp.apiErr(req, res, 300, err);

                            _context3.next = 18;
                            break;

                        case 7:
                            _context3.prev = 7;
                            _context3.next = 10;
                            return UserDB.findOne({ where: { mobile_number: req.body.mobile_number } });

                        case 10:
                            user = _context3.sent;

                            if (user != null) {
                                user = user.dataValues;
                                console.log("user", user.password);
                                //Compare given password with db's hash.
                                bcrypt.compare(req.body.password, user.password, function (err, match) {
                                    var err = {};

                                    if (match) {

                                        //Check account confirmation.
                                        if (user.is_active) {
                                            // Check User's account active or not.
                                            var userData = {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email
                                            };
                                            //Prepare JWT token for authentication
                                            var jwtPayload = userData;
                                            var jwtData = {
                                                expiresIn: CONFIG.jwt_expiration
                                            };
                                            var secret = CONFIG.jwt_encryption;
                                            console.log(jwtData);
                                            console.log(secret);
                                            //Generated JWT token with Payload and secret.
                                            userData.secret = secret;
                                            userData.jwtData = jwtData;
                                            userData.token = jwt.sign(jwtPayload, secret, jwtData);

                                            var meta = {
                                                "status": 200
                                                // "error" : false
                                            };
                                            apiResp.apiResp(req, res, userData, meta);
                                        } else {
                                            err.message = "User is not active";
                                            apiResp.apiErr(req, res, 400, err);
                                        }
                                    } else {

                                        err.message = "Incorrect Password";
                                        apiResp.apiErr(req, res, 400, err);
                                    }
                                });
                            } else {
                                err.message = "User is not found";
                                apiResp.apiErr(req, res, 400, err);
                            }

                            _context3.next = 18;
                            break;

                        case 14:
                            _context3.prev = 14;
                            _context3.t0 = _context3["catch"](7);

                            console.log("ddddddddd");
                            apiResp.apiErr(req, res, 300, _context3.t0);

                        case 18:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[7, 14]]);
        }));

        function userLogin(_x5, _x6) {
            return _ref3.apply(this, arguments);
        }

        return userLogin;
    }(),
    forgotPassword: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            var errors, err, meta;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            // Extract the validation errors from a request.
                            errors = validationResult(req);

                            if (!errors.isEmpty()) {
                                console.log("last1", errors);
                                err = {
                                    message: errors.errors
                                };


                                apiResp.apiErr(req, res, 400, err);

                                // Display sanitized values/errors messages.
                                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                            } else {
                                meta = {
                                    "status": 200,
                                    message: "Phone number is found"
                                    // "error" : false
                                };

                                apiResp.apiResp(req, res, [], meta = meta);
                            }

                        case 2:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function forgotPassword(_x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return forgotPassword;
    }(),
    changePassword: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
            var err, meta, errors, hash;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            err = {};
                            meta = {
                                "status": 200
                                // "error" : false

                                // Extract the validation errors from a request.
                            };
                            errors = validationResult(req);

                            if (errors.isEmpty()) {
                                _context5.next = 8;
                                break;
                            }

                            err.message = errors.errors;

                            apiResp.apiErr(req, res, 400, err);

                            // Display sanitized values/errors messages.
                            // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                            _context5.next = 19;
                            break;

                        case 8:

                            //hash input password
                            hash = bcrypt.hashSync(req.body.password, 10);
                            _context5.prev = 9;
                            _context5.next = 12;
                            return UserDB.update({ password: hash }, { where: { mobile_number: req.body.mobile_number } });

                        case 12:
                            user = _context5.sent;


                            if (user[0]) {
                                apiResp.apiResp(req, res, [], meta = meta);
                            } else {
                                meta.status = 400;
                                meta.message = "Password is not Changed";
                                apiResp.apiResp(req, res, [], meta = meta);
                            }
                            _context5.next = 19;
                            break;

                        case 16:
                            _context5.prev = 16;
                            _context5.t0 = _context5["catch"](9);

                            apiResp.apiErr(req, res, 400, _context5.t0);

                        case 19:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[9, 16]]);
        }));

        function changePassword(_x9, _x10) {
            return _ref5.apply(this, arguments);
        }

        return changePassword;
    }()
};