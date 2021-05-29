const mongoose = require('mongoose')

let movieSchema =  mongoose.Schema({
    title : {type:String, required:true},
    director : {type:String, required:true},
    rating : {type:Number,required: true},
    year : {type:Number,required:true},
    // refreshToken : {type:String,required:true}
})


module.exports = mongoose.model('movies',movieSchema);