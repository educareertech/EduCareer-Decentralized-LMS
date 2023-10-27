import React from 'react'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { ArrowBackIosNew  } from '@mui/icons-material'
import FooterLayout from '../../Components/FooterLayout'

function TechServices() {
  return (
    <>
    <LoggedInMenuLayout></LoggedInMenuLayout>
      <div className='TechServices'>
        {/* Dev services */}
        <div className="WebServices">
          <h1>Our Web  Services</h1>
          <div>
            <div >
              <h3>Decentralized Identity Management System</h3>
              <div className='line'></div>
              <p> Our Decentralized Learning Management System (LMS) harnesses the power of blockchain technology and smart contracts to bring you a new era of secure, transparent, and customizable learning experiences. Whether you're an educator looking to build your own institute or a student seeking a more efficient and trusted way to learn, our platform is your key to the future of education. Join us in revolutionizing the way we teach and learn. Welcome to the world of limitless possibilities.</p>
              <button>Learn More</button>
            </div>
            <div >
              <h3>Decentralized Learning Management System</h3>
              <div className='line'></div>
              <p>In a world where personal data is increasingly vulnerable, our Decentralized Identity Management System empowers you to regain control. We provide a cutting-edge solution that leverages blockchain technology to ensure the security, privacy, and portability of your identity information. Whether you're an individual looking to safeguard your personal data or an organization seeking a reliable, tamper-proof identity management system, we have you covered. With our platform, you can access and manage your identity seamlessly, without the need for intermediaries.</p>
              <button>Learn More</button>
              {/* <i><ArrowBackIosNew></ArrowBackIosNew></i> */}
            </div>
          </div>

        </div>
        <div className="WebServices">
          <h1>Our Development Services</h1>
          <div>
            <div >
              <h3>Smart Contract Development</h3>
              <div className='line'></div>
              <p>Elevate your business operations and transactions with our Smart Contract Development services. Our team of experts specializes in crafting smart contracts that are secure, automated, and tailored to your unique needs. Whether you're delving into blockchain technology for the first time or seeking to optimize your existing processes, we're here to streamline your operations, enhance security, and drive efficiency. Take the next step towards a future of trust and automation with our Smart Contract Development services. Your blockchain journey begins here.</p>
              <button>Learn More</button>
            </div>
            <div >
              <h3>DAPP Development</h3>
              <div className='line'></div>
              <p>In the dynamic world of decentralized technology, our DApp Development services are your gateway to innovation. We specialize in crafting custom Decentralized Applications that harness the power of blockchain to revolutionize the way businesses operate. Whether you're looking to build a secure, transparent, and efficient platform for your users or seeking to integrate blockchain into your existing infrastructure, our expert team is here to guide you through the entire development process. From concept to deployment, we tailor DApps that not only meet but exceed your business objectives.</p>
              <button>Learn More</button>
            </div>
          </div>

        </div>
      </div>
      <FooterLayout></FooterLayout>
    </>
  )
}

export default TechServices