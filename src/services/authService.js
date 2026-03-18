const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    //1. check is there is a registered user with the given email
    const user = await findUser({ email });

    if(!user) {
        throw {message:'no user found with the givrn email',statusCode:404};
    }

    //2.if the user is found we need to compare plainIncomingPassword with hashed password
    const isPasswordValidated = await bcrypt.compare(plainPassword,user.password);

    if(!isPasswordValidated){
        throw{message:'Invalid password,please try again',statusCode:401};
    }
    
    const userRole = user.role ? user.role : 'USER';
    //3. if password is valided ,create a token and return it.
    const token = jwt.sign({email:user.email,id:user._id,role:user.role},JWT_SECRET,{expiresIn:JWT_EXPIRY});

    return token;
}

module.exports ={
    loginUser
}