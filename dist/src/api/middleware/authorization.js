'use strict';

var jwt = require('jsonwebtoken');
var apiResp = require(BASEPATH + '/src/helpers/apiResponse');

var err = {};
var meta = {};

module.exports = {
  authenticate: function authenticate(req, res, next) {

    var authorizationHeaader = req.headers.authorization;
    var result = void 0;

    if (authorizationHeaader) {
      var token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      var options = {
        expiresIn: CONFIG.jwt_expiration
        // issuer: nameof my side
      };

      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, CONFIG.jwt_encryption, options);
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // var meta ={
        //   status: 401
        // }
        apiResp.apiErr(req, res, 401, err);
        // Throw an error just in case anything goes wrong with verification
        // throw new Error(err);
      }
    } else {
      err.message = "auth header is not found";
      apiResp.apiErr(req, res, 300, err);
    }
  },
  destroyAuth: function destroyAuth(req, res, next) {

    var authorizationHeaader = req.headers.authorization;
    var result = void 0;
    // var err = {};

    if (authorizationHeaader) {
      var token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      var options = {
        expiresIn: CONFIG.jwt_expiration
        // issuer: nameof my side
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, CONFIG.jwt_encryption, options);
        meta.status = 200;
        meta.message = "Session removed";
        console.log("verification");

        apiResp.apiResp(req, res, [], meta);
      } catch (err) {
        console.log("Authorization");
        apiResp.apiErr(req, res, 401, err);
        // Throw an error just in case anything goes wrong with verification
        // throw new Error(err);
      }
    } else {
      err.message = "auth header is not found";
      apiResp.apiErr(req, res, 400, err);
    }
  }
};