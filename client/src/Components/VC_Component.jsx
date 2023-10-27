import React from 'react'
import DefaultLayout from './DefaultLayout'
import { useNavigate } from 'react-router-dom'
import AdminSideNav from './AdminSideNav';

function VC_Component(props) {
    const navigate = useNavigate();

    const submenu = (
        <>
            <span onClick={() => navigate("/ProviderProfile")}>Provider Profile</span>
            <span onClick={() => navigate("/CreateCertificate")}>Create Certificate</span>
            <span onClick={() => navigate("/RegisteredCert")}>Registered Certificates</span>
            <span onClick={() => navigate("/RegisteredCert")}>Issued Certificates</span>
        </>
    )
    return (
        <>
            <AdminSideNav VCMenu={submenu}>
                <div className='VC-Component'>
                    {props.children}
                </div>
            </AdminSideNav>
        </>
    )
}

export default VC_Component
