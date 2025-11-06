import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { InfoCard, BirthCertificateCreate, BirthCertificateHome, BirthCertificateView, BirthCertificateUpload,
    BirthCertificateSearch, BirthCertificateResults
 } from '@components';
import { useSearchParams } from 'react-router-dom'; 

export default function BirthCertificate() {
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [activeTab, setActiveTab] = useState('home'); //TODO: handle the active tab
    const [ocrResults, setOCRResults] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState(null);
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
                <div className="p-4 flex-1 flex flex-col w-screen h-screen transition-all duration-300">
                    <h2 className="text-lg font-semibold text-left">Birth Certificate</h2>
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
                                        title="List of Birth Certificates"
                                        message="Browse and manage the official records of registered birth certificates"
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <BirthCertificateHome 
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
                                        title="Upload Birth Certificates"
                                        message="To upload a birth certificate, please use the form below to select and submit the document. Ensure that the file is in an accepted format (e.g., PDF, JPEG) and does not exceed the maximum file size limit."
                                    />
                                </div>
                                <div>
                                    <BirthCertificateUpload setActiveTab={setActiveTab} onOCRComplete={setOCRResults} uploadedFiles={setUploadedFiles} />
                                </div>
                            </div>
                        }
                        {activeTab === "create" &&
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="Warning before creating Live Birth"
                                        message={`Please double check each values before confirming. \nYou may go back to the upload tab to re-upload another document if the values are incorrect.`}
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <BirthCertificateCreate defaultOCRValues={ocrResults} />
                                </div>
                            </div>
                        }
                        {activeTab === "view" && 
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard 
                                        title="Viewing Birth Certificate"
                                        message="Here is the full detail of the selected birth certificate record."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <BirthCertificateView row={selectedRow} />
                                </div>
                            </div>
                        }
                        {activeTab === 'search' && 
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <BirthCertificateSearch setActiveTab={setActiveTab} setSelectedRow={setSelectedRow} />
                            </div>
                        }
                        {
                            activeTab === 'results' &&
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="Warning before creating Live Birth"
                                        message={`Please double check each values before confirming. You may go back to the upload tab to re-upload another document if the values are incorrect.`}
                                    />
                                </div>
                                <div>
                                    <BirthCertificateResults defaultData={ocrResults} activeTab={setActiveTab} filePath={uploadedFiles} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
