const mongoose = require('mongoose');

let db = mongoose.connect("mongodb://localhost:27017/JWT",{useNewUrlParser:true , useUnifiedTopology:true},()=>{
    console.log("DB connected sucessfully")
})

module.exports = db;