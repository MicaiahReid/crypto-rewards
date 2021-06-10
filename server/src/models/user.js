const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);