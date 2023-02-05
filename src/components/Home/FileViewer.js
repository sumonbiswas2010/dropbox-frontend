import React, { useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { useLocation, useParams } from 'react-router-dom';
const ViewFile = () => {
    const location = useLocation();
    const [file, setFile] = React.useState(null);
    const { key } = useParams();

    useEffect(() => {
        if (location.state) {
            const docs = [
                {
                    uri: process.env.REACT_APP_API_URL + '/upload/file/' + key,
                    fileType: location.state.type
                }
            ];
            setFile(docs);
        }
    }, []);

    return (
        <>{file && <DocViewer key={key} pluginRenderers={DocViewerRenderers} documents={file} />}</>
    );
};
export default ViewFile;
