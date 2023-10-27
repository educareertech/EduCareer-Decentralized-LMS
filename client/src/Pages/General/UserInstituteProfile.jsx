import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ContextState } from '../../Context/useContext';


function UserInstituteProfile() {
    const { mainContract } = ContextState();
    const [userInfo, setUserInfo] = useState();


    const getProfileDetail = async () => {
        const contract = await mainContract();
        const did = sessionStorage.getItem('userDid');
        const qualif_Id = sessionStorage.getItem('qualif_id');
        const instId = sessionStorage.getItem('InstituteId');
        console.log(instId);
        if (sessionStorage.getItem('userRole') == 'Admin') {
            try {
            } catch (error) {
                const info = await contract.getMember(instId, did);
                console.log(info);
            }
        } else if (sessionStorage.getItem('userRole') == 'Teacher') {
            const info = await contract.getTeacherById(did, qualif_Id);
            console.log(info);

        } else if (sessionStorage.getItem('userRole') == 'Student') {
            const info = await contract.getStudentById(did, qualif_Id);
            console.log(info);
        }
        try {
            const info = await contract.getTeacherById(did, qualif_Id);
            console.log(info)
            const res = await axios.get(info.infoHash)
            setUserInfo({ flatData: info, ipfsData: res.data });
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const fetch = async () => {
            await getProfileDetail();
        }
        fetch();
    },[])
    return (
        <>
            
            {userInfo &&
                <>
                    <div className="profileBox boxShadow">
                        <img src={userInfo.ipfsData.profileUrl} alt="" />
                        <h3>{userInfo.ipfsData.fullName}</h3>
                        <h4>{userInfo.flatData.rollNo}</h4>
                    </div>
                    <div className='GeneralTable'>
                        <table className='table table-striped'>
                            <tr>
                                <th>Name</th>
                                <td>{userInfo.ipfsData.fullName}</td>
                            </tr>
                            <tr>
                                <th>F/Name</th>
                                <td>{userInfo.ipfsData.fatherName}</td>
                            </tr>
                            <tr>
                                <th>Profile Image</th>
                                <td><a href={userInfo.ipfsData.profileUrl}>Click here to Open</a></td>
                            </tr>
                            <tr>
                                <th>Degree</th>
                                <td><a href={userInfo.ipfsData.degreeUrl}>Click here to Open</a></td>

                            </tr>
                            <tr>
                                <th>NIC</th>
                                <td><a href={userInfo.ipfsData.passportUrl}>Click here to Open</a></td>
                            </tr>
                            <tr>
                                <th>Subjects</th>
                                <td>
                                    {userInfo.ipfsData.selectedSubjects?.map((item) => (
                                        item + ", "
                                    ))

                                    }</td>
                            </tr>
                            <tr>
                                <th>Did</th>
                                <td>{userInfo.flatData.did}</td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td>{userInfo.flatData.role}</td>
                            </tr>
                            <tr>
                                <th>Role Number</th>
                                <td>{userInfo.flatData.rollNo}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{userInfo.flatData.qualifId}</td>
                            </tr>

                        </table>
                    </div>
                </>
            }
        </>
    )
}

export default UserInstituteProfile