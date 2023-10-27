import React from 'react'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { useNavigate } from 'react-router-dom';
import FooterLayout from '../../Components/FooterLayout';

function PrePortal() {

  const navigate = useNavigate();

  return (
    <>
      <LoggedInMenuLayout></LoggedInMenuLayout>
      <div className="">
        <section className='LMSPortal'>
          <div className="LMSPortalLeft GeneralFlexCenterCol">
            <div className='GeneralFlexCenterCol'>
              <h1>EduCareer Learning Management System</h1>
              <p>At EduCareer, we're rewriting the script on education. Our Decentralized Learning Management System (LMS) harnesses the power of blockchain technology and smart contracts to bring you a new era of secure, transparent, and customizable learning experiences. Whether you're an educator looking to build your own institute or a student seeking a more efficient and trusted way to learn, our platform is your key to the future of education. Join us in revolutionizing the way we teach and learn. Welcome to the world of limitless possibilities. Welcome to EduCareer.</p>
            </div>
          </div>
          <div className="LMSPortalRight GeneralFlexCenterRow">
            {/* <img src="LMSDesign.png" alt="EDUCAREER LMS" /> */}
            <div className='GeneralFlexCenterCol'>
              <h1>REVOLUTIONIZE EDUCATION WITH BLOCKCHAIN</h1>
              <p>EDUCAREER LEARNING MANAGEMENT SYSTEM</p>
              <span style={{ color: "red" }}>Already Subscribed?</span>
              <button onClick={() => navigate("/InstituteLogin")} className='FancyButton'>Navigate to Portal</button>
            </div>
          </div>
        </section>

        <section className='LMSPrices GeneralFlexCenterRow'>
          <div className='PriceBoxes'>
            <div className='Box'>
              <h2>Monthly Service</h2>
              <p>Pay <span>$19</span> Per Month</p>
              <div className='lineDiv'></div>
              <ul>
                <li>Starter Features plus</li>
                <li>99.9% uptime</li>
                <li>DID Protected</li>
                <li>User Support and Assistance</li>
                <li>Regular Updates and Maintenance</li>
              </ul>
              <button onClick={() => navigate('/CreateInstitute')} className='FancyButton'>Subscribe</button>
            </div>
            <div className='Box'>
              <h2>Yearly Service</h2>
              <p>Pay <span>$220</span> Per Year</p>
              <div className='lineDiv'></div>
              <ul>
                <li>Starter Features plus </li>
                <li>99.9% uptime</li>
                <li>DID Protected</li>
                <li>User Support and Assistance</li>
                <li>Regular Updates and Maintenance</li>
              </ul>
              <button onClick={() => navigate('/CreateInstitute')} className='FancyButton'>Subscribe</button>
            </div>
          </div>
        </section>
      </div>
  
      <FooterLayout></FooterLayout>
    </>
  )
}

export default PrePortal;



