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
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    budget: {
      type: String,
    },
    active: {
      type: Boolean,
      require: true,
      default: true,
    },
    icon: {
      type: String,
    },
    verificationType: {
      type: String,
    },
    address: {
      type: String,
    },
    protocol: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("campaign", campaignSchema);
