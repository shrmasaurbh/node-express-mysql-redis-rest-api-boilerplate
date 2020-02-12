var express = require("express");
var authRoutes = require("./auth.routes");
var userRoutes = require("./user.routes");
var searchRoutes = require("./search.routes");
var leadsRoutes = require("./leads.routes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/leads', leadsRoutes);

module.exports = router;