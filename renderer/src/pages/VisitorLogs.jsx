import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { AddVisitorLog } from '@modals';
export default function VisitorLogs() { 
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [addVisitorLogOpen, setAddVisitorLogOpen] = useState(false);
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

            <AddVisitorLog isOpen={addVisitorLogOpen} onClose={() => setAddVisitorLogOpen(false)} />

            <div className="p-4 flex-1 flex flex-col w-screen h-screen transition-all duration-300">
                <h2 className="text-lg font-semibold text-left">Visitor Logs</h2>
                <div className="flex justify-end mb-4 gap-2">
                    <button className={`btn-primary shadow-lg px-3 py-1 rounded-full`}
                        onClick={() => setAddVisitorLogOpen(true)}
                    >
                        <i class="bi bi-person-fill-add mr-2"></i>
                        Add Visitor Log
                    </button>
                </div>
                <div className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                    work in progress
                </div>
            </div>
        </div>
    )
}