const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Emp = mongoose.model('Employee')



router.get('/', (req, res) => {
    res.render('addOrEdit', {
        viewTitle: "Insert Employee"
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '')
    {
        insertRecord(req, res)
    } else{
        updateRecord(req, res)
    }

});

function updateRecord(req, res){
    Emp.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err) {res.redirect('employee/list')}
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("addOrEdit",{
                    viewTitle: "Update Employee",
                    employee:req.body
                })
            }
            else
                console.log('error during record Update', err)
        }
    })
}

// to insert form values into mongodb data base
function insertRecord(req, res) {
    var employee = new Emp();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list')
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            } else {
                console.log('error during record incertion', err)
            }
        }
    });
}
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



router.get('/list', (req, res) => {
    Emp.find((err,doc)=>{
        if(!err){
            res.render('list',{
                list : doc
            })
        }else{
            console.log("error in getting list",err)
        }
    })

});

router.get('/:id', (req, res) => {
    Emp.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});


router.get('/delete/:id',(req, res)=>{
    Emp.findByIdAndRemove(req.params.id,(err, doc)=>{
        if(!err){
            res.redirect('/employee/list')
        }
        else {
            console.log('error in deleting record',err)
        }
    })
})

module.exports = router