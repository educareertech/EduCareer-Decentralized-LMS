import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import { ContextState } from '../Context/useContext';

function LoggedInMenuLayout() {

  const navigate = useNavigate();







  return (
    <>
      <DefaultLayout></DefaultLayout>
      <div className='LoggedIn-menu'>
        {sessionStorage.getItem('providerId') &&
          <h3>{sessionStorage.getItem('profileName')}</h3>
        }
        <ul>
          <li onClick={() => navigate('/welcome')}>Home |</li>
          <li onClick={() => navigate('/PrePortal')}>Portal |</li>
          <li onClick={() => navigate('/TechServices')}>Tech Services |</li>
          <div className="getInfo-dropdown">
            <li>Education |</li>
            <div className="getInfo-dropdown-content">
              <ul>
                <li onClick={() => navigate('/Institutes')}>Institutes</li>
                <li onClick={() => navigate('/Qualification')}>Qualifications</li>
                <li onClick={() => navigate('/GetUserInfo')}>Online Education</li>
                <li onClick={() => navigate('/GetCredentialInfo')}>On-Campus Education</li>
              </ul>
            </div>
          </div>
        </ul>
        <div>
          <button onClick={() => navigate("/InstituteLogin")} className='generalButton'>Login to Portal</button>
        </div>
      </div>



      {/* <Modal className="SmallModal " isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          <form className='form' action="">
            {NoAccessMessage &&
              <p style={{ color: "red" }}>{NoAccessMessage}</p>

            }
            <div className="mb-3">
              <label htmlFor="subjectDID" className='form-label'>Institute Id</label>
              <input onChange={(e) => setInstId(e.target.value)} autocomplete="off" className='form-control' type="text" id="subjectDID" />
            </div>
            <select className='form-control' onChange={handleRoleChange}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            {QualifField &&
              <>
                <label htmlFor="subjectDID" className='form-label'>Qualification Id</label>
                <input onChange={(e) => setQualificationId(e.target.value)} autocomplete="off" className='form-control' type="text" id="subjectDID" />
              </>
            }
            {otherOption && instituteInfo &&
              <select className='form-control mt-4' onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                {
                  instituteInfo.userRoles?.map((item) => (
                    <option value="Admin">{item}</option>
                  ))
                }
              </select>
            }
            <div >
              <button onClick={fetchInstInfo} className="generalButton mt-4">Submit</button>
            </div>
          </form>
        </div>
      </Modal > */}

    </>
  )
}

export default LoggedInMenuLayout
