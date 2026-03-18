const {registerUser} = require("../services/userService");


async function createUser(req,res) {
    // console.log("Create User Controller called");
    // console.log(req.body);
    //TODO: register the user

    // const userService = new UserService(new UserRepository());
  
    try{
        const response = await registerUser(req.body);

    return res.status(201).json({
        message:'Sucessfull registered the user',
        success:true,
        data:response,
        error: {}
    })
    }
    catch(error){
        return res.status(error.statusCodes).json({
            sucess:false,
            message:error.reason,
            data:{},
            error:error
        })
    }
    
}

module.exports ={
     createUser 
};