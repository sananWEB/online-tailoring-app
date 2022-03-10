const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types


const measurement = new mongoose.Schema({
 
    fullLength: {type:String,required:true},
    shoulder:{type:String,required:true},
    Chest:{type:String,required:true},
    SleeveLength:{type:String,required:true},
    WaistLength:{type:String,required:true},
    Neck:{type:String,required:true},
    Comment:{type:String,required:true},
    MeasurementBy:{
        type:ObjectId,
        ref:"User"
    },
    
    
  
  

},{timestamps:true})


mongoose.model('Measurement',measurement);