import React from 'react';
import { Divider } from '@components';
export default function BirthCertifcateForm() {
    const [currentPage, setCurrentPage] = React.useState(1); //TODO: handle current page
    const totalPages = 8;
    const pageTitles = [ 
        "Province & Child's Information", 
        "Parents' Information", 
        "Informant's Information", 
        "Attendant's Information", 
        "Certification", 
        "Amendment (if applicable)", 
        "Review & Submit"
    ];
    return (
        <form className="p-4">
            <div className='mb-4'>
                {currentPage === 1 && 
                    <div className="mb-4 text-left space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                            {/* Province */}
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Province</label>
                                <input
                                type="text"
                                name="province"
                                placeholder="Province"
                                className="common-input"
                                />
                            </div>

                            {/* City / Municipality */}
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">City / Municipality</label>
                                <input
                                type="text"
                                name="city"
                                placeholder="City / Municipality"
                                className="common-input"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Child’s Name</label>
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    name="childFirstName"
                                    placeholder="First"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="childMiddleName"
                                    placeholder="Middle"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="childLastName"
                                    placeholder="Last"
                                    className="common-input"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium">Sex</label>
                                <select
                                    name="sex"
                                    className="common-input w-full"
                                >
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="common-input w-full"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Type of Birth (Single, Twin, Triplet, .etc)</label>
                                <input
                                type="text"
                                name="province"
                                placeholder="Province"
                                className="common-input"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">If Multiple Birth, Chil was (First, Second, Third, etc)</label>
                                <input
                                type="text"
                                name="city"
                                placeholder="City / Municipality"
                                className="common-input"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Birth Order (First, Second, Third, etc)</label>
                                <input
                                type="text"
                                name="province"
                                placeholder="Province"
                                className="common-input"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Weight at Birth</label>
                                <input
                                type="text"
                                name="city"
                                placeholder="City / Municipality"
                                className="common-input"
                                />
                            </div>
                        </div>
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
            <Divider text={pageTitles[(currentPage) - 1]}/>
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