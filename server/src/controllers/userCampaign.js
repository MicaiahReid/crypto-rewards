const { userCampaign, user } = require("../models");
const { getLatestBlockNum } = require("../verification/web3-helper");

exports.enroll = async (req, res) => {
  const { address, campaignId } = req.body;
  const cryptoRewardsUser = await user.findOne({ address: address });

  if (cryptoRewardsUser !== undefined) {
    try {
      const enrollBlock = await getLatestBlockNum();
      const userCampaignInst = new userCampaign({
        user: cryptoRewardsUser._id,
        campaign: campaignId,
        enrollBlock: enrollBlock,
      });

      await userCampaignInst.save();

      await userCampaignInst
        .populate("user")
        .populate("campaign")
        .execPopulate();

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  } else {
    return res.status(400).json({
      error: "user not found",
    });
  }
};
