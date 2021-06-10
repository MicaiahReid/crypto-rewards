pragma solidity ^0.8.0;
import "../github/OpenZeppelin/openzeppelin-contracts/contracts/utils/escrow/Escrow.sol";
//import "../github/OpenZeppelin/open-zeppelin/contracts/Ownable.sol";
contract Campaigns is Escrow {

            event Deposited(int256 indexed campaignID, uint256 payoutAmount);
            event Withdrawn(address indexed claim, uint256 payoutAmount);

            //claimee struct claimees wallet address, transaction hash, yes or no (bool)
            //creating a mapping of claimees, users in this mapping are already verfiied
            //verify contract gets the result from verify function and adds the result to the claim struct
            //if the bool is yes for the claim, call the payout()

            uint rewardunit = 0; ///in this case the reward amount will be in WEI
            uint startdate = 0;
            uint enddate = 0;
            
            constructor(uint _rewardunit uint _startdate uint _endate){
                owner = msg.sender;
                _rewardunit = rewardunit;
                _startdate = startdate;
                _endate = endate;


                
            }
                struct claimer
                    {
                        // Declaring different
                        // structure elements
                        address payable claimee;
                        uint256 transaction;
                        bool claimed;

                        

                    }
                    
                mapping (claimer => address) public claimees;

                //campapign struct campaign ID, contract address of the campapign, amount of payout

                // struct campaign {
                //     int256 campaignId;
                //     address campapignContract;
                //     int256 payoutAmount;
                // }

                deposit(int256 _payoutAmount) {
                        //should this be two functions or one
                     address(this).balance += _payoutAmount;                   
                        //create mappings for campapign that has campapign id and campapign contract addresses
                        //deposit function that creates a new contract instance for the protocol
                        //deposit function should also set msg.sender as owner of new contract
                     emit Deposited(campaignID, payoutAmount);

                }

                 function getClaimee() public view returns (address _address, uint256 _transaction, bool _claimed ) {
                     Claimee memory c = claims[id]
                    return (c.claimee, c.transaction, c.claimed);  //may not need this entire function need to verify if necessary
                    }


                function payout(string _verification uint256 _transaction) public {
                        // Check enough balance available, otherwise just return balance
                        if (_verification = string yes && Claimer.claimed = false) {
                        claimees[msg.sender].Claimer.claimed = true;
                        claimees[msg.sender].Claimer.claimee = msg.sender;
                        claimees[msg.sender].Claimer.transaction = _transaction; 
                        address(this).balance -= rewardunit;
                        msg.sender.transfer(rewardunit);
                        //emit reward claimed event here
                        emit Withdrawn(uint rewardunit address msg.sender)
                    }


                        endCampaign() onlyOwner {
                            //end campaign and withdraw funds if they are funds left after the duration of campaign ended.
                           if(address(this).balance > 0 && now => enddate){
                               msg.sender.transfer(balance); ///check the synatx 
                           }
                           //end campaign if the funds ran out before the campaign ends.
                           if(addres(this).balance){
                               enddate = now;
                           }    
                        }
        }


