const express = require('express');
const router = new express.Router();
const Hotel = require('../../models/hotel');

// 
router.get('/', (req, res) => {
    res.send('<h1>Welcome to My Hotels</h1>');
});


// normally  create Hotel  
// app.post("/addHotels",(req,res)=>{
//     const hotel = new Hotel(req.body)// req.body means req the data in body
//     hotel.save().then(() => {
//         res.status(201).send(hotel)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
//     console.log(hotel)
// });

// using async await create hotels
router.post("/addhotels", async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        const createhotel = await hotel.save()
        res.status(201).send(createhotel)
    } catch (error) {
        res.status(400).send(e)
    }
})

// get hotels by ID using async await 
router.get('/Hotels/:id', async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).send('The hotel with given id is not found');
    res.send(hotel);
});


// //  normally getting list of hotels
// app.get('/Hotels', (req, res) => {
//     Hotel.find({}, (err, hotel) => {
//         if (err) throw err;
//         res.status(200).send(hotel)
//     })
// });

// getting hotels using async await
router.get('/hotels', async (req, res) => {
    try {
        const allhotel = await Hotel.find();
        res.status(200).send(allhotel)
    } catch (e) {
        res.send(error)
    }
})

// delete the hotel  by ID using async await
router.delete('/Hotels/:id', async (req, res)=>{
    try {
        const delhotel = await Hotel.findByIdAndDelete(req.params.id);
        if(!req.params.id) return res.status(404).send('The hotel with given id is not found')
        res.send(delhotel)
        console.log(delhotel)

    } catch (e) {
        res.send(e)
    }
});

// update the  hotel  by ID using async await

router.patch('/Hotels/:id', async (req, res)=>{
    try {
        const uphotel = await Hotel.findByIdAndUpdate(req.params.id, req.body,{ new : true});
        if(!req.params.id) return res.status(404).send('The hotel with given id is not found')
        res.send(uphotel)
    } catch (e) {
        res.send(e)
    }
});




module.exports = router;