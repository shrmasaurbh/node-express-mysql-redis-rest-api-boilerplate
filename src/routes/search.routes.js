var express = require('express');
var router = express.Router();

const searchCont = require("../api/controllers/search/SearchController");
const listingCont = require("../api/controllers/search/ListingController");

 
// router
//   .route('/')
//   // .all(authenticate)
//   .get(searchCont.autocomplete)
router.get('/autocomplete', searchCont.autocomplete);
router.get('/details/:projectId', listingCont.getDetailsById);
router.get('/sectionlist', listingCont.getListBySection);
router.post('/list', listingCont.getSearchListing);
module.exports = router;

