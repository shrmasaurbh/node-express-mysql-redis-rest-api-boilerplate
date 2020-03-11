var express = require("express");
var authRoutes = require("./auth.routes");
var userRoutes = require("./user.routes");
var searchRoutes = require("./search.routes");
var leadsRoutes = require("./leads.routes");
var clientsRoutes = require("./clients.routes");
var projectRoutes = require("./project.routes");
var miscRoutes = require("./misc.routes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/leads', leadsRoutes);
router.use('/clients', clientsRoutes);
router.use('/projects', projectRoutes);
router.use('/', miscRoutes);

module.exports = router;