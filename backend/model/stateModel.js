const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "country",
  },
});

module.exports = mongoose.model("state", userSchema);
