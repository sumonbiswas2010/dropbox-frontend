const TextInput = ({ className, label, ...rest }) => {
    return (
        <div className={`${className} login-register-form-field`}>
            {label && <label htmlFor={label}>{label}</label>}
            <input {...rest} />
        </div>
    );
};

export default TextInput;
