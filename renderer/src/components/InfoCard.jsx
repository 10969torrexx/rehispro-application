import { useState } from "react";

export default function InfoCard({ title = "Information", message = "This is an info message." }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Hide when closed

  return (
    <div className="relative bg-purple-50 border border-purple-300 text-purple-800 p-4 rounded-xl shadow-sm w-full">
      {/* Close button */}
        <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-purple-500 hover:text-purple-700 bg-purple-200  hover:bg-purple-150 rounded-full w-8 h-8 flex items-center justify-center shadow-sm focus:outline-none"
            >
            <i className="bi bi-x text-lg"></i>
        </button>


      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm">{message}</p>
    </div>
  );
}
  