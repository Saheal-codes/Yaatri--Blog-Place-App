const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
//models
app.use("/public", express.static(__dirname + "/api/uploads/"));
require("./api/models/index.js");
//routes

app.use(cors());
const routes = require("./api/routes/index.js");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded()); //parsing form data
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).send("Not Found ?!");
});
app.use(morgan("tiny"));

app.listen(80, () => {
  console.log("Server Is Running!!");
});
mongoose
  .connect("mongodb://127.0.0.1:27017/newdatabase")
  .then(() => {
    console.log('A database with the name "newdatabase" has been connected !');
  })
  .catch((err) => {
    console.error("Some error occurred", err);
  });
