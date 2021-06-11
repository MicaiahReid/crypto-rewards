// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";


//factory
contract CreateCampaigns {
    Campaign[] public campaigns;

    event CampaignCreated(
        address campaignAddress,
        uint256 rewardunit,
        uint256 startdate,
        uint256 endate
        );

    function createCampaign(
        uint256 rewardunit,
        uint256 startdate,
        uint256 endate
        ) external {Campaign campaign = new Campaign(
            rewardunit,
            startdate,
            endate
            );
        Campaign.push(campaign);
        emit CampaignCreated(address(campaignAddress), rewardunit,startdate,endate);
    }
}

contract Campaign is Ownable {
    event Deposited(uint256 indexed campaignID, uint256 amount);
    event Withdrawn(address indexed claim, uint256 payoutAmount);

    uint256 rewardunit = 0; ///in this case the reward amount will be in WEI? amount of tokens to award out
    //how would this rewardunit work with different tokens?
    uint256 startdate = 0;
    uint256 enddate = 0;

    constructor(
        uint256 _rewardunit,
        uint256 _startdate,
        uint256 _endate
    ) {
        owner = msg.sender;
        _rewardunit = rewardunit;
        _startdate = startdate;
        _endate = endate;
    }

    //claimee struct claimees wallet address, transaction hash, yes or no (bool)
    //creating a mapping of claimees, users in this mapping are already verfiied

    struct claimer {
        address payable claimee;
        uint256 txn;
        //whether or not the claimer has previously claimed
        bool claimed;
    }

    mapping(address => claimer) public claimees;
    address[] public claimerRecord;

    //campapign struct campaign ID, contract address of the campapign, amount of payout

    function deposit(uint256 _amount) private {
        //should this be two functions or one
        address(this).balance += _amount;
        emit Deposited(_amount);
    }

    function payout(string _verification, uint256 _transaction) public {
        // Check enough balance available, otherwise just return balance
        if (_verification == true && Claimer.claimed == false) {
            claimees[msg.sender].Claimer.claimed = true;
            claimees[msg.sender].Claimer.claimee = msg.sender;
            claimees[msg.sender].Claimer.transaction = _transaction;
            address(this).balance -= rewardunit;
            msg.sender.transfer(rewardunit);
            //emit reward claimed event here
            emit Withdrawn(msg.sender, rewardunit);
        }
        require(_verification == true, "please complete the tasks to claim the rewards for this challenge.");
    }

    function endCampaign() public onlyOwner {
        //end campaign and withdraw funds if they are funds left after the duration of campaign ended.
        if (address(this).balance > 0 && now >= enddate) {
            msg.sender.transfer(balance); ///check the synatx
        }
        //end campaign if the funds ran out before the campaign ends.
        if (addres(this).balance) {
            enddate = now;
        }
    }
}
