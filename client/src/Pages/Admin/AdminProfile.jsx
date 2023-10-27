import React, { useEffect, useState } from 'react'
import AdminSideNav from '../../Components/AdminSideNav'
import { ContextState } from '../../Context/useContext';
import axios from 'axios';

function AdminProfile() {
    const { mainContract } = ContextState();
    const [userInfo, setUserInfo] = useState();

    const getProfileDetail = async () => {
        const contract = await mainContract();
        const did = sessionStorage.getItem('userDid');
        const instId = sessionStorage.getItem('InstituteId');
        try {
            const info = await contract.getMember(instId, did);
            // console.log(info);
            const res = await axios.get(info.infoHash)
            // console.log(res.data);
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
        console.log(userInfo)
    }, [])

    return (
        <AdminSideNav>
            {userInfo &&
                <>
                    <div className="profileBox boxShadow">
                        <img src={userInfo.ipfsData.imageUrl} alt="" />
                        <h3>{userInfo.ipfsData.name}</h3>
                        <h4>{userInfo.ipfsData.title}</h4>
                    </div>
                    <div className='GeneralTable'>
                        <table className='table table-striped'>
                            <tr>
                                <th>Name</th>
                                <td>{userInfo.ipfsData.name}</td>
                            </tr>
                            <tr>
                                <th>Did</th>
                                <td>{userInfo.flatData.did}</td>
                            </tr>
                            <tr>
                                <th>Profile Image</th>
                                <td><a href={userInfo.ipfsData.imageUrl}>Click here to Open</a></td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td>{userInfo.flatData.role}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userInfo.ipfsData.email}</td>
                            </tr>
                            <tr>
                                <th>Institute Title</th>
                                <td>{userInfo.ipfsData.title}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{userInfo.ipfsData.location}</td>
                            </tr>

                        </table>
                    </div>
                </>
            }

        </AdminSideNav>
    )
}

export default AdminProfile