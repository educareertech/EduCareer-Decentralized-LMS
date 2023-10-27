import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import AdminSideNav from '../../Components/AdminSideNav';
import { ContextState } from '../../Context/useContext';
import axios from 'axios';

function AllTeachers() {
    const { mainContract } = ContextState();

    const [qualifTeacher, setQualifTeachers] = useState();
    const [allTeachers, setAllTeachers] = useState();
    const [teacherDetail, setTeacherDetail] = useState();
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
         setQualifTeachers(info);
        } catch (error) {
            console.log(error);
        }
    }

    // ===========OPEN QUALIFICATION'S TEACHERS TABLE==========
    const seeTeachers = async (item) => {
        const contract = await mainContract();
        const qualif_id = item.qualifId;
        console.log(qualif_id);
        try {
            const stds = await contract.getQualifTeachers(qualif_id);
            console.log(stds)

            let infoArray = []
            const promises = stds.map(async (item) => {
                const info = await contract.getTeacherById(item, qualif_id);
                const response = await axios.get(info.infoHash);
                infoArray.push({ FlatInfo: info, ipfsInfo: response.data });
                
                return infoArray[0];
            })
            const result = await Promise.all(promises);
            console.log("result", result);

            setAllTeachers(result)
        } catch (error) {
            console.log(error);
        }
    }

    const TeacherDetail = (item)=>{
        setTeacherDetail(item);
        setIsOpen(true);
    }

    useEffect(() => {
        const fetch = async () => {
            await getAllQualif();
        }
        fetch();
    }, [])


    const subMenu = (
        qualifTeacher?.map((item) => (
            <span onClick={() => seeTeachers(item)}>{item.title}</span>
        ))
    )

    return (
        <AdminSideNav TeachersMenu={subMenu}>
            <div className='GeneralTable'>
                {allTeachers ?
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
                        {allTeachers.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.ipfsInfo.fullName}</td>
                                        <td>{item.ipfsInfo.fatherName}</td>
                                        <td>{item.FlatInfo.did?.slice(0, 5) + '...' + item.FlatInfo.did?.slice(-5)}</td>
                                        <td>{item.FlatInfo.rollNo}</td>
                                        <td>{item.FlatInfo.role}</td>
                                        <td>{item.FlatInfo.qualifId?.slice(0, 5) + '...' + item.FlatInfo.qualifId?.slice(-5)}</td>
                                        <td><button onClick={() => TeacherDetail(item)}>Details</button></td>
                                    </tr>
                                </>
                            )
                        })
                        }
                    </table>
                    :
                    <h4>NO TEACHERS TO SHOW</h4>
                }

            </div>


             {/* MODAL FOR VIEWING TEACHER DETAIL */}
             {teacherDetail &&
                <>
                    <Modal className="BigModal" isOpen={isOpen} onRequestClose={closeModal}>
                        <div className='GeneralTable ViewApplication'>
                            <table className=''>
                                <tr>
                                    <th>Full Name</th>
                                    <td>{teacherDetail.ipfsInfo.fullName}</td>
                                </tr>
                                <tr>
                                    <th>Father Name</th>
                                    <td>{teacherDetail.ipfsInfo.fatherName}</td>
                                </tr>
                                <tr >
                                    <th>Did</th>
                                    <td>{teacherDetail.FlatInfo.did?.slice(0, 5) + '...' + teacherDetail.FlatInfo.did?.slice(-5)}</td>
                                </tr>
                                <tr >
                                    <th>Image</th>
                                    <td><a target='_blank' href={teacherDetail.ipfsInfo.profileUrl}>Click Here to View Image</a></td>
                                </tr>
                                <tr>
                                    <th>Qualification Title</th>
                                    <td>{teacherDetail.ipfsInfo.qualificationTitle}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{teacherDetail.FlatInfo.role}</td>
                                </tr>
                                <tr>
                                    <th>Subjects</th>
                                    <td>
                                        {teacherDetail.ipfsInfo.selectedSubjects?.map((item) => (
                                            <p style={{ "border": "1px solid gray", 'display': 'inline', 'padding': '5px 10px' }}>{item}</p>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Passport/NIC</th>
                                    <td><a target='_blank' href={teacherDetail.ipfsInfo.passportUrl}>Click To View Passport/NIC</a></td>
                                </tr>
                                <tr>
                                    <th>Degree</th>
                                    <td><a target='_blank' href={teacherDetail.ipfsInfo.degreeUrl}>Click To View Degree</a></td>
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

export default AllTeachers;