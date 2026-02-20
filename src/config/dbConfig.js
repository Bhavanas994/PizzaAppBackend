const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

//The below function helps us to connect to the mongodb server using the moongoose 
// library and the DB_URL that we have in our .env file and exported in the serverConfig.js file 
async function connectDB() {
     try{
       await mongoose.connect(serverConfig.DB_URL);
       console.log("successfully connected to the mongodb server...!!");
     }
     catch(error){
        console.log("Not able to connect to the mongodb server..");
        console.log(error);

     }
}

module.exports = connectDB;