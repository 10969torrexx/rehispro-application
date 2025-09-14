import { useState, useEffect } from "react";
import { SideBar, InfoCard } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "../myTools/myTools";
import MarriageCertificateCreateForm from '@components/Forms/MarriageCertificate/MarriageCertificateCreateForm';

export default function MarriageCertificate() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    const [activeTab, setActiveTab] = useState("home"); //TODO: handle the active tab
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
                    </div>
                    <div id="managementContent" className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                        {activeTab === "home" && <div>Home Content</div>}
                        {activeTab === "upload" && <div>Upload Content</div>}
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
                    </div>
                </div>
            </div>
        </>
    );
}
