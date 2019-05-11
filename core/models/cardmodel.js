const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardsSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  cardCVV: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: false
  },
  cardType: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cards = mongoose.model("card", cardsSchema);
