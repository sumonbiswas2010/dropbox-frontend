import { useEffect, useState } from 'react';
import apiCall from '../../../api/apiCall';
import Loading from '../../Loading/Loading';
import EyeButton from '../FormFields/EyeButton/EyeButton';
import PasswordField from '../FormFields/PasswordField/PasswordField';
import SubmitButton from '../FormFields/SubmitButton/SubmitButton';
import LoginRegister from '../LoginRegister';
import './ForgotPassword.css';

const ResetPassword = (props) => {
    const [otp, setOtp] = useState();
    const [passwordData, setPasswordData] = useState({});
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, SetShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState();

    useEffect(() => {
        document.title = 'Revorium - Reset Password';
    });

    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await apiCall(`/reset_password`, 'POST', {
            email: props.email,
            otp: props.otp,
            password: passwordData.new,
            confirm_password: passwordData.confirm
        });

        setIsLoading(false);

        if (response.ok) {
            props.setCurrentState('success');
        } else {
            setMsg(response.msg);
            setIsError(true);
            setIsLoading(false);
        }
    };

    const passWordValidator = (password) => {
        if (password.length < 8) {
            setMsg('Password Must be at least 8 characters long');
            return false;
        } else if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
            setMsg('Password Must Contain one number and one letter');
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        setIsPasswordValid(false);
        setMsg('');
        if (passwordData.new) passWordValidator(passwordData.new);
        if (passwordData.confirm) {
            if (passwordData.new !== passwordData.confirm) setMsg('Password Did not match');
        }
        if (passwordData.new && passwordData.confirm) {
            if (passWordValidator(passwordData.new) && passwordData.new === passwordData.confirm) {
                setIsPasswordValid(true);
            }
        }
    }, [passwordData.new, passwordData.confirm]);

    return (
        <>
            {isLoading && <Loading />}

            {!isLoading && (
                <LoginRegister>
                    <div className="login-register-top sign-up">
                        <h1>Reset Password</h1>
                        <br />
                    </div>
                    <div className="login-register-form">
                        <form method="post" onSubmit={resetPassword}>
                            <div className="login-register-form-field field-password">
                                <PasswordField
                                    value={passwordData.new}
                                    type={`${!showPassword ? 'password' : 'text'}`}
                                    onChange={(e) => {
                                        setPasswordData({
                                            ...passwordData,
                                            new: e.target.value
                                        });
                                    }}
                                    placeholder="Password"
                                    required
                                />
                                <EyeButton
                                    show={showPassword}
                                    onClick={() => {
                                        SetShowPassword(!showPassword);
                                    }}
                                />
                            </div>
                            <div className="login-register-form-field field-password">
                                <PasswordField
                                    placeholder="Confirm Password"
                                    type={`${!showConfirmPassword ? 'password' : 'text'}`}
                                    value={passwordData.confirm}
                                    onChange={(e) => {
                                        setPasswordData({
                                            ...passwordData,
                                            confirm: e.target.value
                                        });
                                    }}
                                    required
                                />
                                <EyeButton
                                    show={showConfirmPassword}
                                    onClick={() => {
                                        setShowConfirmPassword(!showConfirmPassword);
                                    }}
                                />
                            </div>
                            <SubmitButton type="submit" disabled={!isPasswordValid}>
                                Submit
                            </SubmitButton>
                        </form>
                    </div>
                </LoginRegister>
            )}
        </>
    );
};

export default ResetPassword;
