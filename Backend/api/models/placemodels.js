const mongoose= require("mongoose")
const Schema = mongoose.Schema

const placeSchema = new Schema({
    // user_id:{type:mongoose.Types.ObjectId},
    place_userid:{type:mongoose.Schema.Types.ObjectId, required:true},
    place_name:{type:String, required:"Type the name of the Place", unique:true, index:true},
    location_name:{type:String, required:"Add the location of your place here"},
    location_address:{type:String, required:"Add the Address of your place here"},
    place_picture:{type:String, required:"Don't you have a picture of your place?!"}
    
},{timestamps:true}
)
  placeSchema.index("place_name")
module.exports = mongoose.model("User Places",placeSchema)

