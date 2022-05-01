const Usermodel = require("../models/Usermodel");
const jwt = require("jsonwebtoken");

exports.verifysess = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({ message: "There is no token" });
  }
  try {
    var decoded;
    try {
      decoded = jwt.verify(token, process.env.jwtpass);
    } catch (err) {
      return res.status(401).send({ message: "Token is not valid" });
    }
    var userdoc = await Usermodel.findOne({ _id: decoded._id });
    if (userdoc) {
      res.locals.userid = userdoc._id;
      res.users = userdoc;
      next();
    } else {
      res.status(401).send({ message: "This token nit validd" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
