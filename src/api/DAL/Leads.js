const Sequelize =require('sequelize')
const db = require('../../config/connections');
const projects = require('../controllers/projects/ProjectController');
const source = require('../controllers/misc/SourceController');
const utm = require('../controllers/misc/UtmController');
const digital = require('../controllers/misc/DigitalController');
const {STATUS_TYPES} = require(BASEPATH+'/src/helpers/constants');
const Op = Sequelize.Op; 

module.exports = {

    async DuplicateLead(client_id,project_id) {

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
                        },
                        {
                          model: db.projects,
                          as: "project_details",
                          attributes: ['project_id','project_name','region_id','builder_name']

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
            case "assigned":
				status = {
                          model: db.lead_status,
                          as: "lead_status",
                        };
                where= {
					    // assign_status: 0
					    // $and: [
                         assign_status: 1,
                         team_id:{[Op.ne]: null}
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


	},


async addNewLead(lead) {
        let lead_data = {}
        if(typeof lead !== 'undefined' ){
      if(lead.p_leadtype){
        if(isNaN(lead.p_leadtype)){
              // lead_data.project_id = lead.project_id;
          let project_id = await projects.getprojectId(lead.p_leadtype);
          // lead_data.project_id
        console.log("lead_data.project_id",project_id)

        }else{
              lead_data.project_id = lead.project_id;

        }
        // console.log("lead_data.project_id",lead_data.project_id)
        if(lead_data.project_id){

          if(lead.p_utmsource){
            var utm_data = {
                  utm_source  : lead.p_utmsource,
                  utm_medium  : lead.p_utmmedium,
                  utm_content : lead.p_utmcontent,
                  utm_term    : lead.p_utmterm
                };
            utm_id = await utm.addUtm(utm_data);

            if(utm_id){
              lead_data.utm_id = utm_id;  
            }

          }

          if(lead.p_useragent){
            var digital_data = {
                    client_ipaddress  : lead.p_ipaddress,
                    user_browser  : lead.p_userbrowser,
                    user_device : lead.p_useragent,
                  };
            if(lead.p_launchname){
              digital_data.launchname = lead.p_launchname;  
            }

            digital_id = await digital.addDigital(digital_data);

            if(digital_id){
              lead_data.digital_id = digital_id;  
            }
          }

          source_id = await source.getSourceId(lead.p_source);
          // console.log("dddddddddd",source_id )
          if(source_id){
            lead_data.source_id = source_id;  
          }
          if(lead.p_lead_added_by){
            lead_data.lead_added_by = lead.p_lead_added_by;
          }

          if(lead.p_pref){
            lead_data.client_pref = lead.p_pref;
          }

          if(lead.p_teamid){
            lead_data.team_id = lead.p_teamid;
          }

          if(lead.magnetlead){
            lead_data.is_magnet = lead.magnetlead;
          }

          lead_data.client_id = lead.client_id;
          
          await db.leads.create(lead_data).then(data => {
                      console.log("lead addddddddddddddd")
                      console.log(data)
                      return data;
                      // apiResp.apiResp( req, res, data, meta =meta );
                  })
                  .catch(err => {
                      console.log("err in lead add", err)
                      return null;
                      
                  })

        }
              return null;
      }
            return null;

        }else{
            return null;
        }
        
    },





}
