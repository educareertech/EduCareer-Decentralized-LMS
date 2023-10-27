import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AdminSideNav from '../../Components/AdminSideNav';
import { Person, Diversity3, Diversity1, Subject, PostAdd, WorkspacePremium } from '@mui/icons-material';
import { ContextState } from '../../Context/useContext';
import TeacherSideNav from '../../Components/TeacherSideNav';




function TeacherDashboard() {
  const navigate = useNavigate();
  const { mainContract } = ContextState();

  const getAdminInfo = async () => {
    const contract = await mainContract();
    const did = sessionStorage.getItem('userDid');
    const instId = sessionStorage.getItem('InstituteId');
    try {
      // Student data -> From Contract
      const result = await contract.getMember(instId, did);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const fetch = async () => {
      await getAdminInfo();
    }
    fetch();
  }, [])

  return (
    <TeacherSideNav>
      <div className="TeacherDashboard">
        <div className='boxes'>
          <div onClick={() => navigate('/TeacherProfile')} className='box '>
            <i><Person></Person></i>
            <h3>Profile</h3>
          </div>
          <div onClick={() => navigate('/Qualifications')} className='box'>
            <i><Subject></Subject></i>
            <h3>Qualification</h3>
          </div>
        </div>
        <div className='boxes'>

          <div onClick={() => navigate('/AllStudents')} className='box'>
            <i><Diversity3></Diversity3></i>
              <h3>Students</h3>
          </div>
          <div onClick={() => navigate('/ProviderProfile')} className='box'>
            <i><WorkspacePremium></WorkspacePremium></i>
            <h3>Certificates</h3>
          </div>
        </div>

      </div>
    </TeacherSideNav>
  )
}

export default TeacherDashboard
