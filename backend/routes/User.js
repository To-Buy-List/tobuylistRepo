const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

//we'll sign the token and by signing it we'll be creating it
const signToken = (userID) => {
  return JWT.sign(
    {
      //who is signing this token
      iss: "Rand13",
      //user id
      sub: userID,
    },
    "Rand13"
  );
};

//signing up route
userRouter.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      //if there is an error while searching
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      //if the username is already exist
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    // or we'll create new user
    else {
      const newUser = new User({ username, email, password });
      newUser.save((err) => {
        if (err)
          //if there is an eroor while saving
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfuly created",
              msgError: false,
            },
          });
      });
    }
  });
});

//signing in route
userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    //isAuthenticated is going to be added by passport by default
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      //httpOnly and sameSite are used for security and to make sure your jwt token is not going to get stolen
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username } });
    }
  }
);

//signing out route
userRouter.get(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token"); //removing the token
    res.json({ user: { usename: "" }, success: true });
  }
);

//to keep on being logged in if the user is authenticated even if you close the browser
//to keep the server and client synchronized so when client close the browser you'll still be signed in
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = userRouter;
