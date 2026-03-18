// class UserService {

const { findUser, createUser } = require("../repositories/userRepository");
const { createCart } = require('../repositories/cartRepository');

    // constructor(_userRepository){
    //     // in the argument we will expect a user repository object

    //     this.userRepository = _userRepository;

    // }
    async function registerUser(userDetails) {
        
        //it will create a brand new user in the database

        //1. we need to check if the user with this email and mobile number already exists or not

        const user = await findUser({
            email:userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        if(user){
            //we found a user
            throw{reason :'User with the given email and mobile number already exists',statusCodes: 400}
        }

        //2. If not then create the user in the data base 

         const newUser = await createUser({
            email:userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
         });

         if(!newUser){
            throw{reason :'Something went wrong cannot create user',statusCodes: 500}
         }

         await createCart(newUser._id);
        //3. return the details of created user
        return newUser;
    }
// }

module.exports = {
    registerUser
};