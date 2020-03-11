var express = require('express');
var router = express.Router();

const source = require("../api/controllers/misc/SourceController");
const leadSt = require("../api/controllers/misc/LeadStController");
const region = require("../api/controllers/misc/RegionController");
const authenticate = require('../api/middleware/authorization').authenticate;

router
		// .all(authenticate)
		.get('/sources/list', source.getSourcesListing)
		.get('/lead_status/list', leadSt.getLeadStListing)
		.get('/regions/list', region.getRegionListing);

module.exports = router;
