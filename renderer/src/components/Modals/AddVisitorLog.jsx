import { useState } from 'react';
import { toast } from 'react-toastify';
import { ErrorMessages, Divider } from '@components';

export default function AddVisitorsLog({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => { 
        e.preventDefault();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <i class="bi bi-x-lg"></i>
                </button>

                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">Add Visitor Log</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                Modal Content
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
