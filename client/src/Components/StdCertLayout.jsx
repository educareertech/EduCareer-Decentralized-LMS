import React from 'react'
import { useNavigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';

function StdCertLayout(props) {
    const navigate = useNavigate();
    return (
        <DefaultLayout>

            <div className='VC-Component'>
                <div className='VC-Component-Menu'>
                    <ul>
                        <li onClick={() => navigate("/ProviderProfile")}>Provider Profile</li>
                        <li onClick={() => navigate("/CreateCertificate")}>Create Certificate</li>
                        <li onClick={() => navigate("/RegisteredCert")}>Registered Certificates</li>
                        <li onClick={() => navigate("/RegisteredCert")}>Issued Certificates</li>
                    </ul>
                </div>
                <div className='VC-Component-Page'>
                    {props.children}
                </div>
            </div>

        </DefaultLayout>
    )
}

export default StdCertLayout;