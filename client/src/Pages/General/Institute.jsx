import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ContextState } from '../../Context/useContext';
import LoggedInMenuLayout from '../../Components/LoggedInMenuLayout';
import { ArrowCircleRight } from '@mui/icons-material';

function Institutes() {
    const { mainContract } = ContextState();
    const navigate = useNavigate();

    const [allInstitutes, setAllInstitutes] = useState();
    const [selectedInst, setSelectedInst] = useState();
    const [selectedInstId, setSelectedInstId] = useState();
    const [searchingId, setSearchingId] = useState();

    const [isOpen, setIsOpen] = useState();

    const closeModal = () => {
        setIsOpen(false);
    }

    const getInstitutes = async () => {
        const contract = await mainContract();
        // const instId = '0x8dbad2769d51d498b3e1535d10b094c48aa7bf294e097fd6b34906b65bc91a66';
        try {
            const insts = await contract.getAllInstitutes();
            let instInfo = [];
            const promises = await insts.map(async (id) => {
                const data = await contract.getInstById(id);
                // instArray.push(_res);
                // const qualif_id = _res.qualifId;
                // const info = await axios.get(_res.qualifInfo);
                // const data = info.data
                instInfo.push({ data, id });
                return instInfo[0]
            })
            const response = await Promise.all(promises);
            console.log(response);
            setSelectedInst(response[0]);
            setSelectedInstId(response[0].id)
            setAllInstitutes(response);
            // console.log(response[0].qualifInfo);
            // setQualifInfo(response[0].qualifInfo);
        } catch (error) {
            console.log(error);
        }
    }

    const searchInstById = async () => {
        const contract = await mainContract();
        try {
            const id = searchingId
            const data = await contract.getInstById(id);
            console.log(data);
            setSelectedInst({ data, id });
            setSelectedInstId(searchingId);
        } catch (error) {
            console.log(error);
        }
    }

    const seeInstituteDetail = (item) => {
        console.log(item);
        setSelectedInst(item);
        setSelectedInstId(item.id)
        // setIsOpen(true);
    }

    useEffect(() => {
        const fetch = async () => {
            await getInstitutes();
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
                            <i onClick={searchInstById}><ArrowCircleRight></ArrowCircleRight></i>

                        </div>
                        {allInstitutes ?
                            allInstitutes.map((item) => (
                                <li onClick={() => seeInstituteDetail(item)} className='qualificationBox'>{item.data.title}</li>
                            ))
                            :
                            <li className='qualificationBox'>No Qualifications Available</li>
                        }
                    </ul>
                </div>
                <div className='QualificationMainPage'>
                    <h2 className='fancyHeading'>Institutes</h2>
                    {selectedInst &&
                        <>
                            <h3>{selectedInst.title}</h3>
                            <div className='GeneralVerticleTable'>
                                <table className='detailTable table table-striped'>
                                    <tr>
                                        <th>Title</th>
                                        <td>{selectedInst.data.title}</td>
                                    </tr>
                                    <tr>
                                        <th>Institute Id</th>
                                        <td>{selectedInstId?.slice(0, 5) + '...' + selectedInstId?.slice(-5)}</td>
                                    </tr>
                                    <tr>
                                        <th>Admin Id</th>
                                        <td>{selectedInst.data.admin?.slice(0, 5) + '...' + selectedInst.data.admin?.slice(-5)}</td>
                                    </tr>
                                    <tr>
                                        <th>Qualifications</th>
                                        <td>{Number(selectedInst.data.qulif_count)}</td>
                                    </tr>


                                </table>

                            </div>
                                <button className='generalButton mt-4' onClick={()=> navigate(`/Qualification/${selectedInstId}`)}>Qualifications</button>
                            
                        </>
                    }
                </div>
            </div>



        </>
    )
}

export default Institutes
