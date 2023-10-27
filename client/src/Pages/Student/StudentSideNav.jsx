import React from 'react';
import { Notifications, MarkEmailUnread } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function StudentSideNav(props) {
    const navigate = useNavigate();

    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastPart = urlParts[urlParts.length - 1];


    return (
        <div className='adminDashboard'>
            <div className='sideNav'>
                <div className='sideNavLogoDiv'>
                    <img src="officialLogo.jpg" alt="Logo Image" />

                </div>
                <ul>
                    <li onClick={() => navigate('/StudentPortal')}>Home</li>
                    <li onClick={() => navigate('/StudentProfile')}>Profile</li>
                    <li onClick={() => navigate('/StdQualifications')}>Qualification</li>
                    {props.QualifMenu &&
                        props.QualifMenu
                    }
                    <li onClick={() => navigate('/StdCertificates')}>Certificates</li>
                    {props.StdCertMenu &&
                        props.StdCertMenu
                    }
                </ul>
            </div>
            <div className='AdminSideNavmainContent'>
                <div className='topNav'>
                    <div className='topNavMenu'>
                        <input className='GeneralInput' type="text" placeholder='Search here...' />
                        <div className='topNavMenuRight'>
                            <i><Notifications></Notifications></i>
                            <i><MarkEmailUnread></MarkEmailUnread></i>
                            <img src="mh_.png" alt="Profile Image" />
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

export default StudentSideNav