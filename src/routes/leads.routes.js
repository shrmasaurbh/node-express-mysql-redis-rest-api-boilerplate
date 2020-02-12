var express = require('express');
var router = express.Router();

const leadList = require("../api/controllers/leads/LeadsListingController");
// const middleware = require("../api/middleware/auth.middleware");

router.post('/list', leadList.getLeadsListing);

module.exports = router;
