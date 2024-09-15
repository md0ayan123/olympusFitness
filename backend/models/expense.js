const mongoose = require('../config/dbConfig')
const userschema = new mongoose.Schema({
    month: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid month",
    },
    year: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid year",
    },
    trainerSalary: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    ElectricityBill: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    MiscellaneousExpense: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    OtherExpenses: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    TotalExpense: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    date: {
        type: Date
    },
})
const expensemodel = mongoose.model('expense', userschema);
module.exports = expensemodel;
