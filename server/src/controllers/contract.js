const { deploy, withdraw, deposit } = require("../utils/contract");

exports.deploy = async (req, res) => {
  let contract;
  try {
    contract = await deploy();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
  return res.status(200).json({data: contract});
};

exports.withdraw = async (req, res) => {
  let transaction;
  try {
    transaction = await withdraw();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
  return res.status(200).json({data: transaction});
};

exports.deposit = async (req, res) => {
  let transaction;
  try {
    transaction = await deposit();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
  return res.status(200).json({data: transaction});
};