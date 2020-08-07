const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListOfItemsSchema = new Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  bought: { type: Boolean, enum: [false] },
  reminder: { type: String },
});

module.exports = mongoose.model("ListOfItems", ListOfItemsSchema);
