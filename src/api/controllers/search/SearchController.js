const SearchDB = require("../../models/SearchModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

module.exports = {
    async userAll(req, res) {
        try{

            user = await UserDB.findAll().then(data => {
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
                
                if(resultData['data'].length>0){
                    console.log("ddddd")
                    var data = [];
                    resultData['data'].forEach((value) => {
                                var arr ={};
                                arr.id = value['_source'].id;
                                arr.title = value['_source'].title;
                                arr.project_name = value['_source'].project_name;
                                arr.price = parseInt(value['_source'].price);
                                data.push(arr);
                            });
                    return apiResp.apiResp( req, res, data, meta );
                }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }

        }else{
            meta.message = "Query string is not proper";
            return apiResp.apiErr( req, res, 400, meta);
        }
      },

      async getSearchData(req,res) {

        if (typeof req.query.q !== 'undefined' || req.query.q !== null) {
            
            var bhk_filter = '';
            var queryStr = req.query.q;

            if(req.query.bhk){
                var bhk_filter = req.query.bhk;
            }

            const resultData = SearchDB.getSearchData(queryStr,bhk_filter);
            return resultData.then(function(result) {
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(result))
            });
        }
      }
}

