import { useEffect, useRef, useState } from 'react';
import apiCall from '../../../api/apiCall';
import Loading from '../../Loading/Loading';
import Form from '../../Shared/Form/Form';
import ErrorMessage from '../AlertMessage/ErrorMessage';
import SubmitButton from '../FormFields/SubmitButton/SubmitButton';
import TextInput from '../FormFields/TextInput/TextInput';
import LoginRegister from '../LoginRegister';
import './ForgotPassword.css';

const VerifyOtp = (props) => {
    const [otp, setOtp] = useState();

    const title = 'Verify OTP';

    const [isError, setIsError] = useState(false);
    const [msg, setMsg] = useState();
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total,
            minutes,
            seconds
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        setTimer('04:59');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 299);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Revorium - Verify OTP';
    });

    const verifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await apiCall(`/verify_otp`, 'POST', {
            email: props.email,
            otp
        });

        setIsLoading(false);
        if (response.ok) {
            props.setOtp(otp);
            props.setCurrentState('reset-password');
        } else {
            setMsg(response.msg);
            setIsError(true);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            {
                <LoginRegister>
                    <div className="login-register-top sign-up">
                        <h1>Verify OTP</h1>
                        <br />
                    </div>
                    <div className="login-register-form">
                        <Form method="post" onSubmit={verifyOtp}>
                            <TextInput
                                type="text"
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="6 digit OTP"
                                required
                            />
                            {timer !== '00:00' && <p>OTP Will Expire in: {timer}</p>}

                            {timer === '00:00' && (
                                <button onClick={props.resendOtp}>
                                    <div className="forgot-password">Resend OTP</div>
                                </button>
                            )}

                            <SubmitButton>Verify</SubmitButton>

                            {msg && <ErrorMessage>{msg}</ErrorMessage>}
                        </Form>
                    </div>
                </LoginRegister>
            }
        </>
    );
};

export default VerifyOtp;
