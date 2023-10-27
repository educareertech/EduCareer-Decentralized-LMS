import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { ContextState } from '../../Context/useContext';
import axios from 'axios';
import AdminSideNav from '../../Components/AdminSideNav';



function ViewApplications() {
  // const [addQualifForm, setAddQualifForm] = useState({ q_title: '', q_code: '', q_level: '', q_duration: '', q_semesters: '', q_exams: '', q_subjects: '', q_entry_criteria: '', q_passing_criteria: '', admission_fees: '', annual_fees: '', registeration_fees: '', examintation_fees: '', certificate_fees: '', subject_fees: '' });
  const { mainContract } = ContextState();
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState();
  const [currentInfo, setCurrentInfo] = useState();
  // const [applicationIndex, setApplicationIndex] = useState();

  const [applicationDetail, setApplicationDetail] = useState([]);



  const closeModal = () => {
    setIsOpen(false);
  }

  // GET ALL QUALIFICATIONS
  const getAllQualif = async () => {
    const contract = await mainContract();
    const instId = sessionStorage.getItem('InstituteId');
    try {

      // get all qualification ids
      const qualifs = await contract.getInstituteQualifs(instId);

      const promises = qualifs.map(async (item) => {
        // get each qualification using id
        const info = await contract.getQualifById(item);
        return info;
      })
      const info = await Promise.all(promises);
      console.log(info);
      setApplicationDetail(info);
    } catch (error) {
      console.log(error);
    }
  }


  // ================== APPLICANT DETAILS =============
  const ApplicantDetail = async (item, index) => {
    console.log(index);
    localStorage.setItem('ApplicationIndex', index);
    setApplicantDetail(item);
    setIsOpen(true);
    console.log(item)
  }

  const seeApplications = async (item) => {
    const contract = await mainContract();
    const qualif_id = item.qualifId;
    console.log(qualif_id);
    try {
      const applics = await contract.getAllApplications(qualif_id);
      console.log(applics)
      let infoArray = []
      const promises = applics.map(async (item) => {
        const info = await axios.get(item);
        infoArray.push(info.data);
        return infoArray;
      })

      const result = await Promise.all(promises);
      console.log(result);
      setCurrentInfo(result[0])
    } catch (error) {
      console.log(error);
    }
  }

  const proceedBtn = async (e, did, qualif_id, role) => {
    console.log("yeas this is qualif Id", qualif_id);
    e.preventDefault();
    sessionStorage.setItem('applicantProceeding', did);
    sessionStorage.setItem('ApplicantRole', role);
    navigate(`/ProceedApplication/${qualif_id}`)
  }



  useEffect(() => {
    const fetch = async () => {
      await getAllQualif();
    }
    fetch();
  }, [])

  const subMenu = (
    applicationDetail.map((item) => (
      <span onClick={() => seeApplications(item)}>{item.title}</span>
    ))
  )


  return (
    <AdminSideNav applicationMenu={subMenu}>
      <div className='GeneralTable'>
        {currentInfo ?
          <table >
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Father Name</th>
                <th>Qualification</th>
                <th>Qualification Id</th>
                <th>Role</th>
                <th>---</th>
              </tr>
            </thead>
            {currentInfo.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{item.fullName}</td>
                    <td>{item.fatherName}</td>
                    <td>{item.qualificationTitle}</td>
                    <td>{item.qualifId?.slice(0, 5) + '...' + item.qualifId?.slice(-5)}</td>
                    <td>{item.role}</td>
                    <td><button onClick={() => ApplicantDetail(item, index)}>Details</button></td>
                  </tr>
                </>
              )
            })
            }
          </table>
          :
          <h4>NO APPLICATIONS TO SHOW</h4>

        }

      </div>



      {/* ===========MODAL FOR VIEWING APPLICATION DETAIL=========== */}
      {applicantDetail &&
        <>
          <Modal className="BigModal" isOpen={isOpen} onRequestClose={closeModal}>
            <div className='GeneralTable ViewApplication'>
              <table className=''>
                <tr >
                  <th>Image</th>
                  <td><a target='_blank' href={applicantDetail.profileUrl}>Click Here to View Image</a></td>
                </tr>
                <tr >
                  <th>Did</th>
                  <td>{applicantDetail.did?.slice(0, 5) + '...' + applicantDetail.did?.slice(-5)}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{applicantDetail.fullName}</td>
                </tr>
                <tr>
                  <th>Father Name</th>
                  <td>{applicantDetail.fatherName}</td>
                </tr>
                <tr>
                  <th>Qualification Title</th>
                  <td>{applicantDetail.qualificationTitle}</td>
                </tr>
                <tr>
                  <th>Role</th>
                  <td>{applicantDetail.role}</td>
                </tr>
                <tr>
                  <th>Subjects</th>
                  <td>
                    {applicantDetail.selectedSubjects?.map((item) => (
                      <p style={{ "border": "1px solid gray", 'display': 'inline', 'padding': '5px 10px' }}>{item}</p>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>Passport/NIC</th>
                  <td><a target='_blank' href={applicantDetail.passportUrl}>Click To View Passport/NIC</a></td>
                </tr>
                <tr>
                  <th>Degree</th>
                  <td><a target='_blank' href={applicantDetail.degreeUrl}>Click To View Degree</a></td>
                </tr>
              </table>
              <div className='mt-3'>
                <button className='generalButton' onClick={closeModal}>Close</button>
                <button className='generalButton' onClick={(e) => proceedBtn(e, applicantDetail.did, applicantDetail.qualifId, applicantDetail.role)} >Proceed Application</button>
              </div>
            </div>
          </Modal>
        </>
      }
    </AdminSideNav>
  )
}

export default ViewApplications
