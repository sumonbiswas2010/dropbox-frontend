import apiCall from 'api/apiCall';
import EmailField from 'components/LoginRegister/FormFields/EmailField/EmailField';
import SubmitButton from 'components/LoginRegister/FormFields/SubmitButton/SubmitButton';
import { useState } from 'react';
import ErrorMessage from '../../AlertMessage/ErrorMessage';
import VerifyOtp from './VerifyOtp';

const Email = ({ userData, setUserData, className, setPageState, setIsLoading }) => {
    const [msg, setMsg] = useState();
    const [gotoVerify, setGotoVerify] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await apiCall('/send_email_otp', 'POST', { email: userData.email });
        setIsLoading(false);
        if (res.ok) {
            setGotoVerify(1);
        } else {
            setMsg(res.msg);
        }
    };

    const verified = (otp) => {
        setUserData({ ...userData, email_otp: otp });
        setPageState('password');
    };

    // Email validation
    const emailValidation = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return !(regex.test(userData?.email) === false);
    };

    return (
        <>
            {!gotoVerify && (
                <form onSubmit={handleSubmit}>
                    <EmailField
                        setPageState={setPageState}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className={className}
                    />
                    <SubmitButton
                        type="submit"
                        disabled={userData?.email && emailValidation() ? '' : 'disabled'}
                    >
                        Next
                    </SubmitButton>
                    {msg && <ErrorMessage>{msg}</ErrorMessage>}
                </form>
            )}
            {gotoVerify && (
                <VerifyOtp
                    resendOtp={handleSubmit}
                    success={verified}
                    setIsLoading={setIsLoading}
                    email={userData.email}
                />
            )}
        </>
    );
};

export default Email;
