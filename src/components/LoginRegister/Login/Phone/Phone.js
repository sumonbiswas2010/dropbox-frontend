import apiCall from 'api/apiCall';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import country from '../../country.json';
import SubmitButton from '../../FormFields/SubmitButton/SubmitButton';
import TextInput from '../../FormFields/TextInput/TextInput';
import VerifyOtp from './VerifyOtp';

const Phone = ({ setUserData, userData, setIsLoading }) => {
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [msg, setMsg] = useState();
    const [gotoVerify, setGotoVerify] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMsg('');
        if (userData.calling_code !== '+880') setIsPhoneValid(true);
        else {
            setIsPhoneValid(false);
            if (userData.phone[0] === '1' && userData.phone.length > 9) setIsPhoneValid(true);
            else setMsg('Phone Number must be 10 digit');
            if (userData.phone.length > 9) {
                setUserData({ ...userData, phone: userData.phone.substring(0, 10) });
            }
        }
    }, [userData.phone, userData.calling_code]);

    const sendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await apiCall('/send_otp_to_login', 'POST', {
            phone: userData.calling_code + userData.phone
        });

        setIsLoading(false);

        if (res.ok) {
            setGotoVerify(1);
        } else {
            setMsg(res.msg);
        }
    };

    return (
        <>
            {!gotoVerify && (
                <>
                    <div className="phone-field-area">
                        <select
                            className="phone-select-field"
                            value={userData.calling_code}
                            onChange={(e) =>
                                setUserData({ ...userData, calling_code: e.target.value })
                            }
                        >
                            {country.map((data) => (
                                <option key={data.iso} value={'+' + data.code}>
                                    {data.iso} {'+' + data.code}
                                </option>
                            ))}
                        </select>
                        <TextInput
                            value={userData.phone}
                            type="number"
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            required
                            className={'phone-field'}
                        />
                    </div>
                    <SubmitButton onClick={sendOtp} disabled={!isPhoneValid || !userData.phone}>
                        Send OTP
                    </SubmitButton>
                </>
            )}
            {gotoVerify && (
                <VerifyOtp
                    resendOtp={sendOtp}
                    setIsLoading={setIsLoading}
                    phone={userData.calling_code + userData.phone}
                />
            )}
        </>
    );
};

export default Phone;
