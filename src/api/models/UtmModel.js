const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = function(sequelize, DataTypes){
	var utm = sequelize.define('utm', {
		utm_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
	        // field: 'user_id',

		},

		utm_medium : {
			type: DataTypes.STRING
		},
		utm_source : {
			type: DataTypes.STRING
		},
		utm_term : {
			type: DataTypes.STRING
		},
		utm_content : {
			type: DataTypes.STRING
		}
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		freezeTableName: true,
  		tableName: 'utm'

	  // your other configuration here

	})
	return utm;
};