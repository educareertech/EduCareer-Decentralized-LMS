//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.16;

interface Identity {
    function getUserDid(address _owner) external view returns (bytes32);
    function isDidRegistered(bytes32 userDid) external view returns (bool);
}

contract EduCareer_LMS{
    Identity public IdentityContract;
    address public owner;

    constructor(address _didContractAddress) {
        IdentityContract = Identity(_didContractAddress);
        owner = msg.sender;
    }

    modifier isDidRegistered(bytes32 _subjectDid) {
        require(IdentityContract.isDidRegistered(_subjectDid),"Did is not registered");
        _;
    }
    modifier isQualifRegistered(bytes32 _qualifId) {
        // require(_IdToinstitute[_idToQualif[_qualifId].instId].registered,"Institute is not registered");
        require(_idToQualif[_qualifId].registered,"Qualification is not registered");
        _;
    }
    modifier isInstRegistered(bytes32 _instId) {
        require(_IdToinstitute[_instId].registered, "Institute doesn't exist");
        _;
    }

    modifier onlyAdmin(bytes32 instId){
        require(_IdToinstitute[instId].admin == IdentityContract.getUserDid(msg.sender), "Only Admin is Allowed");
        _;
    }

    modifier onlyAdminOrOwner(bytes32 userDid, bytes32 instId){
        require(IdentityContract.isDidRegistered(userDid),"Did is not registered");
        require(_IdToinstitute[instId].admin == IdentityContract.getUserDid(msg.sender), "Only Admin is Allowed");
        _;
    }

    struct Institute {
        bytes32 admin;
        string title;
        bytes32[] qualifs;
        string[] userRoles;
        uint qulif_count;
        bool registered;
    }
    struct Qualification{
        bytes32 qualifId;
        bytes32 instId;
        string title;
        string qualifInfo;
        string[] applications;
        bytes32[] stds;
        bytes32[] teachers;
        bool registered;
    }
     struct Member {
        string role;       
        string infoHash;
        bytes32 did;
        bool registered;
    }
    struct StudentTeacher{
        string role;
        bytes32 qualifId;
        string rollNo;
        string infoHash;
        bytes32 did;
        bool registered;  
    }
   

    bytes32[] allInstitutes;
    mapping(bytes32 => Institute) _IdToinstitute;
    mapping(bytes32 => mapping(string => bytes32)) _instRoleToMembers;
    
    mapping(bytes32 => mapping(bytes32 => Member)) _InstdidToMember;
    mapping(bytes32  => Qualification) public _idToQualif;
    mapping(bytes32 => mapping(bytes32 => StudentTeacher)) _qualifToStudentTeacher;
    mapping(bytes32 => mapping(bytes32 => string))  _qulifToApplicantInfo;

    mapping(bytes32 => bytes32[]) public _adminToInstIds;    
    
    event InstituteRegistered(bytes32 indexed admin, bytes32 indexed instId);
    // event AccessGranted(bytes32 indexed did, string indexed role);
    
    function registerInstitute(bytes32 adminDid, string calldata _instTitle, string[] memory roles, string calldata adminInfoHash) public isDidRegistered(adminDid) {
        bytes32 instId = generateId(adminDid, _instTitle);
        Institute storage inst = _IdToinstitute[instId];
        require(!inst.registered, "Institute Already Registered");
        allInstitutes.push(instId);
        inst.admin = adminDid;
        inst.title = _instTitle;
        inst.qulif_count = 0;
        inst.userRoles = roles;
        inst.registered = true;
        _adminToInstIds[adminDid].push(instId);
        _instRoleToMembers[instId]["Admin"] = adminDid;
        _InstdidToMember[instId][adminDid] = Member(
            "Admin",       
            adminInfoHash,
            adminDid,
            true
        );

        emit InstituteRegistered(adminDid, instId);
    }
        
    function roleExists(bytes32 instId, string memory role) public view isInstRegistered(instId) returns(bool){
        for(uint i= 0; i<_IdToinstitute[instId].userRoles.length; i++){
            if(keccak256(bytes(_IdToinstitute[instId].userRoles[i])) == keccak256(bytes(role))){
                return true;
            }
        }
        return false;
    }

    function registerQualif(bytes32 instId, string calldata _qualifTitle, string calldata _hash) onlyAdmin(instId) public {
        bytes32 qualifId = generateId(instId, _qualifTitle);
        require(!_idToQualif[qualifId].registered, "Qualification Already Registered");
        Qualification storage qualif = _idToQualif[qualifId];
        qualif.title = _qualifTitle;
        qualif.qualifId = qualifId;
        qualif.instId = instId;
        qualif.qualifInfo = _hash;
        qualif.registered = true;
        _IdToinstitute[instId].qualifs.push(qualifId);
        _IdToinstitute[instId].qulif_count += 1;
    }

    function getAllInstitutes() public view returns(bytes32[] memory){
        return allInstitutes;
    }
    function getInstById(bytes32 _instId) public view isInstRegistered(_instId) returns(Institute memory){
        return _IdToinstitute[_instId];
    }

    function getInstituteQualifs(bytes32 instId) public view isInstRegistered(instId) returns(bytes32[] memory){
        return _IdToinstitute[instId].qualifs;
    }
    function getQualifById(bytes32 _qualifId) public view isQualifRegistered(_qualifId) returns(Qualification memory){
        return _idToQualif[_qualifId];
    }
    
    function registerStudentTeacher(bytes32 _subjectDid, bytes32 _qualifId, uint _appIndex, string calldata _id, string calldata role) public isDidRegistered(_subjectDid) isQualifRegistered(_qualifId) onlyAdmin(_idToQualif[_qualifId].instId)  {
        Qualification storage qualif = _idToQualif[_qualifId];
        require(!_qualifToStudentTeacher[_qualifId][_subjectDid].registered, "Candidate Already Registered");
        if(keccak256(bytes("Student")) == keccak256(bytes(role))){
            qualif.stds.push(_subjectDid);
            _registerStudent(_subjectDid, _qualifId,  _id);
        }
        else if(keccak256(bytes("Teacher")) == keccak256(bytes(role))) {
            qualif.teachers.push(_subjectDid);
            _registerTeacher(_subjectDid, _qualifId, _id);
        }

        // Delete Application from Qulification Application mapping
        if(_appIndex == qualif.applications.length - 1){
            qualif.applications.pop();
        }else{
            qualif.applications[_appIndex] = qualif.applications[
                qualif.applications.length - 1
            ];
            qualif.applications.pop();
        }
    }

    function _registerStudent(bytes32 _subjectDid, bytes32 _qualifId, string calldata _id) internal  {
        _qualifToStudentTeacher[_qualifId][_subjectDid] = StudentTeacher(
        "Student",
        _qualifId,
        _id,
        getApplictionByDid(_subjectDid, _qualifId),
        _subjectDid,
        true
        );
    }

    function _registerTeacher(bytes32 _subjectDid, bytes32 _qualifId, string calldata _id) internal {
        _qualifToStudentTeacher[_qualifId][_subjectDid] = StudentTeacher(
            "Teacher",
            _qualifId,
            _id,
            getApplictionByDid(_subjectDid, _qualifId),
            _subjectDid,
            true
        );
    }

    function addNewRole(bytes32 instId, string memory role) public onlyAdmin(instId) {
        require(!roleExists(instId, role), "Role Already Exist");
        _IdToinstitute[instId].userRoles.push(role);
    }

    function addMember(bytes32 instId, bytes32 subjDid, string memory role, string memory infoHash) public onlyAdmin(instId) {
        require(roleExists(instId, role), "Role Doesn't Exist");
        require(!_InstdidToMember[instId][subjDid].registered, "Member Already Registered");
        _InstdidToMember[instId][subjDid] = Member(
            role,     
            infoHash,
            subjDid,
            true
        );
    }

    function rejectApplication(bytes32 _qualifId, uint _index) public onlyAdmin(_idToQualif[_qualifId].instId) {
        //  delete element in the array
        string[] storage qualifs = _idToQualif[_qualifId].applications;
        require(_index < qualifs.length, "Index out of bounds");

        if(_index == qualifs.length - 1){
            qualifs.pop();
        }else{
            qualifs[_index] = qualifs[
                qualifs.length - 1
            ];
            qualifs.pop();
        }
    }

    function applyForQualif(bytes32 _did, bytes32 _qualifId, string memory _hash) public isDidRegistered(_did) isQualifRegistered(_qualifId) {
        _idToQualif[_qualifId].applications.push(_hash);
        _qulifToApplicantInfo[_qualifId][_did] = _hash;
    }
    
    function checkMemberAccess(bytes32 instId, bytes32 subjDid, string memory role) public view isDidRegistered(subjDid) isInstRegistered(instId)  returns(bool){
        return keccak256(bytes(_InstdidToMember[instId][subjDid].role)) == keccak256(bytes(role));
    }

    function checkStudentTeacherAccess(bytes32 subjDid, bytes32 qualifId, string memory role) public view isDidRegistered(subjDid) isQualifRegistered(qualifId) returns(bool){
        return keccak256(bytes(_qualifToStudentTeacher[qualifId][subjDid].role)) == keccak256(bytes(role));
        // emit AccessGranted(subjDid, role);
    }

    function getAllApplications(bytes32 _qualifId) view public isQualifRegistered(_qualifId) onlyAdmin(_idToQualif[_qualifId].instId)   returns(string[] memory){
        // require(_idToQualif[_qualifId].applications.length > 0, "Application doesn't exist");
        return _idToQualif[_qualifId].applications;
    }
    function getApplictionByDid(bytes32 _did, bytes32 _qualifId) public view  onlyAdmin(_idToQualif[_qualifId].instId) isQualifRegistered(_qualifId) returns(string memory){
        require(bytes(_qulifToApplicantInfo[_qualifId][_did]).length > 0, "Application doesn't exist");
        return _qulifToApplicantInfo[_qualifId][_did];
    }   

    function getQualifStudents(bytes32 _qualifId) public view isQualifRegistered(_qualifId) onlyAdmin(_idToQualif[_qualifId].instId) returns(bytes32[] memory){
        return _idToQualif[_qualifId].stds;
    }

    function getQualifTeachers(bytes32 _qualifId) public view isQualifRegistered(_qualifId) onlyAdmin(_idToQualif[_qualifId].instId) returns(bytes32[] memory){
        return _idToQualif[_qualifId].teachers;
    }
    
    function getMember(bytes32 instId, bytes32 subjDid) public view isDidRegistered(subjDid) onlyAdminOrOwner(subjDid, instId) returns(Member memory){
        return _InstdidToMember[instId][subjDid];
    }

    function getStudentById(bytes32 _stdDid, bytes32 _qualifId) public view isDidRegistered(_stdDid)  onlyAdminOrOwner(_stdDid, _idToQualif[_qualifId].instId) returns(StudentTeacher memory){
        return _qualifToStudentTeacher[_qualifId][_stdDid];
    }

    function getTeacherById(bytes32 _teacherDid, bytes32 _qualifId) public view isDidRegistered(_teacherDid) onlyAdminOrOwner(_teacherDid, _idToQualif[_qualifId].instId) returns(StudentTeacher memory){
        return _qualifToStudentTeacher[_qualifId][_teacherDid];
    }

    function generateId(bytes32 didHash, string calldata instName) internal pure returns (bytes32) {
        return bytes32(keccak256(abi.encodePacked(didHash, instName)));
    }

}