const UserDB = require("../../models/UserModel");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');

module.exports = {
    async userAll(req, res) {
        try{

            user = await UserDB.findAll({attributes: {
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
    }


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