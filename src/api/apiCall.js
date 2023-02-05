import {
    checkAccessToken,
    checkRefreshToken,
    getAccessToken,
    refreshAuthToken
} from 'components/LoginRegister/Login/Auths';
const baseUrl = process.env.REACT_APP_API_URL;

const loginCheck = async () => {
    const isAccess = await checkAccessToken();
    const isRefresh = await checkRefreshToken();
    if (isAccess && isRefresh) {
        return true;
    }
    const isRefreshed = await refreshAuthToken();
    if (isRefreshed) return true;
    return false;
};
const apiCall = async (endPoint, method = 'GET', data = []) => {
    try {
        await loginCheck();
        const token = getAccessToken();
        const response = await fetch(`${baseUrl}${endPoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: method === 'GET' ? null : JSON.stringify(data)
        });
        const responseData = await response.json();

        if (response.ok) {
            return {
                ok: true,
                data: responseData.data,
                msg: responseData.message
            };
        } else {
            return {
                ok: false,
                msg: responseData.message
            };
        }
    } catch (err) {
        return {
            ok: false,
            msg: err.message
        };
    }
};
export default apiCall;
