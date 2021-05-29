const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/Hotel_db",{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log("databse is connected")
}).catch(()=>{
    console.log("failed to make connection")
});


