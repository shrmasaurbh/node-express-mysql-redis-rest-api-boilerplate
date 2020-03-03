// const Sequelize =require('sequelize')
// const db = require('../../config/connections');

// module.exports = db.sequelize.define('followup_leads', {
// 	f_id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey:true,
// 		autoIncrement:true,
// 		allowNull: false,
//         // field: 'user_id',

// 	},
	
// 	team_id : Sequelize.INTEGER,
	
// 	lead_id : Sequelize.INTEGER,

// 	followup_date: {
//          field: 'followup_date',
//          type: Sequelize.DATE,
//     },


// },{
//   // don't add the timestamp attributes (updatedAt, createdAt)
// 	timestamps: false,
// 	freezeTableName: true
//   // your other configuration here
// });