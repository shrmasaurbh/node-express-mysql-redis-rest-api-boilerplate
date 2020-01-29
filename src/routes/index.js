var express = require("express");
var authRoutes = require("./auth.routes");
var userRoutes = require("./user.routes");
var searchRoutes = require("./search.routes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/search', searchRoutes);

module.exports = router;