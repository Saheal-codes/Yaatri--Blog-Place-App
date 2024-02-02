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
      res.status(400).send({ message: "There is No ID with this name !" });
    } else {
      const decrypted = crypto.AES.decrypt(
        user_doc.user_password,
        process.env.hpass
      ).toString(crypto.enc.Utf8);
      if (decrypted === req.body.user_password) {
        delete user_doc.user_password;
        const accesstoken = jwt.sign(user_doc, process.env.jwtpass, {
          expiresIn: "6h",
        });
        res.send({
          message: "User logged in Successfully !",
          data: accesstoken,
          user_doc,
        });
      } else {
        res.status(401).send({ message: "Wrong Credentials !" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
// logout
exports.register = async (req, res) => {
  try {
    const Userdoc = await Usermodel.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.user_password, 10),
      name: req.body.fullName,
      email: req.body.user_email,
      picture: req.files[0].filename,
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
    let Userdata = await Usermodel.findOne({ _id: req.params.data });
    if (!Userdata) {
      res.status(404).send({ message: "User not found" });
      return;
    }
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
