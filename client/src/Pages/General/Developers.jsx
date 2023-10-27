import React from 'react'
import FooterLayout from '../../Components/FooterLayout'
import DefaultLayout from '../../Components/DefaultLayout'
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout'

function Developers() {
    return (
        <>
            {!sessionStorage.getItem('userDid') ?
                <DefaultLayout></DefaultLayout> 
                :
                <LoggedInMenuLayout></LoggedInMenuLayout>
            }
            <div className='Developers'>
                <div className='first'>
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
                </div>
            </div>
            <FooterLayout></FooterLayout>
        </>
    )
}

export default Developers
