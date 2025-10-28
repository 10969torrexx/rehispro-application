import { useState, useEffect } from 'react';
import { VisitorsLog } from '@enums';
import { toast } from 'react-toastify';
import { ErrorMessages, Divider } from '@components';

export default function AddVisitorsLog({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const handleSubmit = async (e) => { 
        e.preventDefault();
    }
    return (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-xl p-10'>
                {isLoading ? (
                    <div className='flex items-center justify-center'>
                        <div className="spinner"></div>
                   </div>
                ): (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">Add Visitor Log</h2>
                        <form action=""onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                Modal Content
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}