"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require("../../models/index.js"),
    leads = _require.leads;

var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

// const user = require("../../models/UserModel");

// user.hasMany(leadsDB, {foreignKey: 'team_id'});

module.exports = {
    getLeadsListing: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var meta, postData, filters, _ref2, count, _leads;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false
                            };
                            postData = req.body;
                            // postData = JSON.parse(postData);

                            console.log("req.params", postData);
                            // if (typeof postData.query !== 'undefined' || postData.query !== null) {
                            filters = {};


                            if (typeof postData.pageId === 'undefined' || postData.pageId === null) {
                                pageId = 1;
                            } else {
                                pageId = postData.pageId;
                            }
                            if (typeof postData.size === 'undefined' || postData.size === null) {
                                size = 16;
                            } else {
                                size = postData.size;
                            }

                            fromData = (pageId - 1) * size;
                            // urlObj.query = postData.query;
                            // urlObj.filters = null;

                            meta.count = 0;

                            if (postData.filters) {
                                filters = postData.filters[0];
                            }
                            // const resultData = await SearchDB.getSearchListing(urlObj);
                            _context.prev = 9;
                            _context.next = 12;
                            return _leads.findAndCountAll({ offset: fromData, limit: size, raw: true
                            });

                        case 12:
                            _ref2 = _context.sent;
                            count = _ref2.count;
                            _leads = _ref2.rows;

                            // .then(data => {
                            //     // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

                            console.log("leads", _leads);

                            if (!count) {
                                _context.next = 26;
                                break;
                            }

                            // var data = [];
                            meta.count = count;

                            meta.pageId = pageId;
                            meta.from = fromData;
                            meta.size = size;
                            meta.total_page = Math.ceil(meta.count / size);

                            // resultData['data']['hits'].forEach((value) => {
                            // data.push(value['_source']);
                            // });
                            // data = ;
                            _leads.forEach(function (val) {
                                val['createdAt'] = new Date(val['createdAt']).toGMTString();
                                val['updatedAt'] = new Date(val['updatedAt']).toGMTString();
                            });
                            return _context.abrupt("return", apiResp.apiResp(req, res, _leads, meta));

                        case 26:
                            meta.message = "DATA not found";
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 28:
                            _context.next = 33;
                            break;

                        case 30:
                            _context.prev = 30;
                            _context.t0 = _context["catch"](9);
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, _context.t0));

                        case 33:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[9, 30]]);
        }));

        function getLeadsListing(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return getLeadsListing;
    }()
};