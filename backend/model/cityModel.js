const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "state",
  },
});

module.exports = mongoose.model("city", citySchema);
