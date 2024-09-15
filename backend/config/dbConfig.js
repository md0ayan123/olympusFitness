// module.exports = {
//     HOST: "localhost",
//     USER: "yourusername",
//     PASSWORD: "yourpassword",
//     DB: "yourdatabase"
// };

const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
mongoose.Promise = global.Promise;
const promise=mongoose.connect("mongodb+srv://azharhussain:KeQiTStFn1Mcp44Y@cluster0.jsczuuo.mongodb.net/")
promise.then(function(db) {
    console.log("Connected to database!!!");
}, function(err){
    console.log("Error in connecting database " + err);
});

module.exports=mongoose