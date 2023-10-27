import React, { useEffect, useState } from 'react';
import { ContextState } from '../../Context/useContext';
import DefaultLayout from '../../Components/DefaultLayout';

function CheckInfoAccess() {
    const { accessManagementContract } = ContextState();

    const [allowedDids, setAllowedDids] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // ======REVOKE ACCESS========
    const revokeAccess = async (e, item, index) => {
        e.preventDefault();
        const contract = await accessManagementContract(true);
        try {
            const tx = await contract.revokeDidByIndex(item, index);
            setIsLoading(true);
            await tx.wait();
            setIsLoading(false);
            console.log("Revoked Successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    const getInfoAllowedDids = async () => {
        const contract = await accessManagementContract();
        const did = sessionStorage.getItem('userDid');
        try {
            const result = await contract.getAllowedDids(did);
            setIsLoading(true);
            setAllowedDids(result);
            setIsLoading(false);
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            getInfoAllowedDids();
        }
        fetch();
    }, [])
    return (
        <>
            <DefaultLayout>
                <div className='IssuedCredentials'>
                    <h2 className='fancyHeading'>Credential Access</h2>
                    {allowedDids != '' ?
                        <table className='table table-striped'>
                            <thead>
                                <th>Subject Did</th>
                            </thead>
                            <tbody>
                                {
                                    allowedDids?.map((item, index) => (
                                        <tr>
                                            <td>
                                                {item.slice(0, 5) + "..." + item.slice(-5)}
                                            </td>
                                            <td>
                                                <button onClick={(e) => revokeAccess(e, item, index)}>Revoke</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h3 style={{ marginTop: "10vw" }}>No access given</h3>
                    }
                </div>
            </DefaultLayout>
        </>
    )
}

export default CheckInfoAccess