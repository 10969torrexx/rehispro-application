import { useState } from "react";
import menuData from '../data/sideBar.json';

export default function SideBar({ role = "supervisor" }) {
    const menuItems = menuData[role] || [];
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`
                fixed top-0 left-0 h-full bg-white text-gray-800 flex flex-col p-4
                transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? "w-64" : "w-16"}
            `}
        >
            {/* Top bar: toggle button + first menu icon (or just toggle) */}
            <div className="flex items-center space-x-4 mb-8">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    {isOpen ? (
                        <i className="bi bi-layout-sidebar-inset"></i>
                    ) : (
                        <i className="bi bi-layout-sidebar"></i>
                    )}
                </button>

                {isOpen && (
                    <span className="text-lg font-semibold select-none">
                        Menu
                    </span>
                )}
            </div>

            {/* Menu items */}
            <ul className="space-y-2 flex-1">
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
    );
}
