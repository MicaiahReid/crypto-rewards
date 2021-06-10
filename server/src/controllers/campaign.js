const { campaign } = require("../models")

exports.index = async (req, res) => {
  const campaigns = await campaign.find();
  return res.status(200).json(campaigns);
};