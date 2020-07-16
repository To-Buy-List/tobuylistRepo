const mongoose = require("mongoose");
const ListOfItems = require("./List");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  wallet: { type: Number },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "ListOfItems" }],
});

module.exports = mongoose.model("User", UserSchema);
