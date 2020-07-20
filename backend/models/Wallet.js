const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  money: { type: String, required: true },
});

module.exports = mongoose.model("Wallet", WalletSchema);
