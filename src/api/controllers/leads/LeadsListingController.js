const leadsDB = require("../../models/LeadsModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

module.exports = {

    async getLeadsListing(req,res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        var postData = req.body;  
        // postData = JSON.parse(postData);
        console.log("req.params",postData);
        // const resultData = await leadsDB.find();
                // user = await leadsDB.findAll()
                //     .then(data => {
                //         console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                //         console.log(data)
                //         var meta ={
                //             "status": 200,
                //             // "error" : false
                //         }
                //         // console.log(meta)
                //         // throw new Error('Invalid object');
                        
                //         // apiResp.apiResp( req, res, data, meta );
                //         // res.status(200).send(data);
                //     })
                //     .catch(err => {
                //         console.log(err)
                //         // apiResp.apiErr( req, res, 300, err);
                //     })
            // console.log("resultData",user)
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
                user = await leadsDB.findAll({ offset: fromData, limit: size, raw: true
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


                if(user.length){
                    // var data = [];
                    meta.count = user.length;

                    meta.pageId = pageId;
                    meta.from = fromData;
                    meta.size = size;
                    meta.total_page = Math.ceil(meta.count / size);
                    
                    // resultData['data']['hits'].forEach((value) => {
                                // data.push(value['_source']);
                            // });
                    // data = ;
                    return apiResp.apiResp( req, res, user, meta );
                    


                // console.log(resultData['data']['hits'].length);
                
                }else{
                    meta.message = "DATA not found";
                    return apiResp.apiErr( req, res, 400, meta);
                }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }
        
    },

    
}

