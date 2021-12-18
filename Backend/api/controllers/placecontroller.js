
const mongoose = require("mongoose")
const placemodel = require("../models/placemodels")
const fs = require("fs")

exports.deleteplace = async (req, res) => {
    try {
        let discardplace = await placemodel.findOneAndDelete({ _id: req.params.placeid })
        res.send({ message: "Place is in the void now...", discardplace })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "There was an error oopsie" })
    }
}

exports.Updateplace = async (req, res) => {
    try {
        let updateplace = await placemodel.findOneAndUpdate({ _id: req.body.place }, 
            { place_name: req.body.placename, 
            location_name: req.body.locationname, 
            place_picture: req.body.placepicture })
        res.send({ message: "Place is now updated...hehe", updateplace })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "There was an error oopsie" })
    }
}


exports.newplace = async (req, res) => {
    try {
       
        let place = await placemodel.create({...req.body, place_userid:res.locals.userid, 
            place_picture:req.files[0].filename})
        res.send({ message: "I've sent the create response!", place })
    }
    catch (err) {
        res.status(500).send({ message: "Something went error" })
        console.error(err)
    }
}

exports.getplaces=async (req,res)=>{
    try{
        let all_places = await placemodel.find({place_userid:res.locals.userid}).sort("-createdAt")
        res.send(all_places)

    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}