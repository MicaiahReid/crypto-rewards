const mongoose = require("mongoose");

const userCampaignSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaign",
      required: true,
    },
    enrollBlock: {
      type: Number,
    },
    verifyBlock: {
      type: Number,
    },
    claimedReward: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userCampaign", userCampaignSchema);
