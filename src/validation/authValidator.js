const jwt = require('jsonwebtoken');
const { JWT_SECRET} = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unAuthorisedError');
async function isLoggedIn(req,res,next) {
    const token = req.cookies["authToken"];
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            message: "No Auth token provided",
            error:"Not Authenticated"
        });
    }
    try{
         const decoded = jwt.verify(token,JWT_SECRET);

         if(!decoded){
            throw new UnAuthorisedError();
         }
         
          //If reached here , then user is authenticated allow them to access the API

    req.user = {
        email: decoded.email,
        id: decoded.id,
        role: decoded.role
    }

    next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            data: {},
            message: "Invalid  token provided",
            error:error

        });
        
    }



   
    
}
//This function checks if the athenticated user is admin or not
// Because we will call isAdmin after isLoggedIn , thats why we will recive user details
 function isAdmin(req,res,next){
    const loggedInUser = req.user;
    if(loggedInUser.role === 'ADMIN'){
        next();
    }
    else{
        return res.status(401).json({
             success: false,
             data: {},
             message:"Your are not athorized for this action",
             error:{
                statusCode: 401,
                message:"Unauthorised user for this action"
             }
        })
    }

}
module.exports = {
    isLoggedIn,
    isAdmin
}

//clinet -> middleware -> controller -> 