import React from 'react'
import { FacebookRounded, LinkRounded, TransferWithinAStationRounded, Twitter, YouTube, AddLocation } from '@mui/icons-material';

function FooterLayout() {
  return (
    <div className='footerLayout'>
      <div className='Row1'>
        <div className='logo'>
            {/* logo image  */}
        </div>
        <div className='footerLayout-right'>
          <div className="icons">
            <a target='_blank' href="https://www.linkedin.com/company/educareertech/"><LinkRounded /></a>
            <a target='_blank' href="https://www.facebook.com/EduCareertech"><FacebookRounded /></a>
            <a target='_blank' href=""><Twitter /></a>
            <a target='_blank' href="https://www.youtube.com/@EduCareertech."><YouTube /></a>
          </div>
          <div className='footerMenu'>
            <li>Contact Us |</li>
            <li>Terms And Conditions | </li>
            <li>Notices | </li>
            <li>Bug Reporting | </li>
          </div>
        </div>
      </div>
      <div className='Row2'>
        <div className='services'>
          <h3>Services</h3>
          <div>
            <p>Online Education</p>
            <p>On-Campus Education</p>
            <p>Blockchain Development</p>
            <p>Consultancy</p>
          </div>
        </div>
        <div className='contactInfo'>
          <h3>Contact Info</h3>
          <div>
            <div className='contactBox'>
              <i><AddLocation></AddLocation></i><p>EduCareer - Corporate Office (Admission, Information, Fee and Business Operations) New Sukkur Society, Shikarpur Road Opposite Al Sajjad Restaurant Sukkur - Sindh - Pakistan sohail@educareer.tech, waqas.educareer@gmail.com, +92 3000654909, +92 3000654925</p>
            </div>
            <div className="contactBox">
              <i><AddLocation></AddLocation></i><p>Al Shifa Trust Eye Hospital Campus: EduCareer Sindh Institute, Al Shifa Trust Eye Hospital, Opposite Sindh High Court Sukkur - Sindh - Pakistan Shikarpur Road Campus: EduCareer Sindh Institute, New City Society, Shikarpur Road Opposite Al Sajjad Restaurant Sukkur - Sindh - Pakistan</p>
            </div>
            <div className="contactBox">
              <i><AddLocation></AddLocation></i><p>EduCareer Online: EduCareer Corporate Office, New City Society, Shikarpur Road Opposite Al Sajjad Restaurant Sukkur - Sindh - Pakistan Email: sohail@educareer.tech Web: https://educareer.tech +92 3000654925 EduCareer - Blockchain Training and Development EduCareer Corporate Office, New City Society, Shikarpur Road Opposite Al Sajjad Restaurant Sukkur - Sindh - Pakistan Email: sohail@educareer.tech Web: https://educareer.tech +923000654925</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default FooterLayout
