const Usermodel = require("../models/Usermodel.js")
const jwt = require("jsonwebtoken")
const placemodel = require("../models/placemodels")

exports.verifysess = async (req, res, next) => {
    const token = req.body.token
    if (!token) {
        return res.status(401).send({ message: "There is no token" })
    }
    try {
        var decoded = jwt.verify(token, 'secretkey');
        var userdoc = await Usermodel.findOne({ _id: decoded._id })
        userdoc
            ? res.send({ message: "You are logged in !", userdoc })
            : res.status(401).send({ message: "This token nit valididd" })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.login = async (req, res) => {
    try {
        const user_doc = await Usermodel.findOne({ user_email: req.body.user_email }).lean()
        if (user_doc != null) {
            if (user_doc.user_password === req.body.user_password) {
                const token = jwt.sign(user_doc, "secretkey")
                res.send({ message: "Login Successful !", token: token, data: user_doc })
            }
            else {
                res.send({ message: "Login Id and Password is not correct !" })
            }
        }
        else {
            res.send({ message: "There is No ID with this name !" })
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
// logout

exports.register = async (req, res) => {
    try {
        const Userdoc = await Usermodel.create({
            user_username: req.body.user_username,
            user_password: req.body.user_password,
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_picture: req.files[0].filename
        })
        res.send({ data: Userdoc, message: "Yay ! Your Account has been created !" })


    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

}

exports.fetchuser = async(req,res)=>{
        try {
            const Userdoc = await Usermodel.find()
            res.send(Userdoc)
        }
        catch(err){
            console.error(err)
            res.status(500).send(err)
        }
}
exports.fetchuserdata = async(req,res)=>{
    try {
        let Userdata = await Usermodel.findOne({user_username:req.params.data})
        let Userplacedata = await placemodel.find({place_userid:Userdata._id})
        res.send({Userdata, Userplacedata})
    }
    catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}