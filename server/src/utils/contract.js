const { ethers, Contract } = require("ethers");
const {
  contractAbi,
  contractBytecode,
} = require("../../contract/constants.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const signer = provider.getSigner();

// deploys and funds a contract by a specified amount until endDate is reached
exports.deploy = async (endDate, amountToFund) => {
  const campaignContract = new ethers.ContractFactory(
    contractAbi,
    contractBytecode,
    signer
  );
  let contract = await campaignContract.deploy(endDate, {
    from: process.env.INITIAL_FUND_ADDRESS,
    value: amountToFund,
  });
  contract = await contract.deployTransaction.wait();
  process.env.CONTRACT_ADDRESS = contract.contractAddress;
  return contract;
};

const getCampaignContract = async () => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = new Contract(contractAddress, contractAbi, signer);
  return contract;
};

exports.payout = async (amount, address) => {
  console.log(
    "About to call smart contract for address: " +
      address +
      " for amount " +
      amount
  );
  const contract = await getCampaignContract();
  const transaction = await contract.functions.payout(
    true,
    address.toString(),
    amount,
    {
      from: process.env.INITIAL_FUND_ADDRESS.toString(),
    }
  );
  return transaction;
};
