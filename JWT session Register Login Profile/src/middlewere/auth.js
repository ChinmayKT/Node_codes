const jwt = require('jsonwebtoken')

//checking is logedin or not
 const isLogin = (req,res,next) => {

    // console.log(req,res)
     
    let authToken = req.cookies.auth;
   
    if(!authToken ){
        return res.redirect('/')
    }

    //verifying the token if token exist
    try {
        let payload = jwt.verify(authToken,"secreatKey",(err,email)=>{
            if(err){
                console.log("Invalid Token")
                return res.clearCookie('auth').redirect('/')   
            }
            res.userEmail = email
            next()   
        });
    }catch(e){
        console.log(e)
    }
 }


module.exports = isLogin;
