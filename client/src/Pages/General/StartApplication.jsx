import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DefaultLayout from '../../Components/DefaultLayout';
import { ContextState } from '../../Context/useContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';

function StartApplication() {
    const navigate = useNavigate();
    const params = useParams();

    const { ipfs, mainContract } = ContextState()

    // const [subjects, setSubjects] = useState([]);
    const [promptIsOpen, setPromptIsOpen] = useState(false);

    const [degreeUrl, setDegreeUrl] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [passportUrl, setPassportUrl] = useState('');
    const [fullName, setFullName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [qualificationTitle, setQualificationTitle] = useState('');
    const [role, setRole] = useState('');
    const [degree, setDegree] = useState('');
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [subjects, setSubjects] = useState();

    const [loading, setLoading] = useState(false);


    const closePrompt = async () => {
        setPromptIsOpen(false);
    }

    const handleSubjects = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !selectedSubjects.includes(selectedValue)) {
            setSelectedSubjects([...selectedSubjects, selectedValue])
        }
    }

    // De select Subject 
    const deSelectSubject = (e, subjectToRemove) => {
        e.preventDefault();
        const updatedSubjects = selectedSubjects.filter(
          (subject) => subject !== subjectToRemove
        );
        setSelectedSubjects(updatedSubjects);
      };

    const uploadPicture = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const uploaded = await ipfs.add(file);
        const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
        console.log("Degree Uploaded", uploaded);
        setProfileUrl(url);
    }
    const uploadDegree = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const uploaded = await ipfs.add(file);
        const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
        console.log("Degree Uploaded", uploaded);
        setDegreeUrl(url);
    }
    const uploadPassport = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const uploaded = await ipfs.add(file);
        const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
        console.log("Degree Uploaded", uploaded);
        setPassportUrl(url);
    }
    const uploadToIPFS = async () => {
        const qualifId = params.id;
        const did = sessionStorage.getItem('userDid');
        console.log(fullName, fatherName, qualificationTitle, selectedSubjects, role, degree, degreeUrl, passportUrl)
        const data = JSON.stringify({ did, fullName, fatherName, qualificationTitle, qualifId, selectedSubjects, role, degree, degreeUrl, passportUrl, profileUrl });
        try {
            const added = await ipfs.add(data);
            const url = `https://digitalverse.infura-ipfs.io/ipfs/${added.path}`;
            console.log(url);
            if (url.hash) {
                setApplicationSubmitted(true)
            }
            return url;
        } catch (error) {
            console.log("Error: SubmitApplication", error.message)
        }
    }

    const submitApplication = async (e) => {
        e.preventDefault();
        const url = await uploadToIPFS(e);
        const contract = await mainContract(true);
        const did = sessionStorage.getItem('userDid');
        const qualif_id = params.id;
        console.log("Qualif ID", qualif_id);
        console.log("ID", did);
        try {
            const tx = await contract.applyForQualif(did, qualif_id, url);
            setLoading(true);
            await tx.wait();
            setLoading(false);
            console.log("Transaction Successfull", tx.hash);
            setPromptIsOpen(true);
        } catch (error) {
            console.log("Submit Application Error: ", error.message);
        }
    }




    const getQualifDetail = async () => {
        const contract = await mainContract();
        const qualif_id = params.id;
        try {
            const result = await contract.getQualifById(qualif_id);
            const info = await axios.get(result.qualifInfo);
            setSubjects(info.data.subjects);
            setQualificationTitle(info.data.q_title);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            getQualifDetail();
        }
        fetch();
    }, [])
    return (
        <>
            <LoggedInMenuLayout></LoggedInMenuLayout>
            {!applicationSubmitted ?
                <div className='GeneralForm startApplication GeneralFlexCenterCol'>
                    <form className='' action="">
                        <div className="startApp-inner">
                            <div>
                                <label className='form-label' htmlFor="">Full Name</label>
                                <input onChange={(e) => setFullName(e.target.value)} type="text" name="full_name" id="" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="">Father's Name</label>
                                <input onChange={(e) => setFatherName(e.target.value)} type="text" name="father_name" id="" />
                            </div>

                            <div>
                                <label className='form-label' htmlFor="">Qualification Title</label>
                                <input value={qualificationTitle} type="text" name="qualification_title" id="" />
                            </div>
                            <div >
                                <label className='form-label' name="subject" htmlFor="">Subjects</label>
                                <select value={subjects} onChange={handleSubjects}>
                                    <option value="">Select Subjects</option>
                                    {subjects &&
                                        subjects.map((item) => (
                                            <>
                                                <option value={item}>{item}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            {selectedSubjects &&
                                <div className='selectedSubjectsDiv '>
                                    {selectedSubjects.map((item) => (
                                        <div>
                                            <p>{item} <button onClick={(e) => deSelectSubject(e, item)}>X</button></p>
                                            
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className="startApp-inner">
                            <div>
                                <label className='form-label' htmlFor="">Select Role</label>
                                <select id="" value={role} onChange={(e) => setRole(e.target.value)} name="role">
                                    <option value="">Select Role</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Student">Student</option>
                                </select>
                            </div>
                            <div>
                                <label className='form-label' htmlFor="">Upload Recent Degree</label>
                                <input onChange={uploadDegree} type="file" name="degree" id="" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="">Upload Picture</label>
                                <input onChange={uploadPicture} type="file" name="profile" id="" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="">Upload Passport/NIC</label>
                                <input onChange={uploadPassport} type="file" name="passport" id="" />
                            </div>
                        </div>
                    </form>
                    <div className='subCancelBtn'>
                        <button onClick={() => navigate('/Institutes')} className='generalButton'>Cancel</button>
                        <button className='generalButton' onClick={submitApplication}>Submit Application</button>
                    </div>
                </div>
                :
                <div className="d-flex justify-content-center align-items-center h-100" >
                    <h1>Thank You, Your Application has been submitted</h1>
                </div>
            }


            <Modal className='SmallModal ' isOpen={promptIsOpen} onRequestClose={closePrompt}>
                <div className='GeneralFlexCenterCol'>
                    <h3>Application Submitted Successfully</h3>
                    <button className='generalButton mr-4' onClick={closePrompt}>Close</button>
                </div>
            </Modal>
        </>
    )
}

export default StartApplication