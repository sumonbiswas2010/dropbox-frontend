import React, { useEffect } from 'react';
// import FileViewer from 'react-file-viewer';
import DocViewer from 'react-doc-viewer';
import { useLocation } from 'react-router-dom';
const ViewFile = ({}) => {
    const location = useLocation();
    const [file, setFile] = React.useState(null);
    console.log(location.state);
    // useEffect(() => {
    //     console.log(location.state);
    //     if (location.state) setFile(location.state);
    // }, []);
    const docs = [{ uri: 'https://url-to-my-pdf.pdf' }, { uri: 'https://url-to-my-pdf.pdf' }];
    return (
        <DocViewer documents={docs} />
        // <div>
        //     {file && (
        //         <FileViewer
        //             fileType={file.type}
        //             filePath={'http://localhost:8090/v1/upload/file/' + file.key}
        //             // errorComponent={CustomErrorComponent}
        //             onError={(e) => console.log(e)}
        //         />
        //     )}
        // </div>
    );
};
export default ViewFile;
