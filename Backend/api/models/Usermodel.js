const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_username: { type: String, required: "Type your Username", unique: true },
  user_password: { type: String, required: "Password must be here" },
  user_name: { type: String, required: "Don't you have a name?!", index: true },
  user_email: {
    type: String,
    required: "Don't you have an Email?!",
    unique: true,
  },
  user_picture: { type: String, required: "Put a nice picture of yourself !" },
});

module.exports = mongoose.model("User", userSchema);
