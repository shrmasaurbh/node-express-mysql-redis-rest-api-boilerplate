const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const db = require('../../../config/connections');
var err = {
            "message": ""
        };
var meta ={
            "status": 200,
            // "error" : false
        }

module.exports = {

    async getClientById(req,res) {

        var clientId = parseInt(req.params.clientId);
        if(typeof clientId !== 'undefined' || !isNaN(clientId)){
            const resultData = await db.leads.findByPk(clientId,{ include: [
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

    
}

