/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import SuccessMessage from '../AlertMessage/SuccessMessage';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import LoadingOverlay from 'react-loading-overlay';
import { v4 as uuidv4 } from 'uuid';
import apiCall from '../../../api/apiCall';
import ErrorMessage from '../AlertMessage/ErrorMessage';
import EmailField from '../FormFields/EmailField/EmailField';
import EyeButton from '../FormFields/EyeButton/EyeButton';
import PasswordField from '../FormFields/PasswordField/PasswordField';
import SubmitButton from '../FormFields/SubmitButton/SubmitButton';
import LoginRegister from '../LoginRegister';
import { setTokens } from './Auths.js';
const Login = () => {
    let deviceID = localStorage.getItem('deviceID');
    if (!deviceID) {
        deviceID = uuidv4();
        localStorage.setItem('deviceID', deviceID);
    }

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        calling_code: '+880',
        phone: ''
    });

    useEffect(() => {
        document.title = 'Sign In';
    });

    const [showPassword, SetShowPassword] = useState(false);
    const [isEmail, setIsEmail] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [msg, setMsg] = useState();

    useEffect(() => {
        document.title = 'Sign In';
    });

    // Email validation
    const emailValidation = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return !(regex.test(userData?.email) === false);
    };

    // Login function
    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let res;
        if (isEmail) {
            if (!userData.email || !userData.password) {
                setIsError(true);
                return;
            }

            setIsError(false);

            res = await apiCall('/login', 'POST', {
                email: userData.email,
                password: userData.password,
                deviceID
            });
        }

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setTokens(res.data.tokens);
            setMsg(res.msg);
            // setIsLoading(false);
            if (window.location.pathname === '/login') navigate('/');
            window.location.reload();
        } else {
            setMsg(res.msg);
            setIsError(true);
            setIsLoading(false);
        }
    };

    return (
        <LoadingOverlay active={isLoading} spinner text={'Loggin In...'}>
            <LoginRegister>
                <div className="login-register-top">
                    <h1>Sign In</h1>
                    <p>Enter your email and password</p>
                </div>

                <div className="login-register-form">
                    <form onSubmit={login}>
                        {isEmail && (
                            <>
                                <EmailField
                                    onChange={(e) =>
                                        setUserData({ ...userData, email: e.target.value })
                                    } /* className={'error-field'} */
                                />
                                <div className="login-register-form-field field-password">
                                    <PasswordField
                                        value={userData.password}
                                        type={`${!showPassword ? 'password' : 'text'}`}
                                        onChange={(e) =>
                                            setUserData({ ...userData, password: e.target.value })
                                        }
                                        placeholder="Password"
                                        required
                                        /* className={'error-field'} */
                                    />
                                    <EyeButton
                                        show={showPassword}
                                        onClick={() => {
                                            SetShowPassword(!showPassword);
                                        }}
                                    />
                                </div>
                                <div className="remember-me-area">
                                    <Link to="forgot-password" className="forgot-password">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="login-with-social-area">
                                    <div className="login-social">
                                        <BsGoogle />
                                        <span>Login with Google</span>
                                    </div>
                                    <div className="login-social fb">
                                        <FaFacebook />
                                        <span>Login with Facebook</span>
                                    </div>
                                </div>
                                <SubmitButton
                                    type="submit"
                                    disabled={
                                        userData.email && emailValidation() && userData.password
                                            ? ''
                                            : 'disabled'
                                    }
                                    // disabled={!userData.email || !userData.password}
                                >
                                    Sign In
                                </SubmitButton>

                                <p className="bottom-bar">
                                    Do not have an account ? <Link to="/register">Sign Up</Link>
                                </p>
                            </>
                        )}

                        {/* <SuccessMessage>{msg}</SuccessMessage>  */}
                        {msg && <ErrorMessage>{msg}</ErrorMessage>}
                    </form>
                </div>
            </LoginRegister>
        </LoadingOverlay>
    );
};

export default Login;
