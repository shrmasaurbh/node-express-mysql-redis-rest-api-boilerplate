'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UserDB = require("../../models/UserModel");
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

module.exports = {
    userAll: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return UserDB.findAll({ attributes: {
                                    exclude: ['password']
                                } }).then(function (data) {
                                // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                // console.log(data)
                                var meta = {
                                    "status": 200
                                    // "error" : false

                                    // console.log(meta)
                                    // throw new Error('Invalid object');

                                };apiResp.apiResp(req, res, data, meta);
                                // console.log(aa)
                                // res.status(200).send(data);
                            }).catch(function (err) {
                                apiResp.apiErr(req, res, 300, err);
                            });

                        case 3:
                            user = _context.sent;
                            _context.next = 9;
                            break;

                        case 6:
                            _context.prev = 6;
                            _context.t0 = _context['catch'](0);

                            apiResp.apiErr(req, res, 300, _context.t0);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 6]]);
        }));

        function userAll(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return userAll;
    }()

    //     // FETCH all Customers
    // exports.findAll = (req, res) => {
    //   Customer.findAll().then(customers => {
    //     // Send all customers to Client
    //     res.send(customers);
    //   });
    // };

    // // Find a Customer by Id
    // exports.findById = (req, res) => {  
    //   Customer.findById(req.params.customerId).then(customer => {
    //     res.send(customer);
    //   })
    // };

    // // Update a Customer
    // exports.update = (req, res) => {
    //   const id = req.params.customerId;
    //   Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
    //            { where: {id: req.params.customerId} }
    //            ).then(() => {
    //            res.status(200).send("updated successfully a customer with id = " + id);
    //            });
    // };

    // // Delete a Customer by Id
    // exports.delete = (req, res) => {
    //   const id = req.params.customerId;
    //   Customer.destroy({
    //     where: { id: id }
    //   }).then(() => {
    //     res.status(200).send('deleted successfully a customer with id = ' + id);
    //   });
    // };

};