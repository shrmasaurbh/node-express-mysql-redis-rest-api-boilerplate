const Sequelize =require('sequelize')
const db = require('../../config/connections');


module.exports = function(sequelize, DataTypes){
	var closed_leads = sequelize.define('closed_leads', {
	c_id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},
	
	lead_id : Sequelize.INTEGER,

	closing_rm : Sequelize.INTEGER,

	closing_reason : {
		type: Sequelize.STRING
	},

	closed_date: {
         field: 'closed_date',
         type: Sequelize.DATE,
    },

    closing_comment : {
		type: Sequelize.STRING
	}

},{
  // don't add the timestamp attributes (updatedAt, createdAt)
	timestamps: false,
	freezeTableName: true
  // your other configuration here
})
	return closed_leads;
};