const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = db.sequelize.define('leads', {
	lead_id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},

	team_id : Sequelize.INTEGER,
	source_id : Sequelize.INTEGER,

	project_name : {
		type: Sequelize.STRING
	},
	lead_status_id : Sequelize.INTEGER,

	magent_rm : Sequelize.INTEGER,
	
	crosssale_rm : Sequelize.INTEGER,
	
	lead_added_by : Sequelize.INTEGER,
	
	presale_rm : Sequelize.INTEGER,
	
	referred_by : Sequelize.INTEGER,
	
	admin_message : {
		type: Sequelize.STRING
	},

	is_magnet : Sequelize.BOOLEAN,
	
	is_crosssale : Sequelize.BOOLEAN,
	
	is_presale : Sequelize.BOOLEAN,
	
	deleted_by : Sequelize.INTEGER,
	
	is_active : Sequelize.BOOLEAN,

	createdAt: {
         field: 'coming_date',
         type: Sequelize.DATE,
     },
     updatedAt: {
         field: 'updated_at',
         type: Sequelize.DATE,
     },
});
