import React, { useEffect, useState } from 'react'
import MenuLayout from '../../Components/MenuLayout'
import { useParams } from 'react-router-dom';
import { ContextState } from '../../Context/useContext';
import e from 'cors';

function SubjectX() {
  const {mainContract, ipfs} = ContextState();

  const params = useParams();
  console.log(params.subject)
  const [topic, setTopic] = useState('');
  const [topicsArray, setTopicsArray] = useState([]);




  const subjectName = params.subject;
  const next = async(e)=>{
    e.preventDefault();
    try {
      console.log("This is topic", topic);
      if(topic.trim() !== ''){
        setTopicsArray([...topicsArray, topic]);
        setTopic('');
      }
      console.log("this is topic array", topicsArray);
      
    } catch (error) {
      console.log(error);
    }
  }

  const topicsToIpfs = async(e) => {
    const data = JSON.stringify({topicsArray})
    const added = await ipfs.add(data);
    const path = added.path;
    return path;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const path = await topicsToIpfs();
    console.log(path);
  }

  const menuItems = [
    "Add Topics",
  ];

  const data = {
    "Add Topics":
    <div className='newClass'>
        <form action="">
          <div>
            <label htmlFor="" className='form-label'>Topic</label>
            <input onChange={(e) => setTopic(e.target.value)} className='form-control' type="text" />
          </div>
          <div className='mt-4'>
            <button type="text" onClick={next}  className='form-control' >Next</button>
          </div>
          <div className='mt-4'>
            <button type="text" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>,
  }

  return (
    <MenuLayout subjectName={subjectName} menuItems={menuItems} data={data}>
      <h1>Hello</h1>
    </MenuLayout>
  )
}

export default SubjectX