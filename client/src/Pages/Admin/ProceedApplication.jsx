import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DefaultLayout from '../../Components/DefaultLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextState } from '../../Context/useContext';
import axios from 'axios';
import AdminSideNav from '../../Components/AdminSideNav';

function ProceedApplication() {
    const { mainContract } = ContextState();
    const navigate = useNavigate();
    const params = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [applicationDetails, setApplicationDetails] = useState({});
    const [rollNum, setRollNum] = useState();
    const [transactionMessage, setTransactionMessage] = useState();

    console.log(params.title);
    console.log(sessionStorage.getItem('ApplicationIndex'));


    const closeModal = () => {
        setIsOpen(false);
    }

    const getApplicantInfo = async () => {
        const contract = await mainContract();
        const applicantDid = sessionStorage.getItem('applicantProceeding');
        const qualif_id = params.id;
        console.log(qualif_id);
        console.log(applicantDid);
        try {
            const tx = await contract.getApplictionByDid(applicantDid, qualif_id);
            console.log(tx);
            await tx.map(async (item) => {
                const response = await axios.get(item);
                console.log(response.data.qualifId)
                setApplicationDetails(response.data)
                // if (response.data.qualificationTitle == params.title) {
                //     setApplicationDetails(response.data)
                // } else {
                //     return
                // }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registerApplicant = async () => {
        const contract = await mainContract(true);
        const applicantDid = sessionStorage.getItem('applicantProceeding');
        const role = sessionStorage.getItem('ApplicantRole');
        const qualif_id = params.id;
        const _index = sessionStorage.getItem('ApplicationIndex');
        console.log(applicantDid, qualif_id, _index, rollNum, role);
        
        try {
            const tx = await contract.registerStudentTeacher(applicantDid, qualif_id, _index, rollNum, role);
            await tx.wait();
            setTransactionMessage("Applicant Registered Successfully");
            setIsOpen(true);
        } catch (error) {
            console.log(error);
        }
    }

    const rejectApplication = async () => {
        const contract = await mainContract(true);
        const qualif_id = params.id;
        const _index = sessionStorage.getItem('ApplicationIndex');
        try {
            const tx = await contract.rejectApplication(qualif_id, _index)
            await tx.wait();
            setTransactionMessage("Application Rejected");
            setIsOpen(true);
        } catch (error) {
            console.log(error);
        }
        setTransactionMessage("Applicant Rejected");
        setIsOpen(true);
    }


    useEffect(() => {
        const fetch = async () => {
            await getApplicantInfo();
        }
        fetch();
        console.log(applicationDetails);
    }, [])
    return (
        <AdminSideNav>
            <div className='applicationProceed'>
                <div className='applicationProceedCard GeneralTable'>
                    <input onChange={(e) => setRollNum(e.target.value)} type="text" name="" id="" placeholder='Enter Roll Number' />
                    <div className="applicationProceedCardBtns">
                        <button onClick={rejectApplication}>Reject Application</button>
                        <button onClick={registerApplicant}>Register Applicant</button>
                    </div>
                </div>
            </div>


            <Modal className='SmallModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='GeneralFlexCenterCol'>
                    <h3>{transactionMessage}</h3>
                    <button className='mr-4 generalButton' onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </AdminSideNav>
    )
}

export default ProceedApplication
