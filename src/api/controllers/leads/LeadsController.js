const leadsDB = require("../../models/LeadsModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

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
            const resultData = await leadsDB.findByPk(leadId,{raw:true});
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

