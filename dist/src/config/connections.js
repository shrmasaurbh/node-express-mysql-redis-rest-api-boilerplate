'use strict';

// const mongoose = require('mongoose')
// const Redis = require('ioredis')
var winston = require('winston');
var Sequelize = require('sequelize');
// const CONFIG = require('./config');

// DB connection

// var MONGODB_URL = CONFIG.MONGODB_URL;
// mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
// 	//don't show the log when it is test
// 	if(CONFIG.NODE_ENV !== "test") {
// 		console.log("Connected to %s", MONGODB_URL);
// 		console.log("App is running ... \n");
// 		console.log("Press CTRL + C to stop the process. \n");
// 	}
// })
// 	.catch(err => {
// 		console.error("App starting error:", err.message);
// 		process.exit(1);
// 	});
// var mongodb = mongoose.connection;

// mongoose
//   .connect(`${CONFIG.DB_HOST}:${CONFIG.DB_PORT}/${CONFIG.DB_NAME}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .catch(error => winston.error(error))

// mongoose.connection.on('open', () => winston.info('MongoDB connected'))

// module.exports = mongoose


// const client = new Redis({
//   host: CONFIG.REDIS_HOST,
//   port: CONFIG.REDIS_PORT
// })

// client.on('error', error => {
//   winston.error(error)
//   client.quit()
// })

// client.on('connect', () => winston.info('Redis client connected'))

// module.exports = client

var db = {};

var sequelize = new Sequelize(CONFIG.mysqldb_name, CONFIG.mysqldb_user, CONFIG.mysqldb_password, {
  host: CONFIG.mysqldb_host,
  dialect: CONFIG.mysqldb_dialect,
  operatorAliases: false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// const lead_status = require("../api/models/LeadStatusModel");
var leads = require("../api/models/LeadsModel");
// const user = require("../api/models/UserModel");

// user.belongsTo(leads, {foreignKey: 'team_id'});
// console.log(db)
// db.leads.belongsTo(db.lead_status);


module.exports = db;