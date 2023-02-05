import React from 'react';

const TextArea = ({ className, label, ...rest }) => {
    return (
        <div className={`${className} login-register-form-field`}>
            {label && <label htmlFor={label}>{label}</label>}
            <textarea {...rest}></textarea>
        </div>
    );
};

export default TextArea;
