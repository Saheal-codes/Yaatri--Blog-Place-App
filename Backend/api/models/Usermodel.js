const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: "Choose your Username", unique: true },
  password: { type: String, required: "Password must be here" },
  name: {
    type: String,
    required: "Did not recieve a name, did you send it?!",
    index: true,
  },
  email: {
    type: String,
    required: "Don't you have an Email?!",
    unique: true,
  },
  picture: { type: String },
  followers: [{ type: Number, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
