const Sequelize =require('sequelize')
const db = require('../../config/connections');

// module.exports = db.sequelize.define('regions', {
// 	status_id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey:true,
// 		autoIncrement:true,
// 		allowNull: false,
//         // field: 'user_id',

// 	},

// 	status : {
// 		type: Sequelize.STRING
// 	}
// },{
//   // don't add the timestamp attributes (updatedAt, createdAt)
// 	timestamps: false,
// 	freezeTableName: true
//   // your other configuration here
// });

module.exports = function(sequelize, DataTypes){
	var regions = sequelize.define('regions', {
		region_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
	        // field: 'user_id',

		},

		region_name : {
			type: DataTypes.STRING
		}
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		freezeTableName: true,
  		tableName: 'regions'

	  // your other configuration here

	})
	return regions;
};