const leads = require("../../models/LeadsModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const Sequelize =require('sequelize')
const db = require('../../../config/connections');
    // sequelize = db.sequelize,
    // Sequelize = db.Sequelize;
    // console.log(db.Sequelize)
// const user = require("../../models/UserModel");

// user.hasMany(leadsDB, {foreignKey: 'team_id'});
const Op = Sequelize.Op; 

module.exports = {

    async getLeadsListing(req,res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        var postData = req.body;  
        // postData = JSON.parse(postData);
        console.log("req.params",postData);
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
                const { count, rows: leads } = await db.leads.findAndCountAll({ include: [
                                                                                            {
                                                                                              model: db.lead_status,
                                                                                              as: "lead_status",
                                                                                            },{
                                                                                              model: db.users,
                                                                                              as: "team",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "lead_addedby",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "presalerm",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "referredby",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "crosssalerm",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "magentrm",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.clients,
                                                                                              as: "client_details",
                                                                                              attributes: ['client_id','client_name','client_email','client_number']
                                                                                            },
                                                                                            {
                                                                                              model: db.sources,
                                                                                              as: "source",
                                                                                            }
                                                                                          ],
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
                    
                    for (lead of leads){
                        lead.dataValues.createdAt = new Date(lead.dataValues.createdAt).toGMTString();
                        lead.dataValues.updatedAt = new Date(lead.dataValues.updatedAt).toGMTString();
                    }
                    return apiResp.apiResp( req, res, leads, meta );
                    


                // console.log(resultData['data']['hits'].length);
                
                }else{
                    meta.message = "DATA not found";
                    return apiResp.apiErr( req, res, 400, meta);
                }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }
        
    },

    async getLeadsListingByStatusType(req,res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        var leadStatusType = req.params.leadStatusType;
        leadStatusType = leadStatusType.replace("_", " ").toLowerCase();
        var postData = req.body;  
        // postData = JSON.parse(postData);
        // console.log("req.params",postData);
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
                const { count, rows: leads } = await db.leads.findAndCountAll({ include: [
                                                                                            {
                                                                                              model: db.lead_status,
                                                                                              as: "lead_status",
                                                                                              where:{
                                                                                                status : leadStatusType
                                                                                              }
                                                                                            },{
                                                                                              model: db.users,
                                                                                              as: "team",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "lead_addedby",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "presalerm",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "referredby",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "crosssalerm",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.users,
                                                                                              as: "magentrm",
                                                                                              attributes: ['user_id','name']
                                                                                            },
                                                                                            {
                                                                                              model: db.clients,
                                                                                              as: "client_details",
                                                                                              attributes: ['client_id','client_name','client_email','client_number']
                                                                                            },
                                                                                            {
                                                                                              model: db.sources,
                                                                                              as: "source",
                                                                                            }
                                                                                          ],
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
                    
                    for (lead of leads){
                        lead.dataValues.createdAt = new Date(lead.dataValues.createdAt).toGMTString();
                        lead.dataValues.updatedAt = new Date(lead.dataValues.updatedAt).toGMTString();
                    }

                    return apiResp.apiResp( req, res, leads, meta );
                    


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

