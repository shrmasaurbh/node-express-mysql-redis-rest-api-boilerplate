"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var leadStatusDB = require("../../models/LeadStatusModel");
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

module.exports = {
    getLeadStatus: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var meta, leads_status;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false

                                // const resultData = await SearchDB.getSearchListing(urlObj);
                            };
                            _context.prev = 1;
                            _context.next = 4;
                            return leadStatusDB.findAll({ raw: true });

                        case 4:
                            leads_status = _context.sent;

                            // .then(data => {
                            console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", leads_status);
                            //     // console.log(data)
                            //     var meta ={
                            //         "status": 200,
                            //         // "error" : false
                            //     }
                            //     // console.log(meta)
                            //     // throw new Error('Invalid object');

                            //     apiResp.apiResp( req, res, data, meta );
                            //     // console.log(aa)
                            //     // res.status(200).send(data);
                            // })
                            // .catch(err => {
                            //     apiResp.apiErr( req, res, 300, err);
                            // })

                            // resultData['data']['hits'].forEach((value) => {
                            // data.push(value['_source']);
                            // });
                            // data = ;
                            // return apiResp.apiResp( req, res, leads_status, meta );


                            // console.log(resultData['data']['hits'].length);

                            // }else{
                            //     meta.message = "DATA not found";
                            //     return apiResp.apiErr( req, res, 400, meta);
                            // }

                            _context.next = 11;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](1);
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, _context.t0));

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[1, 8]]);
        }));

        function getLeadStatus(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return getLeadStatus;
    }()
};