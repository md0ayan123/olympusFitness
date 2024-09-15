const userModel = require('../models/user')
// const orderModel = require('../model/orderModel')
// const productModel = require('../model/productModal')
// const rawMetrailModel = require('../model/rawMetrialModel')
module.exports = ({
    createUser: (req) => {
    return new userModel({ 
        phoneNo:req.phoneNo,
        password:req.password,
        username:req.username,
        role:req.role,
        date:new Date(),
        }).save()
},
loginUser: async (req) => {
  return await userModel.findOne({phoneNo:req.phoneNo}).exec()
},
getAllUser: (req, res) => {
    return userModel.find({}).select({password:0}).exec()
},
// getUserDashboard:async(req, res) => {
//     let orderCount = await orderModel.find().countDocuments().exec()
//     let rawMetrailCount = await rawMetrailModel.find().countDocuments().exec()
//     let productCount = await productModel.find().countDocuments().exec()
//     let OrderProcessing = await orderModel.find({status:"Processing"}).exec()
//     let result={productCount,rawMetrailCount,orderCount,OrderProcessing}
//     return result
// }, 
getUserById:async(req) => {
   return await userModel.findOne({_id:req.id}).select({password:0}).exec();
},
updateUser:async(req) => {
    console.log(req)
    return await userModel.updateOne({_id:req._id},{$set:req}).exec()
 },
 deleteUser:async(req) => {
    return await userModel.deleteOne({_id:req.id}).exec()
 }

})