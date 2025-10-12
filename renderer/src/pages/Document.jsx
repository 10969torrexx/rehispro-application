import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "../myTools/myTools";

export default function Document() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
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
                    <h2 className="text-lg font-semibold text-left mb-4">Document Management</h2>
                    <div className="flex justify-left space-x-6">
                        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center w-[150px] hover:bg-purple-500 hover:text-white transition duration-300">
                            <i className="text-3xl bi bi-hearts"></i>
                            <p className="text-sm mt-2">{ capitalizeWords(DocumentType.BIRTH) }</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-2 flex flex-col items-center w-[150px] hover:bg-purple-500 hover:text-white transition duration-300">
                            <i className="bi bi-house-heart text-3xl mt-2"></i>
                            <p className="text-sm mt-2">{ capitalizeWords(DocumentType.MARRIAGE) }</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-2 flex flex-col items-center w-[150px] hover:bg-purple-500 hover:text-white transition duration-300">
                            <i className="bi bi-heart-pulse text-3xl mt-2"></i>
                            <p className="text-sm mt-2">{ capitalizeWords(DocumentType.DEATH) }</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
