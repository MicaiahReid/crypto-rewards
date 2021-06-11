const { getTransactionInRange } = require("./web3-helper");
async function verifyTrade(data) {
  // verify campaign is active (active=true, within date range, there is still an escrow balance)
  const tx = await getTransactionInRange(
    data.enrollBlock,
    data.verifyBlock,
    data.userAddress,
    data.campaignAddress
  );
  if (tx) {
    return tx;
  }
  return;
}

exports.verify = async (data) => {
  switch (data.verificationType) {
    case "trade":
      return await verifyTrade(data);
    case "fund":
      break;
    case "borrow":
      break;
    case "predict":
      break;
    case "grant":
      break;
    default:
      return await verifyTrade(data);
  }
};
