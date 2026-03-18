const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'first name is required'],
        minlength:[5,'first name must be atleast 5 character long'],
        lowercase:true,
        trim:true, // if the user gives extra spaces then it will automatically remove it
        maxLength:[20,'first name should be less than or equal to 20 characters']
    },

    lastName:{
        type:String,
        required:[true,'last name is required'],
        minlength:[5,'last name must be atleast 5 character long'],
        lowercase:true,
        trim:true, // if the user gives extra spaces then it will automatically remove it
        maxLength:[20,'last name should be less than or equal to 20 characters']
    },

    mobileNumber:{
        type:String,
        trim:true,
        maxLength:[10,'phone number should be lenght 10'],
        minlength:[10,'phone number should be lenght 10'],
        unique:[true,'Phone number is already in use'],
        required:[true,'Phone number should be provided']
    },

    email:{
        type:String,
        trim:true,
        required:[true,'Email should be provided'],
        unique:[true,'Email is already in use'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type:String,
        required:[true,'password should be provided'],
        minlength:[6,'password should be minimum 6 character long']
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{
    timestamps:true
});

userSchema.pre('save',async function (){
    //here you can modify your user before saved in moongoose
    // console.log("Executing pre saved hook");
    // console.log(this);
    const hashedPassword= await bcrypt.hash(this.password,10);
    // console.log(hashedPassword);
    this.password = hashedPassword;
    // console.log(this);
   
    console.log(this);
    console.log("Exiting pre saved hook and now creating user ");


})

const User = mongoose.model('User',userSchema);
module.exports = User;