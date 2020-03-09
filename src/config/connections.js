// const mongoose = require('mongoose')
// const Redis = require('ioredis')
const winston = require('winston')
const Sequelize =require('sequelize')
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

const db ={}

var sequelize = new Sequelize(CONFIG.mysqldb_name, CONFIG.mysqldb_user, CONFIG.mysqldb_password, {
  host: CONFIG.mysqldb_host,
  dialect: CONFIG.mysqldb_dialect,
  operatorAliases: false,
  freezeTableName: true,
  underscored: true,
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// const lead_status = require("../api/models/LeadStatusModel");
// const {leads} = require("../api/models/LeadsModel");
// const user = require("../api/models/UserModel");
// leads.hasMany(user, {foreignKey: 'team_id'});
// db.users = require('../api/models/UserModel')(sequelize, Sequelize);
// db.leads = require('../api/models/LeadsModel.js')(sequelize, Sequelize);
db.leads = require("../api/models/LeadsModel")(sequelize,Sequelize);
db.closed_leads = require("../api/models/ClosedLeadsModel")(sequelize,Sequelize);
db.lead_status = require("../api/models/LeadStatusModel")(sequelize,Sequelize);
db.sources = require('../api/models/SourcesModel')(sequelize,Sequelize);
db.users = require('../api/models/UserModel')(sequelize,Sequelize);
db.clients = require('../api/models/ClientsModel')(sequelize,Sequelize);
db.projects = require('../api/models/ProjectsModel')(sequelize,Sequelize);
// db['leads'].belongsTo(db.users, {
//   foreignKey: 'team_id',
//   targetKey: 'team_id'
// })
// db.leads.belongsTo(db.users , {foreignKey: 'team_id'});
// db.lead_status.belongsTo(db.leads , {foreignKey: 'status_id',sourceKey: 'lead_status_id'});
db.leads.hasOne(db.lead_status , {as:'lead_status',foreignKey: 'status_id',sourceKey: 'lead_status_id'});
db.leads.hasOne(db.sources , {as:'source',foreignKey: 'source_id',sourceKey: 'source_id'});

db.leads.hasOne(db.users , {as:'team',foreignKey: 'user_id',sourceKey: 'team_id'});
db.leads.hasOne(db.users , {as:'lead_addedby',foreignKey: 'user_id',sourceKey: 'lead_added_by'});
db.leads.hasOne(db.users , {as:'presalerm',foreignKey: 'user_id',sourceKey: 'presale_rm'});
db.leads.hasOne(db.users , {as:'referredby',foreignKey: 'user_id',sourceKey: 'referred_by'});
db.leads.hasOne(db.users , {as:'magentrm',foreignKey: 'user_id',sourceKey: 'magent_rm'});
db.leads.hasOne(db.users , {as:'crosssalerm',foreignKey: 'user_id',sourceKey: 'crosssale_rm'});
db.leads.hasOne(db.clients , {as:'client_details',foreignKey: 'client_id',sourceKey: 'client_id'});
db.clients.hasMany(db.leads , {as:'lead_details',foreignKey: 'client_id',sourceKey: 'client_id'});

// db.clients.belongsTo(db.leads , {as:'lead_details', foreignKey: 'client_id',targetKey: 'client_id'});



// db.leads.hasMany(db.users , {as:'ersss',foreignKey: 'user_id',sourceKey: 'lead_added_by'});
// db.leads.hasOne(db.users , {as:'ers',foreignKey: 'user_id',sourceKey: 'team_id'});
// db.leads.hasOne(db.users , {as:'ers',foreignKey: 'user_id',sourceKey: 'lead_added_by'});
// db.users.belongsTo(db.leads , {foreignKey: 'user_id',sourceKey: 'lead_added_by',as:'added'});
// db.leads.hasMany(db.users , {foreignKey: 'user_id',sourceKey: 'lead_added_by',as:'added'});
// console.log(db)
// db.leads.belongsTo(db.lead_status);


module.exports = db;