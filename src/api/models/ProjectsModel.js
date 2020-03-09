const Sequelize =require('sequelize')
const db = require('../../config/connections');


module.exports = function(sequelize, DataTypes){
	var projectdetails = sequelize.define('projectdetails', {
	project_id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},
	
	project_addedby : Sequelize.INTEGER,

	added_date: {
         type: Sequelize.DATE,
    },

	project_name : {
		type: Sequelize.STRING
	},
	builder_name : {
		type: Sequelize.STRING
	},
	location : {
		type: Sequelize.STRING
	},
	
	region_id : Sequelize.INTEGER,
	project_status : Sequelize.BOOLEAN,
	
	project_id_99: {
         field: '99project_id',
         type: DataTypes.INTEGER,
     }
	// 99project_id : Sequelize.INTEGER,



},{
  // don't add the timestamp attributes (updatedAt, createdAt)
	timestamps: false,
	freezeTableName: true
  // your other configuration here
})
	return projectdetails;
};