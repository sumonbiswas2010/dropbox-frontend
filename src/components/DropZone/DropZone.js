import {
    checkAccessToken,
    checkRefreshToken,
    getAccessToken,
    refreshAuthToken
} from 'components/LoginRegister/Login/Auths';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
const MyDropzone = ({ newFileAdd, setIsUplaoding }) => {
    const [msg, setMsg] = useState();

    const onDrop = useCallback((acceptedFiles) => {
        setMsg();
        acceptedFiles.forEach(async (file) => {
            const data = new FormData();
            data.append('file', file);
            setIsUplaoding(true);
            await loginCheck();
            const token = getAccessToken();
            const res = await fetch('http://localhost:8090/v1/upload/file', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                body: data
            });
            setIsUplaoding(false);

            if (res.ok) {
                const data = await res.json();
                newFileAdd(data.data);
                setMsg(file.name + ' Uploaded');
            } else {
                const data = await res.json();
                setMsg(data.message);
            }

            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="drop-zone" {...getRootProps()}>
            {msg && <span className="error">{msg}</span>}

            <input type="file" {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
};

export default MyDropzone;
