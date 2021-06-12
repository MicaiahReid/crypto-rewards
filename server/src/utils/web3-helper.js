const Web3 = require("web3");
//const EscrowContractABI = require("../../../contract/EscrowContractABI");
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
  console.log(startBlock, endBlock);
  for (let blockNum = startBlock; blockNum <= endBlock; blockNum++) {
    const block = await eth.getBlock(blockNum, true);
    if (block) {
      const transactions = block.transactions;
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        if (
          transaction.from.toLowerCase() === from &&
          transaction.to.toLowerCase() === to
        ) {
          console.log("found it! " + transaction);
          return transaction;
        }
      }
    } else {
      console.log("failed to get block: " + blockNum);
    }
  }
  return "Transaction not found. If you're sure you made the transaction, check the status on etherscan to ensure it was successful.";
};

exports.getTransactionReceipt = eth.getTransactionReceipt;
exports.transferLogDelim = web3.utils.keccak256(
  "Transfer(address,address,uint256)"
);
