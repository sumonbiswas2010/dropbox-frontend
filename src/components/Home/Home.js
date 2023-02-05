import React, { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import 'react-slidedown/lib/slidedown.css';
import apiCall from '../../api/apiCall';
import DropZone from '../DropZone/DropZone';
import Files from '../Files/Files';
import FileViewer from './FileViewer';
import './Home.css';
import Nav from './Nav';
const Home = () => {
    const [files, setFiles] = useState();
    const [isUploading, setIsUplaoding] = useState(false);
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log(files);

    const getFiles = async () => {
        setIsDataFetching(true);
        const data = await apiCall('/upload/files');
        setIsDataFetching(false);
        if (data.ok) setFiles(data.data);
        else console.log(data.msg);
    };
    useEffect(() => {
        getFiles();
    }, []);

    const newFileAdd = (data) => {
        setFiles((files) => [data, ...files]);
    };

    const [previewFile, setPreviewFile] = useState();

    return (
        <LoadingOverlay
            active={isUploading || isDataFetching || isLoading}
            spinner
            text={
                isLoading
                    ? 'Loading...'
                    : isDataFetching
                    ? 'Loading your content...'
                    : 'Uploading Your Content'
            }
        >
            <div className="home-div">
                <Nav />
                <DropZone newFileAdd={newFileAdd} setIsUplaoding={setIsUplaoding} />
                {previewFile && <FileViewer file={previewFile} />}

                {files && files.length > 0 && (
                    <Files
                        setPreviewFile={setPreviewFile}
                        data={files}
                        setIsLoading={setIsLoading}
                    />
                )}
            </div>
        </LoadingOverlay>
    );
};
export default Home;
