const router    = require('express').Router()
const users = require('../model/userm');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const isLogin = require('../middlewere/auth')



//signup  - get
router.get('/signup',(req, res) => {
    //redirecting to profile page when go to login page where already logedin
    if(req.cookies.auth){
        return res.redirect('/profile')
    }

    const data = {
        title : 'Signup page',
        name : '',
        email : '',
        error : ''
    }
    res.render('signup',data)
})



//signup - post
router.post('/signup',[check('name','please enter your name').notEmpty(),
                check('email','please enter your email').notEmpty(),
                check('password','please enter your password').notEmpty()],
async(req,res)=>{

     //1.checking errors
     const errors = validationResult(req);
     if(errors.errors.length){ 

        const data = {
            title : 'signup form',
            name : req.body.name,
            email : req.body.email,
            error : errors.errors[0].msg
        }
         
        return res.render('signup',data);
        }
 

    //2.checking email already exists or not exists
    const EmailExists = await users.findOne({email : req.body.email}).lean()
    if(EmailExists) {
        const data = {
            title : 'signup form',
            name : req.body.name,
            email : req.body.email,
            error : "email already exists"
        }
         
        return res.render('signup',data);
    }



    //3.bcrypt the password
    const hashedpassword = bcrypt.hashSync(req.body.password,8);
    req.body.password = hashedpassword


     //4.generating the token
     const token = jwt.sign({email:req.body.email},'secreatKey');
    //  const refreshToken = jwt.sign({email:req.body.email},'refreshTokenSecreatKey',{ expiresIn:"1d" })
 

    //5.data save to database 
    const user = new users({
        name : req.body.name, 
        email : req.body.email, 
        password : req.body.password,
        // refreshToken : refreshToken
     })
     await user.save()


   
    //6.sending responce
    res.cookie('auth',token)
    //    .cookie('refreshToken',refreshToken)
       .redirect('/profile')
})


//login- get
router.get('/', (req, res)=>{
    if(req.cookies.auth){
        return res.redirect('/profile')
    }
    const data = {
        title : "Login page",
        email  : '',
        error  : ''
    }
    res.render('login',data)
})


//login - post
router.post('/',
[check('email','please enter your email').notEmpty(),
check('password','please enter your password').notEmpty()],
async(req, res) => {

    //1.checking errors
    const errors = validationResult(req);
    if(errors.errors.length){
        const data = {
            title : "Login page",
            email  : req.body.email,
            error  : errors.errors[0].msg
        }
        return res.render('login',data)
    }

    //2.checking user exist or not
    const UserExist = await users.findOne({email : req.body.email}).lean();
    if(!UserExist ){
        const data = {
            title : "Login page",
            email  : req.body.email,
            error  : "Email or Password is incorrect"
        }
        return res.render('login',data)
    } 

    

    //3.compare password
    let PasswordExists = await bcrypt.compare(req.body.password,UserExist.password);
    if(!PasswordExists){
        const data = {
            title : "Login page",
            email  : req.body.email,
            error  : "Email or Password is incorrect"
        }
        return res.render('login',data)
    } 


    //4.generating token 
    const token = jwt.sign({email:req.body.email},'secreatKey');
    // const refreshToken = jwt.sign({email:req.body.email},'refreshTokenSecreatKey',{ expiresIn:"1d" })


    //5.send responce
    res.cookie('auth',token)
        // .cookie('refreshToken',refreshToken)
        // .redirect('/profile')
    
    res.redirect('/profile')

})



//logout -Get
router.get('/logout',(req, res) => {
    res.clearCookie('auth').redirect('/')
})


//profile routes
router.get('/profile',isLogin,async(req,res)=>{
    console.log(res.userEmail.email)  //it will coming from auth function
    let userData = await users.find().lean()
    console.log(userData)
    let data = {
        title : 'profile page',
        name  : userData.name,
        email : userData.email
    }

    console.log(data)
    res.render('profile',data)
})

router.get('/profile2',isLogin,(req,res)=>{
    res.send('profile2')
})

module.exports = router;