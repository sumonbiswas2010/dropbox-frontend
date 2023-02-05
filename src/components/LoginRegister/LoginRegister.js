import './LoginRegister.css';

const LoginRegister = ({ children }) => {
    return (
        <div className="login-register-form-page">
            <div className="login-logo">
                <img
                    src={'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg'}
                    alt=""
                />
            </div>
            <div className="login-register-main">
                <div className="login-register-box">{children}</div>
            </div>
        </div>
    );
};

export default LoginRegister;
