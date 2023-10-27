import React, { useState } from 'react';
import Modal from 'react-modal';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { ContextState } from '../../Context/useContext';
import jsPDF from 'jspdf';

function CreateInstitute() {
    const { mainContract, VC_Contract, ipfs } = ContextState();

    const [instAttribs, setInstAttribs] = useState();
    const [instituteRoles, setInstituteRoles] = useState();
    const [instTitle, setInstTitle] = useState();
    const [InstituteId, setInstituteId] = useState();
    const [isOpen, setIsOpen] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [logoUrl, setLogoUrl] = useState();
    const [selectedOption, setSelectedOption] = useState('online');


    const certificateTemplate = `
    <html>
    <body>
    <div style="display:flex; flex-direction:column; align-items:center; tex-align: center; color:green; width: 15vw; center; margin-top: 40px;">
            <p style="font-size: 5px;">This is your Unique Identifier of your Institute</p>
            <p style="font-size: 5px;">Keep it safe, so you can use it while loging in your Institute</p>
            <h5 style="font-size: 5px; color: blue;">${InstituteId}</h5>
            
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
                pdf.save('InstituteId.pdf');
            },
        });

        let id = InstituteId;
        navigator.clipboard.writeText(id);
        setIsOpen(false);
    };


    const closeModal = async () => {
        setIsOpen(false);
    }

    const handleInstAttributes = async (e) => {
        e.preventDefault();
        setInstAttribs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Upload Image on IPFS
    const uploadImageToIpfs = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const uploaded = await ipfs.add(file);
        const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
        console.log("Degree Uploaded", uploaded);
        setImageUrl(url);
    }

    // Upload Logo to IPFS
    const uploadLogo = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const uploaded = await ipfs.add(file);
        const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
        console.log("Degree Uploaded", uploaded);
        setLogoUrl(url);
    }

    const uploadInfoToIpfs = async () => {
        const { name, email, about, title, location } = instAttribs;
        const data = JSON.stringify({ name, email, about, title, location, model: selectedOption, imageUrl, logoUrl })
        try {
            const uploaded = await ipfs.add(data);
            const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
            console.log(url);
            return url;
        } catch (error) {
            console.log("Error while Adding Qualification", error.message);
        }
    }


    const handleRoles = async (e) => {
        e.preventDefault();
        const inputValues = e.target.value.split(',').map((value) => value.trim());
        const nonEmptyValues = inputValues.filter((value) => value !== '');
        setInstituteRoles(nonEmptyValues);
    }

    // ===========CREATE INSTITUTE===========
    const createInstitute = async (e) => {
        
        e.preventDefault()

        const contract = await mainContract(true);
        // const CertifContract = await VC_Contract(true);
        const url = await uploadInfoToIpfs();
        // const url = "Ye Hy Hash";
        const did = localStorage.getItem("userDid");
        const { title, about } = instAttribs;
        console.log(title, url, did, instituteRoles);
        try {
            const tx = await contract.registerInstitute(did, title, instituteRoles, url);
            const receipt = await tx.wait();
            console.log("Mr Receipt", receipt);
            const instituteId = receipt.events[0].args.instId;
            setInstituteId(instituteId);

            setSuccessMessage("Institute Created Successfully");
            setIsOpen(true);
        } catch (error) {
            console.log(error);
            setIsOpen(true);
        }
    }

    return (
        <>
            <LoggedInMenuLayout></LoggedInMenuLayout>
            <div className='GeneralForm startApplication GeneralFlexCenterCol'>
                <form className='d-flex'>
                    <div className='d-flex flex-column'>
                        <label htmlFor="">Your Full Name</label>
                        <input onChange={handleInstAttributes} autocomplete="off" name='name' placeholder='Vitalic Buterin' />
                        <label htmlFor="">Your Email</label>
                        <input onChange={handleInstAttributes} autocomplete="off" name='email' placeholder='Enter Your Email' />
                        <label htmlFor="">Your Picture</label>
                        <input onChange={uploadImageToIpfs} autocomplete="off" name='about' type='file' placeholder='About Institute' />
                        <label htmlFor="">Institute Location</label>
                        <input onChange={handleInstAttributes} autocomplete="off" name='location' placeholder='eg. New York' />

                    </div><br />
                    <div className='d-flex flex-column ml-3'>
                        <label htmlFor="">Institute Title</label>
                        <input onChange={handleInstAttributes} autocomplete="off" name='title' placeholder='Enter Institute Title' />
                        <label htmlFor="">Institute Logo</label>
                        <input onChange={uploadLogo} autocomplete="off" name='roles' type='file' placeholder='Upload Logo Image' />
                        <label htmlFor="">Roles (Except Admin,Student,Teacher)</label>
                        <input onChange={handleRoles} autocomplete="off" name='roles' placeholder='Assistant, Chief Executive etc' />

                        <label htmlFor="">Institute Model</label>
                        <div className='RadioButtonDiv'>
                            <input type="radio" value="online" checked={selectedOption === 'online'} onChange={handleOptionChange} />
                            <label> Online </label>
                        </div>
                        <div className='RadioButtonDiv'>
                            <label><input type="radio" value="onsite" checked={selectedOption === 'onsite'} onChange={handleOptionChange} /> On-site </label>
                        </div>
                    </div>
                </form>
                <button onClick={createInstitute} className="generalButton">Submit</button>
            </div>
            <div className='mt-4'>
            </div>



            {/* =========INSTITUTE CREATED MODEL======== */}
            <Modal className='BigModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='bigModalInner'>
                    {InstituteId ?
                        <>
                            <div className='GeneralFlexCenterCol'>
                                <h5 style={{ color: 'rgb(69, 240, 17)' }}>Institute Registered Successfully</h5>
                                <h5>Copy Institute Id and save it.</h5>
                                <h5>Use this Id to login to Institute Admin Portal</h5>
                                {InstituteId?.slice(0, 5) + '...' + InstituteId?.slice(-5)}
                            </div>
                            <div className='btnGroup' style={{ float: "right", marginRight: "1vw", position: "sticky" }}>
                                <button className='generalButton' onClick={closeModal}>Close</button>
                                <button className='generalButton' style={{width:"15vw", padding:".7vw .5vw"}} onClick={() => copyAndDownload()}  >Copy and Download</button>
                            </div>
                        </>
                        :
                        <>
                            <div className='GeneralFlexCenterCol'>
                                <h5 style={{ color: 'rgb(69, 240, 17)' }}>Error: Couldn't Create Institute</h5>
                            </div>
                            <div className='btnGroup' style={{ float: "right", marginRight: "1vw", position: "sticky" }}>
                                <button className='generalButton' onClick={closeModal}>Close</button>
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </>

    )
}

export default CreateInstitute;