"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var esClient = require('../../config/esconfig');
var index = "homesfy_live";
var indexType = "live_projects";

module.exports = {
	getAutocomplete: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(queryStr) {
			var queryString, err, esResponse, msg;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							queryString = queryStr.trim().replace(/-/g, "");

							queryString = queryString.replace(/[()]/g, ' ');
							err = { is_error: 0 };
							// try{

							_context.next = 5;
							return new Promise(function (resolve, reject) {
								esClient.search({
									"index": index,
									"type": indexType,
									"body": {
										"query": {
											"bool": {
												"must": {
													"multi_match": {
														"fields": ["tags"],
														"query": queryString.toLowerCase(),
														"analyzer": "standard",
														"operator": "and"
														// "fuzziness": "AUTO"
													}
												}
												/*"filter": {
                "bool": {
                    "must": [{
                        "term": {
                            "is_active": 1
                        }
                    }]
                }
            }*/
											}
										}
									}
								}, function (error, results, fields) {
									if (error) {
										console.log("in reject");
										reject(error);
									} else {
										resolve(results);
										// return results;
									}
								});
							}).catch(function (err) {
								// var err = {	message:err.message,
								// 			is_error:1,
								// 		}; 
								return { message: err.message, is_error: 1, data: [] };
							});

						case 5:
							esResponse = _context.sent;

							if (!esResponse.is_error) {
								_context.next = 12;
								break;
							}

							console.log("err.message2", esResponse);
							msg = esResponse.message ? esResponse.message : "No data is found";
							return _context.abrupt("return", { message: msg, is_error: 1, data: [] });

						case 12:
							msg = esResponse['hits']['total'] > 0 ? "success" : "No data is found";
							return _context.abrupt("return", { message: msg, is_error: 0, data: esResponse['hits']['hits'] });

						case 14:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function getAutocomplete(_x) {
			return _ref.apply(this, arguments);
		}

		return getAutocomplete;
	}(),
	getDetailsById: function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
			var err, esResponse;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							err = { is_error: 0 };
							_context2.prev = 1;
							_context2.next = 4;
							return esClient.get({
								"index": index,
								"type": indexType,
								"id": id,
								"ignore": 404
							});

						case 4:
							esResponse = _context2.sent;

							if (!esResponse.found) {
								_context2.next = 9;
								break;
							}

							return _context2.abrupt("return", { message: "success", is_error: 0, data: esResponse._source });

						case 9:
							return _context2.abrupt("return", { message: "Data Not Found", is_error: 1, data: [] });

						case 10:
							_context2.next = 15;
							break;

						case 12:
							_context2.prev = 12;
							_context2.t0 = _context2["catch"](1);
							return _context2.abrupt("return", { message: _context2.t0.message, is_error: 1, data: [] });

						case 15:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this, [[1, 12]]);
		}));

		function getDetailsById(_x2) {
			return _ref2.apply(this, arguments);
		}

		return getDetailsById;
	}(),
	getSearchListing: function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(urlObj) {
			var restResponse, queryString, esQuery, priceRange, esResponse, msg;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							restResponse = {};

							restResponse.message = [];
							// var queryString = urlObj.query.trim().replace(/[^a-zA-Z0-9\ ]/g, ' ')
							queryString = urlObj.query.trim().replace(/-/g, "");

							queryString = queryString.replace(/[()]/g, ' ');

							// var esQuery = '{"must":{"multi_match":{"fields" : ["tags", "name"], "query" : "'+queryString+'", "type": "cross_fields", "analyzer": "standard", "operator": "and", "fuzziness": "AUTO"} },';
							esQuery = '{"must":{"multi_match":{"fields" : ["tags", "name"], "query" : "' + queryString.toLowerCase() + '", "analyzer": "standard", "operator": "and"} },';


							console.log("esQuery", esQuery);
							// esQuery += '"filter":{ "bool" : { "must" : [{"term": {"is_active": 1 }},';
							esQuery += '"filter":{ "bool" : { "must" : [';
							if (urlObj.filters) {

								if (urlObj.filters.bed_config) {
									esQuery += '{"term":{"config.bed_config":' + JSON.stringify(urlObj.filters.bed_config) + ' }},';
								}

								// if (urlObj.filters.property_type) {
								//     esQuery += '{"terms":{"property_type":' + JSON.stringify(urlObj.filters.property_type) + ' }},';
								// }

								// if (urlObj.filters.sale_type) {
								//     esQuery += '{"terms":{"sale_type":' + JSON.stringify(urlObj.filters.sale_type) + ' }},';
								// }

								priceRange = '';

								if (urlObj.filters.price) {
									if (urlObj.filters.price.length === 1) {
										esQuery += '{"range" : {"config.price" : {"gte" : ' + urlObj.filters.price[0].from + ', "lte" : ' + urlObj.filters.price[0].to + '}}}';
									}
									/*else {
             let firstPrice = urlObj.filters.price[0];
             let lastPrice = urlObj.filters.price[urlObj.filters.price.length - 1];
              esQuery += '{"range" : {"price" : {"gte" : ' + firstPrice.from + ', "lte" : ' + lastPrice.to + '}}}';
         }*/
								}
							}
							esQuery += ']}}';

							esQuery = esQuery.replace("},]", "}]");

							esQuery += '}';
							esQuery = esQuery.replace("},}", "}}");
							console.log("esQuery", esQuery);
							// try{

							_context3.next = 15;
							return new Promise(function (resolve, reject) {
								esClient.search({
									"index": index,
									"type": indexType,
									"from": urlObj.fromData,
									"size": urlObj.size,
									"body": {
										"query": {
											"bool": JSON.parse(esQuery)
										}
										// "aggs": {
										//     "max_price": { "max": { "field": "price" } },
										//     "min_price": { "min": { "field": "price" } },
										//     "origin": { "terms": { "field": "type" } },
										//     "brands": { "terms": { "field": "brand_id" } },
										//     "compatibility": { "terms": { "field": "model_id" } }
										// }
									}
								}, function (error, results, fields) {
									if (error) {
										console.log("in reject");
										reject(error);
									} else {
										resolve(results);
										// return results;
									}
								});
							}).catch(function (err) {
								// var err = {	message:err.message,
								// 			is_error:1,
								// 		}; 
								return { message: err.message, is_error: 1, data: [] };
							});

						case 15:
							esResponse = _context3.sent;


							console.log("esResponse......", esResponse);

							if (!esResponse.is_error) {
								_context3.next = 23;
								break;
							}

							console.log("err.message2", esResponse);
							msg = esResponse.message ? esResponse.message : "No data is found";
							return _context3.abrupt("return", { message: msg, is_error: 1, data: [] });

						case 23:
							msg = esResponse['hits']['total'] > 0 ? "success" : "No data is found";
							return _context3.abrupt("return", { message: msg, is_error: 0, data: esResponse['hits'] });

						case 25:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this);
		}));

		function getSearchListing(_x3) {
			return _ref3.apply(this, arguments);
		}

		return getSearchListing;
	}(),
	getListBySection: function () {
		var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(section) {
			var err, esResponse, msg;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							err = { is_error: 0 };
							_context4.next = 3;
							return new Promise(function (resolve, reject) {
								esClient.search({
									"index": index,
									"type": indexType,
									"size": 8,
									"body": {
										"query": {
											"match_all": {}
										}
										// "aggs": {
										//     "max_price": { "max": { "field": "price" } },
										//     "min_price": { "min": { "field": "price" } },
										//     "origin": { "terms": { "field": "type" } },
										//     "brands": { "terms": { "field": "brand_id" } },
										//     "compatibility": { "terms": { "field": "model_id" } }
										// }
									}
								}, function (error, results, fields) {
									if (error) {
										console.log("in reject");
										reject(error);
									} else {
										resolve(results);
										// return results;
									}
								});
							}).catch(function (err) {
								// var err = {	message:err.message,
								// 			is_error:1,
								// 		}; 
								return { message: err.message, is_error: 1, data: [] };
							});

						case 3:
							esResponse = _context4.sent;

							if (!esResponse.is_error) {
								_context4.next = 10;
								break;
							}

							console.log("err.message2", esResponse);
							msg = esResponse.message ? esResponse.message : "No data is found";
							return _context4.abrupt("return", { message: msg, is_error: 1, data: [] });

						case 10:
							msg = esResponse['hits']['total'] > 0 ? "success" : "No data is found";
							return _context4.abrupt("return", { message: msg, is_error: 0, data: esResponse['hits']['hits'] });

						case 12:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4, this);
		}));

		function getListBySection(_x4) {
			return _ref4.apply(this, arguments);
		}

		return getListBySection;
	}()
};