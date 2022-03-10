
const jwt = require("jsonwebtoken");
const {SECRET} = require("../config/index");
const mongoose = require('mongoose');
const User = mongoose.model("User")



module.exports = async(req,res,next)=>{
    // try {

    //   const {auth} = req.headers;
      
    //   if(!auth){
    //       return res.status(401).json({msg:"You Must Sign In"})
    //   }
    //   const token = auth.replace("Bearer " ,"");
 
    //   const verified = jwt.verify(token,SECRET);

    //   const user = await User.findById(verified.id);

    //   req.user = user
    //   console.log("after login",req.user)
    //   next()
        
    // } catch (error) {
        
    //     return res.status(422).json({msg:error})
    // }


    try {
        const token = req.header("auth");
    
        if (!token) {
          return res
            .status(401)
            .json({ msg: "No authentication token, authorization denied" });
        }
        // const JWT_SECRET = "youronwerisarman";
        const verified = jwt.verify(token, SECRET);
    
        if (!verified) {
          return res
            .status(401)
            .json({ msg: "token verification failed,authorization denied" });
        }
    
        req.user = verified.id;
        next();
      } catch (err) {
          res.status(422).json({msg:err})
      }

}