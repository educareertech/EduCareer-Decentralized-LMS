import React, { useEffect, useState } from 'react';
import VC_Component from '../../../Components/VC_Component';
import Modal from 'react-modal';
import { ContextState } from '../../../Context/useContext';
import AdminSideNav from '../../../Components/AdminSideNav';

function ProviderProfile() {
    const { VC_Contract } = ContextState();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const [profileDetail, setProfileDetail] = useState();
    const [profileName, setProfileName] = useState();
    const [providerDescription, setProviderDescription] = useState();
    const [noProvider, setNoProvider] = useState(false);

    // CLOSE MODAL
    const closeModal = () => {
        setIsOpen(false);
    }

    // GET PROVIDER PROFILE
    const getProviderProfile = async () => {
        const contract = await VC_Contract(true);
        const did = sessionStorage.getItem('userDid');
        console.log(did);
        try {
            const providerIds = await contract.getProviderIds(did);
            console.log(providerIds);
            sessionStorage.setItem('providerId', providerIds[0]);
            let profiles = [];
            const promises = providerIds.map(async (item) => {
                const profile = await contract.getProviderProfiles(item);
                console.log(profile[0]);
                profiles.push(profile[0]);
                return { profiles }
            })
            const fetched = await Promise.all(promises);
            if (!fetched.length) {
                console.log("if runing")
                setNoProvider(true);
            } else {
                console.log("else runing", fetched)
                console.log("Fetched Data", fetched[0].profiles);
                setProfileDetail(fetched[0].profiles);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // CREATE PROFILE

    const createProfile = async (e) => {
        e.preventDefault();
        const contract = await VC_Contract(true);
        const userDid = sessionStorage.getItem('userDid');
        try {
            const tx = await contract.becomeProvider(userDid, profileName, providerDescription);
            setIsLoading(true);
            await tx.wait();
            setIsLoading(false);
            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    // COPY PROVIDER ID
    const copyProviderId = (e, providerId) => {
        e.preventDefault()
        let id = providerId;
        navigator.clipboard.writeText(id);
        setCopied(true);
    }

    useEffect(() => {
        const fetch = async () => {
            await getProviderProfile();
        }
        fetch();
    }, [])

    const submenu = (
        <span></span>
    )

    return (
        <>
            <VC_Component submenu={"Yeah this is"} navigator={'ProviderProfile'}>
                {/* <VC_Component > */}
                <div className='GeneralTable'>
                    {/* <h2 className='fancyHeading'>Provider Profile</h2> */}
                    {noProvider ?
                        <>
                            <button className='generalButton' onClick={() => setIsOpen(true)}>Create Provider</button>
                        </>
                        :
                        <table>
                            <thead>
                                <th>Provider Name</th>
                                <th>Provider Id</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                {profileDetail &&
                                    profileDetail?.map((item) => (
                                        <tr>
                                            <td>{item.profile}</td>
                                            <td className='tdProviderAddress' onClick={(e) => copyProviderId(e, item.providerId)}>{item.providerId.slice(0, 5) + "......" + item.providerId.slice(-5)}
                                                <span id='CopyToolTip'>{!copied ? 'copy' : 'copied'}</span>
                                            </td>
                                            <td>{item.desciption}</td>
                                            {/* <button onClick={() => switchProfile(item.providerId, item.profile)}>Switch</button> */}
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    }
                </div>



                {/* ============  CREATE PROFILE ========== */}
                <Modal className='SmallModal' isOpen={isOpen} onRequestClose={closeModal}>
                    <div>
                        <form action="">
                            <div>
                                <label htmlFor="" className='form-label'>Profile/Name</label>
                                <input onChange={(e) => setProfileName(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='form-label'>Provider Detail</label>
                                <textarea onChange={(e) => setProviderDescription(e.target.value)} className='form-control' type="text" />
                            </div>
                        </form>
                            <button className='generalButton mt-4' type="text" onClick={closeModal}>Cancel</button>
                            <button className='generalButton' type="text" onClick={createProfile}>Submit</button>
                    </div>
                </Modal>
                {/* </VC_Component> */}
            </VC_Component>

        </>
    )
}

export default ProviderProfile
