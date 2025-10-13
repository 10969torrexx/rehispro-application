import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone";
import { ErrorMessages } from '@components';
import { FileValidation } from '@services';
import { FileList, LoadingScreen } from '@components';
import { Limits } from '@enums';
import { toast } from "react-toastify";
import { BirthCertServices } from '@services';

export default function BirthCertificateUpload({setActiveTab, onOCRComplete}) { 
    const [files, setFiles ] = useState([]);
    const [errors, setErrors] = useState([]);

    const onDrop = useCallback(uploadedFiles => {
        const sorted = uploadedFiles;

        const readable = sorted.map(file => ({
            name: file.name,
            size: Math.round(file.size / 1024) + " KB",
            type: file.type,
            lastModified: new Date(file.lastModified).toLocaleString()
        }));

        //TODO: check the number of files uploaded
        if (readable.length > Limits.MAX_FILE_UPLOAD) {
            toast.error(`Please check the error(s)`);
            setErrors({
                uploadField: `You can only upload up to ${Limits.MAX_FILE_UPLOAD} files at a time.`
            });
            return;
        } else {
            setErrors([]);
        }

        const errors = FileValidation.validateForm(readable);
        if (errors.length > 0) {
            setErrors(errors);
        } else {
            setFiles(sorted);
        }
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const removeFile = (id) => { 
        const newFiles = files.filter((file, index) => index !== id);
        setFiles(newFiles);
    }

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        try {
            setLoading(true)
            const response = await BirthCertServices.uploadFiles(formData);
            setLoading(false);
            if (response.success) {
                //TODO: handle changing the active tab to create; passing orc results to create active tab.
                setActiveTab('create');
                onOCRComplete(response.result);
            } else {
                toast.error("Failed: No OCR Response");
            }
        } catch (error) {
            console.error(error);
            toast.error('Runtime Error');
        } 
    }

    if (loading) {
        return (
           <LoadingScreen title={"Running OCR, Please wait.. "} message={"This might take sometime."} />
        );
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-2">
                {errors.uploadField && <ErrorMessages errors={errors.uploadField} />}
                {errors && <ErrorMessages errors={errors.map(err => err.file)} />}
            </div>
            <div {...getRootProps()} className={`border-2 border-dashed p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer 
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                    ${errors.length > 0 ? 'input-error' : ''}`}>
                <input {...getInputProps()} 
                    type="file"
                    multiple
                    accept="image/jpeg,image/png"
                />
                <div className='p-4 rounded-full'>
                    <i className="text-4xl fa-solid fa-cloud-arrow-up text-gray-500"></i>
                </div>
                <div className="flex flex-col items-center">
                    {isDragActive ? <p>Drop the files here ...</p> : (
                        <>
                            <p>Choose or drag and drop files here to upload</p>
                            <p className="text-xs text-gray-400 text-center">JPEG and PNG formats and up to 10 MB</p>
                            <button className='mt-4 rounded-full px-4 py-2 btn-primary'>Browse Files</button>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-4 w-full">
                {files.length > 0 && (
                    files.map((item, index) => (
                        <FileList key={index} id={index} name={item.name} size={item.size} type={item.type} onRemove={removeFile} />
                    ))
                )}
            </div>
            {files.length > 0 && (
                <div className="mt-4 w-full">
                    <button type="submit" className='mt-4 rounded-full px-4 py-2 btn-primary'>Scan Files</button>
                </div>
            )}
        </form>
    )
}