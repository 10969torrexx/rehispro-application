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
    return (
        <>
            <div className="flex w-screen h-screen">
                <SideBar
                    role={userData?.role}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="p-4 flex-1 flex flex-col w-screen transition-all duration-300">
                    <h2 className="text-lg font-semibold text-left mb-4">Birth Certificate</h2>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className="btn-primary shadow-lg text-white px-3 py-1 rounded-full">
                           <i class="bi bi-house-door"></i>
                        </button>
                        <button className="btn-primary shadow-lg text-white px-3 py-1 rounded-full">
                           Upload
                        </button>
                       <button className="btn-primary shadow-lg text-white px-3 py-1 rounded-full">
                           Create
                       </button>
                    </div>
                </div>
            </div>
        </>
    );
}
