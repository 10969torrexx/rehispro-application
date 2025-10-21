import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "@myTools";
import { InfoCard, DeathCertificateCreate, DeathCertificateHome, DeathCertificateView, DeathCertificateUpload } from '@components';

export default function DeathCertificate() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    const [activeTab, setActiveTab] = useState("home"); //TODO: handle the active tab
    const [ocrResults, setOCRResults] = useState(null);
    return (
        <>
            <div className="flex w-screen h-screen">
                <SideBar
                    role={userData?.role}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="p-4 flex-1 flex flex-col w-screen h-screen transition-all duration-300">
                    <h2 className="text-lg font-semibold text-left">Death Certificate</h2>
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
                    </div>
                    <div id="managementContent" className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                        {activeTab === "home" &&
                        <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                            <div className="mb-4">
                                <InfoCard 
                                    title="List of Death Certificates"
                                    message="Browse and manage the official records of registered death certificates"
                                />  
                            </div>
                            <div className="form-content mb-4">
                                <DeathCertificateHome 
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
                                        title="Upload Death Certificates"
                                        message="To upload a birth certificate, please use the form below to select and submit the document. Ensure that the file is in an accepted format (e.g., PNG, JPEG) and does not exceed the maximum file size limit."
                                    />  
                                </div>
                                <div>
                                    <DeathCertificateUpload setActiveTab={setActiveTab} onOCRComplete={(data) => {
                                        setOCRResults(data);
                                    }} />
                                </div>
                            </div>
                        }
                        {activeTab === "create" && 
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard 
                                        title="Creating Death Certificates"
                                        message="To create a death certificate, please fill out the form below with accurate information about the death event. Ensure all mandatory fields are completed before submitting the form."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <DeathCertificateCreate defaultOCRValues={ocrResults} />
                                </div>
                            </div>
                        }
                        {activeTab === "view" && 
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard 
                                        title="Viewing Death Certificate"
                                        message="Here is the full detail of the selected death certificate record."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <DeathCertificateView row={selectedRow} />
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}
