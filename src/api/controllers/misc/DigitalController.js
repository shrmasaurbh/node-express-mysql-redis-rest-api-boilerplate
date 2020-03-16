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
    async getDigitalListing(req,res) {
        var postData = req.body;  
        // postData = JSON.parse(postData);
        // if (typeof postData.query !== 'undefined' || postData.query !== null) {
            var filters = {}

            if (typeof postData.pageId === 'undefined' || postData.pageId === null) {
                pageId = 1;
            } else {
                pageId = postData.pageId;
            }
            if (typeof postData.size === 'undefined' || postData.size === null) {
                size = 16;
            } else {
                size = postData.size;
            }

            fromData = (pageId - 1) * size
            // urlObj.query = postData.query;
            // urlObj.filters = null;

            meta.count = 0;
            
            if(postData.filters){
                filters = postData.filters[0];
            }
            // const resultData = await SearchDB.getSearchListing(urlObj);
            try{
                // const resultData = await leadsDB.find(urlObj);
                const { count, rows: digital_data } = await db.digital.findAndCountAll({ 
                                                                                offset: fromData, limit: size
                                                                            });
                        // .then(data => {
                    //     // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

                // console.log("leads",leads)
                if(count){
                    // var data = [];
                    meta.count = count;

                    meta.pageId = pageId;
                    meta.from = fromData;
                    meta.size = size;
                    meta.total_page = Math.ceil(meta.count / size);
                    
                    // for (lead of leads){
                    //     lead.dataValues.createdAt = new Date(lead.dataValues.createdAt).toGMTString();
                    //     lead.dataValues.updatedAt = new Date(lead.dataValues.updatedAt).toGMTString();
                    // }
                    return apiResp.apiResp( req, res, digital_data, meta );
                    


                // console.log(resultData['data']['hits'].length);
                
                }else{
                    meta.message = "DATA not found";
                    return apiResp.apiErr( req, res, 400, meta);
                }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }
        
    },

     async addDigital(digital) {
        try{
            if(digital != null){

                await db.digital.create(digital).then(data => {
                    if(data){
                        return data.digital_id;
                    }
                    return null;
                    // var meta ={
                    //     "status": 201,
                    //     // "error" : false
                    // }
                    // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    // console.log(data)
                    // apiResp.apiResp( req, res, data, meta =meta );

                })
                .catch(err => {
                    return null;
                    // console.log("last",err)
                    // apiResp.apiErr( req, res, 300, err);

                })
            }
        } 
        catch (err) {
            return null;

        }       
    },
}