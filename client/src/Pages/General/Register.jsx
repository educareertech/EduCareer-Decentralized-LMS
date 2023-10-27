// import React, { useState } from 'react';

// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../Style.css'
// import DefaultLayout from '../../Components/DefaultLayout';
// import { ContextState } from '../../Context/useContext';
// import { utils } from 'ethers';
// import FormLoyout from '../../Components/FormLayout';

// function Register() {
//     const navigate = useNavigate();
//     const { ipfs, address, accessManagementContract } = ContextState();

//     const [wrongCredential, setWrongCredential] = useState(false);
//     const [name, setName] = useState();
//     const [fatherName, setFatherName] = useState();
//     const [surname, setSurname] = useState();
//     const [city, setCity] = useState();
//     const [gender, setGender] = useState();
//     const [email, setEmail] = useState();
//     const [phone, setPhone] = useState();
//     const [nationality, setNationality] = useState();
//     const [CNIC, setCNIC] = useState();
//     const [dob, setDob] = useState();
//     const [postalAddress, setPostalAddress] = useState();


//     const addToIPFS = async (e) => {
//         e.preventDefault();
//         const data = JSON.stringify({ name, fatherName, surname, gender, email, phone, dob, nationality, CNIC, city, postalAddress })
//         try {
//             const added = await ipfs.add(data);
//             const url = `https://digitalverse.infura-ipfs.io/ipfs/${added.path}`;
//             return url;
//         } catch (error) {
//             console.log("Frontend: Error Adding Data to IPFS", error.message)
//         }
//     }

//     const submitSignUpForm = async (e) => {
//         e.preventDefault();
//         const url = await addToIPFS(e);
//         const contract = await accessManagementContract(true);
//         try {
//             const tx = await contract.registerUser(url);
//             const receipt = await tx.wait();
//             const did = receipt.events[0].args.did;
//             console.log("Congratulations You got your did", did);
//             window.alert("Copy and Save your did", did);
//             navigate('/login')
//         } catch (error) {
//             console.log("Erroe Signup: ", error);
//         }
//     }
//     const renderDesc = () => {
//         return <p style={{ color: 'red' }}>You Don't have Access</p>
//     }
//     const form = (
//         <>
//             <div clas style={{ display: 'flex', flexDirection: 'column' }} className='d-flex'>
//                 <p>{wrongCredential && renderDesc()}</p>
//                 <input name='name' onChange={(e) => setName(e.target.value)} placeholder='Enter You Full Name' />
//                 <input name='father_name' onChange={(e) => setFatherName(e.target.value)} placeholder='Enter You Father Name' />
//                 <input name='surname' onChange={(e) => setSurname(e.target.value)} placeholder='Enter You Surname' />
//                 <input name='gender' onChange={(e) => setGender(e.target.value)} placeholder='Enter You Gender' />
//                 <input name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter You Email' />
//                 <input name='phone' onChange={(e) => setPhone(e.target.value)} placeholder='Enter You Phone/Whatsapp' />
//                 <input name='phone' onChange={(e) => setDob(e.target.value)} type='date' placeholder='Enter You Date of Birth' />
//                 <input name='nationality' onChange={(e) => setNationality(e.target.value)} placeholder='Enter You Nationality' />
//                 <input name='nationality' onChange={(e) => setCNIC(e.target.value)} placeholder='Enter You Identity NIC Number' />
//                 <input name='city' onChange={(e) => setCity(e.target.value)} placeholder='Enter You City Name' />
//                 <input name='postal_address' onChange={(e) => setPostalAddress(e.target.value)} placeholder='Enter You Postal Address' />

//             </div>
//             <button onClick={submitSignUpForm}>Login</button>
//         </>

//     )

//     const WelcomeNote = (
//         <>
//             <h2>Welcome</h2>
//             <h5>To Trust in Motion</h5>
//             <p className='mt-3'>Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
//             <button onClick={() => navigate('/register')}>Register</button>
//         </>
//     )

//     return (
//         <>
//             <FormLoyout WelcomeNote={WelcomeNote} form={form}></FormLoyout>
//         </>
//     )
// }
// export default Register;

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Style.css'
import { ContextState } from '../../Context/useContext';
import FormLoyout from '../../Components/FormLayout';
import jsPDF from 'jspdf';

