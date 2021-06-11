const { userCampaign, user } = require("../models");
const { getLatestBlockNum } = require("../utils/web3-helper");
const { verify } = require("../utils/verify");

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

exports.verify = async (req, res) => {
  const { address, campaignId } = req.body;
  const cryptoRewardsUser = await user.findOne({ address: address });

  if (cryptoRewardsUser !== undefined) {
    const userId = cryptoRewardsUser._id;
    // we need the enrollment block data, so get the userCampaign
    const userCampaignInst = await userCampaign.findOne({
      user: userId,
      campaign: campaignId,
    });
    if (userCampaignInst !== undefined) {
      try {
        // save the latest block so we have a snapshot of when they clicked verify
        const verifyBlock = await getLatestBlockNum();
        userCampaignInst.verifyBlock = verifyBlock;

        await userCampaignInst.save();
        // now get the rest of the data we'll need for verification
        await userCampaignInst
          .populate("user")
          .populate("campaign")
          .execPopulate();
        const verificationData = {
          userAddress: userCampaignInst.user.address,
          campaignAddress: userCampaignInst.campaign.address,
          verificationType: userCampaignInst.campaign.verificationType,
          enrollBlock: userCampaignInst.enrollBlock,
          verifyBlock: verifyBlock,
        };
        // and not let's verify!
        const success = await verify(verificationData);
        console.log(success);
        if (success === true) {
          userCampaignInst.claimedReward = true;
          userCampaignInst.save();
          return res.status(200).json({
            success: success,
          });
        } else {
          return res.status(400).json({
            error:
              "failed to verify " + userCampaignInst.campaign.verificationType,
          });
        }
      } catch (error) {
        return res.status(400).json({
          error,
        });
      }
    } else {
      return res.status(400).json({
        error: "user not enrolled in campaign",
      });
    }
  } else {
    return res.status(400).json({
      error: "user not found",
    });
  }
};
