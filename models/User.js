const mongoose = require("mongoose");
const ListOfItems = require("./List");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, min: 4, max: 15 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: String },
  //it'll contain an array of object id of the list items
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "ListOfItems" }],
});

//it will execute before it is save to the database
//we'll hash the password before saving it in the database
UserSchema.pre("save", function (next) {
  //we only need to hash it if it's plain text
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err.message);
    this.password = passwordHash;
    next();
  });
});

//to compare the plain text we recieve from client with our hashed password within our database
UserSchema.methods.comparePassword = function (password, callback) {
  //password >> the password from the client
  //this.password >> hashed password
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err.message);
    else {
      if (!isMatch) return callback(null, isMatch);
      return callback(null, this); //this>> is the user object
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
