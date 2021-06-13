const {
  getTransactionInRange,
  getTransactionReceipt,
  transferLogDelim,
} = require("./web3-helper");

function moveDecimals(num, places) {
  return num * Math.pow(10, places);
}
async function verifyTrade(data) {
  // verify campaign is active (active=true, within date range, there is still an escrow balance)
  const tx = await getTransactionInRange(
    data.enrollBlock,
    data.verifyBlock,
    data.userAddress,
    data.campaignAddress
  );
  if (tx && typeof tx === "object") {
    const receipt = await getTransactionReceipt(tx.hash);
    // review the transaction logs.
    // if we can find the transfer log, it will tell us the value of uni swapped
    // the log will have a topic with the first value being equivalent to:
    // web3.utils.keccak256("Transfer(address,address,uint256)");
    // this is specific to uni. we'd need to make this a bit more robust in real life
    if (receipt && receipt.logs.length > 0) {
      const logs = receipt.logs;
      let transferLogData;
      for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        const topic = log.topics[0];
        if (topic === transferLogDelim) {
          // the actual transfer is going to be the last of these topics
          // the actual value is saved in the log's data
          transferLogData = log.data;
        }
      }
      if (transferLogData) {
        // now convert the amount of sent to a decimal and adjust the decimal places
        const tradedAmount = parseInt(transferLogData);
        const tradedAmountAdjusted = moveDecimals(tradedAmount, -18); // TODO would be cool not to hard code this
        if (tradedAmountAdjusted >= data.minimumValue) {
          console.log(tx.value);
          const weiSpent = parseInt(tx.value);
          console.log(weiSpent, tradedAmountAdjusted);
          const exchangeRate = weiSpent / tradedAmountAdjusted;
          console.log(exchangeRate, data.rewardDecimal);
          return data.rewardDecimal * exchangeRate;
        } else {
          return "not enough funds traded";
        }
      } else {
        return "could not find transfer call on transaction";
      }
    } else {
      return "could not verify transaction amount";
    }
    return true;
  }
  return tx;
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
