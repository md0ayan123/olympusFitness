const { mongo } = require('mongoose');
const mongoose = require('../config/dbConfig')

const paymentRecivedAtType=new mongoose.Schema({
    date:String,
    amount:Number
})

const userschema = new mongoose.Schema({
    memberId: {
        type: String,
        // pattern: "@mongodb\.com$",
        unique:true,
        required: true,
        description: "Must be a valid id",
    },
    name: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid year",
    },
    phone: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    address: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    membershipType: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    startDate: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    endDate: {
        type: String,
        // pattern: "@mongodb\.com$",
        required: true,
        description: "Must be a valid number",
    },
    packageValue:{
        type:Number,
        required:true,
    },
    paymentMode:{
        type:String,
        required:true,
    },
    paymentRecivedAt:[paymentRecivedAtType]
},{timestamps:true})
const expensemodel = mongoose.model('members', userschema);
module.exports = expensemodel;
