var express = require('express');
var router = express.Router();

const client = require("../api/controllers/clients/ClientsController");
const clientList = require("../api/controllers/clients/ClientsListingController");
// const clientStatusList = require("../api/controllers/clients/clientStatusController");
// const middleware = require("../api/middleware/auth.middleware").authenticate;
const authenticate = require('../api/middleware/authorization').authenticate;

router.post('/list', clientList.getClientsListing);
router.get('/details/:clientId',client.getClientById);
// router.post('/list/status/:clientStatusType', clientList.getclientsListingByStatusType);
// router.get('/clients_status', clientStatusList.getclientStatus);

module.exports = router;
