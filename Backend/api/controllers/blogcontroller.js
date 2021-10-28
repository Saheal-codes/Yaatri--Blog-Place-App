const mongoose=require ("mongoose")
const blogmodel = require("../models/blogmodel")

exports.read_all_blogs=async (req,res)=>{
    try{
        let all_blogs = await blogmodel.find()
        res.send(all_blogs)

    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}

exports.read_blog=async (req,res)=>{
    try{
        let read_blog = await blogmodel.findOne({_id:req.params.blog_id})
        res.send(read_blog)

    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}

exports.update_blog=async (req,res)=>{
    try{
        let read_blog = await blogmodel.findOneAndUpdate(
            {_id:req.params.blog_id},
            req.body ,
             {}
             )
        res.send(read_blog)

    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}

exports.delete_blog=async (req,res)=>{
    try{
        let read_blog = await blogmodel.findOneAndDelete(
            {_id:req.params.blog_id},
   
             )
        res.send(read_blog)

    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}

exports.create_blog=async (req,res)=>{
    console.log({369:req.body})
    try{
        let read_blog = await blogmodel.create(req.body)
        
        res.send(read_blog)

    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
}


// exports.read_blog=()=>{};
// exports.update_blog=()=>{};
// exports.delete_blog=()=>{};
// exports.create_blog=()=>{};

