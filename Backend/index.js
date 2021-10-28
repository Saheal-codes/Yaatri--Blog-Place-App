const express=require ("express")
const bodyparser=require ("body-parser")
const mongoose=require ("mongoose")
const morgan=require ("morgan")

const app=express();
const ejs=require ("ejs")
app.set("view engine","ejs")
//models
require ("./api/models/index.js")
//routes
const routes = require("./api/routes/index.js")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.get("/", (req,res)=>{
    res.send(__dirname+"/api/views/homepage/index.html")
})
app.use(routes)
app.use(morgan("tiny"))

app.listen(80,()=>{
    console.log("Server chal gaya!!")
})
mongoose
    .connect("mongodb://localhost:27017/nayadatabase")
    .then( ()=>{
        console.log("Nayadatabase naam ka Database connect hogya")})
    .catch( (err)=>{
        console.error("Bhai theek se kaam kar",err)})


