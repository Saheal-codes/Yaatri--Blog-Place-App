
const Usermodel=require("../models/Usermodel")
const jwt=require("jsonwebtoken")


exports.verifysess = async (req, res, next) => {
    const token = req.body.token
    if (!token){
        return res.status(401).send({message:"There is no token"})
    }
    try {
        var decoded = jwt.verify(token, 'secretkey');
        var userdoc = await Usermodel.findOne({ _id: decoded._id })
        if (userdoc ) {
            res.locals.userid=userdoc._id
            next();
        }
        else {
            res.status(401).send({ message: "This token nit valididd" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}