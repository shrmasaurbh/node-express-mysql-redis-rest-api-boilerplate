const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const db = require('../../../config/connections');
const { body, validationResult } = require("express-validator");
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
    
    async addClient(req,res) {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                err.message = errors.errors
                apiResp.apiErr( req, res, 400, err);
                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                // var user = {
                //         name: req.body.name,
                //         email: req.body.email,
                //         password: hash,
                //         mobile_number: parseInt(req.body.mobile_number),
                //         is_active: 1
                //     };
                // console.log(user)
                        // Save user.
                client = await db.clients.create(req.body).then(data => {
                    var meta ={
                        "status": 201,
                        // "error" : false
                    }
                    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    console.log(data)
                    apiResp.apiResp( req, res, data, meta =meta );
                })
                .catch(err => {
                    console.log("last",err)
                    apiResp.apiErr( req, res, 300, err);
                })
            }
            
            
        },
    
}
