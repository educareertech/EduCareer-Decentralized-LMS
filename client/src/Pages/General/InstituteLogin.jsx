import React, { useState } from 'react'
import { ContextState } from '../../Context/useContext';
import { useNavigate } from 'react-router-dom';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';

function InstituteLogin() {
    const { mainContract } = ContextState();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const [instituteInfo, setInstituteInfo] = useState();
    const [role, setRole] = useState();
    const [NoAccessMessage, SetNoAccessMessage] = useState(undefined);
    const [QualifField, setQualifField] = useState(false);
    const [otherOption, setOtherOption] = useState(false);
    const [loginRole, setLoginRole] = useState();
    const [instId, setInstId] = useState();
    const [qualificationId, setQualificationId] = useState();


    const closeModal = async () => {
        setIsOpen(false);
    }

    const handleRoleChange = async (e) => {
        const contract = await mainContract(true);
        setLoginRole(e.target.value);
        SetNoAccessMessage(undefined);
        // If "Teacher" or "Student" is selected, show the additional input
        if (e.target.value === 'Teacher' || e.target.value === 'Student') {
            setQualifField(true); // Reset the additional input field
            setOtherOption(false);
        } else if (e.target.value === 'Other') {
            setQualifField(false);
            setOtherOption(true)
            try {
                const result = await contract.getInstById(instId);
                console.log(result);
                setInstituteInfo(result);
            } catch (error) {
                console.log(error)
            }
        } else {
            setQualifField(false);
            setOtherOption(false)
        }
    };


    // When Entered Institute Id, Fetch Institute Informtion
    const fetchInstInfo = async (e) => {
        e.preventDefault();
        const contract = await mainContract();
        const did = sessionStorage.getItem('userDid');

        if (loginRole == "Admin") {
            try {
                const access = await contract.checkMemberAccess(instId, did, loginRole);
                if (access) {
                    navigateToPortal('Admin')
                    sessionStorage.setItem('InstituteId', instId);
                    sessionStorage.setItem("InstituteAdmin", did);
                } else {
                    SetNoAccessMessage(`You are not registered as ${loginRole}`);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (loginRole == "Teacher" || loginRole == "Student") {
            try {
                const access = await contract.checkStudentTeacherAccess(did, qualificationId, loginRole);
                sessionStorage.setItem('qualif_id', qualificationId);
                console.log("Login as Teacher, Student", access)
                if (access) {
                    navigateToPortal(loginRole)
                    loginRole == "Teacher" ?
                        sessionStorage.setItem('InstituteTeacher', did)
                        :
                        sessionStorage.setItem('InstituteStudent', did)
                } else {
                    SetNoAccessMessage(`You are not registered as ${loginRole}`);
                }
            } catch (error) {
                console.log(error);
            }

        } else if (loginRole == "Other") {

        }
    }



    // Navigate to portal if User is registered
    const navigateToPortal = async (role) => {
        switch (role) {
            case "Admin":
                navigate('/AdminPortal')
                sessionStorage.setItem('userRole', 'Admin');
                break;
            case "Teacher":
                navigate('/TeacherPortal')
                sessionStorage.setItem('userRole', 'Admin');
                break;
            case "Student":
                navigate('/StudentPortal')
                sessionStorage.setItem('userRole', 'Student');
                break;
            default:
                break;
        }
    }

    return (
        <>

            <LoggedInMenuLayout></LoggedInMenuLayout>

            <div className='GeneralFlexCenterCol mt-5 mb-5'>
            <button style={{marginLeft:"70vw"}} className='generalButton' onClick={() => navigate('/Institutes')} >Login Menually</button>
                <form className='GeneralForm GeneralFlexCenterCol ' action="">
                    {NoAccessMessage &&
                        <p style={{ color: "red" }}>{NoAccessMessage}</p>

                    }
                    <div className="mb-3">
                        <label htmlFor="subjectDID" className='form-label'>Institute Id</label>
                        <input onChange={(e) => setInstId(e.target.value)} autocomplete="off" className='form-control' type="text" id="subjectDID" />
                    </div>
                    <select className='form-control' onChange={handleRoleChange}>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other</option>
                    </select>
                    {QualifField &&
                        <>
                            <label htmlFor="subjectDID" className='form-label'>Qualification Id</label>
                            <input onChange={(e) => setQualificationId(e.target.value)} autocomplete="off" className='form-control' type="text" id="subjectDID" />
                        </>
                    }
                    {otherOption && instituteInfo &&
                        <select className='form-control mt-4' onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            {
                                instituteInfo.userRoles?.map((item) => (
                                    <option value="Admin">{item}</option>
                                ))
                            }
                        </select>
                    }
                    <div >
                        <button onClick={fetchInstInfo} className="generalButton mt-4">Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default InstituteLogin
