import { useState } from "react";
import menuData from '../data/sideBar.json';

export default function SideBar({ role = "supervisor" }) {
    const menuItems = menuData[role] || [];
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-1 z-50 p-2 text-black rounded-md focus:outline-none"
                aria-label="Toggle Sidebar"
            >
                {isOpen ? (
                    <i className="bi bi-layout-sidebar-inset"></i>
                ) : (
                    <i className="bi bi-layout-sidebar"></i>
                )}
            </button>

            <div
                className={`
                fixed top-0 left-0 h-full bg-white text-gray-800 flex flex-col p-4
                transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? "w-64" : "w-16"}
                `}
            >
                <ul className="space-y-2 mt-10">
                    {menuItems.map(({ icon, name }) => (
                        <li
                            key={name}
                            className="flex items-center space-x-4 hover:bg-blue-100 rounded px-2 py-2 cursor-pointer"
                        >
                            <i className={`bi ${icon} text-lg`}></i>
                            {isOpen && <span className="whitespace-nowrap">{name}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
