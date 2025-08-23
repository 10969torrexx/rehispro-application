import { useState, useState } from "react";
import { SideBar } from '@components';

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
                    <div className="w-full bg-white rounded-xl p-4 shadow-lg text-left">
                        <h2 className="text-lg font-semibold">Document Title</h2>
                        <p className="mt-2 text-gray-600">Document content goes here...</p>
                    </div>
                </div>
            </div>
        </>
    );
}
