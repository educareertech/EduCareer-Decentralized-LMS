import React from 'react'
import DefaultLayout from './DefaultLayout'
import { useNavigate } from 'react-router-dom'
import AdminSideNav from './AdminSideNav';

function QualificationComp(props) {
    const navigate = useNavigate();

    const submenu = (
        <>
            <span onClick={() => navigate("/AllQualifications")}>All Qualifications</span>
            <span onClick={() => navigate("/AddQualification")}>Add Qualification</span>
            {/* <span onClick={() => navigate("/RegisteredCert")}>Registered Certificates</span>
            <span onClick={() => navigate("/RegisteredCert")}>Issued Certificates</span> */}
        </>
    )
    return (
        <>
            <AdminSideNav QualifMenu={submenu}>
                <div className='VC-Component'>
                    {props.children}
                </div>
            </AdminSideNav>
        </>
    )
}

export default QualificationComp
