const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListOfItemsSchema = new Schema({
  item: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  img: { type: String, required: false },
});

module.exports = mongoose.model("ListOfItems", ListOfItemsSchema);
