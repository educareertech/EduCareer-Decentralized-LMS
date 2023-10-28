export const projectId = "2DOJC0wv4QSFUWiDOw8ChpQBySv";
export const projectSecretKey = "7335853015c063ff24bc539f8600baa0";
// Local Host Address
// export const EduCareer_LMS_ADDR = '0xa27bC320252d51EEAA24BCCF6cc003979E485860';
// export const Identity_Management_Contract = '0xd0F350b13465B5251bb03E4bbf9Fa1DbC4a378F3';
// export const VC_CONTRACT_ADDRESS = '0x920bE130B50Dc729e778C8b4DcFE5A94D733AbF6';

// Sepolia Addresses
export const EduCareer_LMS_ADDR = '0x9CdD135652905C71e66E6f05e6b9A1517EB4a359';
export const Identity_Management_Contract = '0xC4ECB2aEe4D554Be66eFD2a0F6cAA9b804835f33';
export const VC_CONTRACT_ADDRESS = '0x5Cc867d1eeE73A66eCA5b8b722e59f11AD115a32';

export const EduCareer_LMS_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_didContractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "admin",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            }
        ],
        "name": "InstituteRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "IdentityContract",
        "outputs": [
            {
                "internalType": "contract Identity",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "_adminToInstIds",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "_idToQualif",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "qualifId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "qualifInfo",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "subjDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "infoHash",
                "type": "string"
            }
        ],
        "name": "addMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            }
        ],
        "name": "addNewRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_did",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            }
        ],
        "name": "applyForQualif",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "subjDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            }
        ],
        "name": "checkMemberAccess",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjDid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "qualifId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            }
        ],
        "name": "checkStudentTeacherAccess",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getAllApplications",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllInstitutes",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_did",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getApplictionByDid",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_instId",
                "type": "bytes32"
            }
        ],
        "name": "getInstById",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "admin",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32[]",
                        "name": "qualifs",
                        "type": "bytes32[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "userRoles",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "qulif_count",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct EduCareer_LMS.Institute",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            }
        ],
        "name": "getInstituteQualifs",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "subjDid",
                "type": "bytes32"
            }
        ],
        "name": "getMember",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "role",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "infoHash",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "did",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct EduCareer_LMS.Member",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getQualifById",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "qualifId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "instId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "qualifInfo",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "applications",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bytes32[]",
                        "name": "stds",
                        "type": "bytes32[]"
                    },
                    {
                        "internalType": "bytes32[]",
                        "name": "teachers",
                        "type": "bytes32[]"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct EduCareer_LMS.Qualification",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getQualifStudents",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getQualifTeachers",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_stdDid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getStudentById",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "role",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "qualifId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "rollNo",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "infoHash",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "did",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct EduCareer_LMS.StudentTeacher",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_teacherDid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            }
        ],
        "name": "getTeacherById",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "role",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "qualifId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "rollNo",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "infoHash",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "did",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct EduCareer_LMS.StudentTeacher",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "adminDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_instTitle",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "roles",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "adminInfoHash",
                "type": "string"
            }
        ],
        "name": "registerInstitute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_qualifTitle",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            }
        ],
        "name": "registerQualif",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_appIndex",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            }
        ],
        "name": "registerStudentTeacher",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_qualifId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "rejectApplication",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "instId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "role",
                "type": "string"
            }
        ],
        "name": "roleExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const Identity_Management_Abi =  [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "did",
                "type": "bytes32"
            }
        ],
        "name": "IdentityRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "did",
                "type": "bytes32"
            }
        ],
        "name": "userInfoUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "allowAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedDids",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "ownerDid",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "nationality",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "birthdate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "gmail",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Identity.DidDocument",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "userDid",
                "type": "bytes32"
            }
        ],
        "name": "getDidDocument",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "nationality",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "birthdate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "gmail",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Identity.DidDocument",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getUserDid",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "identities",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "birthdate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "gmail",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "isDidRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ownerToDid",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "gmail",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_birthdate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "revokeAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "revokeAccessByIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_did",
                "type": "bytes32"
            }
        ],
        "name": "revokeDid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_did",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "gmail",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_birthdate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            }
        ],
        "name": "updateUserInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "verifyLogin",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const VC_ABI =  [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_didContractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "credentialId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "CredentialIssued",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "credentialId",
                "type": "bytes32"
            }
        ],
        "name": "CredentialRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "schemaID",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "schemaName",
                "type": "string"
            }
        ],
        "name": "CredentialSchemaCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "FieldsAllowed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "IdentityUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "OwnerUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userDid",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            }
        ],
        "name": "ProviderCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            }
        ],
        "name": "allowedFieldsRevoked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "CredentialSchemas",
        "outputs": [
            {
                "internalType": "string",
                "name": "schemaName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "schemaID",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "IdentityContract",
        "outputs": [
            {
                "internalType": "contract Identity",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_schemaId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_schemaName",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_attributes",
                "type": "string[]"
            }
        ],
        "name": "addCredentialSchema",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "string[]",
                "name": "claimValues",
                "type": "string[]"
            }
        ],
        "name": "allowFields",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "userDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "profile",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desc",
                "type": "string"
            }
        ],
        "name": "becomeProvider",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "credentials",
        "outputs": [
            {
                "internalType": "string",
                "name": "schemaName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "applicant",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "issuanceDate",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRevoked",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "issued",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "ownerDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            }
        ],
        "name": "getAllowedClaimsDids",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "_ownerDid",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedFields",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_credentialId",
                "type": "bytes32"
            }
        ],
        "name": "getCredential",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_providerId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            }
        ],
        "name": "getIssuedCredentialsIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "getProviderIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_providerId",
                "type": "bytes32"
            }
        ],
        "name": "getProviderProfiles",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "providerId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "profile",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desciption",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Verifiable_Credential.Provider[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_providerId",
                "type": "bytes32"
            }
        ],
        "name": "getRegisteredSchemas",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "schemaName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "schemaID",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "attributes",
                        "type": "string[]"
                    }
                ],
                "internalType": "struct Verifiable_Credential.CredentialSchema[]",
                "name": "result",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_userDid",
                "type": "bytes32"
            }
        ],
        "name": "getUserCredentialIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "subjectName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_schemaId",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "string[]",
                "name": "_claimValues",
                "type": "string[]"
            }
        ],
        "name": "issueCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "issuerCredentials",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "providerIdToProvider",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "providerId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "profile",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desciption",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "providerIds",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "providerToSchema",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            }
        ],
        "name": "revokeAllowedFields",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "revokeAllowedFieldsByIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "subjectDid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "schemaId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "revokeCredentialByIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_credentialId",
                "type": "bytes32"
            }
        ],
        "name": "rovokeCredentialById",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "schemaCounter",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_contractAddrr",
                "type": "address"
            }
        ],
        "name": "updateIdentityContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_ownerAddr",
                "type": "address"
            }
        ],
        "name": "updateOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userVCs",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]