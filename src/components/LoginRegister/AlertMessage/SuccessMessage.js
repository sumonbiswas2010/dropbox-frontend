import './AlertMessage.css';

const SuccessMessage = ({ children }) => {
    return (
        <div className="alert-message success-message">
            <p>{children}</p>
        </div>
    );
};

export default SuccessMessage;
