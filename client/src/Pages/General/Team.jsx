import React from 'react'
import FooterLayout from '../../Components/FooterLayout'
import DefaultLayout from '../../Components/DefaultLayout'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'
import { Email, Link, GitHub } from '@mui/icons-material';

function Team() {
    return (
        <>
            {!sessionStorage.getItem('userDid') ?
                <DefaultLayout></DefaultLayout>
                :
                <LoggedInMenuLayout></LoggedInMenuLayout>
            }
            <div className='Team'>
                <div className='team-heading'>
                    <h3>OUR TEAM MEMBERS</h3>
                    <h5>MEET OUR TEAM !</h5>
                </div>
                <div className='teamBoxes'>
                    <div className='firstRow'>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="sohail.jpeg" alt="" />
                            </div>
                            <h4>Sohail Shafique Ghuncha</h4>
                            <h6>Chief Executive/ Blockchain Professional</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank' href='https://github.com/educareertech'><GitHub></GitHub></a></i>
                                <i><a target='_blank' href='https://www.linkedin.com/in/ghuncha/'><Link></Link></a></i>
                                <i><a target='_blank' href='mailto:sohail@educareer.tech'><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="mh_.png" alt="" />
                            </div>
                            <h4>Mehboob Hassan</h4>
                            <h6>Full-Stack Blockchain Developer</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank' href='https://github.com/Mehboob-Hassan'><GitHub></GitHub></a></i>
                                <i><a target='_blank' href='https://www.linkedin.com/in/mehboob-hassan-01806a263/'><Link></Link></a></i>
                                <i><a target='_blank' href='mailto:mhgajju@gmail.com'><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="ahmad.jpeg" alt="" />
                            </div>
                            <h4>Ahmad Sohail</h4>
                            <h6>Blockchain Intern</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank' ><GitHub></GitHub></a></i>
                                <i><a target='_blank'><Link></Link></a></i>
                                <i><a target='_blank'><Email></Email></a></i>
                            </div>
                        </div>
                    </div>
                    <div className='secondRow'>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="fem_user.png" alt="" />
                            </div>
                            <h4>Zainab Zahra</h4>
                            <h6>Cyber Security Intern</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank'><GitHub></GitHub></a></i>
                                <i><a target='_blank'><Link></Link></a></i>
                                <i><a target='_blank'><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="fem_user.png" alt="" />
                            </div>
                            <h4>Bakhtawar</h4>
                            <h6>Cyber Security Intern</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank'><GitHub></GitHub></a></i>
                                <i><a target='_blank'><Link></Link></a></i>
                                <i><a target='_blank'><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="fem_user.png" alt="" />
                            </div>
                            <h4>Aisha Kanwal</h4>
                            <h6>Cyber Security Intern</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank'><GitHub></GitHub></a></i>
                                <i><a target='_blank'><Link></Link></a></i>
                                <i><a target='_blank'><Email></Email></a></i>
                            </div>
                        </div>
                        <div className="box">
                            <div className="imageDiv GeneralFlexCenterRow">
                                <img src="hamza.webp" alt="" />
                            </div>
                            <h4>Hamza Tahir</h4>
                            <h6>Cyber Security Intern</h6>
                            {/* <p>Leorem Epsum something is written here, which I am going to replace</p> */}
                            <div className='socialIcons'>
                                <i><a target='_blank'><GitHub></GitHub></a></i>
                                <i><a target='_blank'><Link></Link></a></i>
                                <i><a target='_blank'><Email></Email></a></i>
                            </div>
                        </div>

                    </div>

                    {/* <div className='first'>
                        <div className='dev-card'>
                            <h4>-Idea and Requirements By</h4>
                            <div className='dev-card-inner'>
                                <img src="sohail.jpeg" alt="" />
                                <h3>Sohail Shafique</h3>
                                <h5>Education Development, Management <br />
                                    and Blockchain Professional</h5>
                                <button><a target='_blank' href='https://www.linkedin.com/in/ghuncha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>See Profile</a></button>
                            </div>
                        </div>
                    </div>
                    <div className='second'>
                        <div className='dev-card'>
                            <h4>-Designed and Developed By</h4>
                            <div className='dev-card-inner'>
                                <img src="mh_.png" alt="" />
                                <h3>Mehboob Hassan</h3>
                                <h5>Full Stack Blockchain Developer</h5>
                                <button><a target='_blank' href='https://www.linkedin.com/in/mehboob-hassan-01806a263/'>See Profile</a></button>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
            <FooterLayout></FooterLayout>
        </>
    )
}

export default Team
