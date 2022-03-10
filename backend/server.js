
const express = require ("express");
const mongoose = require ("mongoose");
// const session = require('express-session')
// const MongoStore = require('connect-mongo')
const cors = require("cors");
const dotenv = require("dotenv");

// const tailorRoute = require('./routes/tailorRoutes')
// const adminRoute = require("./routes/adminRoute")

dotenv.config();

// set up server
const app = express();
app.use(express.json());
app.use(cors());

const { DB, PORT } = require("./config/index");

app.listen(PORT,()=>{console.log("Server Started at http://localhost:4000")});

// set up mongoose

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}
);
mongoose.connection.on("connected",()=>{console.log("connected to mongodb")});

mongoose.connection.on("error",(err)=>{console.log("error connecting ",err)});



 
// Model accessbility
require('./userModel/userModel');
require('./userModel/measurement');

 // set up routes
const userRoute = require('./route/userRoute')
app.use('/users',userRoute);
// app.use('/tailors',tailorRoute);
// app.use('/admin',adminRoute);



 
module.exports = app