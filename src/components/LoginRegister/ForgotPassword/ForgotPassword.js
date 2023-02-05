import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiCall from '../../../api/apiCall';
import Loading from '../../Loading/Loading';
import EmailField from '../FormFields/EmailField/EmailField';
import SubmitButton from '../FormFields/SubmitButton/SubmitButton';
import LoginRegister from '../LoginRegister';
import './ForgotPassword.css';
import ResetPassword from './ResetPassword';
import Success from './Success';
import VerifyOtp from './VerifyOtp';

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [currentState, setCurrentState] = useState('forgot-password');
    const [otp, setOtp] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState();

    useEffect(() => {
        document.title = 'Revorium - Forgot Password';
    });

    const location = useLocation();

    useEffect(() => {
        if (location.state) setEmail(location.state);
    }, [location.state]);

    const forgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await apiCall(`/forgot_password`, 'POST', {
            email
        });

        setIsLoading(false);

        if (response.ok) {
            setCurrentState('verify-otp');
        } else {
            setMsg(response.msg);
            setIsError(true);
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading />}

            {currentState === 'forgot-password' && (
                <LoginRegister>
                    <div className="login-register-top sign-up">
                        <h1>Recover Password</h1>
                        <p>A link will be sent to your email address to set up new password</p>
                    </div>
                    <div className="login-register-form">
                        <form method="post" onSubmit={forgotPassword}>
                            <EmailField
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                required
                            />

                            <Link to="/login">
                                <div className="forgot-password">Remember Your Password?</div>
                            </Link>

                            <SubmitButton
                                type="submit"
                                disabled={!email}
                                // disabled={!userData.email || !userData.password}
                            >
                                Recover Password
                            </SubmitButton>
                        </form>
                    </div>
                </LoginRegister>
            )}
            {!isLoading && currentState === 'verify-otp' && (
                <VerifyOtp
                    email={email}
                    setOtp={setOtp}
                    setCurrentState={setCurrentState}
                    resendOtp={forgotPassword}
                />
            )}
            {!isLoading && currentState === 'reset-password' && (
                <ResetPassword email={email} otp={otp} setCurrentState={setCurrentState} />
            )}
            {!isLoading && currentState === 'success' && <Success />}
        </>
    );
};

export default ForgotPassword;
