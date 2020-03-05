// exports.constants = {
// 	admin: {
// 		name: "admin",
// 		email: "admin@admin.com"
// 	},
// 	confirmEmails: {
// 		from : "no-reply@test-app.com"
// 	}
// };


module.exports =
{
	ROLES: {
		ADMIN : "admin",
		SALES : "sales",
		SALESTL : "salestl",
		FINANCE : "finance",
		DIGITAL : "digital",
		MAGNET :"magnet",
		MAGNETTL :"magnettl",
		MAGNETADMIN :"magnetadmin"

	},
	
	IS_AUTHORIZATION_DISABLED_FOR_REST_API_TESTING: true,
	ITEMS_PER_PAGE : 20,
};

module.exports.STATUS_TYPES =  {
		"open" : "open",
		"new" : "not update",
		"closed" : "closed",
		"booked" : "booked",
		"assigned" : "assigned",
		"cancel" : "cancel",

	};