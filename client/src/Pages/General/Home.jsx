import React from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultLayout from '../../Components/DefaultLayout'
import FooterLayout from '../../Components/FooterLayout'
// import { SevereColdIcon } from '@mui/icons-material';
import { Hub, CardMembershipRounded, Engineering, Category, CastForEducation, ManageAccounts, HealthAndSafety } from '@mui/icons-material';


function Home() {
  const navigate = useNavigate()
  return (
    <>
      <DefaultLayout></DefaultLayout>
      <div className="LandingPage" >
        <div className='mainPage'>
          <div className='mainPageLeft'>
            <div className=''>
              <h5 style={{ color: "gray" }}>Blockchain Development and Training</h5>
              <h1>Creating better</h1>
              <h1><b>Decentralised Solutions</b></h1>
              <p>EduCareer is a leading provider of online training in Web3 and Blockchain Technology, with a focus on developing Decentralized Applications (DApps) for promoting transparency, security, and sustainability in government and social sector organizations. Our mission is to create an ecosystem of Decentralized Autonomous Organizations (DAOs) to reduce poverty, unemployment, and economic challenges for the youth of the world community. We offer comprehensive training programs in various areas of Blockchain technology and DApp development, including Ethereum, Hyperledger, and Corda. Our courses are designed to provide students with hands-on experience through interactive labs and real-time projects, enabling them to acquire the necessary skills to succeed in the Blockchain industry.</p>
              <button className='FancyButton' onClick={() => navigate('/login')}>Start Now</button>
            </div>
          </div>
          <div className='mainPageRight'>
            <img src="LandingImg2.jpg" alt="Image" />
          </div>
        </div>


        {/* ============OUR SERVICES================ */}
        <div className='Servcies'>
          <div className="ServicesHeadings">
            <h3>Services</h3>
            <h2>What we do</h2>
          </div>
          <div className="ServicesCards">
            <div className='cardBox'>
              <i><Engineering></Engineering></i>
              <h5><b>Emerging Technology Qualifications</b></h5>
              <p>Providing online Diploma in Emerging Technology (Cyber Security, Data Science, AI, IoT)</p>
            </div>
            <div className='cardBox'>
              <i><Category></Category></i>
              <h5><b>Blockchain Development</b></h5>
              <p>Developing Dapps for online education system in integration with Emerging Technologies</p>
            </div>
            <div className='cardBox'>
              <i><CardMembershipRounded></CardMembershipRounded></i>
              <h5><b>Conventional Education</b></h5>
              <p>EduCareer Sindh Institute Sukkur is providing on-campus education in Degree and Diploma programs.</p>
            </div>
          </div>
        </div>


        {/* =============MISSION AND VISION============= */}
        <div className='visionAndMission'>
          <div className='visionAndMissionLeft GeneralFlexCenterCol'>
            <img src="vision3.avif" alt="vision Image" />
          </div>
          <div className='visionAndMissionRight GeneralFlexCenterCol'>
            <div className="visionAndMissionRight-Inner">
              <div className='visionBox'>
                <i><Hub></Hub></i><h3>Mission</h3>
              </div>
              <p>Providing quality, cost-effective, and internationally recognised qualifications to meet the challenges of the 4th Industrial Revolution</p>
              <div className='visionBox'>
                <i><Hub></Hub></i><h3>Vision</h3>
              </div>
              <p>EduCareer has a vision of personality development of the youth to have success through serving Humanity.</p>
              <div className='visionBox'>
                <i><CardMembershipRounded></CardMembershipRounded></i><h3>Certified Company</h3>
              </div>
              <p>EduCareer (SMC-Private) Limited Islamabad - Pakistan is a registered education company with the Security Exchange Commission of Pakistan (SECP), Govt. of Pakistan and has collaboration with Putra International College Melaka Malaysia, Federal Board of Intermediate and Secondary Education (FBISE) Islamabad and Health Services Academy (HSA) Islamabad, Govt. of Pakistan.</p>
            </div>
          </div>
        </div>


        {/* ============OUR MASTERS================ */}
        <div className='Masters'>
          <div className="ServicesHeadings">
            <h3>Our Masters</h3>
            <h2>What We are Serving</h2>
          </div>
          <div className="MasterCards">
            <div className='cardBox'>
              <i><CastForEducation ></CastForEducation></i>
              <h5><b>Overseas Community</b></h5>
              <p>Providing internationally recognized, cost-effective qualifications for low-income overseas families.</p>
            </div>
            <div className='cardBox'>
              <i><ManageAccounts></ManageAccounts></i>
              <h5><b>Working Professionals</b></h5>
              <p>Providing internationally recognized, cost-effective qualifications for working professionals</p>
            </div>
            <div className='cardBox'>
              <i><HealthAndSafety></HealthAndSafety></i>
              <h5><b>Health Professionals</b></h5>
              <p>Providing Govt. Online Health Post-Graduate Diplomas for Health Professionals across the Globe</p>
            </div>
            <div className='cardBox'>
              <i><Engineering></Engineering></i>
              <h5><b>Emerging Professionals</b></h5>
              <p>Preparing Professionals for 4th Industrial Revolution in Emerging and Health Technologies</p>
            </div>
          </div>
        </div>
      </div>
      <FooterLayout></FooterLayout>
    </>
  )
}

export default Home

