import React, { useState } from 'react';
import '../Style.css';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../Components/DefaultLayout';
import { ContextState } from '../../Context/useContext';
import { utils } from 'ethers';
import FormLoyout from '../../Components/FormLayout';


function Login() {
    const navigate = useNavigate();
    const {accessManagementContract, getProviderOrSigner, setIsLoggedIn, setUserRole, setUserDid} = ContextState();

    const [did, setDid] = useState('');
    const [wrongCredential, setWrongCredential] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const submitLoginForm = async (e) => {
      e.preventDefault();
      try {
        const contract = await accessManagementContract(true);
        const isVerified = await contract.verifyLogin(did);
        setIsLoading(true);
        if (isVerified) {
          sessionStorage.setItem('userDid', did);
          sessionStorage.setItem('providerId', '');
          setIsLoading(false);
          navigate('/welcome');
        } else {
          setWrongCredential(true);
        }
  
        console.log("Is it verified?", isVerified);
      } catch (error) {
        console.log("Error in Login: ", error);
        setWrongCredential(true);
      }
    }
  
    
    
    
  

    const WelcomeNote = (
      <>
        <h2>Welcome</h2>
        <h5>To Trust in Motion</h5>
        <p className='mt-3'>Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </>
    )
    const renderDesc = () => {
      return <p style={{ color: 'red' }}>You Don't have Access</p>
    }

    const form = (
        <>
        <div>
          <p>{wrongCredential && renderDesc()}</p>
          <input className='GeneralInput' autocomplete="off" name='name' onChange={(e) => setDid(e.target.value)} placeholder='Enter Your Did' />
        </div>
        <button className='FancyButton' onClick={submitLoginForm}>Login</button>
        </>
    )
    return (
        <>
          <FormLoyout WelcomeNote={WelcomeNote} form={form}></FormLoyout>
        </>
    )
}
export default Login