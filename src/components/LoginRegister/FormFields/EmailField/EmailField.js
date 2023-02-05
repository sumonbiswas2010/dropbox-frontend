import { HiOutlineMail } from 'react-icons/hi';
import './EmailField.css';

const EmailField = ({ className, ...rest }) => {
    return (
        <div className={`login-register-form-field field-email ${className}`}>
            <span>
                <HiOutlineMail />
            </span>
            <input type="email" placeholder="Email" name="email" {...rest} />
        </div>
    );
};

export default EmailField;
