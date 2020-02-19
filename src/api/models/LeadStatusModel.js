const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = db.sequelize.define('lead_status', {
	status_id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},

	status : {
		type: Sequelize.STRING
	}
},{
  // don't add the timestamp attributes (updatedAt, createdAt)
	timestamps: false,
	freezeTableName: true
  // your other configuration here
});