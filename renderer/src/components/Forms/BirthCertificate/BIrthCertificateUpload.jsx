import { UploadCloud } from "lucide-react";
import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone";
import { ErrorMessages } from '@components';
import { FileValidation } from '@services';
import { FileList } from '@components';

export default function BirthCertificateUpload() { 
    const [files, setFiles ] = useState([]);
    const [errors, setErrors] = useState([]);
    const [processing, setProcessing] = useState(false);
    const onDrop = useCallback(uploadedFiles => {
        const sorted = [...uploadedFiles].sort((a, b) => {
            a.name.localeCompare(b.name)
        });
        const readable = sorted.map((file) => ({
            name: file.name,
            size: Math.round(file.size / 1024) + " KB",
            type: file.type,
            lastModified: new Date(file.lastModified).toLocaleString()
        }));
        
        const errors = FileValidation.validateForm(readable);
        if (errors.length > 0) {
            setErrors(errors);
        } else {
            setFiles(readable);
        }
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <>
            <div {...getRootProps()} className="w-full border-dashed border rounded-lg border-2 border-gray-300 h-64 flex flex-col justify-center items-center text-gray-400">
                <input {...getInputProps()} />
                <div className='p-4 rounded-full'>
                    <i className="text-4xl fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div className="flex flex-col items-center">
                    {isDragActive ? <p>Drop the files here ...</p> : (
                        <>
                            <p>Choose or drag and drop files here to upload</p>
                            <p className="text-xs text-gray-400 text-center">JPEG, PNG, and PDF formats and up to 10 MB</p>
                            <button className='mt-4 rounded-full px-4 py-2 btn-primary'>Browse Files</button>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-4 w-full">
                {files.length > 0 && (
                    files.map((item, index) => (
                        <FileList name={item.name} size={item.size} type={item.type} />
                    ))
                )}
            </div>
        </>
    )
}