const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = function(sequelize, DataTypes){
	var sources = sequelize.define('sources', {
		source_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
	        // field: 'user_id',

		},

		source : {
			type: DataTypes.STRING
		}
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		freezeTableName: true,
  		tableName: 'sources'

	  // your other configuration here

	})
	return sources;
};