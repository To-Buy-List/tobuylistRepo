const express = require("express");
const app = express();

//to set an env on your local mashine run export PORT=5000
const port = process.env.PORT || 5100;

const mongoose = require("mongoose");

//Mongodb atlas cluster URI
const mongoURI =
  "mongodb+srv://rand:rand123@to-buy-list.usr90.mongodb.net/To-Buy-List?retryWrites=true&w=majority";

//Establishing database connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connection to database established"))
  .catch((err) => console.log(`db error ${err.message}`));

//Server running event listener
app.listen(port, () => console.log(`Listening on port ${port}...`));
