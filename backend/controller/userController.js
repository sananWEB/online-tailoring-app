const mongoose = require("mongoose");
const User = mongoose.model('User');
const {SECRET} = require("../config/index");
const Measurement = mongoose.model('Measurement')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// @disc   Get all Users
// @Route  Post /users/singup
// @acess  Public

exports.UserSingup = async (req, res) => {
  try {
    // check for all field not empty
    let {
      firstName,
      lastName,
      email,
      password,
      confirmedPassword,
      phoneNumber,
      gender,
      address,
      country,
      state,
      city,
      zipCode,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmedPassword ||
      !phoneNumber ||
      !gender ||
      !address ||
      !country ||
      !state ||
      !city
    ) {
      return res.status(400).json({ msg: "Please Fill Out All The Field" });
    }
   

    // check for password validation
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "password should be 5 character or more" });
    }

    if (password != confirmedPassword) {
      return res.status(400).json({ msg: "password does not matched" });
    }

    // check for user exit  with the email and phone number
    const existingUser = await User.findOne({
      email: email,
      //   phoneNumber: phoneNumber,
    });

    if (existingUser) {
      return res.status(400).json({ msg: "already have and account" });
    }

    // password security
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // validate phone Number

    //store user

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phoneNumber,
      gender,
      address,
      country,
      state,
      city,
      zipCode,
    });

    const savedUser = await newUser.save();
   

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @disc   Login form
// @Route  Post /users/login
// @acess  Public

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "Please Fill All The Feild" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "No Account With This Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({id: user._id }, SECRET);
  
      res.json({
        token,
        user,
      });
    } else {
      res.status(400).json({ msg: "Invalid Crediential" });
    }
    // when user sign in we create a token for user
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// User submit measurement
// @disc   post request
// @Route  post /users/mymesurement
// @acess  Users

exports.userMeasurement = async (req, res) => {


  try {
    let {
      fullLength,
      shoulder,
      Chest,
      SleeveLength,
      WaistLength,
      Neck,
      Comment,
    } = req.body;

    if (
      !fullLength ||
      !shoulder ||
      !Chest ||
      !SleeveLength ||
      !WaistLength ||
      !Neck ||
      !Comment
    ) {
      return res.status(400).json({ msg: "Please Fill Out All The Field" });
    }

    const Measurements = new Measurement({
      fullLength,
      shoulder,
      Chest,
      SleeveLength,
      WaistLength,
      Neck,
      Comment,
      MeasurementBy:req.user,
    });

    const saveMeasurement = await Measurements.save();
    res.json({saveMeasurement});
  } catch (err) {
    return res.status(400).json({ msg: err });
   
  }
};

// User get measurement
// @disc   get request
// @Route  get /users/mymesurement
// @acess  Users

exports.getMeasurement = async (req,res) =>{
  

    try {
     const measurements = await Measurement.find({MeasurementBy:req.user}).populate('MeasurementBy', '_id name')
     console.log(req.user)
     res.json({measurements})                     
        
    } catch (error) {
        return res.status(400).json({msg:'Fail loading post'})
    }
 
 
}

