"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SearchDB = require("../../models/SearchModel");
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

module.exports = {
    getDetailsById: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var meta, projectId, resultData, p_name;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false
                            };
                            projectId = parseInt(req.params.projectId);

                            if (!(typeof projectId !== 'undefined' || !isNaN(projectId))) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 5;
                            return SearchDB.getDetailsById(projectId);

                        case 5:
                            resultData = _context.sent;

                            if (!resultData.is_error) {
                                _context.next = 9;
                                break;
                            }

                            meta.message = resultData.message;
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 9:
                            p_name = resultData['data'].project_name.toLowerCase();

                            resultData['data'].slug = resultData['data'].region.toLowerCase() + '/property/' + p_name.split(' ').join('-');
                            console.log(resultData['data']);
                            return _context.abrupt("return", apiResp.apiResp(req, res, resultData['data'], meta));

                        case 15:
                            meta.message = "Project Id is not proper";
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 17:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function getDetailsById(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return getDetailsById;
    }(),
    getSearchListing: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var meta, postData, urlObj, resultData, data;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false
                            };
                            postData = req.body;
                            // postData = JSON.parse(postData);
                            // console.log("req.params",postData);

                            if (!(typeof postData.query !== 'undefined' || postData.query !== null)) {
                                _context2.next = 35;
                                break;
                            }

                            urlObj = {};


                            if (typeof postData.pageId === 'undefined' || postData.pageId === null) {
                                urlObj.pageId = 1;
                            } else {
                                urlObj.pageId = postData.pageId;
                            }
                            if (typeof postData.size === 'undefined' || postData.size === null) {
                                urlObj.size = 16;
                            } else {
                                urlObj.size = postData.size;
                            }

                            urlObj.fromData = (urlObj.pageId - 1) * urlObj.size;
                            urlObj.query = postData.query;
                            urlObj.filters = null;

                            meta.count = 0;

                            if (postData.filters) {
                                urlObj.filters = postData.filters[0];
                            }
                            // const resultData = await SearchDB.getSearchListing(urlObj);
                            _context2.prev = 11;
                            _context2.next = 14;
                            return SearchDB.getSearchListing(urlObj);

                        case 14:
                            resultData = _context2.sent;

                            if (!resultData.is_error) {
                                _context2.next = 18;
                                break;
                            }

                            meta.message = resultData.message;
                            return _context2.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 18:
                            data = [];
                            // console.log(resultData['data']['hits'].length);

                            if (!resultData['data']['total']) {
                                _context2.next = 29;
                                break;
                            }

                            meta.count = resultData['data']['total'];

                            meta.pageId = urlObj.pageId;
                            meta.from = urlObj.fromData;
                            meta.size = urlObj.size;
                            meta.total_page = Math.ceil(meta.count / urlObj.size);

                            resultData['data']['hits'].forEach(function (value) {
                                value['_source'].price = parseInt(value['_source'].config[0].price);
                                value['_source'].property_area = value['_source'].config[0].property_area;
                                value['_source'].slug = value['_source'].region.toLowerCase() + '/property/' + value['_source'].project_name.replace(" ", "-").toLowerCase();

                                bed_config = [];
                                value['_source'].config.forEach(function (val) {
                                    if (bed_config.indexOf(val.bed_config) === -1) {
                                        bed_config.push(val.bed_config);
                                    }
                                });
                                value['_source'].bed_config = bed_config.toString();
                                data.push(value['_source']);
                            });

                            return _context2.abrupt("return", apiResp.apiResp(req, res, data, meta));

                        case 29:
                            return _context2.abrupt("return", apiResp.apiResp(req, res, data, meta));

                        case 30:
                            _context2.next = 35;
                            break;

                        case 32:
                            _context2.prev = 32;
                            _context2.t0 = _context2["catch"](11);
                            return _context2.abrupt("return", apiResp.apiErr(req, res, 400, _context2.t0));

                        case 35:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[11, 32]]);
        }));

        function getSearchListing(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return getSearchListing;
    }(),
    getListBySection: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var meta, section, resultData, data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false
                            };
                            section = req.query.section.toString();

                            if (!(typeof section !== 'undefined' || section != null)) {
                                _context3.next = 24;
                                break;
                            }

                            _context3.prev = 3;
                            _context3.next = 6;
                            return SearchDB.getListBySection(section);

                        case 6:
                            resultData = _context3.sent;

                            if (!resultData.is_error) {
                                _context3.next = 10;
                                break;
                            }

                            meta.message = resultData.message;
                            return _context3.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 10:
                            data = [];

                            if (!(resultData['data'].length > 0)) {
                                _context3.next = 16;
                                break;
                            }

                            resultData['data'].forEach(function (value) {
                                var arr = {};
                                arr.id = value['_source'].id;
                                arr.title = value['_source'].title;
                                arr.project_name = value['_source'].project_name;
                                arr.price = parseInt(value['_source'].config[0].price);
                                var p_name = value['_source'].project_name.toLowerCase();
                                arr.slug = value['_source'].region.toLowerCase() + '/property/' + p_name.split(' ').join('-');

                                arr.bed_config = '';
                                bed_config = [];
                                value['_source'].config.forEach(function (val) {
                                    if (bed_config.indexOf(val.bed_config) === -1) {
                                        bed_config.push(val.bed_config);
                                    }
                                });
                                arr.bed_config = bed_config.toString();

                                data.push(arr);
                            });
                            return _context3.abrupt("return", apiResp.apiResp(req, res, data, meta));

                        case 16:
                            return _context3.abrupt("return", apiResp.apiResp(req, res, data, meta));

                        case 17:
                            _context3.next = 22;
                            break;

                        case 19:
                            _context3.prev = 19;
                            _context3.t0 = _context3["catch"](3);
                            return _context3.abrupt("return", apiResp.apiErr(req, res, 400, _context3.t0));

                        case 22:
                            _context3.next = 26;
                            break;

                        case 24:
                            meta.message = "Query string is not proper";
                            return _context3.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 26:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[3, 19]]);
        }));

        function getListBySection(_x5, _x6) {
            return _ref3.apply(this, arguments);
        }

        return getListBySection;
    }(),
    getListByRegion: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            var meta, region, resultData, p_name;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false
                            };
                            region = parseInt(req.params.region);

                            if (!(typeof region !== 'undefined' || !isNaN(region))) {
                                _context4.next = 14;
                                break;
                            }

                            _context4.next = 5;
                            return SearchDB.getListByRegion(region);

                        case 5:
                            resultData = _context4.sent;

                            if (!resultData.is_error) {
                                _context4.next = 9;
                                break;
                            }

                            meta.message = resultData.message;
                            return _context4.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 9:
                            // console.log()
                            p_name = resultData['data'].project_name.toLowerCase();

                            resultData['data'].slug = resultData['data'].region.toLowerCase() + '/property/' + p_name.split(' ').join('-');
                            return _context4.abrupt("return", apiResp.apiResp(req, res, resultData['data'], meta));

                        case 14:
                            meta.message = "Project Id is not proper";
                            return _context4.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 16:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function getListByRegion(_x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return getListByRegion;
    }()
};