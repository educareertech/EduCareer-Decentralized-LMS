import React, { useEffect, useState } from 'react'
import MenuLayout from '../../Components/MenuLayout'
import { ContextState } from '../../Context/useContext';
import { utils } from 'ethers';


function VCManagement() {
  const [schemaId, setSchemaId] = useState();
  const [credentialName, setcredentialName] = useState();
  const [credentialAttributes, setCredentialAttributes] = useState([]);

  const [expiryDate, setExpiryDate] = useState();
  const [subjectDid, setSubjectDid] = useState('');
  const [claimValues, setClaimValues] = useState([]);
  const [registeredSchemaResult, setRegisterdeSchemaResult] = useState([]);

  const { VC_Contract } = ContextState();

  const handleAttributes = async (e) => {
    e.preventDefault();
    const inputValues = e.target.value.split(',').map((value) => value.trim());
    const nonEmptyValues = inputValues.filter((value) => value !== '');
    setCredentialAttributes(nonEmptyValues);
  }

  const handleClaimValues = async (e) => {
    e.preventDefault();
    const inputValues = e.target.value.split(',').map((value) => value.trim());
    const nonEmptyValues = inputValues.filter((value) => value !== '');
    setClaimValues(nonEmptyValues);
  }

  const getProviderProfile = async () => {
    const contract = await VC_Contract(true);
    const did = sessionStorage.getItem('userDid');
    try {
        const providerIds = await contract.getProviderIds(did);
        console.log(providerIds);

        let profiles = [];
        const promises = providerIds.map(async (item)=>{
            const profile = await contract.getProviderProfiles(item);
            // profile
            console.log(profile[0]);
            profiles.push(profile[0]);
            return { profiles }
        })
        const fetched = await Promise.all(promises);
        console.log("Fetched Data", fetched[0].profiles);
        // setProfileDetail(fetched[0].profiles);
    } catch (error) {
        console.log(error)
    }
}


  const createNewCredential = async (e) => {
    e.preventDefault();
    const contract = await VC_Contract(true);
    try {
      const tx = await contract.addCredentialSchema(schemaId, credentialName, credentialAttributes);
      const receipt = await tx.wait();
      const { schemaName, schemaID } = receipt.events[0].args;
      console.log("SchemaID", schemaID, "schemaName", schemaName);
      setSchemaId('');
    } catch (error) {
      console.log(error.message);
    }
  }

  const issueCredential = async (e) => {
    e.preventDefault();
    const contract = await VC_Contract(true);
    const date = await dateToHexTimestamp(expiryDate);
    try {
      console.log(date);
      const tx = await contract.issueCredential(schemaId, subjectDid, date, claimValues)
      const receipt = await tx.wait();
      const issuedId = receipt.events[0].args.subjectDid;
      console.log(issuedId);
    } catch (error) {
      console.log(error.message);
    }
  }

  const dateToHexTimestamp = async (dateString) => {
    const date = new Date(dateString);
    const timeStampInSeconds = Math.floor(date.getTime() / 1000);
    return '0x' + timeStampInSeconds.toString(16);
  }
 

  const getRegisteredSchema = async () => {
    const contract = await VC_Contract(true);
    try {
      const result = await contract.getRegisteredSchemas();
      setRegisterdeSchemaResult(result);
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    const fetch = async () => {
      await getRegisteredSchema();
    }
    fetch();
  },[])
  const menuItems =
    [

      "Provider Profile",
      "New Credential",
      "Issue Credential",
      "Registered VCs"
    ]

  const data = {
    "Provider Profile":
      <div className='newClass'>
        
      </div>,
    "New Credential":
      <div className='newClass'>
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
            <label htmlFor="" className='form-label'>Credential Attributed</label>
            <input onChange={handleAttributes} className='form-control' />
          </div>
          <div className='mt-4'>
            <button type="text" onClick={createNewCredential}>Submit</button>
          </div>
        </form>
      </div>,
    "Issue Credential":
      <div className='newClass'>
        <form action="">
          <div>
            <label htmlFor="" className='form-label'>Credential Id</label>
            <input onChange={(e) => setSchemaId(e.target.value)} className='form-control' type="text" />
          </div>
          <div>
            <label htmlFor="" className='form-label'>Subject Did</label>
            <input onChange={(e) => setSubjectDid(e.target.value)} className='form-control' type="text" />
          </div>
          <div>
            <label htmlFor="" className='form-label'>Expiration Data</label>
            <input onChange={(e) => setExpiryDate(e.target.value)} className='form-control' type="date" />
          </div>
          <div>
            <label htmlFor="" className='form-label'>Claim Values</label>
            <input onChange={handleClaimValues} className='form-control' />
          </div>
          <div className='mt-4'>
            <button type="text" onClick={issueCredential}>Submit</button>
          </div>
        </form>
      </div>,
    "Registered VCs":
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Credential Name</th>
            <th>Credential Id</th>
            <th>Credential Attributes</th>
          </tr>
        </thead>
        <tbody style={{alignItems:'center'}}>
          {registeredSchemaResult &&
            registeredSchemaResult?.map((item) => (
              <tr>
                <td>{item[0]}</td>
                <td>Hello</td>
                <td>
                  <p>{item[2][0]}</p>
                  <p>{item[2][1]}</p>
                  <p>{item[2][2]}</p>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>,
  }
  return (
    <MenuLayout menuItems={menuItems} data={data}>
      <h1>HeLLO Mistri</h1>
    </MenuLayout>
  )
}

export default VCManagement