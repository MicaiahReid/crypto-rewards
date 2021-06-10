pragma solidity ^0.8.0;
import "../github/OpenZeppelin/openzeppelin-contracts/contracts/utils/escrow/Escrow.sol";
//import "../github/OpenZeppelin/open-zeppelin/contracts/escrow/Escrow.sol";
contract Campaigns is Escrow {

            event Deposited(int256 indexed campaignID, uint256 payoutAmount);
            event Withdrawn(address indexed claim, uint256 payoutAmount);

            //claimee struct claimees wallet address, transaction hash, yes or no (bool)
            //creating a mapping of claimees, users in this mapping are already verfiied
            //verify contract gets the result from verify function and adds the result to the claim struct
            //if the bool is yes for the claim, call the payout()

            uint rewardamount = 0; ///in this case the reward amount will be in ETH

            constructor(uint _amount uint _rewardamount){
                owner = msg.sender;
                _rewardamount = rewardamount;

                
            }
                struct claim
                    {
                        // Declaring different
                        // structure elements
                        address payable claimee;
                        address transaction;
                        bool verfiiedStatus;
                        

                    }
                mapping (claim => bool) public claimees;

                    //campapign struct campaign ID, contract address of the campapign, amount of payout

                struct campaign {
                    int256 campaignId;
                    address campapignContract;
                    int256 payoutAmount;


                }

                deposit(int256 _payoutAmount) {
                        //should this be two functions or one
                     address(this).balance += _payoutAmount
                    
                        //create mappings for campapign that has campapign id and campapign contract addresses
                        //deposit function that creates a new contract instance for the protocol
                        //deposit function should also set msg.sender as owner of new contract
                     emit Deposited(campaignID, payoutAmount);

                }
                
                function payout() public returns (uint remainingBal) {
                        // Check enough balance available, otherwise just return balance
                        if (///verification step here) {
                        address(this).balance -= withdrawAmount;
                        msg.sender.transfer(rewardamount);
                    }



                        // payout(){}
                        // endCampaign(){
                        //     //modifier is owner
                        //     //end campaign and withdraw funds if they are funds left after the duration of campaign ended.
                        //     //end campaign if the funds ran out before the campaign ends.
                        // }
        }


