const Sequelize =require('sequelize')
const db = require('../../config/connections');
const {STATUS_TYPES} = require(BASEPATH+'/src/helpers/constants');
const Op = Sequelize.Op; 

module.exports = {

    async LeadsListingByStatusType(leadStatusType, fromData, size, pageId) {

    	// var include = [ ];
    	var include = [ {
                          model: db.users,
                          as: "team",
                          attributes: ['user_id','name']
                        },
                        {
                          model: db.users,
                          as: "lead_addedby",
                          attributes: ['user_id','name']
                        },
                        {
                          model: db.users,
                          as: "presalerm",
                          attributes: ['user_id','name']
                        },
                        {
                          model: db.users,
                          as: "referredby",
                          attributes: ['user_id','name']
                        },
                        {
                          model: db.users,
                          as: "crosssalerm",
                          attributes: ['user_id','name']
                        },
                        {
                          model: db.users,
                          as: "magentrm",
                          attributes: ['user_id','name']
                        },
                        {
                          model: db.clients,
                          as: "client_details",
                          attributes: ['client_id','client_name','client_email','client_number']
                        },
                        {
                          model: db.sources,
                          as: "source",
                        }
    	];
    	var status = {};
    	var where = {};
    	switch(leadStatusType) {
			case "closed" :
			case "booked" :
			case "cancel" :

				status = {
                          model: db.lead_status,
                          as: "lead_status",
                          where:{
                            status : STATUS_TYPES[leadStatusType]
                          }
                        };
                 where= {
					    assign_status: 1
					  //   // $and: [
       //                   assign_status: 0 ,
       //                   '$lead_status.status$': STATUS_TYPES[leadStatusType]
       //              // ]
					};
                break;
            case "new":
				status = {
                          model: db.lead_status,
                          as: "lead_status",
                          where:{
                            status : STATUS_TYPES[leadStatusType]
                          }
                        };
                where= {
					    // assign_status: 0
					    // $and: [
                         assign_status: 0 ,
                         // '$lead_status.status$': STATUS_TYPES[leadStatusType]
                    // ]
					  };
                break;
            case "open":
				status = {
                          model: db.lead_status,
                          as: "lead_status",
                          // required: true,
                          where:{
                            // status : STATUS_TYPES[leadStatusType]
                            status :{[Op.notIn]:["closed","booked","cancel", "bulk upload","not update"]}

                          }
                        };
                where= {
					    assign_status: 1
					  //   // $and: [
       //                   assign_status: 0 ,
       //                   '$lead_status.status$': STATUS_TYPES[leadStatusType]
       //              // ]
					  };
                break;
		}

		include.push(status);
		// console.log("default_include",default_include);
return await db.leads.findAndCountAll({  where,include , offset: fromData, limit: size });


	}








}
