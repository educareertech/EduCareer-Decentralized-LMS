import React, { useEffect, useState } from 'react'
import MenuLayout from '../../Components/MenuLayout'
import { ContextState } from '../../Context/useContext';
import { formatBytes32String } from 'ethers/lib/utils';
import { utils } from 'ethers';
import { useNavigate } from 'react-router-dom';

function TSubjects() {
  const [allSubjects, setAllSubjects] = useState([]);
  const { mainContract } = ContextState();
  const navigate = useNavigate();

  const getAllSubject = async () => {
    localStorage.removeItem('allSubjects');
    const contract = await mainContract();
    const did = localStorage.getItem('userDid');
    const subjects = await contract.getSubjectAssigned(did);
    console.log("These are actual Subjects", subjects);
    localStorage.setItem('allSubjects', JSON.stringify(subjects));
    setAllSubjects(subjects);
    // console.log("These are Subjects ", utils.parseBytes32String(subjects[0]))
  }

  useEffect(() => {
    const fetch = async () => {
      await getAllSubject();
      const _subjecs = localStorage.getItem('allSubjects');
      if (_subjecs) {
        const parsed = JSON.parse(_subjecs);
        setAllSubjects(parsed);
        console.log("localStorage", parsed)
      }
    }
    fetch();
    console.log(allSubjects);
  }, [])


  const menuItems = [
    "Assigned Subjects",
  ]

  const data = {
    "Assigned Subjects":
      <>{allSubjects &&
        <div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {
                allSubjects.map((item) => {
                  // const asciiString = utils.hexToAscii(item);
                  const parsed = utils.parseBytes32String(item);
                  return (
                    <tr onClick={()=> navigate(`/SubjectX/${parsed}`)}>
                      <td>{parsed}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>


        </div>}
      </>
  }

  return (
    <MenuLayout menuItems={menuItems} data={data} >

    </MenuLayout>
  )
}

export default TSubjects