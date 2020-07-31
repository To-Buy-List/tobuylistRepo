const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const List = require("../models/List");
const atob = require("atob");

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

/********************************************************************************* 
List Routers 
*********************************************************************************/

// Saving in the List route
//passport.authenticated because you have to be logged in in order to create an item
userRouter.post(
  "/item",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //from the client
    const list = new List(req.body);
    list.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error in the database", msgError: true },
        });
      else {
        //adding the item within our items array in user schema
        req.user.list.push(list);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "Error saving in the database",
                msgError: true,
              },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully saved the item",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

//Getting all the items from the database route
userRouter.get(
  "/items",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("items")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occured",
              msgError: true,
            },
          });
        else {
          List.find()
            .where("_id")
            .in(document.list)
            .exec((err, records) => {
              res.status(200).json({ items: records, authenticate: true });
            });
        }
      });
  }
);

//deleting an item from the list
userRouter.post(
  "/deleteItem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    List.deleteOne({ _id: req.body.id }, function (err) {
      if (!err) {
        res.status(200).json({
          message: {
            msgBody: "Successfully Deleted the item",
            msgError: false,
          },
        });
      } else {
        res.status(500).json({
          message: {
            msgBody: "Error deleting the item",
            msgError: true,
          },
        });
      }
    });
  }
);

//change the bought state to true
userRouter.post(
  "/listBought",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, bought } = req.body;
    List.findOneAndUpdate(
      { _id },
      { $set: { bought: true } },
      { new: true },
      (err, item) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error in the database", msgError: true },
          });
        else {
          res.status(200).json({
            message: {
              msgBody: "Successfully bought Item",
              msgError: false,
            },
          });
        }
      }
    );
  }
);

/********************************************************************************* 
Wallet Routers 
*********************************************************************************/

//saving the amount of money user have
userRouter.post(
  "/wallet",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, wallet } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error in the database", msgError: true },
        });
      else {
        req.user.wallet = wallet;
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "Error saving in the database",
                msgError: true,
              },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully saved the Money in Wallet",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

//Getting money from in wallet from the database route
userRouter.get(
  "/walletMoney",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ _id: req.user._id }, (err, user) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Error has occured",
            msgError: true,
          },
        });
      else {
        res.status(200).json(user[0]);
      }
    });
  }
);

module.exports = userRouter;
