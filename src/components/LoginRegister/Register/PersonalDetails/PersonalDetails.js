import SubmitButton from 'components/LoginRegister/FormFields/SubmitButton/SubmitButton';
import TextInput from 'components/LoginRegister/FormFields/TextInput/TextInput';
import { useEffect, useState } from 'react';

const PersonalDetails = ({ setPageState, setUserData, userData, setIsLoading }) => {
    const [isDobValid, setIsDobValid] = useState(false);
    const [msg, setMsg] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPageState('submit');
    };

    return (
        <form onSubmit={handleSubmit}>
            {msg && <p>{msg}</p>}

            <div className="personal-details-area">
                <div className="personal-details">
                    <TextInput
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        placeholder="Name"
                        required
                    />
                </div>

                <SubmitButton
                    type="submit"
                    disabled={userData.name && isDobValid ? '' : 'disabled'}
                >
                    Sign Up
                </SubmitButton>
            </div>
        </form>
    );
};

export default PersonalDetails;
