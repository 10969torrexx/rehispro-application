import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone";

export default function Upload() { 
    const onDrop = useCallback(uploadedFiles => {
        console.log(uploadedFiles);
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
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
    )
}