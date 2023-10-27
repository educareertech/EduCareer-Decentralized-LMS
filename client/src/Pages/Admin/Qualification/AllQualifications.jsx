import React, { useEffect, useState } from 'react'
import QualificationComp from '../../../Components/QualificationComp'
import { ContextState } from '../../../Context/useContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllQualifications() {
  const { mainContract } = ContextState();
  const navigate = useNavigate();

  const [allQualifications, setAllQualifications] = useState();

  const getAllQualifs = async () => {
    const contract = await mainContract();
    const instId = sessionStorage.getItem("InstituteId");
    console.log(instId);
    try {
      const qualifIds = await contract.getInstituteQualifs(instId);
      

      let qualifInfo = [];
      const promises = await qualifIds.map(async (item) => {
        const _res = await contract.getQualifById(item);
        const qualif_id = _res.qualifId;
        const info = await axios.get(_res.qualifInfo);
        const data = info.data
        qualifInfo.push({ data, qualif_id });
        return { qualifInfo }
      })
      const response = await Promise.all(promises);
      setAllQualifications(response[0].qualifInfo);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const fetch = async () => {
      await getAllQualifs();
    }
    fetch();
  }, [])
  return (
    <QualificationComp>
      <div className='GeneralTable'>
        {allQualifications ?
          <table className=''>
            <thead>
              <tr>
                <th>Title</th>
                <th>Id</th>
                <th>Subjects</th>
                <th>===</th>
                <th>===</th>
              </tr>
            </thead>
            <tbody>

              {
                allQualifications?.map((item) => (
                  <tr>
                    <td>{item.data.q_title}</td>
                    <td>{item.qualif_id?.slice(0, 5) + '...' + item.qualif_id?.slice(-5)}</td>

                    <td>{item.data.subjects &&
                      item.data.subjects.map((sub) => (
                        sub + "," + " "
                      ))}
                    </td>
                    <td>
                      <button onClick={() => navigate('/AllStudents')}>Students</button>
                    </td>
                    <td>
                      <button onClick={() => navigate('/AllTeachers')}>Teachers</button>
                    </td>
                  </tr>
                ))

              }
            </tbody>
          </table>
          :
          <h3>NO QUALIFICATIONS TO SHOW</h3>
        }
        <button onClick={() => navigate('/AddQualification')} className='generalButton mt-4'>Add New</button>
      </div>
    </QualificationComp>
  )
}

export default AllQualifications