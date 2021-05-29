const mongoose = require('mongoose');
const EMP = require('./employeeMOdel')

mongoose.connect("mongodb://localhost:27017/Empapp",{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log("database is connected")
}).catch(()=>{
    console.log("failed to make connection")
});