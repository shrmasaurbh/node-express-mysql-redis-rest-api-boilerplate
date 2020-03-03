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
	const clients = sequelize.define('clients', {
		client_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
        // field: 'user_id',

	},
	client_name : {
		type: DataTypes.STRING
	},

	client_number : {
              type: DataTypes.INTEGER,
        },
	client_email : DataTypes.STRING,
    
    alternate_number : {
          type: DataTypes.INTEGER,
    },
	
	property_for : DataTypes.STRING,
	country : DataTypes.STRING,
	nationality : DataTypes.STRING,
	city : DataTypes.STRING,
	min_budget : DataTypes.FLOAT,
	max_budget : DataTypes.FLOAT,
	current_location : DataTypes.STRING,
	required_BHK : DataTypes.STRING,
	company : DataTypes.STRING,
	locality : DataTypes.STRING,
	occupation : DataTypes.STRING,
	designation : DataTypes.STRING,
	ethinicity : DataTypes.STRING,
	country_code : DataTypes.STRING,
	ismarried : DataTypes.BOOLEAN,

	 // : DataTypes.INTEGER,

	birth_date: {
         type: DataTypes.DATE,
     },
     anniversary_date: {
         type: DataTypes.DATE,
     },
	
	loan_sanction : DataTypes.BOOLEAN,
	bookamount_details: DataTypes.STRING,
	flat_type: DataTypes.STRING,
	flat_no: DataTypes.STRING,
	building_number: DataTypes.STRING,
	carpet_area: DataTypes.STRING,
	agreement_value: DataTypes.STRING,
	booking_amount: DataTypes.STRING,

})
// leads.hasMany(user, {foreignKey: 'team_id'});

	return clients;
};