import React, { useEffect, useState } from 'react'
import AdminSideNav from '../../Components/AdminSideNav';
import { ContextState } from '../../Context/useContext';
import Modal from 'react-modal';
import axios from 'axios';

function AllStudents() {
    const { mainContract } = ContextState();
    // const navigate = useNavigate()

    const [qualifStudents, setQualifStudents] = useState();
    const [allStudents, setAllStudents] = useState();
    const [studentsDetail, setStudentsDetail] = useState();
    const [isOpen, setIsOpen] = useState();

    
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
            setQualifStudents(info);
        } catch (error) {
            console.log(error);
        }
    }

    // ===========OPEN QUALIFICATION'S STUDENTS TABLE==========
    const seeStudents = async (item) => {
        const contract = await mainContract();
        const qualif_id = item.qualifId;
        console.log(qualif_id);
        try {
            const stds = await contract.getQualifStudents(qualif_id);
            console.log(stds)

            let infoArray = []
            const promises = stds.map(async (item) => {
                const info = await contract.getStudentById(item, qualif_id);
                const response = await axios.get(info.infoHash);
                infoArray.push({ FlatInfo: info, ipfsInfo: response.data });

                return infoArray[0];
            })
            const result = await Promise.all(promises);
            console.log("result", result);

            setAllStudents(result)
        } catch (error) {
            console.log(error);
        }
    }

    const StudentDetail = async (item) => {
        console.log("Button Clicked", item)
        setStudentsDetail(item);
        setIsOpen(true);
    }

    useEffect(() => {
        const fetch = async () => {
            await getAllQualif();
        }
        fetch();
    }, [])


    const subMenu = (
        qualifStudents?.map((item) => (
            <span onClick={() => seeStudents(item)}>{item.title}</span>
        ))
    )

    return (
        <AdminSideNav StudentsMenu={subMenu}>
            <div className='GeneralTable'>
                {allStudents ?
                    <table >
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Father Name</th>
                                <th>Did</th>
                                <th>Role Number</th>
                                <th>Role</th>
                                <th>Qualification Id</th>
                                <th>---</th>
                            </tr>
                        </thead>
                        {allStudents.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.ipfsInfo.fullName}</td>
                                        <td>{item.ipfsInfo.fatherName}</td>
                                        <td>{item.FlatInfo.did?.slice(0, 5) + '...' + item.FlatInfo.did?.slice(-5)}</td>
                                        <td>{item.FlatInfo.rollNo}</td>
                                        <td>{item.FlatInfo.role}</td>
                                        <td>{item.FlatInfo.qualifId?.slice(0, 5) + '...' + item.FlatInfo.qualifId?.slice(-5)}</td>
                                        <td><button onClick={() => StudentDetail(item)}>Details</button></td>
                                    </tr>
                                </>
                            )
                        })
                        }
                    </table>
                    :
                    <h4>NO STUDENTS TO SHOW</h4>
                }

            </div>


            {/* MODAL FOR VIEWING STUDENT DETAIL */}
            {studentsDetail &&
                <>
                    <Modal className="BigModal" isOpen={isOpen} onRequestClose={closeModal}>
                        <div className='GeneralTable ViewApplication'>
                            <table className=''>
                                <tr>
                                    <th>Full Name</th>
                                    <td>{studentsDetail.ipfsInfo.fullName}</td>
                                </tr>
                                <tr>
                                    <th>Father Name</th>
                                    <td>{studentsDetail.ipfsInfo.fatherName}</td>
                                </tr>
                                <tr >
                                    <th>Did</th>
                                    <td>{studentsDetail.FlatInfo.did?.slice(0, 5) + '...' + studentsDetail.FlatInfo.did?.slice(-5)}</td>
                                </tr>
                                <tr >
                                    <th>Image</th>
                                    <td><a target='_blank' href={studentsDetail.ipfsInfo.profileUrl}>Click Here to View Image</a></td>
                                </tr>
                                <tr>
                                    <th>Qualification Title</th>
                                    <td>{studentsDetail.ipfsInfo.qualificationTitle}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{studentsDetail.FlatInfo.role}</td>
                                </tr>
                                <tr>
                                    <th>Subjects</th>
                                    <td>
                                        {studentsDetail.ipfsInfo.selectedSubjects?.map((item) => (
                                            <p style={{ "border": "1px solid gray", 'display': 'inline', 'padding': '5px 10px' }}>{item}</p>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Passport/NIC</th>
                                    <td><a target='_blank' href={studentsDetail.ipfsInfo.passportUrl}>Click To View Passport/NIC</a></td>
                                </tr>
                                <tr>
                                    <th>Degree</th>
                                    <td><a target='_blank' href={studentsDetail.ipfsInfo.degreeUrl}>Click To View Degree</a></td>
                                </tr>
                            </table>
                            <div className='mt-3'>
                                <button className='generalButton' onClick={closeModal}>Close</button>
                                {/* <button className='generalButton' onClick={(e) => close()} >Proceed Application</button> */}
                            </div>
                        </div>
                    </Modal>
                </>
            }
        </AdminSideNav>
    )
}

export default AllStudents;