import React from 'react';
import { Notifications, MarkEmailUnread } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TeacherSideNav(props) {
    const navigate = useNavigate();

    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastPart = urlParts[urlParts.length - 1];

    return (
        <div className='adminDashboard'>
            <div className='sideNav'>
                <div className='sideNavLogoDiv'>
                    <img onClick={() => navigate('/TeacherProfile')} src="officialLogo.jpg" alt="Logo Image" />
                </div>
                <ul>
                    <li onClick={() => navigate('/adminPortal')}>Home</li>
                    <li onClick={() => navigate('/TeacherProfile')}>Profile</li>
                    <li onClick={() => navigate('/AllQualifications')}>Qualification</li>
                    {props.QualifMenu &&
                        props.QualifMenu
                    }
                    <li onClick={() => navigate('/TeacherCert')}>Certificates</li>
                    {props.VCMenu &&
                        props.VCMenu
                    }
                    <li onClick={() => navigate('/AllStudents')}>Students</li>
                    {props.StudentsMenu &&
                        props.StudentsMenu
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
                            <img onClick={() => navigate('/TeacherProfile')} src="mh_.png" alt="Profile Image" />
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

export default TeacherSideNav