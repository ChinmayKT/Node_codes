const express = require('express');
const app = express();
const DB  = require('./config/DB');

//setup for bodyparser
app.use(express.json());

// importing routes
let routes = require('./routes/movie');

//using routes
app.use('/', routes)


//setup for port
app.listen(5000,()=>{
    console.log('listening on port 5000')
})


