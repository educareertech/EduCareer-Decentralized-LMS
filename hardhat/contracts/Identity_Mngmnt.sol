// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {

    address public owner;

    struct DidDocument {
        address userAddress;
        string name;
        string nationality;
        uint256 birthdate;
        string gmail;
        bool isRegistered;
    }

    mapping(bytes32 => DidDocument) public identities;
    mapping(bytes32 => address) didToAddress;
    mapping(address => bytes32) public ownerToDid;
    mapping(bytes32 => mapping(bytes32 => bool)) allowedAccess;
    mapping(bytes32 => bytes32[]) allowedDids;


    event IdentityRegistered(address indexed userAddress, bytes32 indexed did);
    event userInfoUpdated(bytes32 indexed did);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner, "Only Owner Functions");
        _;
    }

    modifier onlyRegistered(bytes32 _userDid){
        require(isDidRegistered(_userDid), "did is not registered");
        _;
    }

    function registerUser(string memory _name,string memory gmail,uint256 _birthdate,string memory nationality) public {
        bytes32 did = generateDID(keccak256(abi.encodePacked(msg.sender)));
        require(!identities[did].isRegistered, "Identity already registered");
        ownerToDid[msg.sender] = did;
        didToAddress[did] = msg.sender;
        identities[did] = DidDocument(
            msg.sender,
            _name,
            nationality,
            _birthdate,
            gmail,
            true
        );
        emit IdentityRegistered(msg.sender, did);
    }

    function updateUserInfo(bytes32 _did, string memory _name,string memory gmail,uint256 _birthdate,string memory nationality) public onlyRegistered(_did) {
        require(identities[_did].isRegistered, "Identity not registered");
        DidDocument storage didDoc = identities[_did];
        didDoc.name = _name;
        didDoc.gmail = gmail;
        didDoc.birthdate = _birthdate;
        didDoc.nationality = nationality;
        emit userInfoUpdated(_did);
    }

    function revokeDid(bytes32 _did) public onlyAdmin onlyRegistered(_did) {
        identities[_did].isRegistered = false;
    }

    function getDidDocument(bytes32 userDid) public view returns(DidDocument memory) {
        require(userDid == getUserDid(msg.sender), "You are not allowed");
        return identities[userDid];
    }

    function isDidRegistered(bytes32 _userDid) public view returns(bool){
        return identities[_userDid].isRegistered;
    }

    function generateDID(bytes32 didHash) internal pure returns (bytes32) {
        bytes32 prefix = bytes32("did:ethr:");
        return bytes32(keccak256(abi.encodePacked(prefix, didHash)));
    }

    function getUserDid(address _owner) public view returns (bytes32) {
        require(ownerToDid[_owner] != bytes32(0),"GetUserDid: User doesn't exist");
        require(identities[ownerToDid[_owner]].isRegistered,"User is not registered");
        return ownerToDid[_owner];
    }

    function allowAccess(bytes32 subjectDid) public onlyRegistered(subjectDid) onlyRegistered(getUserDid(msg.sender)) {
        allowedAccess[getUserDid(msg.sender)][subjectDid] = true;
        allowedDids[getUserDid(msg.sender)].push(subjectDid);
    }

    function getAllowedDids(bytes32 subjectDid) public view returns(bytes32[] memory){
        return allowedDids[subjectDid];
    }

    function revokeAccess(bytes32 subjectDid) public {
        require(allowedAccess[getUserDid(msg.sender)][subjectDid], "Access is not given");
        allowedAccess[getUserDid(msg.sender)][subjectDid] = false;
    }

    function revokeAccessByIndex(bytes32 subjectDid, uint256 index) public {
        revokeAccess(subjectDid);

        bytes32[] storage didsArray = allowedDids[subjectDid];
        // Swap the element to delete with the last element in the array
        require(index < didsArray.length, "Index out of bounds");

        // Swap the element to delete with the last element in the array
        didsArray[index] = didsArray[
            didsArray.length - 1
        ];

        // Pop the last element to remove it
        didsArray.pop();
    }


    function getAllowedInfo(bytes32 ownerDid) public view onlyRegistered(ownerDid) onlyRegistered(getUserDid(msg.sender)) returns(DidDocument memory) {
        require(allowedAccess[ownerDid][getUserDid(msg.sender)], "You are not Allowed");
        return identities[ownerDid];
    }   

    //Verify the user by signature and login them
    function verifyLogin(bytes32 _userDid) public onlyRegistered(_userDid) view returns (bool) {
        return didToAddress[_userDid] == msg.sender;
    }

}
