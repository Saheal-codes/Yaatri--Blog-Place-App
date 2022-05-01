const Usermodel = require("../models/Usermodel.js");
const jwt = require("jsonwebtoken");
const placemodel = require("../models/placemodels");
const crypto = require("crypto-js");

exports.verifysession = async (req, res, next) => {
  res.send({ message: "You are logged in !", userdoc: res.users });
};
exports.login = async (req, res) => {
  try {
    const user_doc = await Usermodel.findOne({
      user_email: req.body.user_email,
    }).lean();
    if (user_doc == null) {
      res.send({ message: "There is No ID with this name !" });
    } else {
      const decrypted = CryptoJS.AES.decrypt(
        user_doc.user_password,
        process.env.hpass
      ).toString(CryptoJS.enc.Utf8);
      if (decrypted === req.body.user_password) {
        const { password, ...others } = user_doc._doc;
        const accesstoken = jwt.sign(others, process.env.jwtpass, {
          expiresIn: "6h",
        });
        res.send({
          message: "User logged in Successfully !",
          message: accesstoken,
          others,
        });
      } else {
        res.send({ message: "Wrong Credentials !" });
      }
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
// logout
exports.register = async (req, res) => {
  try {
    const Userdoc = await Usermodel.create({
      user_username: req.body.user_username,
      user_password: req.body.user_password,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_picture: req.files[0].filename,
    });
    res.send({
      data: Userdoc,
      message: "Yay ! Your Account has been created !",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.fetchuser = async (req, res) => {
  try {
    const Userdoc = await Usermodel.find();
    res.send(Userdoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
exports.fetchuserdata = async (req, res) => {
  try {
    let Userdata = await Usermodel.findOne({ user_username: req.params.data });
    let Userplacedata = await placemodel.find({ place_userid: Userdata._id });
    res.send({ Userdata, Userplacedata });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
exports.logout = async (req, res) => {
  try {
    document.localStorage.removeItem("token");
    res.send({ message: "You are logged out !" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
