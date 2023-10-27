import React, { useState } from 'react';
import Modal from 'react-modal';
import QualificationComp from '../../../Components/QualificationComp';
import { ContextState } from '../../../Context/useContext';
import { useNavigate } from 'react-router-dom';

function AddQualifications() {
    const { ipfs, mainContract } = ContextState();
    const navigate = useNavigate();

    const [QualificationForm, setQualificationForm] = useState();
    const [subjects, setSubjects] = useState();
    const [promptIsOpen, setPromptIsOpen] = useState(false);

    const closePrompt = async()=>{
        setPromptIsOpen(false);
    }

    const handleSubjectAttr = async (e) => {
        e.preventDefault();
        const inputValues = e.target.value.split(',').map((value) => value.trim());
        const nonEmptyValues = inputValues.filter((value) => value !== '');
        setSubjects(nonEmptyValues);
    }

    const handleAddQualif = async (e) => {
        setQualificationForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const addQualifToIpff = async () => {
        // const { q_title, q_code, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria, admission_fees, annual_fees, registeration_fees, examintation_fees, certificate_fees, subject_fees } = addQualifForm;
        // console.log("Add Qualification Form", q_title, q_code, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria);
        // const data = JSON.stringify({ q_title, q_code, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria, admission_fees, annual_fees, registeration_fees, examintation_fees, certificate_fees, subject_fees })

        const { q_title, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria } = QualificationForm;
        console.log("Add Qualification Form", q_title, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria);
        const data = JSON.stringify({ q_title, q_level, q_duration, q_semesters, q_exams, subjects, q_entry_criteria, q_passing_criteria })
        try {
            const uploaded = await ipfs.add(data);
            const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
            console.log(url);
            return url;
        } catch (error) {
            console.log("Error while Adding Qualification", error.message);
        }
    }
    const addQualification = async () => {
        const urlHash = await addQualifToIpff();
        const contract = await mainContract(true);
        const { q_title } = QualificationForm;
        let instId = sessionStorage.getItem('InstituteId');
        console.log(instId);
        try {
            const tx = await contract.registerQualif(instId, q_title, urlHash);
            await tx.wait();
            setPromptIsOpen(true);
            console.log(`Successful ~ ${tx.hash}`);
        } catch (error) {
            console.log("Add Qualification: Error:", error.message);
        }
    }

    return (
        <>
            <QualificationComp>
                <div className='addQualifForm'>

                    <form className='d-flex GeneralForm'>
                        <div className='d-flex flex-column '>
                            <label className='form-label' htmlFor="">Qualification Title</label>
                            <input onChange={handleAddQualif} type="text" name="q_title" id="" />

                            <label className='form-label' htmlFor="">Qualification Code</label>
                            <input onChange={handleAddQualif} type="text" name="q_code" id="" />

                            <label className='form-label' htmlFor="">Level</label>
                            <input onChange={handleAddQualif} type="text" name="q_level" id="" />

                            <label className='form-label' htmlFor="">Duration</label>
                            <input onChange={handleAddQualif} type="text" name="q_duration" id="" />

                        </div>
                        <div className='d-flex flex-column ml-3'>
                            <label className='form-label' htmlFor="">Semesters</label>
                            <input onChange={handleAddQualif} type="text" name="q_semesters" id="" />

                            <label className='form-label' htmlFor="">Examination</label>
                            <input type="text" name="q_exams" id="" />

                            <label className='form-label' htmlFor="">Subjects</label>
                            <input onChange={handleSubjectAttr} type="text" name="q_subjects" id="" placeholder='subject1,subject2,subject3' />

                            <label className='form-label' htmlFor="">Qualification Fees</label>
                            <input onChange={handleAddQualif} type="text" name="q_fees" id="" placeholder='Qualification Fees' />


                        </div>
                    </form>
                    <button onClick={addQualification} className='generalButton'>Submit</button>
                </div>

                <Modal className='SmallModal' isOpen={promptIsOpen} onRequestClose={closePrompt}>
                    <div className='GeneralFlexCenterCol'>
                        <h3>Qualification Registered Successfully</h3>
                        <button className='generalButton mr-4' onClick={() => navigate('/AllQualifications')}>Close</button>
                    </div>
                </Modal>
            </QualificationComp>
        </>
    )
}

export default AddQualifications;
