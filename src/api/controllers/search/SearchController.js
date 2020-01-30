const SearchDB = require("../../models/SearchModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

module.exports = {

    async autocomplete(req,res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }

        if (typeof req.query.q !== 'undefined' || req.query.q !== null) {
            var queryStr = req.query.q;

            try{
                const resultData = await SearchDB.getAutocomplete(queryStr);
                

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

