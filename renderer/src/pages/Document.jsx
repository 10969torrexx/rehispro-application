import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "../myTools/myTools";

export default function Document() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
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
                    <h2 className="text-lg font-semibold text-left mb-4">Document Title</h2>
                    <div className="flex justify-left space-x-6 p-6">
                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-[200px] hover:bg-purple-500 hover:text-white transition duration-300">
                            <i className="bi bi-house text-3xl"></i>
                            <p className="text-sm mt-2">{ capitalizeWords(DocumentType.BIRTH) }</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-[200px] hover:bg-purple-500 hover:text-white transition duration-300">
                            <i className="bi bi-gear text-3xl"></i>
                            <p className="text-sm mt-2">{ capitalizeWords(DocumentType.MARRIAGE) }</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-[200px] hover:bg-purple-500 hover:text-white transition duration-300">
                            <i className="bi bi-person text-3xl"></i>
                            <p className="text-sm mt-2">{ capitalizeWords(DocumentType.DEATH) }</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
