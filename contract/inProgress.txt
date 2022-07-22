// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract tenderFactory is AccessControl{
    bytes32 public constant AUTHORIZER_ROLE = keccak256("AUTHORIZER_ROLE");
    bytes32 public constant DEFAULT_ADMIN_ROLE = keccak256("DEFAULT_ADMIN_ROLE");
    bytes32 public constant PROMOTER_ROLE = keccak256("PR0MOTER_ROLE");

    address public admin;
    address[] deployedTenderArray;
    uint public protocolIndex;

     event createdTender(address indexed owner,address indexed deployedTender,uint target,uint deadline);
     event registeredProtocol(address client,string url,uint protocolnumber,address indexed authorizer);
    
    constructor(){
        admin=msg.sender;
          _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct protocol{
        string url;
        bool  validated;
        address authorizer;
    }
    mapping(address => mapping(uint => protocol) )public protocols;

    struct authority{
        uint  protocolId;
        address client;
    }
    mapping(address => authority) public authorities;
    mapping(address => string) public roles;

modifier onlyAdmin{
require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "caller is not an admin");
_;
}

   function registerProtocol(string memory _url,address _authorizer)public {
       require(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "caller is an Admin");
       require(!hasRole(AUTHORIZER_ROLE, msg.sender), "caller is an Authorizer");
       require(protocols[msg.sender][protocolIndex].validated=true,"protocol is already regstered");
       protocols[msg.sender][protocolIndex].url=_url;
       protocols[msg.sender][protocolIndex].authorizer=_authorizer;
       authorities[_authorizer].client=msg.sender;
       authorities[_authorizer].protocolId=protocolIndex;
       emit registeredProtocol(_authorizer,_url,protocolIndex,msg.sender);
       protocolIndex++;
   }

   function validateProtocol(uint _pid,address _client)public {
         require(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin is not allowed");
       require(hasRole(AUTHORIZER_ROLE, msg.sender), "caller must be  an Authorizer");
       protocols[_client][_pid].validated=true;
   }

   function grantAuthorityRole(address _account)public onlyAdmin{
       grantRole(AUTHORIZER_ROLE, _account);
       roles[_account]="AUTHORIZER_ROLE";
    
   }

    function revokeAuthorityRole(address _account)public onlyAdmin{
       revokeRole(AUTHORIZER_ROLE, _account);
       roles[_account]="PROMOTER_ROLE";
    
   }

   function getClients(address account)public view returns(address , uint){
        authority storage thisAuthority = authorities[account];
        return(
            thisAuthority.client,
            thisAuthority.protocolId
        );
   }
   
   

    
   


    function createTender(address creator,uint _deadline1,uint _target,uint _minimum,string memory _PdfUrl,string memory _imgURl,uint _deadline) public {
         tender tenderPointer=new tender(creator);
         tenderPointer.registerTender(_target,_minimum,_PdfUrl,_deadline1);
         deployedTenderArray.push(address(tenderPointer));
        emit createdTender(creator,address(tenderPointer),_target,_deadline);
    }

    function getDeployedTenders() public view returns ( address[] memory ) {
        return deployedTenderArray;
    }
}

contract tender{
   
    string public category;
    address public owner;
    string public imgUrl;
    string public pdfUrl;
    uint256 public minimumContribution;
    uint public deadline;
    uint256 public target;
    uint256 public raisedtarget;
    uint256 public noOfdonors;
    uint256 public numRequests;
    uint256 public numofregisteredTender;
    bool public destroyed;
    string public refundStatus;

    event tenderStatus(bool destroyed,string refundStatus);

     

    constructor(address tenderCreator){
      owner=payable(tenderCreator);
      refundStatus="OFF";
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

    function registerTender(uint256 _target,uint256 _minimum,  string memory _url,uint _deadline) external payable {
         require(numofregisteredTender == 0, "only one tender");
        target = _target;
        minimumContribution = _minimum;
        pdfUrl = _url;
        owner = msg.sender;
        deadline=block.timestamp+_deadline;
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

      function refund() public onlydonor{
        // require(block.timestamp>deadline && raisedAmount<target,"You are not eligible for refund");
        refundStatus="ON";
         uint amount=donors[msg.sender];
        payable(msg.sender).transfer(amount);
        donors[msg.sender]=0;
        if(address(this).balance==0){
            destroyed=true;
            refundStatus="Fully Refunded";
            emit tenderStatus(destroyed,refundStatus);
        }
        
        
      }




    function createRequests( string memory _description,address payable _recipient,uint256 _value) public payable onlyowner {
        Request storage newRequest = requests[numRequests];
        numRequests++;
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;
    }

    function voteRequest(uint256 _requestNo) public onlydonor {
        require(donors[msg.sender] > 0, "YOu must be contributor");
        Request storage thisRequest = requests[_requestNo];
        require(
            thisRequest.voters[msg.sender] == false,
            "You have already voted"
        );
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }

    function settleRequest(uint256 _requestNo) public onlyowner {
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
