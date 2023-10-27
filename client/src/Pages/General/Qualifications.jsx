import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ContextState } from '../../Context/useContext';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import axios from 'axios';
import { ArrowCircleRight } from '@mui/icons-material';

function Qualification() {
    const [isOpen, setIsOpen] = useState(false);
    const [qualifInfo, setQualifInfo] = useState();
    const [selectedQualif, setSelectedQualif] = useState();
    const [fees, setFees] = useState({});
    const [searchingId, setSearchingId] = useState();

    const navigate = useNavigate();
    const { mainContract } = ContextState();
    const params = useParams();





    const closeModal = () => {
        setIsOpen(false);
    }

    const getQualifs = async () => {
        const contract = await mainContract();
        const instId = params.id;
        try {
            const result = await contract.getInstituteQualifs(instId);
            let qualifInfo = [];
            // let 
            const promises = await result.map(async (item) => {
                const _res = await contract.getQualifById(item);
                const qualif_id = _res.qualifId;
                const info = await axios.get(_res.qualifInfo);
                const data = info.data
                qualifInfo.push({ data, qualif_id });
                return { qualifInfo }
            })
            const response = await Promise.all(promises);
            console.log(response[0].qualifInfo);
            setSelectedQualif(response[0].qualifInfo[0]);
            setQualifInfo(response[0].qualifInfo);
        } catch (error) {
            console.log(error);
        }
    }

    const searchQualifById = async () => {
        const contract = await mainContract();
        try {
            console.log(searchingId);
            const _res = await contract.getQualifById(searchingId);
            console.log(_res)
            const info = await axios.get(_res.qualifInfo);
            setSelectedQualif(info);
        } catch (error) {
            console.log(error);
        }
    }

    const seeQualifDetail = (item) => {
        console.log(item);
        setSelectedQualif(item);
        // setSelectedQualifId(item.qualif_id)
        setIsOpen(true);
    }

    useEffect(() => {
        const fetch = async () => {
            await getQualifs();
        }
        fetch();
    }, [])

    return (
        <>
            <LoggedInMenuLayout></LoggedInMenuLayout>
            <div className='qualification'>
                <div className='qualification-menu'>
                    <ul>
                        <div className='searchQualifById'>
                            <input onChange={(e)=> setSearchingId(e.target.value)} type="text" placeholder='Search by Id...' />
                            <i onClick={searchQualifById}><ArrowCircleRight></ArrowCircleRight></i>

                        </div>
                        {qualifInfo ?
                            qualifInfo.map((item) => (
                                <li onClick={() => seeQualifDetail(item)} className='qualificationBox'>{item.data.q_title}</li>
                            ))
                            :
                            <li className='qualificationBox'>No Qualifications Available</li>
                        }
                    </ul>
                </div>
                <div className='QualificationMainPage'>
                    <h2 className='fancyHeading'>Qualifications</h2>
                    {selectedQualif &&
                        <>
                            <h3>{selectedQualif.data.q_title}</h3>
                            <div className='GeneralVerticleTable'>
                                <table className='detailTable table table-striped'>
                                    <tr>
                                        <th>Title</th>
                                        <td>{selectedQualif.data.q_title}</td>
                                    </tr>
                                    <tr>
                                        <th>Id</th>
                                        <td>{selectedQualif.qualif_id?.slice(0, 5) + '...' + selectedQualif.qualif_id?.slice(-5)}</td>
                                    </tr>
                                    <tr>
                                        <th>Level</th>
                                        <td>{selectedQualif.data.q_level}</td>
                                    </tr>
                                    <tr>
                                        <th>Duration</th>
                                        <td>{selectedQualif.data.q_duration}</td>
                                    </tr>
                                    <tr>
                                        <th>Semesters</th>
                                        <td>{selectedQualif.data.q_semesters}</td>
                                    </tr>
                                    <tr>
                                        <th>Exams</th>
                                        <td>{selectedQualif.data.q_exams}</td>
                                    </tr>
                                    <tr>
                                        <th>Subjects</th>
                                        <td style={{ fontWeight: 'bold' }}>{selectedQualif.data.subjects?.map((data) => (
                                            data + " "
                                        ))}</td>
                                    </tr>
                                    {/* <tr className='table-danger align-items-center'>
                  <th>Fee</th>
                  <tr className="table-success">
                    <th>Addmission Fee</th>
                    <td>{fees.addmission_fee}</td>
                  </tr>
                  <tr className="table-success">
                    <th>Annual Fee</th>
                    <td>{fees.annual_fee}</td>
                  </tr>
                  <tr className="table-success">
                    <th>Registeration Fee</th>
                    <td>{fees.registeration_fee}</td>
                  </tr>
                  <tr className="table-success">
                    <th>Examination Fee</th>
                    <td>{fees.examination_fee}</td>
                  </tr>
                  <tr className="table-success">
                    <th>Certificate Fee</th>
                    <td>{fees.certificate_fee}</td>
                  </tr>
                  <tr className="table-success">
                    <th>Subject Fee</th>
                    <td>{fees.subject_fee}</td>
                  </tr>
                </tr> */}
                                    {/* <tr className='table-light'>
                  <th>Entry Criteria</th>
                  <td>{detail.q_entry_criteria}</td>
                </tr>
                <tr className='table-info'>
                  <th>Passing Criteria</th>
                  <td>{detail.q_passing_criteria}</td>
                </tr> */}
                                </table>

                            </div>
                                <button className='generalButton mt-3' onClick={() => navigate(`/StartApplication/${selectedQualif.qualif_id}`)} >Start Application</button>
                           
                        </>
                    }
                </div>
            </div>



        </>
    )
}

export default Qualification
