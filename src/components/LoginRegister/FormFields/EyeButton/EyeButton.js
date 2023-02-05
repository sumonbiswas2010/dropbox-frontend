import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const EyeButton = ({ show, ...rest }) => {
    return (
        <div {...rest} className="password-eye-icon">
            {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
    );
};

export default EyeButton;
