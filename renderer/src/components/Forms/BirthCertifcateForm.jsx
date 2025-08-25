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
                        {/* Province & City / Municipality */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-1">Province</label>
                            <input
                            type="text"
                            name="province"
                            placeholder="Province"
                            className="common-input"
                            />
                        </div>
                    
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
                  
                        {/* Child’s Name */}
                        <div>
                        <label className="block text-sm font-medium">Child’s Name</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                  
                        {/* Sex & Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium">Sex</label>
                            <select name="sex" className="common-input w-full">
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input type="date" name="dateOfBirth" className="common-input w-full" />
                        </div>
                        </div>
                  
                        {/* Type of Birth & Multiple Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-1">
                            Type of Birth (Single, Twin, Triplet, etc)
                            </label>
                            <input
                            type="text"
                            name="typeOfBirth"
                            placeholder="Type of Birth"
                            className="common-input"
                            />
                        </div>
                    
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-1">
                            If Multiple Birth, Child was (First, Second, Third, etc)
                            </label>
                            <input
                            type="text"
                            name="multipleBirthOrder"
                            placeholder="Order"
                            className="common-input"
                            />
                        </div>
                        </div>
                  
                        {/* Birth Order & Weight at Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-1">
                            Birth Order (First, Second, Third, etc)
                            </label>
                            <input
                            type="text"
                            name="birthOrder"
                            placeholder="Birth Order"
                            className="common-input"
                            />
                        </div>
                    
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium mb-1">Weight at Birth</label>
                            <input
                            type="text"
                            name="birthWeight"
                            placeholder="Weight"
                            className="common-input"
                            />
                        </div>
                        </div>
                    </div>
                }

                {currentPage === 2 && 
                    <div className="mb-6 text-left space-y-6">
                        {/* Maiden Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Maiden Name</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    name="maidenFirstName"
                                    placeholder="First Name"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="maidenMiddleName"
                                    placeholder="Middle Name"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="maidenLastName"
                                    placeholder="Last Name"
                                    className="common-input"
                                />
                            </div>
                        </div>
                    
                        {/* Citizenship & Religion */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Citizenship</label>
                                <input
                                    type="text"
                                    name="citizenship"
                                    placeholder="Citizenship"
                                    className="common-input"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                                <input
                                    type="text"
                                    name="religion"
                                    placeholder="Religion / Religious Sect"
                                    className="common-input"
                                />
                            </div>
                        </div>
                    
                        {/* Children Statistics */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium">Total number of Children Born Alive</label>
                            <input
                                type="number"
                                name="childrenBornAlive"
                                placeholder="Total Children Born Alive"
                                className="common-input w-full"
                            />
                        
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">
                                        No. of Children Still Living (including this birth)
                                    </label>
                                    <input
                                        type="number"
                                        name="childrenStillLiving"
                                        placeholder="Children Still Living"
                                        className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">
                                        No. of Children Born Alive but are now Dead
                                    </label>
                                    <input
                                        type="number"
                                        name="childrenDeceased"
                                        placeholder="Children Deceased"
                                        className="common-input w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    
                        {/* Occupation & Age */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Occupation</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Occupation"
                                    className="common-input"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Age at the time of this birth</label>
                                <input
                                    type="number"
                                    name="ageAtBirth"
                                    placeholder="Age"
                                    className="common-input"
                                />
                            </div>
                        </div>
                    
                        {/* Residence */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Residence</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="residenceHouse"
                                    placeholder="House No., Street, Barangay"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="residenceCity"
                                    placeholder="City / Municipality"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="residenceProvince"
                                    placeholder="Province"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="residenceCountry"
                                    placeholder="Country"
                                    className="common-input"
                                />
                            </div>
                        </div>
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
                   <i className="fa-solid fa-angles-left"></i>
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