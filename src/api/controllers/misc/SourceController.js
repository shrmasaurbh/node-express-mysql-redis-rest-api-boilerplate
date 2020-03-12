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
    async getSourcesListing(req, res) {
        try{
            user = await db.sources.findAll()
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

    async getSourceId(source) {
        try{
            if(source != null){

                await db.sources.findOne({ 
                                            where: {source: source} 
                                        })
                        .then(source_data => {
                            
                            if(source_data){
                                return source_data.dataValues.source_id; 
                                        
                            }
                            return null;
                        })
                        .catch(err => {
                            return null;
                        })
            }
        } 
        catch (err) {
            return null;

        }       
    },
}