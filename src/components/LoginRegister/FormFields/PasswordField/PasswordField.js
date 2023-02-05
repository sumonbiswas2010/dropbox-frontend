import { HiOutlineLockClosed } from 'react-icons/hi';
import './PasswordField.css';

const PasswordField = ({ className, ...rest }) => {
    return (
        <>
            <span>
                <HiOutlineLockClosed />
            </span>
            <input {...rest} />
        </>
    );
};

export default PasswordField;
