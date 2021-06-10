const { user } = require("../models");

exports.new = async (req, res) => {
  const { address } = req.body;
  let cryptoRewardsUser;
  try {
    cryptoRewardsUser = new user({ address: address });
    await cryptoRewardsUser.save();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
  return res.status(200).json(cryptoRewardsUser);
};

exports.view = async (req, res) => {
  const { address } = req.params;
  const cryptoRewardsUser = await user.findOne({ address: address });
  return res.status(200).json(cryptoRewardsUser || {});
};
