const Sequelize =require('sequelize')
const db = require('../../config/connections');


module.exports = function(sequelize, DataTypes){
	var cross_leads = sequelize.define('cross_leads', {
	cross_id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},
	lead_id : Sequelize.INTEGER,
	
	crosssale_rm : Sequelize.INTEGER,

	project_name : {
		type: Sequelize.STRING
	}
},{
  // don't add the timestamp attributes (updatedAt, createdAt)
	timestamps: false,
	freezeTableName: true
  // your other configuration here
})
// user.belongsTo(leads, {foreignKey: 'team_id'});

	return cross_leads;
};