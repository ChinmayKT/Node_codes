const db = require('./models/db');
const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const app = express();
const employeeController = require('./controllers/employeeController')
const Port = 8087;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/employee',employeeController)


app.set('view engine','hbs')


app.listen(Port,()=>{
    console.log(`server is runnning at http://localhost:${Port}`)
})