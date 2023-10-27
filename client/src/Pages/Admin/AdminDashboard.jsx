import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ContextState } from '../../Context/useContext';
import AdminSideNav from '../../Components/AdminSideNav';
import { AddCard, Diversity3, Diversity1, Subject, PostAdd, WorkspacePremium } from '@mui/icons-material';


function AdminDashboard() {
  const [addQualifForm, setAddQualifForm] = useState({ q_title: '', q_code: '', q_level: '', q_duration: '', q_semesters: '', q_exams: '', q_entry_criteria: '', q_passing_criteria: '', admission_fees: '', annual_fees: '', registeration_fees: '', examintation_fees: '', certificate_fees: '', subject_fees: '' });
  const [subjects, setSubjects] = useState();
  const { ipfs, mainContract } = ContextState();
  const navigate = useNavigate();

  const [promptIsOpen, setPromptIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allApplications, setAllApplications] = useState([]);

  // const handleSubjectAttr = async (e) => {
  //   e.preventDefault();
  //   const inputValues = e.target.value.split(',').map((value) => value.trim());
  //   const nonEmptyValues = inputValues.filter((value) => value !== '');
  //   setSubjects(nonEmptyValues);
  // }

  // const seeDetails = async () => {
  //   setIsOpen(true);
  // }

  // const closePrompt = () => {
  //   setPromptIsOpen(false);
  // }

  // const closeModal = () => {
  //   setIsOpen(false);
  // }

  const getAdminInfo = async () => {
    const contract = await mainContract();
    const did = sessionStorage.getItem('userDid');
    const instId = sessionStorage.getItem('InstituteId');
    try {
      // Student data -> From Contract
      const result = await contract.getMember(instId, did);
      console.log(result);
      // Student data -> IPFS
      // const stdInfo = await axios.get(result.infoHash);

      // const qualif = await contract.getQualifById(result.qualifId);
      // const _qualifInfo = await axios.get(qualif.qualifInfo);

      // console.log(result);
      // setStudentDetails({ profile: stdInfo.data.profileUrl, qualifTitle: _qualifInfo.data.q_title, details: result });
    } catch (error) {
      console.log(error);
    }
  }


  // //======== HANDLE ADD QUALIFICATION ===========
  // const handleAddQualif = async (e) => {
  //   setAddQualifForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  // }

  // ============ADD QUALIFICATION===============
  const addQualifToIpff = async () => {
    // const { q_title, q_code, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria, admission_fees, annual_fees, registeration_fees, examintation_fees, certificate_fees, subject_fees } = addQualifForm;
    // console.log("Add Qualification Form", q_title, q_code, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria);
    // const data = JSON.stringify({ q_title, q_code, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria, admission_fees, annual_fees, registeration_fees, examintation_fees, certificate_fees, subject_fees })

    const { q_title, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria, q_fees } = addQualifForm;
    console.log("Add Qualification Form", q_title, q_level, q_duration, q_semesters, q_exams, q_subjects, q_entry_criteria, q_passing_criteria);
    const data = JSON.stringify({ q_title, q_level, q_duration, q_semesters, q_exams, subjects, q_entry_criteria, q_passing_criteria })
    try {
      const uploaded = await ipfs.add(data);
      const url = `https://digitalverse.infura-ipfs.io/ipfs/${uploaded.path}`;
      console.log(url);
      return url;
    } catch (error) {
      console.log("Error while Adding Qualification", error.message);
    }
  }

  // const addQualification = async () => {
  //   const urlHash = await addQualifToIpff();
  //   const contract = await mainContract(true);
  //   const { q_title } = addQualifForm;
  //   let instId = '0x8dbad2769d51d498b3e1535d10b094c48aa7bf294e097fd6b34906b65bc91a66';
  //   try {
  //     const tx = await contract.registerQualif(instId, q_title, urlHash);
  //     setLoading(true);
  //     await tx.wait();
  //     setLoading(false);
  //     setPromptIsOpen(true);
  //     console.log(`Successful ~ ${tx.hash}`);
  //   } catch (error) {
  //     console.log("Add Qualification: Error:", error.message);
  //   }
  // }

  // const checkApplications = async () => {
  //   const contract = await mainContract(true);
  //   try {
  //     const applications = await contract.getApplications();
  //     console.log("Applications", applications);
  //     setAllApplications(applications);

  //   } catch (error) {
  //     console.log("Check Applications: Error", error.message);
  //   }
  // }


  useEffect(() => {
    const fetch = async () => {
      await getAdminInfo();
    }
    fetch();
  }, [])

  return (
    // <PortalLayout data={"From the Admin Side"}>
    //   <div className="admin-inner row d-flex align-items-center justify-content-center">
    //     <div className='admin-inner-boxes row'>
    //       <div onClick={() => navigate('/ViewApplications')} className="box col">
    //         <h4 >APPLICATION</h4>
    //       </div>
    //       <div onClick={() => setIsOpen(true)} className="box col">
    //         <h4>ADD QUALIFICATION</h4>
    //       </div>
    //       <div className="box col">
    //         <h4>Applications</h4>
    //       </div>
    //     </div>
    //     <div className='admin-inner-boxes row'>
    //       <div onClick={() => navigate('/VCManagement')} className="box col">
    //         <h4>VC MANAGEMENT</h4>
    //       </div>
    //       <div onClick={() => navigate('/ProviderProfile')} className="box col">
    //         <h4>VC MANAGEMENT</h4>
    //       </div>
    //       <div onClick={() => navigate('/Students')} className="box col">
    //         <h4>Students</h4>
    //       </div>
    //     </div>
    //     <div className='admin-inner-boxes row'>
    //       <div className="box col">
    //         <h4>Applications</h4>
    //       </div>
    //       <div className="box col">
    //         <h4>Applications</h4>
    //       </div>
    //       <div className="box col">
    //         <h4>Applications</h4>
    //       </div>
    //     </div>
    //   </div>


    //   {/* =========== MODAL FOR ADDING QUALIFICATION============= */}
    //   <Modal className="model d-flex flex-column align-items-center justify-content-center rounded" isOpen={isOpen} onRequestClose={closeModal}>
    //     <h1 className='mt-5'>Add Qualification</h1>
    //     <form className='w-100 row' action="">
    //       <div className="col d-flex flex-column align-items-center">
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Qualification Title</label>
    //           <input className='form-control' onChange={handleAddQualif} type="text" name="q_title" id="" />
    //         </div>
    //         {/* <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Qualification Code</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_code" id="" />
    //         </div> */}
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Level</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_level" id="" />
    //         </div>
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Duration</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_duration" id="" />
    //         </div>
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Semesters</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_semesters" id="" />
    //         </div>
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Examination</label>
    //           <input style={{}} className='form-control' type="text" name="q_exams" id="" />
    //         </div>
    //       </div>
    //       <div className="col d-flex flex-column align-items-center">

    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Subjects</label>
    //           <input style={{}} className='form-control' onChange={handleSubjectAttr} type="text" name="q_subjects" id="" placeholder='subject1,subject2,subject3' />
    //         </div>
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Qualification Fees</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_fees" id="" placeholder='Qualification Fees' />
    //         </div>
    //         <div className='mb-1  w-75'>
    //           {/* <fieldset>
    //             <legend>Fees</legend>
    //             <label for="admission-fees">Admission Fees:</label>
    //             <input onChange={handleAddQualif} type="text" id="admission-fees" name="admission_fees" /><br />
    //             <label for="admission-fees">Annual Fees:</label>
    //             <input onChange={handleAddQualif} type="text" id="admission-fees" name="annual_fees" /><br />
    //             <label for="admission-fees">Registeration Fees:</label>
    //             <input onChange={handleAddQualif} type="text" id="admission-fees" name="registeration_fees" /><br />
    //             <label for="admission-fees">Examination Fees:</label>
    //             <input onChange={handleAddQualif} type="text" id="admission-fees" name="examination_fees" /><br />
    //             <label for="admission-fees">Certificate Fees:</label>
    //             <input onChange={handleAddQualif} type="text" id="admission-fees" name="certificate_fees" /><br />
    //             <label for="admission-fees">Subject Fees:</label>
    //             <input onChange={handleAddQualif} type="text" id="admission-fees" name="subjct_fees" /><br />
    //           </fieldset> */}
    //         </div>
    //         {/* <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Entry Criteria</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_entry_criteria" id="" />
    //         </div>
    //         <div className=' w-75'>
    //           <label style={{ fontSize: "1.5vw" }} className='form-label' htmlFor="">Passing Criteria</label>
    //           <input style={{}} className='form-control' onChange={handleAddQualif} type="text" name="q_passing_criteria" id="" />
    //         </div> */}
    //       </div>
    //     </form>
    //     <div className='subCancelBtn'>
    //       <button onClick={closeModal}>Cancel</button>
    //       <button onClick={addQualification}>Add Qualification</button>
    //     </div>
    //   </Modal>




    //   <Modal className='PromptModal' isOpen={promptIsOpen} onRequestClose={closePrompt}>
    //     <div className='PromptModal-inner'>
    //       <h3>Qualification Registered Successfully</h3>
    //       <button className='mr-4' onClick={closePrompt}>Close</button>
    //     </div>
    //   </Modal>
    // </PortalLayout>

    // <>
    //   <div className='adminDashboard'>
    //     <div className='sideNav'>
    //       <img src="officialLogo.jpg" alt="Logo Image" />
    //       <ul>
    //         <li>Qualifications</li>
    //         <li>Applications</li>
    //         <li>Teachers</li>
    //         <li>Students</li>
    //         <li>Staff</li>
    //       </ul>
    //     </div>
    //     <div className='mainContent'>
    //       {props.children}
    //     </div>
    //   </div>
    // </>

    <AdminSideNav>
      <div className="AdminDashboard">
        <div className='boxes'>
          <div onClick={() => navigate('/AllQualifications')} className='box'>
            <i><Subject></Subject></i>
            <div>
              <h1>8</h1>
              <span>Qualifications</span>
            </div>
          </div>
          <div onClick={() => navigate('/ViewApplications')} className='box'>
            <i><AddCard></AddCard></i>
            <div>
              <h1>27</h1>
              <span>Applications</span>
            </div>
          </div>

        </div>
        <div className='boxes'>
          <div onClick={() => navigate('/AllTeachers')} className='box'>
            <i><Diversity1></Diversity1></i>
            <div>
              <h1>15</h1>
              <span>Teachers</span>
            </div>
          </div>
          <div onClick={() => navigate('/AllStudents')} className='box'>
            <i><Diversity3></Diversity3></i>
            <div>
              <h1>356</h1>
              <span>Students</span>
            </div>
          </div>
        </div>
        <div className='boxes'>
          <div onClick={() => navigate('/ProviderProfile')} className='box'>
            <i><WorkspacePremium></WorkspacePremium></i>
            <div>
              <h4>VC Management</h4>
            </div>
          </div>
          <div onClick={() => navigate('/AddQualification')} className='box'>
            <i><PostAdd></PostAdd></i>
            <div>
              <h4>Add Qualification</h4>
            </div>
          </div>
        </div>
      </div>
    </AdminSideNav>
  )
}

export default AdminDashboard
