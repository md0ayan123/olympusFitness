const memberModel = require('../models/member')
module.exports = ({
    createMember: (req) => {
    return new memberModel({ 
        memberId:req.memberId,
        name:req.name,
        phone:req.phone,
        address:req.address,
        membershipType:req.membershipType,
        startDate:req.startDate,
        endDate:req.endDate,
        packageValue:req.packageValue,
        paymentRecivedAt:req.paymentRecivedAt,
        }).save()
},
getAllMember: (req, res) => {
    return memberModel.find({}).select({password:0}).exec()
}, 
getMemberById:async(req) => {
   return await memberModel.findOne({_id:req.id}).select({password:0}).exec();
},
updateMember:async(req) => {
    console.log(req)
    return await memberModel.updateOne({_id:req._id},{$set:req}).exec()
 },
 deleteMember:async(req) => {
    return await memberModel.deleteOne({_id:req.id}).exec()
 }
})