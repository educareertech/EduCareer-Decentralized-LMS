import React, { useEffect, useState } from 'react'
import PortalLayout from '../../Components/PortalLayout'
import { ContextState } from '../../Context/useContext'

function Certificates() {
    const { VC_Contract } = ContextState();

    const [credentialId, setCredentialId] = useState();
    const [schemaId, setSchemaId] = useState();
    const [credentialName, setCredentialName] = useState();
    const [claimValues, setClaimValues] = useState();
    const [claimAttributes, setClaimAttributes] = useState();
    const [schemaNameArray, setSchemaNameArray] = useState();


    const getMyCertificates = async () => {
        console.log("Inside My Certificates");
        const did = localStorage.getItem('userDid');
        const contract = await VC_Contract(true);
        const credentials = await contract.getUserCredentialIds(did);
        console.log(credentials[0])
        const VCs = await contract.credentials(credentials[0]);
        console.log(VCs);
        // let _schemaArray = [];
        // const promises = credentials.map(async (item) => {
        //     const schemaId = await contract.credentialToSchema(item);
        //     const schema = await contract.schemas(schemaId.toNumber());
        //     console.log("VerifiableCredential", schema)
        //     _schemaArray.push(schema[0]);
        //     return { schemas: _schemaArray, credentials };
        // })
        // const schemaArray = await Promise.all(promises);
        // console.log(schemaArray[0]);
        // setSchemaNameArray(schemaArray[0]);



        // console.log(did);
        // setCredentialId(schemaId.toNumber());
        // setCredentialName(schema[0]);
        // console.log(schema[2]);
        // try {
        //     const [claimValues, schemas] = await contract.getCredential(did);
        //     // // console.log("Claim Values", claimValues);
        //     console.log("Claim Values result", claimValues);
        //     console.log("Schemas", schemas)
        //     setClaimAttributes(schemas);
        //     setClaimValues(claimValues);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const handleButtonClick = async (e, item) => {
        const contract = await VC_Contract(true);
        try {
            const result = await contract.credentialToSchema(e);
            setSchemaId(result.toNumber());
            setCredentialName(item);
            const [claimValues, schemas] = await contract.getCredential(e);
            console.log("Claim Values result", claimValues);
            console.log("Schemas", schemas)
            setClaimAttributes(schemas);
            setClaimValues(claimValues);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getMyCertificates();
        }
        fetch();
    }, [])




    return (
        <PortalLayout>
            <div className='certificate'>
                <div className='btns'>
                    {schemaNameArray?.schemas && schemaNameArray.credentials &&
                        schemaNameArray?.schemas?.map((item, index) => (
                            <button onClick={(e) => handleButtonClick(schemaNameArray.credentials[index], item)}>{item}</button>
                        ))
                    }
                </div>
                {schemaId &&
                    <table className='table certificate-table table-striped'>
                        <thead>
                            <tr>
                                <th>Credential Name</th>
                                <th>Credential Id</th>
                                <th>Credential Attributes</th>
                            </tr>
                        </thead>
                        <tbody style={{ alignItems: 'center' }}>

                            <tr>

                                <td>{credentialName}</td>
                                <td>{schemaId}</td>
                                <tr>
                                    <td>
                                        {
                                            claimAttributes?.map((item) => (
                                                <tr>{item}</tr>
                                            ))

                                        }

                                    </td>
                                    <td>
                                        {
                                            claimValues?.map((item) => (
                                                <tr>{item}</tr>
                                            ))

                                        }

                                    </td>

                                </tr>
                            </tr>

                        </tbody>
                    </table>
                }
            </div>
        </PortalLayout>
    )
}

export default Certificates;



