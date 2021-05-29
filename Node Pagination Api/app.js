const express = require('express');
const app = express();
const port = 4001;

const mongoose = require('mongoose');
const User = require('./users');

mongoose.connect('mongodb://localhost/pagination',{ useUnifiedTopology: true },{ useNewUrlParser: true } )

const db =mongoose.connection

db.once('open', async ()=>{
    if(await User.countDocuments().exec() > 0) return 

    Promise.all([
        User.create({name : 'User 1'}),
        User.create({name : 'User 2'}),
        User.create({name : 'User 3'}),
        User.create({name : 'User 4'}),
        User.create({name : 'User 5'}),
        User.create({name : 'User 6'}),
        User.create({name : 'User 7'}),
        User.create({name : 'User 8'}),
        User.create({name : 'User 9'}),
        User.create({name : 'User 10'}),
        User.create({name : 'User 11'}),
        User.create({name : 'User 12'}),
        User.create({name : 'User 13'}),
        User.create({name : 'User 14'}),
        User.create({name : 'User 15'}),
        User.create({name : 'User 16'}),
        User.create({name : 'User 17'}),
        User.create({name : 'User 18'}),
        User.create({name : 'User 19'}),
        User.create({name : 'User 20'}),


    ]).then(()=>{
        console.log('users added')
    })
} )

app.get('/users',paginatedResults(User), (req,res)=>{
   
    res.json(res.paginatedResults)
})

function paginatedResults(model) {
    return async (req,res,next) =>{
        const page = parseInt(req.query.page) 
        const limit = parseInt(req.query.limit)

        const startindex = (page-1) * limit;
        const endindex = page * limit
    
        const result ={}
    
    
        if(startindex > 0){
            result.previous = {
                page : page -1,
                limit : limit
            }
    
        }
    
        if(endindex < await model.countDocuments().exec()){
            
        result.next = {
            page: page+1,
            limit : limit
        }
        }
      
        result.current = {
            page: page,
            limit : limit
        }
        
        try{
            result.result = await model.find().limit(limit).skip(startindex).exec()
            res.paginatedResults = result
             next()
        }catch  (e)  {
            res.status(500).json({message : e.message})
        }
        

        
    }

}

app.listen(port , (req,res)=>{
    console.log('Server is running at ', port);
})