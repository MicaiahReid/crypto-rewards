const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    reward: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("campaign", campaignSchema);