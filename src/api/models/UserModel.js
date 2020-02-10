// module.exports = (sequelize, DataType) => {
//   const Users = sequelize.define('Users', {
//     id: {
//       type: DataType.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: {
//       type: DataType.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
//     },
//     done: {
//       type: DataType.BOOLEAN,
//       allowNull: false,
//       defaultValue: false
//     }
//   }, {
//     classMethods: {
//       associate: (models) => {
//         Users.belongsTo(models.Users);
//       }
//     }
//   });
//   return Users;
// };

const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = db.sequelize.define('users', {
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},	

	name : {
		type: Sequelize.STRING
	},
	
	email : {
		type: Sequelize.STRING,
		allowNull: false,
		validate: { isEmail: {msg: "Phone number invalid."} }
	},
	
	mobile_number : {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true, 
		validate : {
			len: {args: [7, 11], msg: "Phone number invalid, too short."}, 
			isNumeric: { msg: "not a valid phone number."} }
	},
	
	password : {
		type: Sequelize.STRING,
		allowNull: false,
	},
	
	role : Sequelize.INTEGER,
	
	max_lead : Sequelize.INTEGER,
	
	rating : Sequelize.BOOLEAN,
	
	city : Sequelize.STRING,
	
	region_id : Sequelize.DECIMAL(10,2),
	
	last_log_in : Sequelize.BOOLEAN,

	deleted_by : Sequelize.INTEGER,
	
	is_online : Sequelize.BOOLEAN,
	
	is_active : Sequelize.BOOLEAN,

	createdAt: {
         field: 'created_at',
         type: Sequelize.DATE,
     },
     updatedAt: {
         field: 'updated_at',
         type: Sequelize.DATE,
     },
});
