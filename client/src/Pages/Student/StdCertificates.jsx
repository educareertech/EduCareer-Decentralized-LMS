import React, { useEffect, useState } from 'react'
import StdCertLayout from '../../Components/StdCertLayout';
import { ContextState } from '../../Context/useContext';
import { BigNumber } from 'ethers';
import DefaultLayout from '../../Components/DefaultLayout';
import CertificateGenerator from '../General/CertificateGenerator';
import StudentSideNav from './StudentSideNav';

function StdCertificates() {
  const { VC_Contract } = ContextState();
  const [schemaNameArray, setSchemaNameArray] = useState();
  // const [selectedCredentialId, setSelectedCredentialId] = useState();
  const [schemaId, setSchemaId] = useState();
  // const [providerId, setProviderId] = useState();
  const [applicantName, setApplicantName] = useState();
  const [credentialName, setCredentialName] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [issuanceDate, setIssuanceDate] = useState();
  const [claimData, setClaimData] = useState();


  // =========== PARSE DATE =========

  const parseDate = async (hex) => {
    const bigNoTime = BigNumber.from(hex);

    const timeMiliSeconds = bigNoTime.mul(1000).toNumber();
    const date = new Date(timeMiliSeconds);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const formated = date.toLocaleDateString('en-US', options);
    console.log(formated);
    return formated;
  }

  const getMyCertificates = async () => {
    const did = sessionStorage.getItem('userDid');
    const contract = await VC_Contract(true);
    console.log(did)
    const credentialIds = await contract.getUserCredentialIds(did);
    let _schemaArray = [];
    let _issuanceDate = [];
    let _schemaId = [];
    let _providerId = [];
    let _applicants = [];
    const promises = credentialIds.map(async (item) => {
      console.log("Item in Get Funciton", item);
      const VC = await contract.credentials(item);
      console.log("VC 2 Lac", VC);

      if (!VC.isRevoked) {
        // ------------------------
        const parsedIssueDate = await parseDate(VC.issuanceDate);
        console.log(parsedIssueDate);
        // ------------------------

        _applicants.push(VC.applicant);
        _providerId.push(VC.providerId);
        const schemaId = VC.schemaId;
        _schemaId.push(schemaId);
        const schema = await contract.CredentialSchemas(schemaId);

        _issuanceDate.push(parsedIssueDate);
        _schemaArray.push(schema[0]);
      }
      return { schemas: _schemaArray, credentialIds, _issuanceDate, _schemaId, _providerId, _applicants };
    })

    const schemaArray = await Promise.all(promises);
    console.log(schemaArray.credentialIds)

    setSchemaNameArray(schemaArray[0]);

  }


  // =======HANDLE WHEN CLICKED ON ANY CERTIFICATE==========
  const handleButtonClick = async (e, item, issuanceDate, providerId, schemaId, applicant) => {
    console.log(e, item, issuanceDate, providerId, schemaId, applicant)
    // setProviderId(providerId);
    const contract = await VC_Contract(true);
    setApplicantName(applicant);
    console.log(issuanceDate);
    try {
      // setSelectedCredentialId(e);
      setSchemaId(schemaId);
      setCredentialName(item);
      setExpiryDate(expiryDate);
      setIssuanceDate(issuanceDate);
      console.log("E in Desired Funciton", e);
      const [claimValues, schemas] = await contract.getCredential(e);
      console.log(claimValues);
      console.log(schemas);

      // Make a single Object From Keys and Values
      const mergedObj = schemas.reduce((result, key, index) => {
        result[key] = claimValues[index];
        return result;
      }, {})
      setClaimData(JSON.stringify(mergedObj));
      console.log(mergedObj);
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

  const subMenu = (
    schemaNameArray?.schemas && schemaNameArray.credentialIds ?
      schemaNameArray?.schemas?.map((item, index) => (
        <span onClick={() => handleButtonClick(schemaNameArray.credentialIds[index], item, schemaNameArray._issuanceDate[index], schemaNameArray._providerId[index], schemaNameArray._schemaId[index], schemaNameArray._applicants[index])}>{item}</span>
      ))
      :
      <li className='credentialBtn'>No Certificates</li>
  )


  return (
    <StudentSideNav StdCertMenu={subMenu}>
      <div>
        {schemaId &&
          <CertificateGenerator data={{ applicantName, credentialName, issuanceDate, claimData }}></CertificateGenerator>
        }
      </div>
    </StudentSideNav>
  )
}

export default StdCertificates;