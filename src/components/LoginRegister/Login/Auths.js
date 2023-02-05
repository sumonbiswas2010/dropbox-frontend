/* eslint-disable camelcase */
import apiCall from '../../../api/apiCall';

const subtractMinutes = (numOfMinutes, date = new Date()) => {
    date.setMinutes(date.getMinutes() - numOfMinutes);
    return date;
};
export const setTokens = (tokenObj) => {
    localStorage.setItem('access_token', tokenObj.access.token);
    localStorage.setItem('refresh_token', tokenObj.refresh.token);
    localStorage.setItem(
        'refresh_token_expires',
        subtractMinutes(1, new Date(tokenObj.refresh.expires))
    );
    localStorage.setItem(
        'access_token_expires',
        subtractMinutes(1, new Date(tokenObj.access.expires))
    );
};
export const checkAccessToken = () => {
    const access_token_expires = localStorage.getItem('access_token_expires');
    const access_token = localStorage.getItem('access_token');
    if (access_token_expires && access_token) {
        if (new Date(access_token_expires) > new Date()) {
            return true;
        }
    }
    return false;
};
export const checkRefreshToken = () => {
    const refresh_token_expires = localStorage.getItem('refresh_token_expires');
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token_expires && refresh_token) {
        if (new Date(refresh_token_expires) > new Date()) {
            return true;
        }
    }
    return false;
};
export const getAccessToken = () => {
    const token = localStorage.getItem('access_token');
    if (token != null) return token.replace(/['"]+/g, '');
    return null;
};

export const refreshAuthToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return false;
        const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh_token`, {
            method: 'POST',
            body: JSON.stringify({
                refreshToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        if (response.ok) {
            await setTokens(responseData.data);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};
export const logout = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await apiCall(`/logout`, 'POST', {
            refreshToken
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_token_expires');
        localStorage.removeItem('access_token_expires');
        localStorage.removeItem('user');
        window.location.reload();
        if (response.ok) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('refresh_token_expires');
            localStorage.removeItem('access_token_expires');
            localStorage.removeItem('user');
            window.location.reload();
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};
