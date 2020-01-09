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
	id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	firstName : {
		type: Sequelize.STRING
	},
	lastName : {
		type: Sequelize.STRING
	},
	email : {
		type: Sequelize.STRING,
		allowNull: false,
		validate: { isEmail: {msg: "Phone number invalid."} }},
	phoneNo : {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true, 
		validate : {
			len: {args: [7, 11], msg: "Phone number invalid, too short."}, 
			isNumeric: { msg: "not a valid phone number."} }
		},
	password : Sequelize.STRING,
	isActive : Sequelize.BOOLEAN
});
