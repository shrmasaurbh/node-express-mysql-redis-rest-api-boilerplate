// const projectDB = require("../../models/UserModel");
const { validationResult } = require("express-validator");
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
    async getProjectsListing(req,res) {
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        var postData = req.body;  
        // postData = JSON.parse(postData);
        console.log("req.params",req);
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
                const { count, rows: projects } = await db.projects.findAndCountAll({  include: [
                                                                                            {
                                                                                              model: db.users,
                                                                                              // as: "project_addedby",
                                                                                            },
                                                                                            {
                                                                                              model: db.region,
                                                                                              // as: "project_addedby",
                                                                                            }
                                                                                            ],
                                                                                offset: fromData, limit: size
                                                                            });
                if(count){
                    // var data = [];
                    meta.count = count;

                    meta.pageId = pageId;
                    meta.from = fromData;
                    meta.size = size;
                    meta.total_page = Math.ceil(meta.count / size);
                    
                    for (project of projects){
                        project.dataValues.added_date = new Date(project.dataValues.added_date).toGMTString();
                        project.dataValues.project_addedby = project.dataValues.user.name;
                        delete project.dataValues.user;
                        delete project.dataValues.region_id;
                    }

                    return apiResp.apiResp( req, res, projects, meta );
                    

                }else{
                    meta.message = "DATA not found";
                    return apiResp.apiErr( req, res, 400, meta);
                }

            }catch (err) {
                return apiResp.apiErr( req, res, 400, err);  
            }
        
    },
    async projectDelete(req, res) {
        try{
            await db.projects.findOne({ where: {project_id: parseInt(req.params.project_id)} })
                    .then(async project_data => {
                        if(project_data){
                            await db.projects.update(
                                               {project_status: 0},
                                               {where: {project_id: parseInt(req.params.project_id)}}
                                            )
                                    .then(data => {
                                        return apiResp.apiResp( req, res, [], meta );
                                    })
                                    .catch(err => {
                                        return apiResp.apiErr( req, res, 300, err);
                                    })
                        }
                        err.message = "project not found"
                        return apiResp.apiErr( req, res, 400, err);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("project",project)
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },
    async projectDetails(req, res) {
        try{
                        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            await db.projects.findOne({ include: [
                                                    {
                                                      model: db.users,
                                                      // as: "project_addedby",
                                                    },
                                                    {
                                                      model: db.region,
                                                      // as: "project_addedby",
                                                    }
                                                ],
                                    where: {project_id: parseInt(req.params.project_id)} 
                                })
                    .then(project_data => {
                        
                        if(project_data){
                        	project_data.dataValues.added_date = new Date(project_data.dataValues.added_date).toGMTString();
                            project_data.dataValues.project_addedby = project_data.dataValues.user.name;
                            delete project_data.dataValues.user;
                            delete project_data.dataValues.region_id;
                            return apiResp.apiResp( req, res, project_data, meta );
                                    
                        }
                        err.message = "project not found"
                        // console.log(meta)
                        return apiResp.apiErr( req, res, 400, err);
                        // throw new Error('Invalid object');
                        
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("project",project)
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },
    async projectUpdate(req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                err.message = errors.errors
                apiResp.apiErr( req, res, 300, err);
                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                await db.projects.findOne({ where: {project_id: parseInt(req.params.project_id)} })
                    .then(async project => {
                        if(project){
                            // await project.updateAttributes(req.body);
                            var proj = await db.projects.update(
                                            req.body,
                                            { where: { project_id: parseInt(req.params.project_id) } }
                                        )
                            console.log(proj)
			                if(proj[0]){
			                	meta.status=200;
			                    return apiResp.apiResp( req, res, [], meta =meta );

			                }else{
			                    meta.status = 400;
			                    meta.message = "Details is not Updated";
			                    return apiResp.apiResp( req, res, [], meta =meta );

			                }
                        }else{
                            err.message = "project not found"
                            return apiResp.apiErr( req, res, 400, err);
                        }
                        // throw new Error('Invalid object');
                        
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("project",project)
            }
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },

    async projectAdd(req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                err.message = errors.errors
                apiResp.apiErr( req, res, 300, err);
                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
            	// project_name = req.body.project_name.trim();
                await db.projects.findOne({ where: {project_name: req.body.project_name.trim()} })
                    .then(async project => {
                        if(project){
                            err.message = "project with same name already present";
                            // console.log(meta)
                            return apiResp.apiErr( req, res, 400, err);
                        }else{
                        	req.body.project_status = 0;
                        	await db.projects.create(req.body)
                        		.then(data => {
				                    var meta ={
				                        "status": 201,
				                        // "error" : false
				                    }
				                    console.log(data)
				                    apiResp.apiResp( req, res, data, meta =meta );

				                })
				                .catch(err => {
				                    console.log("last",err)
				                    apiResp.apiErr( req, res, 300, err);

				                })

                        }
                        // throw new Error('Invalid object');
                        
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("project",project)
            }
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },

    async getprojectId(p_name) {
        try{
                        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            if(p_name != null){

                await db.projects.findOne({ 
                                            where: {project_name: p_name} 
                                        })
                        .then(project_data => {
                            
                            if(project_data){
                                return project_data.dataValues.project_id; 
                                        
                            }
                            return null;
                        })
                        .catch(err => {
                            return null;
                        })
                        // console.log("project",project)
            }else{
                return null
            }
        } 
        catch (err) {
            return null;
        }       
    },

}
