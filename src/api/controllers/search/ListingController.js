const SearchDB = require("../../models/SearchModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

module.exports = {
    async getDetailsById(req, res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
                
        var projectId = parseInt(req.params.projectId)
        if(typeof projectId !== 'undefined' || !isNaN(projectId)){
            const resultData = await SearchDB.getDetailsById(projectId);
            console.log("resultData",resultData)
        
            if(resultData.is_error){
                meta.message = resultData.message;
                return apiResp.apiErr( req, res, 400, meta);
            }
            return apiResp.apiResp( req, res, resultData['data'], meta );

        

        }else{
            meta.message = "Project Id is not proper";
            return apiResp.apiErr( req, res, 400, meta);
        }       
    },

    async getSearchListing(req,res) {
        var postData = req.body;  
        // postData = JSON.parse(postData);
        // console.log("req.params",postData);

        if (typeof postData.query !== 'undefined' || postData.query !== null) {
            var urlObj = {}

            if (typeof postData.pageId === 'undefined' || postData.pageId === null) {
                urlObj.pageId = 1;
            } else {
                urlObj.pageId = postData.pageId;
            }
            if (typeof postData.size === 'undefined' || postData.size === null) {
                urlObj.size = 16;
            } else {
                urlObj.size = postData.size;
            }

            urlObj.fromData = (urlObj.pageId - 1) * urlObj.size
            urlObj.query = postData.query;
            urlObj.filters = null;

            if(postData.filters){
                urlObj.filters = postData.filters[0];
            }
            const resultData = esModel.getSearchListing(urlObj);
            // console.log(resultData)
            return resultData.then(function(result) {
                var resResponse = {};
                var resData = JSON.parse(result);
                // console.log(resData)
                if (resData['success']) {
                    // console.log(resData['data'])
                    var metaData = {};
                    metaData.status = 200;
                    metaData.is_error = 0;
                    metaData.total_records = resData['total'];
                    metaData.message = resData['message'];
                    metaData.is_aggregator = resData['is_aggregator'];
                    metaData.pageId = urlObj.pageId;
                    metaData.from = urlObj.fromData;
                    metaData.size = urlObj.size;
                    metaData.total_page = Math.ceil(resData['total'] / urlObj.size);
                    resResponse.meta = metaData;
                    resResponse.data = resData['data'];
                    resResponse.user_auth_token = '';
                }
                // ctx.set('Access-Control-Allow-Origin', '*');
                // ctx.set('Content-Type', 'application/json');
                // ctx.body = JSON.stringify(resResponse)
                // ctx.body = result;
            });
        }
    },

    async getListBySection(req, res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
                
        var section = req.query.section.toString();

        if(typeof section !== 'undefined' || section != null){
            try{
                const resultData = await SearchDB.getListBySection(section);
                

                if(resultData.is_error){
                    meta.message = resultData.message;
                    return apiResp.apiErr( req, res, 400, meta);
                }

                var data = [];
                
                if(resultData['data'].length>0){
                    resultData['data'].forEach((value) => {
                                var arr ={};
                                arr.id = value['_source'].id;
                                arr.title = value['_source'].title;
                                arr.project_name = value['_source'].project_name;
                                arr.price = parseInt(value['_source'].price);
                                // arr.city = value['_source'].city;
                                data.push(arr);
                            });
                    return apiResp.apiResp( req, res, data, meta );
                }else{
                    return apiResp.apiResp( req, res, data, meta );
                }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }

        }else{
            meta.message = "Query string is not proper";
            return apiResp.apiErr( req, res, 400, meta);
        }
      
    }
}

