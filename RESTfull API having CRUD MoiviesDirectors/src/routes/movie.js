const router    = require('express').Router()
const movies = require('../model/movie');




router.get('/movies',async(req, res) => {
    
    let movies_list = await movies.find({}).lean()
    
    res.json({movies:movies_list})
})



//signup - post
router.post('/movies',async(req,res)=>{

    //5.data save to database 
    const movie = new movies({
        title : req.body.title, 
        director : req.body.director, 
        rating : req.body.rating,
        year : req.body.year,
     })
     await movie.save()

     res.send("Added movie sucessfully")

})


router.post('/director',async(req,res)=>{

    let director_name = req.body.director

    let result = await movies.find({director:director_name}).lean()

    result.map(e=>console.log(e.title))

     res.json({movie:result.map(e=>e.title)})

})



module.exports = router;