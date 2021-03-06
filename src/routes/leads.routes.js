var express = require('express');
var router = express.Router();

const lead = require("../api/controllers/leads/LeadsController");
const leadList = require("../api/controllers/leads/LeadsListingController");
const leadStatusList = require("../api/controllers/leads/LeadStatusController");
// const middleware = require("../api/middleware/auth.middleware").authenticate;
const authenticate = require('../api/middleware/authorization').authenticate;

router.post('/list', leadList.getLeadsListing);
router.post('/list/status/:leadStatusType', leadList.getLeadsListingByStatusType);
router.post('/add', lead.addLead);
router.get('/leads_status', leadStatusList.getLeadStatus);
router.get('/details/:leadId',lead.getLeadbyId);

module.exports = router;
