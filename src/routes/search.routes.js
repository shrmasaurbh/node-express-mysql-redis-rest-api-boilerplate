var express = require('express');
var router = express.Router();

const searchCont = require("../api/controllers/search/SearchController");


// router
//   .route('/')
//   // .all(authenticate)
//   .get(searchCont.autocomplete)
router.get('/autocomplete', searchCont.autocomplete);
router.get('/getSearchData', searchCont.getSearchData);
module.exports = router;

