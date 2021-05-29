const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require("../db/connecdb")
const port = process.env.PORT || 3421;
const Hotel = require('../models/hotel')
const Hotelrouter = require('./routers/hotelrots')

//middleware
app.use(express.json())
app.use(Hotelrouter)


app.listen(port, () => {
    console.log(`server is running at : http://localhost:${port}`)
})

