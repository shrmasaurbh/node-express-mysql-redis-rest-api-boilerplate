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
    async getLeadStListing(req, res) {
        try{
            user = await db.lead_status.findAll()
                    .then(data => {
                        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        // console.log(data)
                        var meta ={
                            "status": 200,
                            // "error" : false
                        }
                        // console.log(meta)
                        // throw new Error('Invalid object');
                        
                        apiResp.apiResp( req, res, data, meta );
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },
}