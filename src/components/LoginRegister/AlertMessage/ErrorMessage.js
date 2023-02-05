import './AlertMessage.css';

const ErrorMessage = ({ children }) => {
    return (
        <div className="alert-message error-message">
            <p>{children}</p>
        </div>
    );
};

export default ErrorMessage;
