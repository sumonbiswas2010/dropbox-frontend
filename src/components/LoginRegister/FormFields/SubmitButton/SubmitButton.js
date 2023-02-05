import './SubmitButton.css';

const SubmitButton = ({ className, children, ...rest }) => {
    return (
        <div className="submit-btn-area">
            <button {...rest} className={`${className} login-register-button`}>
                {children}
            </button>
        </div>
    );
};

export default SubmitButton;
