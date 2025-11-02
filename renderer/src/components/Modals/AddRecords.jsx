import { Link, useNavigate, useLocation } from "react-router-dom";
export default function AddRecords({ isOpen, onClose }) {
    
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2 className="text-2xl font-semibold mb-4">Add Records</h2>
                <div className="w-full p-2 flex flex-row gap-2 items-center">
                    <button className="btn-primary text-white px-4 py-2 rounded-lg shadow-lg">
                        <Link to="/birth-certificates?activeTab=create">Add Birth Certificate</Link>
                    </button>
                    <button className="btn-primary text-white px-4 py-2 rounded-lg shadow-lg">
                        <Link to="/death-certificates?activeTab=create">Add Death Certificate</Link>
                    </button>
                    <button className="btn-primary text-white px-4 py-2 rounded-lg shadow-lg">
                        <Link to="/marriage-certificates?activeTab=create">Add Marriage Certificate</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
