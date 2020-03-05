"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var _require2 = require("express-validator"),
    sanitizeBody = _require2.sanitizeBody;

var UserDB = require("../models/UserModel");

exports.registerMiddleware = [
// Validate fields.
body("name").exists().trim().isLength({ min: 3 }).withMessage("name name must be specified."), body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid").custom(function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						console.log(value);
						_context.next = 3;
						return UserDB.findOne({ where: { mobile_number: parseInt(value) } }).then(function (user) {
							console.log("user==================", typeof value === "undefined" ? "undefined" : _typeof(value));
							if (user) {
								return Promise.reject("Phone mobile_number already in use");
							}
						});

					case 3:
						return _context.abrupt("return", _context.sent);

					case 4:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}()), body("email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.").normalizeEmail().isEmail().withMessage("Email must be a valid email address."), body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."), body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.").custom(function (value, _ref2) {
	var req = _ref2.req;

	if (value !== req.body.password) {
		throw new Error('Password confirmation does not match password');
	}
	return true;
}),
// Sanitize fields.
sanitizeBody("name").escape(), sanitizeBody("email").escape(), sanitizeBody("password").escape(), sanitizeBody("mobile_number").escape()];

exports.loginMiddleware = [
// Validate fields.
body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid"), body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
// Sanitize fields.
sanitizeBody("mobile_number").escape(), sanitizeBody("password").escape()];

exports.forgotpwMiddleware = [
// Validate fields.
body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid").custom(function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						console.log(value);
						_context2.next = 3;
						return UserDB.findOne({ where: { mobile_number: parseInt(value) } }).then(function (user) {
							console.log("user==================", value);
							if (!user) {
								return Promise.reject("Phone number not found");
							}
						});

					case 3:
						return _context2.abrupt("return", _context2.sent);

					case 4:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x2) {
		return _ref3.apply(this, arguments);
	};
}())];

exports.changepwMiddleware = [
// Validate fields.
body("mobile_number").trim().isNumeric().withMessage("Phone number is not valid").custom(function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(value) {
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						console.log(value);
						_context3.next = 3;
						return UserDB.findOne({ where: { mobile_number: parseInt(value) } }).then(function (user) {
							console.log("user==================", typeof value === "undefined" ? "undefined" : _typeof(value));
							if (!user) {
								return Promise.reject("Phone number not found");
							}
						});

					case 3:
						return _context3.abrupt("return", _context3.sent);

					case 4:
					case "end":
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x3) {
		return _ref4.apply(this, arguments);
	};
}()), body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."), body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.").custom(function (value, _ref5) {
	var req = _ref5.req;

	if (value !== req.body.password) {
		throw new Error('Password confirmation does not match password');
	}
	return true;
}),
// Sanitize fields.
sanitizeBody("password").escape(), sanitizeBody("mobile_number").escape()];