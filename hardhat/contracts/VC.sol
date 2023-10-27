// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Identity {
    function getUserDid(address _owner) external view returns (bytes32);
    function isDidRegistered(bytes32 userDid) external view returns (bool);
}

contract Verifiable_Credential {

    struct CredentialSchema {
        string schemaName;
        string schemaID;
        string[] attributes;
    }

    struct VerifiableCredential {
        string schemaName;
        string applicant;
        string schemaId;
        bytes32 providerId;
        uint256 issuanceDate;
        mapping(string => string) claimValues;
        bool isRevoked;
        bool issued;
    }
    struct Provider {
        bytes32 providerId;
        string profile;
        string desciption;
        bool registered;
    }

    mapping(string => CredentialSchema) public CredentialSchemas;
    mapping(bytes32 => mapping(string => bool)) public providerToSchema;
    mapping(bytes32 => VerifiableCredential) public credentials;
    mapping(bytes32 => bytes32[]) public issuerCredentials;
    mapping(bytes32 => bytes32[]) public userVCs;
    mapping(string => mapping(bytes32 => mapping(bytes32 => string[]))) allowedClaims;
    mapping(bytes32 => Provider[]) public providerIdToProvider;
    mapping(bytes32 => mapping(string => mapping(bytes32 => bool))) allowedClaimsBool;
    mapping(bytes32 => mapping(string => bytes32[])) allowedClaimsArray;
    mapping(bytes32 => mapping(string => bytes32[])) credentialIssuerToDid;

    mapping(bytes32 => string[]) public schemaCounter;
    mapping(bytes32 => bytes32[]) public providerIds;


    event CredentialSchemaCreated(string indexed schemaID, string indexed schemaName);
    event CredentialIssued(bytes32 indexed credentialId,bytes32 indexed subjectDid);
    event CredentialRevoked(bytes32 indexed credentialId);
    event FieldsAllowed(string indexed schemaId, bytes32 indexed subjectDid);
    event allowedFieldsRevoked(bytes32 indexed _subjectDid);
    event ProviderCreated(bytes32 indexed userDid, bytes32 indexed providerId);
    event IdentityUpdated(address indexed newAddress);
    event OwnerUpdated(address indexed newAddress);

    Identity public IdentityContract;
    address public owner;

    constructor(address _didContractAddress) {
        IdentityContract = Identity(_didContractAddress);
        owner = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner, "Only Owner can call this function");
        _;
    }

    modifier isDidRegistered(bytes32 _subjectDid) {
        require(IdentityContract.isDidRegistered(_subjectDid),"Did is not registered");
        _;
    }

    function addCredentialSchema(bytes32 providerId, string memory _schemaId,string memory _schemaName,string[] memory _attributes) public isDidRegistered(IdentityContract.getUserDid(msg.sender)) {
        require(!providerToSchema[providerId][_schemaId],"Schema Already Registered");
        CredentialSchemas[_schemaId] = CredentialSchema(
            _schemaName,
            _schemaId,
            _attributes
        );
        providerToSchema[providerId][_schemaId] = true;
        schemaCounter[providerId].push(_schemaId);
        emit CredentialSchemaCreated(_schemaId, _schemaName);
    }

    function generateProviderId(bytes32 didHash, uint256 counter) internal pure returns (bytes32) {
        bytes32 prefix = bytes32("prov:ethr:");
        return bytes32(keccak256(abi.encodePacked(prefix, didHash, counter)));
    }

    function becomeProvider(bytes32 userDid,string memory profile,string memory desc) public isDidRegistered(userDid) {
        bytes32 providerId = generateProviderId(
            userDid,
            providerIds[userDid].length
        );
        providerIds[userDid].push(providerId);
        providerIdToProvider[providerId].push(
            Provider(providerId, profile, desc, true)
        );

        emit ProviderCreated(userDid, providerId);
    }

    function getIssuedCredentialsIds(bytes32 _providerId, string calldata schemaId) public view returns (bytes32[] memory) {
        return credentialIssuerToDid[_providerId][schemaId];
    }

    function getProviderIds(bytes32 _userDid) public view returns (bytes32[] memory) {
        return providerIds[_userDid];
    }

    function getProviderProfiles(bytes32 _providerId) public view returns (Provider[] memory) {
        return providerIdToProvider[_providerId];
    }

    function getRegisteredSchemas(bytes32 _providerId) public view returns (CredentialSchema[] memory result) {
        CredentialSchema[] memory schema = new CredentialSchema[](
            schemaCounter[_providerId].length
        );
        for (uint256 i = 0; i < schema.length; i++) {
            schema[i] = CredentialSchemas[schemaCounter[_providerId][i]];
        }
        return schema;
    }

    function generateVCID(bytes32 providerId, string calldata _schemaId) internal pure returns (bytes32) {
        return bytes32(keccak256(abi.encodePacked(_schemaId, providerId)));
    }

    function issueCredential(bytes32 providerId, string calldata subjectName, string calldata _schemaId, bytes32 _subjectDid, string[] memory _claimValues) public isDidRegistered(_subjectDid) {
        bytes32 credId = generateVCID(_subjectDid, _schemaId);
        require(_claimValues.length == CredentialSchemas[_schemaId].attributes.length,"Invalid claim values");
        userVCs[_subjectDid].push(credId);

        VerifiableCredential storage newCredential = credentials[credId];
        require(!newCredential.isRevoked, "Credential Already Issued and revoked");
        require(!newCredential.issued, "Credential Already Issued");
        newCredential.applicant = subjectName; 
        newCredential.issuanceDate = block.timestamp;
        newCredential.schemaId = CredentialSchemas[_schemaId].schemaID;
        newCredential.providerId = providerId;
        newCredential.isRevoked = false;
        newCredential.issued = true;
        newCredential.schemaName = CredentialSchemas[_schemaId].schemaName;

        for (uint256 i = 0; i < _claimValues.length; i++) {
            newCredential.claimValues[
                CredentialSchemas[_schemaId].attributes[i]
            ] = _claimValues[i];
        }

        issuerCredentials[providerId].push(credId);
        credentialIssuerToDid[providerId][_schemaId].push(_subjectDid);

        emit CredentialIssued(providerId, credId);
    }

    function revokeCredentialByIndex(bytes32 subjectDid, string calldata schemaId, uint256 _index ) public {
        bytes32 credId = generateVCID(subjectDid, schemaId);
        rovokeCredentialById(credId);

        bytes32[] storage credentialsArray = credentialIssuerToDid[
            credentials[credId].providerId
        ][credentials[credId].schemaId];
        // Swap the element to delete with the last element in the array
        require(_index < credentialsArray.length, "Index out of bounds");

        // Swap the element to delete with the last element in the array
        credentialsArray[_index] = credentialsArray[
            credentialsArray.length - 1
        ];

        // Pop the last element to remove it
        credentialsArray.pop();
    }

    function rovokeCredentialById(bytes32 _credentialId) public {
        VerifiableCredential storage credential = credentials[_credentialId];
        require(!credential.isRevoked, "Credential is already revoked");

        credential.isRevoked = true;
       
    }

    function getUserCredentialIds(bytes32 _userDid) public view returns (bytes32[] memory) {
        return userVCs[_userDid];
    }

    function getCredential(bytes32 _credentialId) public view returns (string[] memory, string[] memory){
        VerifiableCredential storage credential = credentials[_credentialId];
        require(!credential.isRevoked, "Credential is revoked");
        string memory _schemaId = credential.schemaId;
        string[] memory claimValues = new string[](
            CredentialSchemas[_schemaId].attributes.length
        );
        for (uint256 i = 0; i < claimValues.length; i++) {
            claimValues[i] = credential.claimValues[
                CredentialSchemas[_schemaId].attributes[i]
            ];
        }
        return (claimValues, CredentialSchemas[_schemaId].attributes);
    }

    function allowFields( string calldata schemaId, bytes32 _subjectDid, string[] memory claimValues) public isDidRegistered(_subjectDid) {
        bytes32 userDid = IdentityContract.getUserDid(msg.sender);
        require(credentials[userDid].isRevoked != true,"Credential is revoked or doesn't exist");
        require(allowedClaimsBool[userDid][schemaId][_subjectDid] == false,"Revoke previous Allowed Claims");
        allowedClaimsArray[userDid][schemaId].push(_subjectDid);
        allowedClaimsBool[userDid][schemaId][_subjectDid] = true;
        allowedClaims[schemaId][userDid][_subjectDid] = claimValues;

        emit FieldsAllowed(schemaId, _subjectDid);
    }

    function revokeAllowedFieldsByIndex(bytes32 _subjectDid,string calldata schemaId,uint256 _index) public {
        revokeAllowedFields(_subjectDid, schemaId);

        bytes32[] storage claimsArray = allowedClaimsArray[_subjectDid][schemaId];
        // Swap the element to delete with the last element in the array
        require(_index < claimsArray.length, "Index out of bounds");

        // Swap the element to delete with the last element in the array
        claimsArray[_index] = claimsArray[claimsArray.length - 1];

        // Pop the last element to remove it
        claimsArray.pop();
    }

    function revokeAllowedFields(bytes32 _subjectDid, string calldata schemaId) public {
        bytes32 ownerDid = IdentityContract.getUserDid(msg.sender);
        require(
            allowedClaimsBool[ownerDid][schemaId][_subjectDid],
            "Claims are not allowed"
        );
        allowedClaimsBool[ownerDid][schemaId][_subjectDid] = false;
        emit allowedFieldsRevoked(_subjectDid);
    }

    function getAllowedClaimsDids(bytes32 ownerDid, string calldata schemaId) public view returns (bytes32[] memory) {
        return allowedClaimsArray[ownerDid][schemaId];
    }

    function getAllowedFields(string calldata schemaId, bytes32 _ownerDid) public view returns (string[] memory, string[] memory, bytes32) {
        require(allowedClaimsBool[_ownerDid][schemaId][IdentityContract.getUserDid(msg.sender)],"Claims are not allowed");
        bytes32 _credId = generateVCID(_ownerDid, schemaId);
        VerifiableCredential storage credential = credentials[_credId];
        require(!credential.isRevoked, "Credential is revoked");

        string[] storage allowedClaimKeys = allowedClaims[schemaId][_ownerDid][
            IdentityContract.getUserDid(msg.sender)
        ];
        string[] memory allowedClaimValues = new string[](allowedClaimKeys.length);

        // Iterate through the allowed claim keys and fetch the corresponding claim values
        for (uint256 i = 0; i < allowedClaimKeys.length; i++) {
            string memory claimKey = allowedClaimKeys[i];
            allowedClaimValues[i] = credential.claimValues[claimKey];
        }

        return (allowedClaimValues, allowedClaimKeys, credential.providerId);
    }

    function updateIdentityContract(address _contractAddrr) external onlyAdmin {
        require(_contractAddrr == address(0), "Provide Correct Address");
        IdentityContract = Identity(_contractAddrr);
        emit IdentityUpdated(_contractAddrr);
    }

    function updateOwner(address _ownerAddr) external onlyAdmin {
        require(_ownerAddr == address(0), "Provide Correct Address");
        owner = msg.sender;
        emit OwnerUpdated(_ownerAddr);
    }
}