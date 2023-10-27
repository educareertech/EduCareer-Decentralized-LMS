import React, { useEffect } from 'react';
import { ContextState } from '../Context/useContext';



function FormLoyout(props) {
    const { getProviderOrSigner } = ContextState();

    const checkNetwork = async () => {
        console.log("This is being called")
        const signer = await getProviderOrSigner();
        const network = await signer.getNetwork();
        if (network.chainId !== 11155111) {
            window.alert("Change Network to Sepolia");
        }
    }
    // useEffect(() => {
    //   checkNetwork();
    // }, [])

    return (
        <>
            <div className='registeration-form-page'>
                <div className="inner-left">
                    {props.WelcomeNote}
                </div>
                <div className="inner-right">
                    {props.form}
                </div>
            </div>
        </>
    )
}

export default FormLoyout
