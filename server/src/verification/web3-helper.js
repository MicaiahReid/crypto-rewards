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
  for (let blockNum = startBlock; blockNum++; blockNum <= endBlock) {
    const block = await eth.getBlock(blockNum, true);
    const transactions = block.transactions;
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (transaction.from === from && transaction.to === to) {
        return transaction;
      }
    }
  }
};
