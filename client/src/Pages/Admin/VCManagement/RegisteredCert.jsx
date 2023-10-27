import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import VC_Component from '../../../Components/VC_Component';
import { ContextState } from '../../../Context/useContext';
import { useNavigate } from 'react-router-dom';

function RegisteredCert() {
    const { VC_Contract } = ContextState();
    const navigate = useNavigate();



    const [schemaId, setSchemaId] = useState();
    const [credentials, setCredentials] = useState();
    const [subjectDid, setSubjectDid] = useState();
    const [subjectName, setSubjectName] = useState();
    // const [expiryDate, setExpiryDate] = useState();
    const [claimValues, setClaimValues] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [promptIsOpen, setPromptIsOpen] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }
    const closePrompt = () => {
        setPromptIsOpen(false);
    }


    const openModal = async (attributes, schemaId) => {
        setSchemaId(schemaId);
        setAttributes(attributes);
        setIsOpen(true);
    }

    const handleClaimValues = async (e, index) => {
        e.preventDefault();
        const newValue = e.target.value;

        setClaimValues(prevState => {
            const updatedArray = [...prevState];
            updatedArray[index] = newValue;
            return updatedArray;
        });
    }

    // const dateToHexTimestamp = async (dateString) => {
    //     const date = new Date(dateString);
    //     const timeStampInSeconds = Math.floor(date.getTime() / 1000);
    //     return '0x' + timeStampInSeconds.toString(16);
    // }

    const issueCredential = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        // const date = await dateToHexTimestamp(expiryDate);
        const providerId = sessionStorage.getItem('providerId');
        // const providerId = '0x8dbad2769d51d498b3e1535d10b094c48aa7bf294e097fd6b34906b65bc91a66';
        try {
            const tx = await contract.issueCredential(providerId, subjectName, schemaId, subjectDid, claimValues)
            setIsLoading(true);
            const receipt = await tx.wait();
            const issuedId = receipt.events[0].args.subjectDid;
            setIsLoading(false);
            console.log(issuedId);
            setIsOpen(false);
            setTransactionMessage("Certificate Issued Successfully");
            setPromptIsOpen(true);
        } catch (error) {
            console.log(error.message);
            setTransactionMessage("Couldn't Issue Certificate");
            setPromptIsOpen(true);
        }
    }

    const getRegisteredCert = async () => {
        const contract = await VC_Contract();
        const providerId = sessionStorage.getItem('providerId');
        // const providerId = '0x8dbad2769d51d498b3e1535d10b094c48aa7bf294e097fd6b34906b65bc91a66';
        try {
            const result = await contract.getRegisteredSchemas(providerId);
            console.log(result)
            setCredentials(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getRegisteredCert();
        }
        fetch();
    }, [])

    return (
        <VC_Component>
            <div className="Credentials">
                {/* <h2 className='fancyHeading'>Registered Certificates</h2> */}
                {credentials !== '' ?
                    credentials?.map((item) => (
                        <div className='GeneralTable'>
                            <table>
                                    <tr>
                                        <th>Schema ID</th>
                                        <td>{item.schemaID}</td>
                                    </tr>
                                    <tr>
                                        <th>Schema Name</th>
                                        <td>{item.schemaName}</td>
                                    </tr>
                                    <tr>
                                        <th>Attributes</th>
                                        <td className='attributes'>
                                            {
                                                item.attributes.map((attr) => (
                                                    <tr >{attr}</tr>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                <button onClick={() => openModal(item.attributes, item.schemaID)}>Issue Credential</button>
                                <button onClick={() => navigate(`/IssuedCert/${item.schemaID}`)}>View Issued Credentails</button>
                            </table>
                        </div>
                    ))
                :
                <h4 className='mt-5'>NO INFORMATION TO SHOW</h4>
                }
            </div>


            {/* Modal for issuing certificate */}
            <Modal className='BigModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='IssueCertModalInner'>
                    <form action="">
                        <div>
                            <div>
                                <label htmlFor="" className='form-label'>Subject Did</label>
                                <input onChange={(e) => setSubjectDid(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Subject Name</label>
                                <input onChange={(e) => setSubjectName(e.target.value)} className='form-control' type="text" />
                            </div>
                            {/* <div>
                                        <label htmlFor="" className='form-label'>Expiration Data</label>
                                        <input onChange={(e) => setExpiryDate(e.target.value)} className='form-control' type="date" />
                                    </div> */}

                        </div>
                        <div className='keyValues'>
                            {attributes &&
                                attributes?.map((item, index) => (
                                    <div>
                                        <label htmlFor="" className='form-label'>Enter {item}</label>
                                        <input onChange={(e) => handleClaimValues(e, index)} className='form-control' />
                                    </div>
                                ))
                            }
                        </div>
                        {/* <div className='mt-4'>
                                            <button type="text" onClick={issueCredential}>Submit</button>
                                        </div> */}
                    </form>
                    <div>
                        <button className='generalButton'  onClick={() => setIsOpen(false)}>Close</button>
                        <button className='generalButton' onClick={(e) => issueCredential(e)}>Issue</button>
                    </div>
                </div>
            </Modal>


            {/* ===========PROMPT MODAL=========== */}
            {/* <Modal className='PromptModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='PromptModal-inner'>
                    <h3>{transactionMessage}</h3>
                    <button className='mr-4' onClick={closeModal}>Close</button>
                </div>
            </Modal> */}
        </VC_Component>
    )
}

export default RegisteredCert