// import Loader from '../../Components/Loader';

function Register() {
    const navigate = useNavigate();
    const { accessManagementContract } = ContextState();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [nationality, setNationality] = useState();
    const [dob, setDob] = useState();
    const [myDid, setMyDid] = useState();


    const closeModal = async () => {
        setIsOpen(false);
    }

    const certificateTemplate = `
    <html>
    <body>
    <div style="display:flex; flex-direction:column; align-items:center; tex-align: center; color:green; width: 15vw; center; margin-top: 40px;">
            <p style="font-size: 5px;">This is your Unique Decentralized Identifier (Did)</p>
            <p style="font-size: 5px;">Keep it safe, so you can use it while loging in any EduCareer Platform</p>
            <h5 style="font-size: 5px; color: blue;">${myDid}</h5>
            
        </div>
    </body>
    </html>
    `;

    const copyAndDownload = () => {
        const doc = new jsPDF();
        // Convert HTML template string to DOM element
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = certificateTemplate;

        // Render the HTML template to the PDF
        doc.html(htmlElement, {
            callback: function (pdf) {
                pdf.save('MyDid.pdf');
            },
        });

        let id = myDid;
        navigator.clipboard.writeText(id);
        setIsOpen(false);
    };


    const dateToHexTimestamp = async (dateString) => {
        const date = new Date(dateString);
        const timeStampInSeconds = Math.floor(date.getTime() / 1000);
        return '0x' + timeStampInSeconds.toString(16);
    }

    const submitSignUpForm = async (e) => {
        e.preventDefault();
        setErrorMessage(undefined);
        const date = await dateToHexTimestamp(dob);
        console.log("Hex Time While Registering", date);
        const contract = await accessManagementContract(true);
        try {
            const tx = await contract.registerUser(name, email, date, nationality);
            setIsLoading(true);
            const receipt = await tx.wait();
            const did = receipt.events[0].args.did;
            setIsLoading(false);
            console.log("Congratulations You got your did", did);
            setMyDid(did);
            setIsOpen(true);
        } catch (error) {
            console.log("Erroe Signup: ", error.message);
            setErrorMessage("Couldn't Register..!\nMake sure to input data correctly")
        }
    }


    const WelcomeNote = (
        <>
            <h2>Welcome</h2>
            <p className='mt-5'>To Trust in Motion  Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
            <button onClick={() => navigate('/login')}>Login</button>
        </>
    )
    const form = (
        <>
            {
                isLoading ?
                    // <Loader color={"#102B7B"}></Loader>
                    <></>
                    :
                    <>  
                        {errorMessage && <p style={{color:'red'}}>{errorMessage}</p> }
                        <form className='d-flex'>
                            <div className='d-flex flex-column'>
                                <input autocomplete="off" name='name' onChange={(e) => setName(e.target.value)} placeholder='Enter Your Full Name' />
                                <input autocomplete="off" name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                            </div><br />
                            <div className='d-flex flex-column ml-3'>
                                <input autocomplete="off" name='birthDate' onChange={(e) => setDob(e.target.value)} type='date' placeholder='Enter Your Date of Birth' />
                                <input autocomplete="off" name='nationality' onChange={(e) => setNationality(e.target.value)} placeholder='Enter Your Nationality' />
                            </div>
                        </form>
                        <button className='FancyButton' onClick={submitSignUpForm}>Register</button>
                    </>
            }

        </>
    )


    return (
        <>
            <FormLoyout WelcomeNote={WelcomeNote} form={form} />

            <Modal className='BigModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='bigModalInner'>
                    <div className='GeneralFlexCenterCol'>
                        <h5 style={{ color: 'rgb(69, 240, 17)' }}>You Have Been Registered</h5>
                        <h5>Copy Your did and save it.</h5>
                        <h5>Now You can use our services by Logging-in by this Did</h5>
                        {myDid?.slice(0, 5) + '...' + myDid?.slice(-5)}
                    </div>
                    <div className='btnGroup'>
                        <button className='generalButton' onClick={closeModal}>Close</button>
                        <button className='generalButton' style={{width:"15vw", padding:".7vw .5vw"}} onClick={() => copyAndDownload()}  >Copy and Download</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Register;

