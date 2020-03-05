"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var leadsDB = require("../../models/LeadsModel");
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

var err = {
    "message": ""
};
var meta = {
    "status": 200
    // "error" : false
};

module.exports = {
    getLeadbyId: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var leadId, resultData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            leadId = parseInt(req.params.leadId);

                            if (!(typeof leadId !== 'undefined' || !isNaN(leadId))) {
                                _context.next = 12;
                                break;
                            }

                            _context.next = 4;
                            return leadsDB.findByPk(leadId, { raw: true });

                        case 4:
                            resultData = _context.sent;

                            console.log(resultData);
                            if (resultData == null) {
                                err.message = "Lead data not found";

                                apiResp.apiErr(req, res, 400, err);
                            }

                            // if(resultData.is_error){
                            //     meta.message = resultData.message;
                            //     return apiResp.apiErr( req, res, 400, meta);
                            // }
                            resultData['createdAt'] = new Date(resultData['createdAt']).toGMTString();
                            resultData['updatedAt'] = new Date(resultData['updatedAt']).toGMTString();
                            apiResp.apiResp(req, res, resultData, meta);

                            _context.next = 14;
                            break;

                        case 12:
                            meta.message = "Lead Id is not proper";
                            return _context.abrupt("return", apiResp.apiErr(req, res, 400, meta));

                        case 14:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function getLeadbyId(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return getLeadbyId;
    }()
};