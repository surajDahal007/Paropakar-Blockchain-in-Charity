// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/access/AccessControl.sol";


/// @title factory for tender
/// @author Ujjwal Karki
/// @notice you can use this contract to generate multiple tenders and act upon based on the roles provided

contract tenderFactory is AccessControl{
    /** encrypt based on the roles */
    bytes32  public constant AUTHORIZER_ROLE = keccak256("AUTHORIZER_ROLE");
 

    address public admin;

    // only contains registered tender addresees after deployed
    address[] deployedAuthorizedTenders;
    uint public protocolIndex;

     event createdTender(address indexed owner,address  deployedTender);
     event registeredProtocol(address client,string url);
    
    
    constructor(){
        admin=msg.sender;
          _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

/// @dev for  a single protocol with different informations
    struct protocol{
        string url;
        string category;
        uint citizenShipNum;
        bool  validated;
        address beneficiary;
        address authorizer;
        uint deadline;
        uint minimumContribution;
        uint target;
    }
    mapping(address => protocol )public protocols;

    struct authority{
        string protocolUrl;
        address client;
    }
    mapping(address => authority) public authorities;

modifier onlyAdmin{
require(admin == msg.sender, "caller is not an admin");
_;
}

/// @dev thsi function registers the protocol for validation of a specific benefiicary
   function registerProtocol(uint _min,uint _deadline,uint _target,uint _czNum,string memory _url,string memory category)public {
       require(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "caller is an Admin");
       require(!hasRole(AUTHORIZER_ROLE, msg.sender), "caller is an Authorizer");
       require(!protocols[msg.sender].validated,"protocol is already regstered");
       protocols[msg.sender].url=_url;
       protocols[msg.sender].beneficiary=msg.sender;
       protocols[msg.sender].validated=false;
       protocols[msg.sender].citizenShipNum=_czNum;
       protocols[msg.sender].minimumContribution=_min;
       protocols[msg.sender].target=_target;
       protocols[msg.sender].deadline=_deadline;
       protocols[msg.sender].category=category;
       emit registeredProtocol(msg.sender,_url);
   }


//@dev internal function to create tender after te validation of protocol by authorizer
   function createTender(address creator,uint _deadline1,uint _target,uint _minimum,string memory _PdfUrl,string memory category) internal {
         tender tenderPointer=new tender();
         tenderPointer.registerTender(_target,_minimum,_PdfUrl,_deadline1,category);
         deployedAuthorizedTenders.push(address(tenderPointer));
        emit createdTender(creator,address(tenderPointer));
    }

/// @dev authorizer uses this function to validate the protocols
/// @dev creates tender after authorizing the protocol of a givan client 
   function validateProtocol(address _client)public {
         require(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin is not allowed");
       require(hasRole(AUTHORIZER_ROLE, msg.sender), "caller must be  an Authorizer");
       protocols[_client].validated=true;
       protocols[_client].authorizer=msg.sender;
       uint deadline = protocols[_client].deadline;
       uint target = protocols[_client].target;
       uint mc = protocols[_client].minimumContribution;
       string  memory link = protocols[_client].url;
       string  memory category = protocols[_client].category;
       createTender(_client,deadline,target,mc,link,category);
   }


/// @dev admin can grant role to other accouts for the role of authorizer
   function grantAuthorityRole(address _account)public onlyAdmin{
    require(!hasRole(AUTHORIZER_ROLE, _account), "this address is already an authorizer");
       grantRole(AUTHORIZER_ROLE, _account);
    
   }

    function revokeAuthorityRole(address _account)public onlyAdmin{
         require(hasRole(AUTHORIZER_ROLE, _account), "this address wasn't  the authorizer");
       revokeRole(AUTHORIZER_ROLE, _account);
   }

   
    function getDeployedTenders() public view returns ( address[] memory ) {
        return deployedAuthorizedTenders;
    }
}



contract tender{
   
    string public category;
    address public owner;
    string public pdfUrl;
    uint256 public minimumContribution;
    uint public deadline;
    uint256 public target;
    uint256 public raisedtarget;
    uint256 public noOfdonors;
    uint256 public numRequests;
    uint256 public numofregisteredTender;
    bool public destroyed;


 
event donorEvent(address indexed donor,uint amount,uint time);
     

    constructor(){
    
      destroyed=false;
    }


    struct Request {
        string description;
        uint256 value;
        bool completed;
        uint256 noOfVoters;
        address payable recipient;
        mapping(address => bool) voters;
    }

    mapping(uint256 => Request) public requests;
     mapping(address => uint256) public donors;

    function registerTender(uint256 _target,uint256 _minimum,  string memory _url,uint _deadline,string memory category) external payable {
         require(numofregisteredTender == 0, "only one tender");
          owner=payable(msg.sender);
        target = _target;
        minimumContribution = _minimum;
        pdfUrl = _url;
        owner = msg.sender;
        deadline=block.timestamp+ _deadline*60;
        category = category;
        numofregisteredTender++;
    }

    function getreqNo() public view returns (uint256) {
        return numRequests;
    }

    function donate() public payable {
          require(raisedtarget < target);
          require(!(owner==msg.sender),"owner can't donate self");
        require(msg.value <= target, "donation greater than target");
        require(numRequests == 0, "raised target has already mey target");

        require(
            msg.value >= minimumContribution,
            "Minimum donation is not met"
        );
        if (donors[msg.sender] == 0) {
            noOfdonors++;
        }
        donors[msg.sender] = msg.value + donors[msg.sender];
        raisedtarget += msg.value;
        emit donorEvent(msg.sender,msg.value,block.timestamp);
    }


     

    modifier onlyowner() {
         require(!destroyed,"contract is not available");
        require(
            msg.sender == owner,
            "Only owner can calll this function"
        );
        _;
    }

    modifier onlydonor() {
        require(!destroyed,"contract is not available");
        require(donors[msg.sender] > 0, "Only donors can calll this function");
        _;
    }

    modifier shouldnotDestroy{

        require(!destroyed,"contract is dstroyed");
        _;
    }

      function refund() public onlydonor shouldnotDestroy{
        require(block.timestamp >=  deadline && raisedtarget < target,"You are not eligible for refund");
        payable(msg.sender).transfer(donors[msg.sender]);
        donors[msg.sender]=0;
        if(address(this).balance==0){
            destroyed=true;
        }
        
        
      }

    // function readTenderStatus()public returns()




    function createRequests( string memory _description,address payable _recipient,uint256 _value) public payable onlyowner shouldnotDestroy {
        Request storage newRequest = requests[numRequests];
        numRequests++;
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;
    }

    function voteRequest(uint256 _requestNo) public onlydonor shouldnotDestroy{
        require(donors[msg.sender] > 0, "YOu must be contributor");
        Request storage thisRequest = requests[_requestNo];
        require(
            thisRequest.voters[msg.sender] == false,
            "You have already voted"
        );
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }

    function settleRequest(uint256 _requestNo) public onlyowner shouldnotDestroy{
        require(raisedtarget <= target);
        Request storage thisRequest = requests[_requestNo];
        require(
            thisRequest.completed == false,
            "The request has been completed"
        );
        require(
            thisRequest.noOfVoters > noOfdonors / 2,
            "Majority does not support"
        );
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed = true;
    }

    function getContractBalance()public view returns(uint){
        return address(this).balance;
    }

    fallback()external payable{
        payable(msg.sender).transfer(msg.value);
    }

  
}
