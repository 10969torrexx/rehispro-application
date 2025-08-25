import React from 'react';
import { Divider } from '@components';
export default function BirthCertifcateForm() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 8;
    return (
        <form className="p-4">
            <div className=''>
                {currentPage === 1 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 1</p>
                    </div>
                }

                {currentPage === 2 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 2</p>
                    </div>
                }

                {currentPage === 3 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 3</p>
                    </div>
                }

                {currentPage === 4 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 4</p>
                    </div>
                }

                {currentPage === 5 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 5</p>
                    </div>
                }

                {currentPage === 6 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 6</p>
                    </div>
                }

                {currentPage === 7 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 7</p>
                    </div>
                }

                {currentPage === 8 && 
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold">Page 8</p>
                    </div>
                }
            </div>
            <Divider />
            <div className="flex justify-center items-center space-x-4 my-4">
                <button 
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                   <i class="fa-solid fa-angles-left"></i>
                </button>

                <span className="text-gray-700 font-medium">
                    {currentPage} / {totalPages}
                </span>

                <button 
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </form>
    )
}