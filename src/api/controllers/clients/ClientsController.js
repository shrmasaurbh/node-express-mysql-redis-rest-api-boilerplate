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
            const resultData = await db.clients.findByPk(clientId,{include: [{
                 model: db.leads,
                 as:'lead_details'
            }]});
            console.log(resultData);
            if(resultData == null){
                err.message = "Client data not found";

                return apiResp.apiErr( req, res, 400, err);
            }

            // if(resultData.is_error){
            //     meta.message = resultData.message;
            //     return apiResp.apiErr( req, res, 400, meta);
            // }
            resultData['createdAt'] = new Date(resultData['createdAt']).toGMTString();
            resultData['updatedAt'] = new Date(resultData['updatedAt']).toGMTString();
            return  apiResp.apiResp( req, res, resultData, meta );

        

        }else{
            meta.message = "Lead Id is not proper";
            return apiResp.apiErr( req, res, 400, meta);
        }

        
    },

    
}

