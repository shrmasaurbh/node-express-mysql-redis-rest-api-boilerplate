'use strict';

var Sequelize = require('sequelize');
var db = require('../../config/connections');
var leadStatusDB = require("./LeadStatusModel");

// module.exports = db.sequelize.define('leads', {
// 	lead_id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey:true,
// 		autoIncrement:true,
// 		allowNull: false,
//         // field: 'user_id',

// 	},

// 	team_id : Sequelize.INTEGER,
// 	source_id : Sequelize.INTEGER,

// 	project_name : {
// 		type: Sequelize.STRING
// 	},
// 	 // : Sequelize.INTEGER,

// 	 lead_status_id: {
//               type: Sequelize.INTEGER,
//               model: 'lead_status', // <<< Note, its table's name, not object name
//               key: 'status_id' // <<< Note, its a column name
//         },
// 	magent_rm : Sequelize.INTEGER,

// 	crosssale_rm : Sequelize.INTEGER,

// 	lead_added_by : Sequelize.INTEGER,

// 	presale_rm : Sequelize.INTEGER,

// 	referred_by : Sequelize.INTEGER,

// 	admin_message : {
// 		type: Sequelize.STRING
// 	},

// 	is_magnet : Sequelize.BOOLEAN,

// 	is_crosssale : Sequelize.BOOLEAN,

// 	is_presale : Sequelize.BOOLEAN,

// 	deleted_by : Sequelize.INTEGER,

// 	is_active : Sequelize.BOOLEAN,

// 	createdAt: {
//          field: 'coming_date',
//          type: Sequelize.DATE,
//      },
//      updatedAt: {
//          field: 'updated_at',
//          type: Sequelize.DATE,
//      },
// });

// leadStatusDB.belongsToMany(leads);


module.exports = function (sequelize, DataTypes) {
	var leads = sequelize.define('lead_status', {
		lead_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
			// field: 'user_id',

		},

		team_id: Sequelize.INTEGER,
		source_id: Sequelize.INTEGER,

		project_name: {
			type: Sequelize.STRING
		},
		// : Sequelize.INTEGER,

		lead_status_id: {
			type: Sequelize.INTEGER,
			model: 'lead_status', // <<< Note, its table's name, not object name
			key: 'status_id' // <<< Note, its a column name
		},
		magent_rm: Sequelize.INTEGER,

		crosssale_rm: Sequelize.INTEGER,

		lead_added_by: Sequelize.INTEGER,

		presale_rm: Sequelize.INTEGER,

		referred_by: Sequelize.INTEGER,

		admin_message: {
			type: Sequelize.STRING
		},

		is_magnet: Sequelize.BOOLEAN,

		is_crosssale: Sequelize.BOOLEAN,

		is_presale: Sequelize.BOOLEAN,

		deleted_by: Sequelize.INTEGER,

		is_active: Sequelize.BOOLEAN,

		createdAt: {
			field: 'coming_date',
			type: Sequelize.DATE
		},
		updatedAt: {
			field: 'updated_at',
			type: Sequelize.DATE
		}
	});
	return leads;
};