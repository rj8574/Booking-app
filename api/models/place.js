import mongoose from 'mongoose'

const PlaceSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,
    refs:'User'
    },
    title:String,
     address:String,
     photos:[String],
     description :String,
     perks:[String],
     extraInfo:String,
     checkIn:Number,
     checkOUT:Number,
     maxGuest:Number,
})
const placeModel=mongoose.model('Place',PlaceSchema)
module.exports=placeModel;