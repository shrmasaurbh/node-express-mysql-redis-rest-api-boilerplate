const leadStatusDB = require("../../models/LeadStatusModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

module.exports = {

    async getLeadStatus(req,res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
            // const resultData = await SearchDB.getSearchListing(urlObj);
            try{
                // const resultData = await leadsDB.find(urlObj);
                const leads_status = await leadStatusDB.findAll({raw:true});
                    // .then(data => {
                        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",leads_status)
                    //     // console.log(data)
                    //     var meta ={
                    //         "status": 200,
                    //         // "error" : false
                    //     }
                    //     // console.log(meta)
                    //     // throw new Error('Invalid object');
                        
                    //     apiResp.apiResp( req, res, data, meta );
                    //     // console.log(aa)
                    //     // res.status(200).send(data);
                    // })
                    // .catch(err => {
                    //     apiResp.apiErr( req, res, 300, err);
                    // })

                    // resultData['data']['hits'].forEach((value) => {
                                // data.push(value['_source']);
                            // });
                    // data = ;
                    // return apiResp.apiResp( req, res, leads_status, meta );
                    


                // console.log(resultData['data']['hits'].length);
                
                // }else{
                //     meta.message = "DATA not found";
                //     return apiResp.apiErr( req, res, 400, meta);
                // }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }
        
    },

    
}

