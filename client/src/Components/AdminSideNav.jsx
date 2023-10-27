import React, { useEffect, useState } from 'react';
import { Notifications, MarkEmailUnread } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ContextState } from '../Context/useContext';
import axios from 'axios';

function AdminSideNav(props) {
    const navigate = useNavigate();
    const { mainContract } = ContextState();
    const [profileImage, setProfileImage] = useState();
    const [logoImage, setLogoImage] = useState();


    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastPart = urlParts[urlParts.length - 1];

    const getProfileDetail = async () => {
        const contract = await mainContract();
        const did = sessionStorage.getItem('userDid');
        const instId = sessionStorage.getItem('InstituteId');
        try {
            const info = await contract.getMember(instId, did);
            // console.log(info);
            const res = await axios.get(info.infoHash)
            // console.log(res.data);
            setProfileImage(res.data.imageUrl);
            setLogoImage(res.data.logoUrl);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const fetch = async () => {
            await getProfileDetail();
        }
        fetch();
    }, [])
    return (
        <div className='adminDashboard'>
            <div className='sideNav'>
                <div className='sideNavLogoDiv'>
                    {logoImage &&
                        <img src={logoImage} alt="Logo Image" />
                    }
                </div>
                <ul>
                    <li onClick={() => navigate('/adminPortal')}>Home</li>
                    <li onClick={() => navigate('/AdminProfile')}>Profile</li>
                    <li onClick={() => navigate('/AllQualifications')}>Qualifications</li>
                    {props.QualifMenu &&
                        props.QualifMenu
                    }
                    <li onClick={() => navigate('/ViewApplications')}>Applications</li>
                    {props.applicationMenu &&
                        props.applicationMenu
                    }
                    <li onClick={() => navigate('/ProviderProfile')}>VC Management</li>
                    {props.VCMenu &&
                        props.VCMenu
                    }
                    <li onClick={() => navigate('/AllTeachers')}>Teachers</li>
                    {props.TeachersMenu &&
                        props.TeachersMenu
                    }
                    <li onClick={() => navigate('/AllStudents')}>Students</li>
                    {props.StudentsMenu &&
                        props.StudentsMenu
                    }
                    <li>Staff</li>
                </ul>
            </div>
            <div className='AdminSideNavmainContent'>
                <div className='topNav'>
                    <div className='topNavMenu'>
                        <input className='GeneralInput' type="text" placeholder='Search here...' />
                        <div className='topNavMenuRight'>
                            <i><Notifications></Notifications></i>
                            <i><MarkEmailUnread></MarkEmailUnread></i>
                            {profileImage &&
                                <img onClick={() => navigate('/AdminProfile')} src={profileImage} alt="Profile Image" />

                            }
                        </div>
                    </div>
                </div>
                <div className='dynamicContent'>
                    <div className='navigator'>
                        {/* <h3>Dashboard</h3> */}
                        <span>Home/{lastPart}</span>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>

    )
}

export default AdminSideNav