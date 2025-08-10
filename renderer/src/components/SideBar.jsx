import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-1 z-50 p-2 text-black rounded-md focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <i className="bi bi-layout-sidebar"></i> : <i className="bi bi-layout-sidebar-inset"></i>}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full bg-white text-gray-800 flex flex-col p-6
          transition-width duration-300 ease-in-out overflow-hidden text-left
          ${isOpen ? "w-64" : "w-0"}
        `}
      >
        <ul className={`space-y-2 mt-10 ${isOpen ? "block" : "hidden"}`}>
          <li className="hover:bg-blue-100 rounded px-3 py-1 cursor-pointer">Dashboard</li>
          <li className="hover:bg-blue-100 rounded px-3 py-1 cursor-pointer">Settings</li>
          <li className="hover:bg-blue-100 rounded px-3 py-1 cursor-pointer">Profile</li>
        </ul>
      </div>
    </>
  );
}
