const Sequelize =require('sequelize')
const db = require('../../config/connections');

// module.exports = db.sequelize.define('leads', {
// 	lead_id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey:true,
// 		autoIncrement:true,
// 		allowNull: false,
//         // field: 'user_id',

// 	},

// 	team_id : {
//               type: Sequelize.INTEGER,
//               model: user, // <<< Note, its table's name, not object name
//               key: 'team_id' // <<< Note, its a column name
//         },
// 	source_id : Sequelize.INTEGER,

// 	project_name : {
// 		type: Sequelize.STRING
// 	},
// 	 // : Sequelize.INTEGER,

// 	 lead_status_id: {
//               type: Sequelize.INTEGER,
//               model: 'lead_status', // <<< Note, its table's name, not object name
//               key: 'status_id' // <<< Note, its a column name
//         },
// 	magent_rm : Sequelize.INTEGER,
	
// 	crosssale_rm : Sequelize.INTEGER,
	
// 	lead_added_by : Sequelize.INTEGER,
	
// 	presale_rm : Sequelize.INTEGER,
	
// 	referred_by : Sequelize.INTEGER,
	
// 	admin_message : {
// 		type: Sequelize.STRING
// 	},

// 	is_magnet : Sequelize.BOOLEAN,
	
// 	is_crosssale : Sequelize.BOOLEAN,
	
// 	is_presale : Sequelize.BOOLEAN,
	
// 	deleted_by : Sequelize.INTEGER,
	
// 	is_active : Sequelize.BOOLEAN,

// 	createdAt: {
//          field: 'coming_date',
//          type: Sequelize.DATE,
//      },
//      updatedAt: {
//          field: 'updated_at',
//          type: Sequelize.DATE,
//      },
// });

// leadStatusDB.belongsToMany(leads);


module.exports = function(sequelize, DataTypes){
	const leads = sequelize.define('leads', {
		lead_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},

	team_id : {
              type: DataTypes.INTEGER,
              // model: user, // <<< Note, its table's name, not object name
              // key: 'team_id' // <<< Note, its a column name
        },
	source_id : DataTypes.INTEGER,
	
	client_id : DataTypes.INTEGER,

	 // : DataTypes.INTEGER,

	lead_status_id: {
              type: DataTypes.INTEGER,
              model: 'lead_status', // <<< Note, its table's name, not object name
              key: 'status_id' // <<< Note, its a column name
        },

	project_id : {
		type: DataTypes.INTEGER
	},
	revert_status : {
		type: DataTypes.STRING
	},
	magent_rm : DataTypes.INTEGER,
	
	crosssale_rm : DataTypes.INTEGER,
	
	lead_added_by : DataTypes.INTEGER,
	
	presale_rm : DataTypes.INTEGER,
	
	referred_by : DataTypes.INTEGER,
	
	admin_message : {
		type: DataTypes.TEXT(100)
	},

	loan_amount : DataTypes.INTEGER,

	loan_required : DataTypes.BOOLEAN,
	
	is_magnet : DataTypes.BOOLEAN,
	
	is_crosssale : DataTypes.BOOLEAN,
	
	is_presale : DataTypes.BOOLEAN,
	
	assign_status : DataTypes.BOOLEAN,
	
	is_active : DataTypes.BOOLEAN,
	
	deleted_by : DataTypes.INTEGER,

	createdAt: {
         field: 'coming_date',
         type: DataTypes.DATE,
     },
     updatedAt: {
         field: 'updated_at',
         type: DataTypes.DATE,
     },
})
// leads.hasMany(user, {foreignKey: 'team_id'});

	return leads;
};