import React, { useEffect, useState } from "react";
import DefaultLayout from "./DefaultLayout";
import { ContextState } from "../Context/useContext";
import { BigNumber } from "ethers";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function PortalLayout(props) {
    const { accessManagementContract, mainContract } = ContextState();
    const navigate = useNavigate();
    
    const [birthday, setBirthday] = useState();
    const [profileDetail, setProfileDetail] = useState();
    const [studentDetails, setStudentDetails] = useState();


    console.log("Hello this is data", props.data);

    const parseDate = async (hex) => {
        const bigNoTime = BigNumber.from(hex);
        const timeMiliSeconds = bigNoTime.mul(1000).toNumber();
        const date = new Date(timeMiliSeconds);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        const formated = date.toLocaleDateString('en-US', options);
        console.log(formated);
        return formated;
    }

    const getDidDocument = async () => {
        const contract = await accessManagementContract(true);
        const did = sessionStorage.getItem('userDid');
        try {
            const result = await contract.getDidDocument(did);
            const parsedDate = await parseDate(result.birthdate);
            setBirthday(parsedDate);
            setProfileDetail(result);
        } catch (error) {
            console.log(error);
        }
    }

    const getStdInfo = async () => {
        const contract = await mainContract();
        const did = sessionStorage.getItem('userDid');
        try {
            // Student data -> From Contract
            const result = await contract.getStudentById(did);

            // Student data -> IPFS
            const stdInfo = await axios.get(result.infoHash);

            const qualif = await contract.getQualifById(result.qualifId);
            const _qualifInfo = await axios.get(qualif.qualifInfo);

            console.log(result);
            setStudentDetails({ profile: stdInfo.data.profileUrl, qualifTitle: _qualifInfo.data.q_title, details: result });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getDidDocument();
            await getStdInfo();
        }
        fetch();
    }, [])

    return (
        <>
            <DefaultLayout></DefaultLayout>
            <div className="portalLayout row  bg-primary">
                {studentDetails &&

                    <div className="userCard  bg-info">
                        <div className="card align-items-center">
                            <div className="card-header d-flex justify-content-center">
                                <img className="cover-image" src="technology.jpg" alt="" />
                                {studentDetails?.profile ?
                                    <img className="user-image" src={studentDetails.profile ? studentDetails.profile : `user.png`} alt="" />
                                    :
                                    <img className="user-image" src="user.png" alt="" />
                                }
                            </div>
                            <h4 className="name">{profileDetail.name}</h4>
                            {/* <h5 style={{ color: "gray" }}>EduCareer Sukkur Institute</h5> */}
                            <h5>{studentDetails.qualifTitle}</h5>
                            <h4>{studentDetails.details.rollNo}</h4>
                            <button onClick={() => navigate('/UserProfile')}>Go to Profile</button>
                        </div>
                    </div>
                }
                <div className="portalMainPage">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default PortalLayout;