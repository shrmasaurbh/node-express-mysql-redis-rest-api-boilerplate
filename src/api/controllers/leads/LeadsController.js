const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const clients = require('../clients/ClientsController');
const projects = require('../projects/ProjectController');
const source = require('../misc/SourceController');
const utm = require('../misc/UtmController');
const digital = require('../misc/DigitalController');
const db = require('../../../config/connections');
const { validationResult } = require("express-validator");

var err = {
			"message": ""
		};
var meta ={
			"status": 200,
			// "error" : false
		}

module.exports = {

	async getLeadbyId(req,res) {

		var leadId = parseInt(req.params.leadId);
		if(typeof leadId !== 'undefined' || !isNaN(leadId)){
			const resultData = await db.leads.findByPk(leadId,{ include: [
																							{
																							  model: db.lead_status,
																							  as: "lead_status",
																							},{
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
																						  ]});
			console.log(resultData);
			if(resultData == null){
				err.message = "Lead data not found";

				apiResp.apiErr( req, res, 400, err);
			}

			// if(resultData.is_error){
			//     meta.message = resultData.message;
			//     return apiResp.apiErr( req, res, 400, meta);
			// }
			resultData['createdAt'] = new Date(resultData['createdAt']).toGMTString();
			resultData['updatedAt'] = new Date(resultData['updatedAt']).toGMTString();
			apiResp.apiResp( req, res, resultData, meta );

		

		}else{
			meta.message = "Lead Id is not proper";
			return apiResp.apiErr( req, res, 400, meta);
		}

		
	},

	async addLead(req,res) {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            err.message = errors.errors

            apiResp.apiErr( req, res, 300, err);

            // Display sanitized values/errors messages.
            // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {

			var p_mobilenumber = parseInt(req.body.p_mobilenumber);
			console.log(p_mobilenumber)
			var client_details = {};

			var utm_data = {
								utm_source  : req.body.p_utmsource,
								utm_medium  : req.body.p_utmmedium,
								utm_content : req.body.p_utmcontent,
								utm_term    : req.body.p_utmterm
							};
			 utm_id = await utm.addUtm(utm_data);

			 var digital_data = {
								client_ipaddress  : req.body.p_ipaddress,
								user_browser  : req.body.p_userbrowser,
								p_useragent : req.body.p_useragent,
							};
			 digital_id = await digital.addDigital(digital_data);

			client_details = await clients.getClientDetails(p_mobilenumber);
			// console.log(client_details)
	        lead_data.region_id = p_regionid;

	        if(client_details != null){
	        	var client_id = client_details.client_id;


	        }else{
	        	let client_details = {
	        		client_name : req.body.p_username,
					client_email : req.body.p_email,
					client_number : req.body.p_mobilenumber,
					// client_countrycode : req.body.p_countrycode,
	        	}
				client_details = await clients.addNewClient(client_details);
				if(client_details != null){

				}else{
		            meta.message = "Client is not created";
		            return apiResp.apiErr( req, res, 400, meta);

				}
	        }
		}
	},

	async addNewLead(lead) {
        let lead_data = {}
        if(typeof lead !== 'undefined' ){
			if(lead.p_leadtype){
				if(isNaN(lead.p_leadtype)){
		        	// lead_data.project_id = lead.project_id;
					lead_data.project_id = projects.getprojectId(lead.p_leadtype);

				}else{
		        	lead_data.project_id = lead.project_id;

				}
				if(lead_data.project_id){
					source_id = source.getSourceId(lead.p_source);
					lead_added_by = lead.p_lead_added_by;
				}
			}

        }else{
            return null;
        }
        
    },

	  
}

