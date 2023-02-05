import PasswordField from 'components/LoginRegister/FormFields/PasswordField/PasswordField';
import SubmitButton from 'components/LoginRegister/FormFields/SubmitButton/SubmitButton';
import React, { useState } from 'react';
import EyeButton from '../../FormFields/EyeButton/EyeButton';
import ErrorMessage from '../../AlertMessage/ErrorMessage';

const CreatePassword = ({ setPageState, setUserData, userData, setIsLoading }) => {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, SetShowPassword] = useState(false);
    const [msg, setMsg] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPageState('details');
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
        <form onSubmit={handleSubmit}>
            <div className="login-register-form-field field-password">
                <PasswordField
                    value={userData.password}
                    type={`${!showPassword ? 'password' : 'text'}`}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
                    value={userData.confirm_password}
                    type={`${!showConfirmPassword ? 'password' : 'text'}`}
                    onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
                    required
                />
                <EyeButton
                    show={showConfirmPassword}
                    onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                    }}
                />
            </div>
            <SubmitButton
                type="submit"
                disabled={
                    passwordValidation(userData?.password) &&
                    userData?.password &&
                    userData?.confirm_password &&
                    userData?.password === userData?.confirm_password
                        ? ''
                        : 'disabled'
                }
            >
                Next
            </SubmitButton>

            {msg && <ErrorMessage>{msg}</ErrorMessage>}
        </form>
    );
};

export default CreatePassword;
