import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "../myTools/myTools";
import { InfoCard } from '@components';

export default function BirthCertificate() {
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
                    <h2 className="text-lg font-semibold text-left">Birth Certificate</h2>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className={`btn-${activeTab == 'home' ? 'primary' : 'secondary'} shadow-lg px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("home")}
                        >
                           <i class="bi-house-door-fill"></i>
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
                    <div id="managementContent" className="p-4 bg-white w-full flex justify-center shadow-lg rounded-lg">
                        {activeTab === "home" && <div>Home Content</div>}
                        {activeTab === "upload" && <div>Upload Content</div>}
                        {activeTab === "create" && 
                            <div className="p-2 h-full text-left test-element w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <form className="w-full h-full">
                                    <div className="mb-4">
                                        <InfoCard 
                                            title="Creating Birth Certificates"
                                            message="To create a birth certificate, please fill out the form below with accurate information about the birth event. Ensure all mandatory fields are completed before submitting the form."
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 border-gray-300"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-1" htmlFor="dateOfBirth">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 border-gray-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-1" htmlFor="placeOfBirth">
                                            Place of Birth
                                        </label>
                                        <input
                                            type="text"
                                            id="placeOfBirth"
                                            name="placeOfBirth"
                                            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 border-gray-300"
                                            placeholder="Enter place of birth"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-1" htmlFor="parentNames">
                                            Parent Names
                                        </label>
                                        <input
                                            type="text"
                                            id="parentNames"
                                            name="parentNames"
                                            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 border-gray-300"
                                            placeholder="Enter parent names"
                                        />
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
