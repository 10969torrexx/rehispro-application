import { useState, useEffect } from "react";
import { SideBar } from '@components';

export default function VisitorLogs() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    return (
        <div className="flex w-screen h-screen">
            <SideBar
                role={userData?.role}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <div className="p-4 flex-1 flex flex-col w-screen h-screen transition-all duration-300">
                <h2 className="text-lg font-semibold text-left mb-2">Visitor Logs</h2>
                <div className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                    <p>Visitor Logs Content</p>
                </div>
            </div>
        </div>
    );
}