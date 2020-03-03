const Sequelize =require('sequelize')
const db = require('../../config/connections');

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
	 }
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		freezeTableName: true,
  		tableName: 'users'

	  // your other configuration here

	})
	return users;
};