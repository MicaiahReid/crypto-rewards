const Web3 = require("web3");
const web3 = new Web3(process.env.INFURA_URL);
const eth = web3.eth;
const Contract = eth.Contract;

const privateKey = Buffer.from(process.env.FUND_ADDRESS_PRIVATE_KEY, "hex");
const Tx = require("ethereumjs-tx").Transaction;
Contract.setProvider(process.env.INFURA_URL);
const {
  contractAbi,
  contractBytecode,
} = require("../../contract/constants.json");
const contract = new Contract(contractAbi, process.env.CONTRACT_ADDRESS);

exports.payout = async (amount, address) => {
  console.log(
    "About to call smart contract for address: " +
      address +
      " for amount " +
      amount
  );
  const contractData = contract.methods
    .payout(true, address.toString(), amount)
    .encodeABI();
  const nonce = await eth.getTransactionCount(process.env.INITIAL_FUND_ADDRESS);
  console.log(nonce);
  const nonceHex = web3.utils.toHex(nonce);
  console.log(nonceHex);
  const rawTx = {
    nonce: nonceHex,
    gasPrice: "0x09184e72a000",
    gasLimit: "0xffff",
    to: process.env.CONTRACT_ADDRESS,
    value: "0x0",
    data: contractData,
  };
  const tx = new Tx(rawTx, { chain: "ropsten", hardfork: "istanbul" });
  tx.sign(privateKey);
  const serializedTx = tx.serialize();
  eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("receipt", (receipt) => {
      console.log(receipt);
    });
};
