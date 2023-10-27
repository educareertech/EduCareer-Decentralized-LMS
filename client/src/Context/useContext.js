import { useState, createContext, useContext, useEffect } from "react";
import { providers, Contract } from "ethers";
import Web3Modal from 'web3modal';

// -----BLOCKCHAIN SETUP------
import { Identity_Management_Contract, EduCareer_LMS_ABI, EduCareer_LMS_ADDR, ACCESS_MANAGEMENT_ADDRESS, Identity_Management_Abi, VC_CONTRACT_ADDRESS, VC_ABI } from "../Constants";

// --------IPFS SETUP----------
import { create as IPFS } from 'ipfs-http-client';
import { projectId, projectSecretKey } from "../Constants";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
const context = createContext();




const AppContext = (props) => {
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userDid, setUserDid] = useState('');
    const [userAddress, setUserAddress] = useState('');

    // -------GET PROVIDER/SIGNER--------
    const getProviderOrSigner = async (needSigner = false) => {
        try {
            const web3modal = new Web3Modal();
            const provider = await web3modal.connect();
            const web3Provider = new providers.Web3Provider(provider);

            const signer = web3Provider.getSigner();
            const address = await signer.getAddress();
            localStorage.setItem('userAddress', address);

            if (needSigner) {
                return signer;
            }
            return web3Provider;
        } catch (error) {
            console.log("Error: GetProviderOrSigner", error.message);
        }
    }
    //--------GET CONTRACT INSTANCE------
    const accessManagementContract = async (needSigner) => {
        try {
            const signer = await getProviderOrSigner(needSigner);
            const contract = new Contract(Identity_Management_Contract, Identity_Management_Abi, signer, signer);
            return contract;
        } catch (error) {
            console.log("Error Fetchin Account Contract:", error.message);
        }
    }

    const mainContract = async (needSigner) => {
        try {
            const signer = await getProviderOrSigner(needSigner);
            const contract = new Contract(EduCareer_LMS_ADDR, EduCareer_LMS_ABI, signer);
            return contract;
        } catch (error) {
            console.log("Error Fetchin Account Contract:", error.message);
        }
    }

    const VC_Contract = async(needSigner = false) =>{
        try {
            const signer = await getProviderOrSigner(needSigner);
            const contract = new Contract(VC_CONTRACT_ADDRESS, VC_ABI, signer);
            return contract;
        } catch (error) {
            console.log("Error Fetchin Account Contract:", error.message);
        }
    }

    const ipfs = new IPFS({
        url: 'https://ipfs.infura.io:5001/api/v0',
        headers: {
            authorization
        }
    });




    //-----------APPLICATION ACTIVITES--------------------

    return (
        <context.Provider value={{ ipfs, accessManagementContract, setIsLoggedIn, mainContract, getProviderOrSigner, VC_Contract }}>
            {props.children}
        </context.Provider>
    )
}

export const ContextState = () => {
    return useContext(context);
}

export default AppContext;