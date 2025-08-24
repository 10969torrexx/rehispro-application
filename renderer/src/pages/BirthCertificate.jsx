import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "../myTools/myTools";

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
                        <button className="btn-primary shadow-lg text-white px-3 py-1 rounded-full"
                            onClick={() => setActiveTab("home")}
                        >
                           <i class="bi-house-door-fill"></i>
                        </button>
                        <button className="btn-primary shadow-lg text-white px-3 py-1 rounded-full"
                            onClick={() => setActiveTab("upload")}
                        >
                           Upload
                        </button>
                       <button className="btn-primary shadow-lg text-white px-3 py-1 rounded-full"
                           onClick={() => setActiveTab("create")}
                       >
                           Create
                       </button>
                    </div>
                    <div id="managementContent" className="p-4 bg-white w-full shadow-lg rounded-lg">
                        {activeTab === "home" && <div>Home Content</div>}
                        {activeTab === "upload" && <div>Upload Content</div>}
                        {activeTab === "create" && 
                            <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg space-y-4 text-left">
                                <h2 className="text-xl font-bold text-left">Certificate of Live Birth</h2>
                                <div>
                                    <label className="block text-sm font-medium">Child’s Name</label>
                                    <div className="grid grid-cols-3 gap-2">
                                    <input
                                        type="text"
                                        name="childFirstName"
                                        placeholder="First"
                                        className="common-input"
                                    />
                                    <input
                                        type="text"
                                        name="childMiddleName"
                                        placeholder="Middle"
                                        className="common-input"
                                    />
                                    <input
                                        type="text"
                                        name="childLastName"
                                        placeholder="Last"
                                        className="common-input"
                                    />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                    <label className="block text-sm font-medium">Sex</label>
                                    <select
                                        name="sex"
                                        className="common-input w-full"
                                    >
                                        <option value="">Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                    </div>
                                    <div>
                                    <label className="block text-sm font-medium">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className="common-input w-full"
                                    />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Place of Birth</label>
                                    <input
                                    type="text"
                                    name="placeOfBirth"
                                    className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Mother’s Name</label>
                                    <input
                                    type="text"
                                    name="motherName"
                                    className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Father’s Name</label>
                                    <input
                                    type="text"
                                    name="fatherName"
                                    className="common-input w-full"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                    <label className="block text-sm font-medium">Marriage Date</label>
                                    <input
                                        type="date"
                                        name="parentsMarriageDate"
                                        className="common-input w-full"
                                    />
                                    </div>
                                    <div>
                                    <label className="block text-sm font-medium">Marriage Place</label>
                                    <input
                                        type="text"
                                        name="parentsMarriagePlace"
                                        className="common-input w-full"
                                    />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
