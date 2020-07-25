const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListOfItemsSchema = new Schema({
  item: { type: String, required: true },
  price: { type: Number, required: false },
});

module.exports = mongoose.model("ListOfItems", ListOfItemsSchema);
