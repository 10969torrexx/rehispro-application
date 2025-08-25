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
    const [currentPage, setCurrentPage] = useState(1); //TODO: handle the current page for pagination
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
                            <div className="p-2 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <form className="w-full h-full">
                                    <div className="mb-4">
                                        <InfoCard 
                                            title="Creating Birth Certificates"
                                            message="To create a birth certificate, please fill out the form below with accurate information about the birth event. Ensure all mandatory fields are completed before submitting the form."
                                        />
                                    </div>
                                    <div class="form-content mb-4">
                                        {currentPage === 1 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 1</p>
                                            </div>
                                        }

                                        {currentPage === 2 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 2</p>
                                            </div>
                                        }

                                        {currentPage === 3 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 3</p>
                                            </div>
                                        }

                                        {currentPage === 4 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 4</p>
                                            </div>
                                        }

                                        {currentPage === 5 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 5</p>
                                            </div>
                                        }

                                        {currentPage === 6 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 6</p>
                                            </div>
                                        }

                                        {currentPage === 7 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 7</p>
                                            </div>
                                        }

                                        {currentPage === 8 && 
                                            <div className="mb-4 text-center">
                                                <p>Page 8</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex justify-center"></div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
