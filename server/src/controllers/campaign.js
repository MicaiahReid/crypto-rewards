const { campaign, user, userCampaign } = require("../models");

exports.index = async (req, res) => {
  const { address } = req.params;
  const campaigns = await campaign.find().lean();
  // if we sent an address, we want to include the enrollment status
  // for each of the campaigns.
  // look over all campaigns that the user has either signed up
  // or enrolled in and set the status for those campaign objects
  if (address) {
    const userFromAddress = await user.findOne({ address: address });
    if (userFromAddress) {
      const userCampaigns = await userCampaign.find({
        user: userFromAddress._id,
      });
      if (userCampaigns) {
        for (let i = 0; i < userCampaigns.length; i++) {
          const userCampaign = userCampaigns[i];
          for (let j = 0; j < campaigns.length; j++) {
            const campaign = campaigns[j];
            if (userCampaign.campaign.toString() === campaign._id.toString()) {
              if (userCampaign.claimedReward) {
                campaign.status = "claimed";
              } else {
                campaign.status = "enrolled";
              }
            }
          }
        }
      }
    }
  }
  return res.status(200).json(campaigns);
};
