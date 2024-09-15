const expenseModel = require('../models/expense')
module.exports = ({
    createExpense: (req) => {
    return new expenseModel({ 
        month:req.month,
        year:req.year,
        trainerSalary:req.trainerSalary,
        ElectricityBill:req.ElectricityBill,
        MiscellaneousExpense:req.MiscellaneousExpense,
        OtherExpenses:req.OtherExpenses,
        TotalExpense:req.TotalExpense,
        paymentMode:req.paymentMode,
        date:new Date(),
        }).save()
},
getAllExpense: (req, res) => {
    return expenseModel.find({}).select({password:0}).exec()
}, 
getExpenseById:async(req) => {
   return await expenseModel.findOne({_id:req.id}).select({password:0}).exec();
},
updateExpense:async(req) => {
    console.log(req)
    return await expenseModel.updateOne({_id:req._id},{$set:req}).exec()
 },
 deleteExpense:async(req) => {
    return await expenseModel.deleteOne({_id:req.id}).exec()
 }
})