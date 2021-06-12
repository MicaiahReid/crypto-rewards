const { ethers, Contract } = require("ethers");
const { piggybankAbi, piggybankBytecode } = require("../../contract/constants.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const signer = provider.getSigner();

exports.deploy = async () => {
  const piggybank = new ethers.ContractFactory(
    piggybankAbi,
    piggybankBytecode,
    signer,
  )
  let contract = await piggybank.deploy();
  contract = await contract.deployTransaction.wait();
  process.env.CONTRACT_ADDRESS = contract.contractAddress;
  return contract;
};

const getPiggyBank = async () => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const piggybank = new Contract(
    contractAddress,
    piggybankAbi,
    signer,
  )
  return piggybank;
};

exports.deposit = async () => {
  const piggybank = await getPiggyBank();
  const fromAddress = await piggybank.owner();
  const transaction = await piggybank.deposit({
    from: fromAddress,
    value: ethers.utils.parseEther("5")
  });
  return transaction;
};

exports.withdraw = async () => {
  const piggybank = await getPiggyBank();
  const fromAddress = await piggybank.owner();
  const transaction = await piggybank.withdraw(
    ethers.utils.parseEther("1"), { 
      from: fromAddress
  });
  return transaction;
};