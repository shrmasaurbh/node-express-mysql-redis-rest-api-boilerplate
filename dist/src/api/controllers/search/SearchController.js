"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SearchDB = require("../../models/SearchModel");
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

module.exports = {
    autocomplete: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var meta, queryStr, resultData, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            meta = {
                                "status": 200
                                // "error" : false
                            };

                            if (!(typeof req.query.q !== 'undefined' || req.query.q !== null)) {
                                _context.next = 25;
                                break;
                            }

                            queryStr = req.query.q;
                            _context.prev = 3;
                            _context.next = 6;
                            return SearchDB.getAutocomplete(queryStr);

                        case 6:
                            resultData = _context.sent;

                            if (!resultData.is_error) {
                                _context.next = 10;
                                break;
                            }

                            meta.message = resultData.message;
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 10:
                            data = [];

                            if (!(resultData['data'].length > 0)) {
                                _context.next = 17;
                                break;
                            }

                            meta.count = resultData['data'].length;

                            resultData['data'].forEach(function (value) {
                                var arr = {};
                                arr.id = value['_source'].id;
                                arr.title = value['_source'].title;
                                arr.project_name = value['_source'].project_name;
                                arr.price = parseInt(value['_source'].config[0].price);
                                var p_name = value['_source'].project_name.toLowerCase();
                                var p_name = p_name.split(' ').join('-');
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
                            return _context.abrupt("return", apiResp.apiResp(req, res, data, meta));

                        case 17:
                            return _context.abrupt("return", apiResp.apiResp(req, res, data, meta));

                        case 18:
                            _context.next = 23;
                            break;

                        case 20:
                            _context.prev = 20;
                            _context.t0 = _context["catch"](3);
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, _context.t0));

                        case 23:
                            _context.next = 27;
                            break;

                        case 25:
                            meta.message = "Query string is not proper";
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 27:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[3, 20]]);
        }));

        function autocomplete(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return autocomplete;
    }()
};