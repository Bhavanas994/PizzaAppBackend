const express = require('express');
//const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const authRouter = require('./routes/authRouter');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/mulltermiddleware,js');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRouter');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//routing middlewear
//if your user route starts with /users then handle it using userRouter
app.use('/users',userRouter); // this line connects the router to the server
app.use('/carts',cartRouter);
app.use('/auth',authRouter);
app.use('/products',productRouter);


app.get('/ping', isLoggedIn , (req,res) =>{   
    //controller 
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message:"pong"});
})

app.post('/photo', uploader.single('incomingFile'), async (req,res)=>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary",result);
    await fs.unlink(req.file.path);
    return res.json({message:"ok"})
})

app.listen(ServerConfig.PORT, async ()=>{
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}`);

    // const newUser = await User.create({
    //     email:'a@b.com',
    //     password:'123456',
    //     firstName:'Johna',
    //     lastName:'Doeth',
    //     mobileNumber:'1234123412'
    // })

    // console.log("created new user");
    // console.log(newUser);
    
})

// localhost:5500/users - POST
// localhost:5500/carts/41654465 - GET