import { useState } from "react";
import menuData from '../data/sideBar.json';
import { Link, useNavigate } from "react-router-dom";

export default function SideBar({ role = "supervisor", isOpen, setIsOpen }) {
    const menuItems = menuData[role] || [];
    const navigate = useNavigate();
    const [openMenus, setOpenMenus] = useState({}); // Track submenu states

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/');
    };

    const toggleSubmenu = (name) => {
        setOpenMenus((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
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
                {menuItems.map(({ icon, name, url, submenu }) => (
                    <li key={name}>
                        {/* Parent link or toggle */}
                        <div
                            onClick={() => submenu ? toggleSubmenu(name) : navigate(url)}
                            className="flex items-center justify-between hover:bg-purple-100 rounded px-2 py-2 cursor-pointer"
                        >
                            <div className="flex items-center space-x-4">
                                <i className={`bi ${icon} text-lg`}></i>
                                {isOpen && <span className="whitespace-nowrap">{name}</span>}
                            </div>

                            {/* Show caret only if submenu exists */}
                            {submenu && isOpen && (
                                <i
                                    className={`bi bi-chevron-${openMenus[name] ? "down" : "right"} text-sm`}
                                ></i>
                            )}
                        </div>

                        {/* Submenu items with smooth transition */}
                        <div
                            className={`
                                overflow-hidden transition-all duration-300 ease-in-out
                                ${openMenus[name] ? "max-h-40" : "max-h-0"}
                            `}
                        >
                            <ul className="ml-8 mt-1 space-y-1">
                                {submenu?.map((sub) => (
                                    <li key={sub.name}>
                                        <Link
                                            to={sub.url}
                                            className="flex items-center space-x-2 hover:bg-purple-50 rounded px-2 py-1 text-sm text-gray-700"
                                        >
                                            {isOpen && <span>{sub.name}</span>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
