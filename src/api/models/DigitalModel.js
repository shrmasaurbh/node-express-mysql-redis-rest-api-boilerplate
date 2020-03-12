const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = function(sequelize, DataTypes){
	var digital = sequelize.define('digital', {
		digital_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
	        // field: 'user_id',

		},

		lead_id : {
			type: DataTypes.INTEGER
		},
		user_device : {
			type: DataTypes.STRING
		},
		user_browser : {
			type: DataTypes.STRING
		},
		campaign_type : {
			type: DataTypes.STRING
		},
		launchname : {
			type: DataTypes.STRING
		},
		client_ipaddress : {
			type: DataTypes.STRING
		},
		sitevisit_timestamp : {
			type: DataTypes.STRING
		},
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		freezeTableName: true,
  		tableName: 'digital'

	  // your other configuration here

	})
	return digital;
};