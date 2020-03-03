// const Sequelize =require('sequelize')
// const db = require('../../config/connections');

// module.exports = db.sequelize.define('assign_leads', {
// 	assign_id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey:true,
// 		autoIncrement:true,
// 		allowNull: false,
//         // field: 'user_id',

// 	},
// 	team_id : Sequelize.INTEGER,
	
// 	lead_id : Sequelize.INTEGER,

// 	assign_by : Sequelize.INTEGER,

// 	assign_date: {
//          field: 'assign_date',
//          type: Sequelize.DATE,
//      },
// },{
//   // don't add the timestamp attributes (updatedAt, createdAt)
// 	timestamps: false,
// 	freezeTableName: true
//   // your other configuration here
// });