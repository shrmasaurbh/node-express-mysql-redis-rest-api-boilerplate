// const UserDB = require("../../models/UserModel");
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
    async userAll(req, res) {
        try{
            user = await db.users.findAll({attributes: {
                                                        exclude: ['password']
                                                      }})
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
    async userDelete(req, res) {
        try{
            await db.users.findOne({ where: {user_id: parseInt(req.params.user_id)} })
                    .then(async user_data => {
                        if(user_data){
                            await db.users.update(
                                               {is_active: 0},
                                               {where: {user_id: parseInt(req.params.user_id)}}
                                            )
                                    .then(data => {
                                        return apiResp.apiResp( req, res, [], meta );
                                    })
                                    .catch(err => {
                                        return apiResp.apiErr( req, res, 300, err);
                                    })
                        }
                        err.message = "User not found"
                        return apiResp.apiErr( req, res, 400, err);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("user",user)
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },
    async userDetails(req, res) {
        try{
                        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            await db.users.findOne({ attributes: {
                                                    exclude: ['password']
                                                },
                                    where: {user_id: parseInt(req.params.user_id)} 
                                })
                    .then(user_data => {
                        
                        if(user_data){
                            return apiResp.apiResp( req, res, user_data, meta );
                                    
                        }
                        err.message = "User not found"
                        // console.log(meta)
                        return apiResp.apiErr( req, res, 400, err);
                        // throw new Error('Invalid object');
                        
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("user",user)
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },
    async userUpdate(req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                err.message = errors.errors
                apiResp.apiErr( req, res, 300, err);
                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                await db.users.findOne({ where: {user_id: parseInt(req.params.user_id)} })
                    .then(user => {
                        if(user){
                            // await user.updateAttributes(req.body);
                            return user.updateAttributes(req.body)
                        }else{
                            err.message = "User not found"
                            // console.log(meta)
                            return apiResp.apiErr( req, res, 400, err);
                        }
                        // throw new Error('Invalid object');
                        
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    .then(updatedOwner => {
                        console.log("updatedOwner",updatedOwner)
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 300, err);
                    })
                    // console.log("user",user)
            }
        } 
        catch (err) {
            apiResp.apiErr( req, res, 300, err);
        }       
    },
//     // FETCH all Customers
// exports.findAll = (req, res) => {
//   Customer.findAll().then(customers => {
//     // Send all customers to Client
//     res.send(customers);
//   });
// };
 
// // Find a Customer by Id
// exports.findById = (req, res) => {  
//   Customer.findById(req.params.customerId).then(customer => {
//     res.send(customer);
//   })
// };
 
// // Update a Customer
// exports.update = (req, res) => {
//   const id = req.params.customerId;
//   Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
//            { where: {id: req.params.customerId} }
//            ).then(() => {
//            res.status(200).send("updated successfully a customer with id = " + id);
//            });
// };
 
// // Delete a Customer by Id
// exports.delete = (req, res) => {
//   const id = req.params.customerId;
//   Customer.destroy({
//     where: { id: id }
//   }).then(() => {
//     res.status(200).send('deleted successfully a customer with id = ' + id);
//   });
// };
}
