const Web3 = require("web3");
let web3 = new Web3(process.env.INFURA_URL);
const eth = web3.eth;

exports.getLatestBlockNum = async function () {
  const block = await eth.getBlock("latest", false);
  return block.number;
};

exports.getTransactionInRange = async function (
  startBlock,
  endBlock,
  from,
  to
) {
  for (let blockNum = startBlock; blockNum <= endBlock; blockNum++) {
    const block = await eth.getBlock(blockNum, true);
    if (block) {
      const transactions = block.transactions;
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        if (transaction.from === from && transaction.to === to) {
          return transaction;
        }
      }
    } else {
      console.log("failed to get block: " + blockNum);
    }
    return "transaction not found";
  }
};
