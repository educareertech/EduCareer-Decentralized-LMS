import React, { useEffect, useState } from 'react';
import { ContextState } from '../../Context/useContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { BigNumber } from 'ethers';
import PortalLayout from '../../Components/PortalLayout';
import axios from 'axios';
import DefaultLayout from '../../Components/DefaultLayout';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import FooterLayout from '../../Components/FooterLayout';



function UserProfile() {
    const { accessManagementContract, VC_Contract, mainContract } = ContextState();
    const navigate = useNavigate();

    const [profileDetail, setProfileDetail] = useState();
    const [providerDetail, setProviderDetail] = useState();
    const [studentDetail, setStudentDetail] = useState();
    const [allowedDid, setAllowedDid] = useState();
    const [revokeDid, setRevokeDid] = useState();
    const [isOpen, setIsOpen] = useState(false);
    // const [revokeModalOpen, setRevokeModalOpen] = useState(false);
    const [birthday, setBirthday] = useState();
    const [updateProfileOpen, setUpdateProfileOpen] = useState();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [nationality, setNationality] = useState();
    const [dob, setDob] = useState();
    const [myDid, setMyDid] = useState();

    const parseDate = async (hex) => {
        const bigNoTime = BigNumber.from(hex);

        const timeMiliSeconds = bigNoTime.mul(1000).toNumber();
        const date = new Date(timeMiliSeconds);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        const formated = date.toLocaleDateString('en-US', options);
        console.log(formated);
        return formated;
    }

    const closeModal = async () => {
        setIsOpen(false);
    }

    const closeUpdateProfileModal = async () => {
        setUpdateProfileOpen(false);
    }
    // const closeRevokeModal = async () => {
    //     setRevokeModalOpen(false);
    // }


    // const revokeSharing = async (e) => {
    //     e.preventDefault();
    //     const contract = await accessManagementContract(true);
    //     console.log(revokeDid);
    //     try {
    //         const tx = await contract.revokeAccess(revokeDid);
    //         console.log(tx.hash);
    //         setRevokeModalOpen(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const shareData = async (e) => {
        e.preventDefault();
        const contract = await accessManagementContract(true);
        try {
            let result = await contract.allowAccess(allowedDid);
            console.log(result.hash);
            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getDidDocument = async () => {
        const contract = await accessManagementContract(true);
        const did = sessionStorage.getItem('userDid');
        console.log(did)
        try {
            const result = await contract.getDidDocument(did);
            const parsedDate = await parseDate(result.birthdate);
            setBirthday(parsedDate);
            setProfileDetail(result);
        } catch (error) {
            console.log(error);
        }
    }

    const getQualifInfo = async () => {
        const contract = await mainContract();
        const userDid = sessionStorage.getItem('userDid');
        console.log(userDid);
        try {
            const info = await contract.getStudentById(userDid);
            const _resp = await axios.get(info.infoHash);
            console.log(_resp.data);
            const rollNo = info.rollNo;
            setStudentDetail({ rollNo, detail: _resp.data });
        } catch (error) {
            console.log(error);
        }
    }

    const getProviderProfile = async () => {
        const contract = await VC_Contract(true);
        const did = sessionStorage.getItem('userDid');
        try {
            const providerIds = await contract.getProviderIds(did);
            console.log(providerIds);

            let profiles = [];
            const promises = providerIds.map(async (item) => {
                const profile = await contract.getProviderProfiles(item);
                // profile
                console.log(profile);
                profiles.push(profile[0]);
                return { profiles }
            })
            const fetched = await Promise.all(promises);
            console.log("Fetched Data", fetched[0].profiles);
            setProviderDetail(fetched[0].profiles);
        } catch (error) {
            console.log(error)
        }
    }

    // const copyProviderId = (e, providerId) => {
    //     e.preventDefault()
    //     let id = providerId;
    //     navigator.clipboard.writeText(id);
    // }

    // const switchProfile = async (providerId, profileName) => {
    //     sessionStorage.setItem('providerId', providerId);
    //     sessionStorage.setItem('profileName', profileName)
    //     navigate('/welcome');
    // }

    const dateToHexTimestamp = async (dateString) => {
        const date = new Date(dateString);
        const timeStampInSeconds = Math.floor(date.getTime() / 1000);
        return '0x' + timeStampInSeconds.toString(16);
    }

    const submitUpdateInfoForm = async (e) => {
        e.preventDefault();
        const date = await dateToHexTimestamp(dob);
        console.log("Hex Time While Registering", date);
        const contract = await accessManagementContract(true);
        const did = sessionStorage.getItem('userDid');
        try {
            const tx = await contract.updateUserInfo(did, name, email, date, nationality);
            const receipt = await tx.wait();
            const _did = receipt.events[0].args.did;
            console.log("Congratulations You got your did", _did);
            setMyDid(_did);
            window.location.reload()
        } catch (error) {
            console.log("Erroe Update Info: ", error.message);
        }
    }


    useEffect(() => {
        const fetch = async () => {
            await getDidDocument();
            await getProviderProfile();
            await getQualifInfo();
        }
        fetch();
    }, [])

    return (
        <>
            <LoggedInMenuLayout></LoggedInMenuLayout>
            <div className="userProfile">
                <h2 className='fancyHeading'>User Profile</h2>
                <div className="userProfile-btnGroup">
                    <button className='generalButton' onClick={() => setUpdateProfileOpen(true)}>Update Profile</button>
                    <button className='generalButton' onClick={() => setIsOpen(true)} >Share My Info</button>
                    <button className='generalButton' onClick={() => navigate('/CheckInfoAccess')} >Info Access</button>
                </div>
                {profileDetail &&
                    <div className='GeneralTable'>
                        <table >
                            <tr>
                                <th>Name</th>
                                <td>{profileDetail.name}</td>
                            </tr>
                            <tr>
                                <th>Did</th>
                                <td>{sessionStorage.getItem('userDid')}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{profileDetail.userAddress}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{profileDetail.gmail}</td>
                            </tr>
                            <tr>
                                <th>Birthdate</th>
                                <td>{birthday}</td>
                            </tr>
                            <tr>
                                <th>Nationality</th>
                                <td>{profileDetail.nationality}</td>
                            </tr>


                        </table>
                    </div>

                }
                <div className='academicInfo'>
                    {studentDetail &&
                        <>
                            <h3>Academic Information</h3>
                            <table >
                                <tr>
                                    <th>Qualification</th>
                                    <td>{studentDetail.detail.qualificationTitle}</td>
                                </tr>
                                <tr>
                                    <th>Roll Number</th>
                                    <td>{studentDetail.rollNo}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{studentDetail.detail.role}</td>
                                </tr>
                                <tr>
                                    <th>NIC/Passport</th>
                                    <td><a target='_blank' href={studentDetail.detail.profileUrl}>{studentDetail.detail.passportUrl}</a></td>
                                </tr>
                                <tr>
                                    <th>Subjects</th>
                                    < td >
                                        {studentDetail.detail.selectedSubjects &&
                                            studentDetail.detail.selectedSubjects.map((item) => (
                                                item + " "
                                            ))
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Picture</th>
                                    <td><a target='_blank' href={studentDetail.detail.profileUrl}>{studentDetail.detail.profileUrl}</a></td>
                                </tr>
                                <tr>
                                    <th>Degree</th>
                                    <td><a target='_blank' href={studentDetail.detail.degreeUrl}>{studentDetail.detail.degreeUrl}</a></td>
                                </tr>
                            </table>
                        </>
                    }
                </div>
            </div>


            {/* <div className='ProviderProfile'>
                        <h2>Provider Profiles</h2>
                        <table className='table table-striped'>
                            <thead>
                                <th>Provider Name</th>
                                <th>Provider Id</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                {providerDetail &&
                                    providerDetail?.map((item) => (
                                        <tr>
                                            <td>{item.profile}</td>
                                            <td className='tdProviderAddress' onClick={(e)=>copyProviderId(e, item.providerId)}>{item.providerId.slice(0,5) + "......" + item.providerId.slice(-5)}
                                                <span id='CopyToolTip'>Copy</span>
                                            </td>
                                            <td>{item.desciption}</td>
                                            <button onClick={() => switchProfile(item.providerId, item.profile)}>Switch</button>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> */}


            {/* UPDATE PROFILE MODAL */}
            <Modal className="SmallModal" isOpen={updateProfileOpen} onRequestClose={closeUpdateProfileModal}>
                <div >
                    <form className='form' action="">
                        <div className="mb-3">
                            <label htmlFor="subjectDID" className='form-label'>Name</label>
                            <input autocomplete="off" onChange={(e) => setName(e.target.value)} className='form-control' type="text" id="subjectDID" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjectDID" className='form-label'>Email</label>
                            <input autocomplete="off" onChange={(e) => setEmail(e.target.value)} className='form-control' type="text" id="subjectDID" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjectDID" className='form-label'>Birthdate</label>
                            <input autocomplete="off" onChange={(e) => setDob(e.target.value)} className='form-control' type='date' id="subjectDID" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjectDID" className='form-label'>Nationality</label>
                            <input autocomplete="off" onChange={(e) => setNationality(e.target.value)} className='form-control' type="text" id="subjectDID" />
                        </div>
                        <div className='mt-4'>
                            <button onClick={submitUpdateInfoForm} className="generalButton">Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>


                {/* SHARE PERSONAL INFORMATION */}
            <Modal className="SmallModal" isOpen={isOpen} onRequestClose={closeModal}>
                <div>
                    <form className='form' action="">
                        <div className="mb-3">
                            <label htmlFor="subjectDID" className='form-label'>Subject DID</label>
                            <input autocomplete="off" onChange={(e) => setAllowedDid(e.target.value)} className='form-control' type="text" id="subjectDID" />
                        </div>
                        <div className='mt-4'>
                            <button onClick={shareData} className="generalButton">Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* <Modal className="presentCredentialModal d-flex flex-column align-items-center justify-content-center  rounded" isOpen={revokeModalOpen} onRequestClose={closeRevokeModal}>
                        <div className='w-100 presentCredentialModal-div'>
                            <form className='form' action="">
                                <div className="mb-3">
                                    <label htmlFor="subjectDID" className='form-label'>Subject DID</label>
                                    <input onChange={(e) => setRevokeDid(e.target.value)} className='form-control' type="text" id="subjectDID" />
                                </div>
                                <div className='mt-4'>
                                    <button onClick={revokeSharing} className="btn btn-primary">Revoke</button>
                                </div>
                            </form>
                        </div>
                    </Modal> */}

            {/* {sessionStorage.getItem('providerMode') && providerDetail &&
                        <div className='ProviderProfile'>
                            <h3>Provider Profile</h3>

                            <table className='table table-striped'>
                                <tr>
                                    <th>Provider Name</th>
                                    <td>{providerDetail.profile}</td>
                                </tr>
                                <tr>
                                    <th>Provider Id</th>
                                    <td>{providerDetail.providerId}</td>
                                </tr>
                                <tr>
                                    <th>Provider Detail</th>
                                    <td>{providerDetail.desciption}</td>
                                </tr>
                            </table>
                        </div>
                    } */}

            {/* <table className='table table-striped'>
                        <thead>
                            <th>Provider Name</th>
                            <th>Provider Id</th>
                            <th>Description</th>
                        </thead>
                        <tbody>
                            {profileDetail &&
                                profileDetail?.map((item) => (
                                    <tr>
                                        <td>{item.profile}</td>
                                        <td>{item.providerId.slice(0, 5) + "......" + item.providerId.slice(-5)}</td>
                                        <td>{item.desciption}</td>
                                        <button onClick={() => switchProfile(item.providerId)}>Switch</button>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table> */}
            <FooterLayout></FooterLayout>
        </>

    )
}

export default UserProfile
