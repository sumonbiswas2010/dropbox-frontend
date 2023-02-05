import successImg from 'images/recover_pass.svg';
import { Link } from 'react-router-dom';
import LoginRegister from '../LoginRegister';
import './ForgotPassword.css';
import Timer from './Timer';
const ResetPassword = () => {
    return (
        <>
            <LoginRegister>
                <img src={successImg} alt="" />
                <div className="login-register-top sign-up">
                    <h1>Reset Successful</h1>
                    <p>Your reset password has been successfully completed.please login.</p>
                </div>
                <div className="form-fields-area">
                    <Link to="/login">
                        <div className="forgot-password">Login Now</div>
                    </Link>
                </div>
                <br></br>
                <p className="weak-text">
                    You will be automatically redirected in <Timer />
                </p>
            </LoginRegister>
        </>
    );
};

export default ResetPassword;
