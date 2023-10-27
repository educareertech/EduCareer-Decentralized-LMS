import React, { useState } from 'react';
import VC_Component from '../../../Components/VC_Component';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { ContextState } from '../../../Context/useContext';


function CreateCertificate() {
    const { VC_Contract } = ContextState();
    const navigate = useNavigate();

    const [schemaId, setSchemaId] = useState();
    const [credentialName, setcredentialName] = useState();
    const [credentialAttributes, setCredentialAttributes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    }
    const handleAttributes = async (e) => {
        e.preventDefault();
        const inputValues = e.target.value.split(',').map((value) => value.trim());
        const nonEmptyValues = inputValues.filter((value) => value !== '');
        setCredentialAttributes(nonEmptyValues);
    }

    const createNewCredential = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        const providerId = sessionStorage.getItem('providerId');
        // const providerId = '0x8dbad2769d51d498b3e1535d10b094c48aa7bf294e097fd6b34906b65bc91a66';
        console.log(providerId)
        try {
            const tx = await contract.addCredentialSchema(providerId, schemaId, credentialName, credentialAttributes);
            setIsLoading(true);
            const receipt = await tx.wait();
            setIsLoading(false);
            const { schemaName, schemaID } = receipt.events[0].args;
            console.log("SchemaID", schemaID, "schemaName", schemaName);
            setSchemaId('');
            setIsOpen(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VC_Component>
            <div className='GeneralForm mt-5 GeneralFlexCenterRow'>
                <form action="">
                    <div>
                        <label htmlFor="" className='form-label'>Credential Id</label>
                        <input onChange={(e) => setSchemaId(e.target.value)} className='form-control' type="text" />
                    </div>
                    <div>
                        <label htmlFor="" className='form-label'>Credential Name</label>
                        <input onChange={(e) => setcredentialName(e.target.value)} className='form-control' type="text" />
                    </div>
                    <div>
                        <label htmlFor="" className='form-label'>Credential Attributes</label>
                        <textarea onChange={handleAttributes} className='form-control' />
                    </div>
                    <div className='mt-4'>
                        <button className='generalButton' type="text" onClick={createNewCredential}>Submit</button>
                    </div>
                </form>
            </div>



            <Modal className='SmallModal GeneralFlexCenterCol' style={{ flexDirection: "column" }} isOpen={isOpen} onRequestClose={closeModal}>
                <h3>Credential Created Successfully</h3>
                <button className='generalButton' onClick={closeModal}>Close</button>
            </Modal>
        </VC_Component>
    )
}

export default CreateCertificate