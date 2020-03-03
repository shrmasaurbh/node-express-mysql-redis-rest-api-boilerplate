const Sequelize =require('sequelize')
const db = require('../../config/connections');
// module.exports = db.sequelize.define('users', {
// 	user_id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey:true,
// 		autoIncrement:true,
// 		allowNull: false,
//         // field: 'user_id',

// 	},	

// 	name : {
// 		type: Sequelize.STRING
// 	},
	
// 	email : {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		validate: { isEmail: {msg: "Phone number invalid."} }
// 	},
	
// 	mobile_number : {
// 		type: Sequelize.INTEGER,
// 		allowNull: false,
// 		unique: true, 
// 		validate : {
// 			len: {args: [7, 11], msg: "Phone number invalid, too short."}, 
// 			isNumeric: { msg: "not a valid phone number."} }
// 	},
	
// 	password : {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
	
// 	role : Sequelize.INTEGER,
	
// 	max_lead : Sequelize.INTEGER,
	
// 	rating : Sequelize.BOOLEAN,
	
// 	city : Sequelize.STRING,
	
// 	region_id : Sequelize.DECIMAL(10,2),
	
// 	last_log_in : Sequelize.BOOLEAN,

// 	deleted_by : Sequelize.INTEGER,
	
// 	is_online : Sequelize.BOOLEAN,
	
// 	is_active : Sequelize.BOOLEAN,

// 	createdAt: {
//          field: 'created_at',
//          type: Sequelize.DATE,
//      },
//      updatedAt: {
//          field: 'updated_at',
//          type: Sequelize.DATE,
//      },
// });
module.exports = function(sequelize, DataTypes){
	var users = sequelize.define('users', {
		user_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
		// field: 'user_id',
	},	

	name : {
		type: DataTypes.STRING
	},
	
	email : {
		type: DataTypes.STRING,
		allowNull: false,
		validate: { isEmail: {msg: "Phone number invalid."} }
	},
	
	mobile_number : {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true, 
		validate : {
			len: {args: [7, 11], msg: "Phone number invalid, too short."}, 
			isNumeric: { msg: "not a valid phone number."} }
	},
	
	password : {
		type: DataTypes.STRING,
		allowNull: false,
	},
	
	role : DataTypes.INTEGER,
	
	max_lead : DataTypes.INTEGER,
	
	rating : DataTypes.BOOLEAN,
	
	city : DataTypes.STRING,
	
	region_id : DataTypes.DECIMAL(10,2),
	
	last_log_in : DataTypes.BOOLEAN,

	deleted_by : DataTypes.INTEGER,
	
	is_online : DataTypes.BOOLEAN,
	
	is_active : DataTypes.BOOLEAN,

	createdAt: {
		 field: 'created_at',
		 type: DataTypes.DATE,
	 },
	 updatedAt: {
		 field: 'updated_at',
		 type: DataTypes.DATE,
	 },
});
	return users;
};