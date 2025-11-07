import { useState, useEffect } from "react";
import { SideBar, InfoCard } from '@components';
import { MarriageCertificateHome, MarriageCertificateCreateForm, MarriageCertificateView, MarriageCertificateUpload,
    MarriageCertificateSearch, MarriageUploadCreate
} from '@components';

import { useSearchParams } from 'react-router-dom';
export default function MarriageCertificate() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState("home"); //TODO: handle the active tab
    const [uploadedFiles, setUploadedFiles] = useState(null);
    const [ocrResults, setOCRResults] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
        setActiveTab(searchParams.get('activeTab') ? searchParams.get('activeTab') : 'home' );
    }, []);
    return (
        <>
            <div className="flex w-screen h-screen">
                <SideBar
                    role={userData?.role}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="p-4 flex-1 flex flex-col w-screen transition-all duration-300">
                    <h2 className="text-lg font-semibold text-left">Marriage Certificate</h2>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className={`btn-${activeTab == 'home' ? 'primary' : 'secondary'} shadow-lg px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("home")}
                        >
                            <i className="bi-house-door-fill"></i>
                        </button>
                        <button className={`btn-${activeTab == 'upload' ? 'primary' : 'secondary'} shadow-lg text-white px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("upload")}
                        >
                            Upload
                        </button>
                        <button className={`btn-${activeTab == 'create' ? 'primary' : 'secondary'} shadow-lg text-white px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("create")}
                        >
                            Create
                        </button>
                        <button className={`btn-${activeTab == 'search' ? 'primary' : 'secondary'} shadow-lg text-white px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("search")}
                        >
                            Search
                        </button>
                    </div>
                    <div id="managementContent" className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                        {activeTab === "home" &&
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="List of Marriage Certificates"
                                        message="Browse and manage the official records of registered marriage certificates."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <MarriageCertificateHome 
                                        onView={(row) => {
                                            setSelectedRow(row);   
                                            setActiveTab("view");  
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        {activeTab === "upload" && 
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="Upload Marriage Certificates"
                                        message="To upload a marriage certificate, please use the form below to select and submit the document. Ensure that the file is in an accepted format (e.g., PNG, JPEG) and does not exceed the maximum file size limit."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <MarriageCertificateUpload setActiveTab={setActiveTab} onOCRComplete={setOCRResults} uploadedFiles={setUploadedFiles} />
                                </div>
                            </div>}
                        {activeTab === "create" &&
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="Creating Marriage Certificates"
                                        message="To create a marriage certificate, please fill out the form below with accurate information about the marriage event. Ensure all mandatory fields are completed before submitting the form."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <MarriageCertificateCreateForm />
                                </div>
                            </div>
                        }
                        {activeTab === "view" &&
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard 
                                        title="Viewing  Marriage Certificate"
                                        message="Here is the full detail of the selected marriage certificate record."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                <MarriageCertificateView row={selectedRow} />
                                </div>
                            </div>
                        }
                        {activeTab === "search" && 
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <MarriageCertificateSearch setActiveTab={setActiveTab} setSelectedRow={setSelectedRow} />
                            </div>
                        }
                        {
                            activeTab === 'uploadCreate' &&
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="Warning before creating Marriage Certificate"
                                        message={`Please double check each values before confirming. You may go back to the upload tab to re-upload another document if the values are incorrect.`}
                                    />
                                </div>
                                <div>
                                    <MarriageUploadCreate defaultData={ocrResults} activeTab={setActiveTab} filePath={uploadedFiles} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
