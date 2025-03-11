const memberModel = require('../models/member');

module.exports = ({
    createMember: (param) => {
    return new memberModel(param).save()
},
getAllMember: (req, res) => {
    return memberModel.find({}).select({password:0}).exec()
}, 
getMemberById:async(req) => {
   return await memberModel.findOne({_id:req.id}).select({password:0}).exec();
},
updateMember:async(req) => {
    return await memberModel.updateOne({_id:req._id},{$set:{"subscriptionData.2":req.subscriptionData}}).exec()
 },
 deleteMember:async(req) => {
    return await memberModel.deleteOne({_id:req.id}).exec()
 }
})