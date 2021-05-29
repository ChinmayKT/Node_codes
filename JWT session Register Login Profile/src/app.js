const express = require('express');
const mongoose = require('mongoose');
const app = express();
const DB  = require('./config/DB');
const cookie = require('cookie-parser');
const path = require('path');

//setup for bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

//setup for cookie
app.use(cookie())

//setup for template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

// importing routes
let routes = require('./routes/register');

//using routes
app.use('/', routes)


//setup for port
app.listen(7777,()=>{
    console.log('listening on port 7777')
})


