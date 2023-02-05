import apiCall from 'api/apiCall';
import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../AlertMessage/ErrorMessage';
import SubmitButton from '../../FormFields/SubmitButton/SubmitButton';
import TextInput from '../../FormFields/TextInput/TextInput';

const VerifyOtp = (props) => {
    const [otp, setOtp] = useState();
    const [isError, setIsError] = useState(false);
    const [msg, setMsg] = useState();
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00');
    const [resetCounter, setResetCounter] = useState(false);

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
        const { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
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
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 299);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, [resetCounter]);

    useEffect(() => {
        if (timer === '00:00') setMsg('OTP Expired');
        else if (!isError) setMsg('');
    }, [timer]);

    useEffect(() => {
        document.title = 'Vovo - Verify OTP';
    });

    const verifyOtp = async (e) => {
        e.preventDefault();
        props.setIsLoading(true);

        const response = await apiCall(`/verify_email`, 'POST', {
            email: props.email,
            otp
        });

        props.setIsLoading(false);

        if (response.ok) {
            props.success(otp);
        } else {
            // setTimer('00:00');
            setMsg(response.msg);
            setIsError(true);
        }
    };

    return (
        <>
            {/* {isLoading && <Loading />} */}
            {msg && <p>{msg}</p>}
            <form onSubmit={verifyOtp}>
                <TextInput
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6 digit OTP"
                    required
                />
                {timer !== '00:00' && <p>OTP Will Expire in: {timer}</p>}
                {(timer === '00:00' || isError) && (
                    <button
                        className="resend-otp"
                        onClick={async (e) => {
                            await props.resendOtp(e);
                            setResetCounter(true);
                            setMsg('OTP has been sent again');
                            setIsError(false);
                        }}
                    >
                        Resend OTP
                    </button>
                )}

                <SubmitButton onClick={verifyOtp} disabled={otp?.length !== 6}>
                    Verify
                </SubmitButton>

                {msg && <ErrorMessage>{msg}</ErrorMessage>}
            </form>
        </>
    );
};

export default VerifyOtp;
