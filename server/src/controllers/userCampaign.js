const { userCampaign, user } = require("../models");
const { getLatestBlockNum } = require("../utils/web3-helper");
const { verify } = require("../utils/verify");
const { payout } = require("../utils/contract");

exports.enroll = async (req, res) => {
  const { address, campaignId } = req.body;
  const cryptoRewardsUser = await user.findOne({ address: address });

  if (cryptoRewardsUser !== null && cryptoRewardsUser !== undefined) {
    try {
      const enrollBlock = await getLatestBlockNum();
      const userCampaignInst = new userCampaign({
        user: cryptoRewardsUser._id,
        campaign: campaignId,
        enrollBlock: enrollBlock,
      });

      await userCampaignInst.save();
      console.log(
        "enrolled user: " +
          cryptoRewardsUser._id +
          " with address " +
          address +
          " in campaign " +
          campaignId +
          " at block" +
          enrollBlock
      );
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

  if (cryptoRewardsUser !== null && cryptoRewardsUser !== undefined) {
    const userId = cryptoRewardsUser._id;
    // we need the enrollment block data, so get the userCampaign
    const userCampaignInst = await userCampaign.findOne({
      user: userId,
      campaign: campaignId,
    });
    if (userCampaignInst !== null && userCampaignInst !== undefined) {
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
          userAddress: address,
          campaignAddress: userCampaignInst.campaign.address,
          verificationType: userCampaignInst.campaign.verificationType,
          minimumValue: userCampaignInst.campaign.minimumValue,
          rewardDecimal: userCampaignInst.campaign.rewardDecimal,
          enrollBlock: userCampaignInst.enrollBlock,
          verifyBlock: verifyBlock,
        };
        console.log(
          "verifying user: " +
            cryptoRewardsUser._id +
            " with address " +
            address +
            " in campaign " +
            campaignId +
            " at block" +
            verifyBlock
        );
        // and not let's verify!
        const payoutAmount = await verify(verificationData);
        if (payoutAmount && payoutAmount > 0) {
          console.log("User should be paid " + payoutAmount + " wei");
          const payoutTx = await payout(payoutAmount, address);
          if (payoutTx.receipt && payoutTx.receipt.to === address) {
            userCampaignInst.claimedReward = true;
            userCampaignInst.save();
            return res.status(200).json({
              txHash: payoutTx.hash,
            });
          } else {
            return res.status(400).json({
              error:
                "Successfully verified " +
                userCampaignInst.campaign.verificationType +
                ", but could not send reward. Try again later. Details: " +
                payoutTx,
            });
          }
        } else {
          return res.status(400).json({
            error:
              "failed to verify " +
              userCampaignInst.campaign.verificationType +
              ". " +
              payoutAmount,
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
