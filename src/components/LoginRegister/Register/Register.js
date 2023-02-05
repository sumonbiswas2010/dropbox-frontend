import apiCall from 'api/apiCall';
import EmailField from 'components/LoginRegister/FormFields/EmailField/EmailField';
import PasswordField from 'components/LoginRegister/FormFields/PasswordField/PasswordField';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../AlertMessage/ErrorMessage';
import EyeButton from '../FormFields/EyeButton/EyeButton';
import SubmitButton from '../FormFields/SubmitButton/SubmitButton';
import TextInput from '../FormFields/TextInput/TextInput';
import { setTokens } from '../Login/Auths';
import LoginRegister from '../LoginRegister';
// import SuccessMessage from '../AlertMessage/SuccessMessage';
import LoadingOverlay from 'react-loading-overlay';
const Register = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [msg, setMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        password: ''
    });

    const [showPassword, SetShowPassword] = useState(false);

    useEffect(() => {
        document.title = 'Sign Up';
    });

    const signUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await apiCall(`/register`, 'POST', userData);

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setTokens(response.data.tokens);
            navigate('/');
            window.location.reload();
        } else {
            setMsg(response.msg);

            setIsLoading(false);
        }

        setIsLoggedIn(false);
    };

    // Email validation
    const emailValidation = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return !(regex.test(userData?.email) === false);
    };

    // Password validation
    const passwordValidation = (password) => {
        if (password) {
            if (!password.length === 8 || !password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
                return false;
            }
            return true;
        }
        return false;
    };

    return (
        <LoadingOverlay active={isLoading} spinner text={'Loading, Please Wait...'}>
            <LoginRegister>
                <div className="login-register-top sign-up">
                    <h1>Sign Up</h1>
                    <p>Enter your details</p>
                </div>
                <div className="login-register-form">
                    <form onSubmit={signUp}>
                        <TextInput
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            placeholder="Name"
                            required
                        />
                        <EmailField
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
                            />
                            <EyeButton
                                show={showPassword}
                                onClick={() => {
                                    SetShowPassword(!showPassword);
                                }}
                            />
                        </div>

                        <SubmitButton
                            type="submit"
                            disabled={
                                userData.email &&
                                emailValidation() &&
                                userData.password &&
                                passwordValidation(userData?.password)
                                    ? ''
                                    : 'disabled'
                            }
                            // disabled={!userData.email || !userData.password}
                        >
                            Sign In
                        </SubmitButton>
                    </form>

                    {msg && <ErrorMessage>{msg}</ErrorMessage>}

                    <div className="bottom-bar">
                        <p>
                            Already have an account ? <Link to="/login">Sign In </Link>
                        </p>
                    </div>
                </div>
            </LoginRegister>
        </LoadingOverlay>
    );
};

export default Register;
