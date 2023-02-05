import Register from 'components/LoginRegister/Register/Register';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FileViewer from './components/Home/FileViewer';
import Home from './components/Home/Home';

import {
    checkAccessToken,
    checkRefreshToken,
    refreshAuthToken
} from './components/LoginRegister/Login/Auths';
import Login from './components/LoginRegister/Login/Login';
import NotFound from './components/NotFound/NotFound';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginCheck = async () => {
        const isAccess = await checkAccessToken();
        const isRefresh = await checkRefreshToken();
        if (isAccess && isRefresh) {
            setIsLoggedIn(true);
        } else {
            const isRefreshed = await refreshAuthToken();
            if (isRefreshed) setIsLoggedIn(true);
            else setIsLoggedIn(false);
        }
    };
    useEffect(() => {
        loginCheck();
    }, []);
    return (
        <>
            {!isLoggedIn ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
                    </Routes>
                </BrowserRouter>
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/view/:key" element={<FileViewer />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
};

export default App;
