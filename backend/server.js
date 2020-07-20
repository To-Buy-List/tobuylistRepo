const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//to set an env on your local mashine run export PORT=
const port = process.env.PORT || 5100;

app.use(cookieParser());
//the body-parser is within express
//the client will be sending json to be able to parse that
app.use(express.json());

//to connect the database
const mongoose = require("mongoose");

//Mongodb atlas cluster URI
const mongoURI =
  "mongodb+srv://rand:rand123@to-buy-list.usr90.mongodb.net/To-Buy-List?retryWrites=true&w=majority";

//Establishing database connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connection to database established"))
  .catch((err) => console.log(`db error ${err.message}`));

//User Router
const userRouter = require("./routes/User");
app.use("/user", userRouter);

//Server running event listener
app.listen(port, () => console.log(`Listening on port ${port}...`));
