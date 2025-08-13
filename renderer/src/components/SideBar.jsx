import { useState } from "react";
import menuData from '../data/sideBar.json';

export default function SideBar({ role = "supervisor", isOpen, setIsOpen }) {
    const menuItems = menuData[role] || [];

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div
            className={`
                h-full bg-white text-gray-800 flex flex-col p-4 shadow-lg
                transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? "w-64" : "w-16"}
            `}
        >
            {/* Toggle Sidebar */}
            <div className="flex items-center space-x-4 mb-8">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md focus:outline-none hover:bg-purple-100"
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
                        className="flex items-center space-x-4 hover:bg-purple-100 rounded px-2 py-2 cursor-pointer"
                    >
                        <i className={`bi ${icon} text-lg`}></i>
                        {isOpen && <span className="whitespace-nowrap">{name}</span>}
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <div className="mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-4 w-full px-2 py-2 rounded hover:bg-red-100 text-red-600"
                >
                    <i className="bi bi-box-arrow-right text-lg"></i>
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}
