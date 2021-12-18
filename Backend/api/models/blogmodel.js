const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    // user_id:{type:mongoose.Types.ObjectId},
    blog_title: {
        type: String,
        required: "Title is Required"
    },
    blog_description: {
        type: String,
        required: "Title is Required"
    },
})

module.exports = mongoose.model("Blog", blogSchema)

