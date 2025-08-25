import React from 'react';
import { Divider } from '@components';
import { InfoCard } from '@components';
export default function BirthCertifcateForm() {
    const [currentPage, setCurrentPage] = React.useState(1); //TODO: handle current page
    const pageTitles = [ 
        "Province & Child's Information", 
        "Mother's Information", 
        "Fathers's Information", 
        "Marriage of Parents", 
        "Attendant Details", 
        "Certification of Attendant at Birth", 
        "Certification and Registration Details",
        "Certification and Registration Details (Cont.)",
        "For LCRO / Civil Registrar Use Only"
    ];
    return (
        <form className="p-4 h-full overflow-auto">
            <div className='mb-4 h-[100%]'>
                {currentPage === 1 && 
                    <div className="mb-4 text-left space-y-6">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
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
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
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
                    <div className="mb-6 text-left space-y-6">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                        {/* Father’s Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Father’s Name</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    name="fatherFirstName"
                                    placeholder="First Name"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="fatherMiddleName"
                                    placeholder="Middle Name"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="fatherLastName"
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
                                    name="fatherCitizenship"
                                    placeholder="Citizenship"
                                    className="common-input"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                                <input
                                    type="text"
                                    name="fatherReligion"
                                    placeholder="Religion"
                                    className="common-input"
                                />
                            </div>
                        </div>
                    
                        {/* Occupation & Age */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Occupation</label>
                                <input
                                type="text"
                                name="fatherOccupation"
                                placeholder="Occupation"
                                className="common-input"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Age at the time of this birth</label>
                                <input
                                type="number"
                                name="fatherAgeAtBirth"
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
                                    name="fatherResidenceStreet"
                                    placeholder="House No., St., Barangay"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="fatherResidenceCity"
                                    placeholder="City / Municipality"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="fatherResidenceProvince"
                                    placeholder="Province"
                                    className="common-input"
                                />
                                <input
                                    type="text"
                                    name="fatherResidenceCountry"
                                    placeholder="Country"
                                    className="common-input"
                                />
                            </div>
                        </div>
                    </div>
                }

                {currentPage === 4 && 
                    <div className="mb-6 text-left space-y-6">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                
                        {/* Date of Marriage */}
                        <div>
                            <label className="block w-full text-sm font-medium mb-1">Date of Marriage</label>
                            <input
                                type="date"
                                name="dateOfMarriage"
                                className="common-input w-full"
                            />
                        </div>
                
                        {/* Place of Marriage */}
                        <div>
                        <label className="block text-sm font-medium mb-1">Place of Marriage</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="marriageCity"
                                placeholder="City / Municipality"
                                className="common-input"
                            />
                            <input
                                type="text"
                                name="marriageProvince"
                                placeholder="Province"
                                className="common-input"
                            />
                            <input
                                type="text"
                                name="marriageCountry"
                                placeholder="Country"
                                className="common-input"
                            />
                        </div>
                        </div>
                    </div>
                }

                {currentPage === 5 && 
                    <div className="mb-6 text-left space-y-6">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                    
                        {/* Type of Attendant */}
                        <div>
                        <label className="block w-full text-sm font-medium mb-1">Type of Attendant</label>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" className='custom-checkbox' name="attendantPhysician" />
                            <span>Physician</span>
                            </label>
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" className='custom-checkbox' name="attendantNurse" />
                            <span>Nurse</span>
                            </label>
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" className='custom-checkbox' name="attendantMidwife" />
                            <span>Midwife</span>
                            </label>
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" className='custom-checkbox' name="attendantHilot" />
                            <span>Hilot</span>
                            </label>
                        </div>
                    
                        {/* Others */}
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-3">
                            <label className="flex items-center space-x-2">
                            <input type="checkbox" className='custom-checkbox' name="attendantOthers" />
                            <span>Others (Specify)</span>
                            </label>
                            <input
                            type="text"
                            name="attendantOthersSpecify"
                            placeholder="Specify"
                            className="common-input mt-2 md:mt-0 w-[80%]"
                            />
                        </div>
                        </div>
                    
                        {/* Date of Attendance */}
                        <div>
                        <label className="block w-full text-sm font-medium mb-1">Date of Attendance</label>
                        <input
                            type="date"
                            name="dateOfAttendance"
                            className="common-input w-full"
                        />
                        </div>
                    
                        {/* Name and Title of Attendant */}
                        <div>
                        <label className="block w-full text-sm font-medium mb-1">Name and Title of Attendant</label>
                        <input
                            type="text"
                            name="attendantNameTitle"
                            placeholder="Enter name and title"
                            className="common-input w-full"
                        />
                        </div>
                  </div>
                  
                }

                {currentPage === 6 && 
                    <div className="mb-6 text-left space-y-6">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                  
                        {/* Birth Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Time of Birth</label>
                                <input
                                type="time"
                                name="birthTime"
                                className="common-input w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                <input
                                type="date"
                                name="birthDate"
                                className="common-input w-full"
                                />
                            </div>
                        </div>
                  
                    
                        {/* Attendant Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name in Print</label>
                                <input
                                type="text"
                                name="attendantName"
                                placeholder="Full Name"
                                className="common-input w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title or Position</label>
                                <input
                                type="text"
                                name="attendantTitle"
                                placeholder="Physician / Nurse / Midwife"
                                className="common-input w-full"
                                />
                            </div>
                        </div>
                    
                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="attendantAddress"
                                placeholder="House No., Street, Barangay, City/Municipality, Province"
                                className="common-input w-full"
                            />
                        </div>
                    
                        {/* Signature and Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date Signed</label>
                                <input
                                type="date"
                                name="attendantDateSigned"
                                className="common-input w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Signature</label>
                                <input
                                type="text"
                                name="attendantSignature"
                                placeholder="Signature"
                                className="common-input w-full"
                                />
                            </div>
                        </div>
                    </div>
                }

                {currentPage === 7 && 
                    <div className="mb-6 text-left space-y-6">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                        {/* Certification of Informant */}
                        <div className="space-y-4">
                            <h3 className="text-md">Certification of Informant</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <input type="text" name="informantSignature" placeholder="Signature" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                    <input type="text" name="informantName" placeholder="Full Name" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Relationship to the Child</label>
                                    <input type="text" name="informantRelationship" placeholder="Relationship" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input type="text" name="informantAddress" placeholder="Full Address" className="common-input w-full" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input type="date" name="informantDate" className="common-input w-full" />
                            </div>
                        </div>

                        {/* Prepared By */}
                        <div className="space-y-4">
                            <h3 className="text-md">Prepared By</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Signature</label>
                                <input type="text" name="preparedSignature" placeholder="Signature" className="common-input w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Name in Print</label>
                                <input type="text" name="preparedName" placeholder="Full Name" className="common-input w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title or Position</label>
                                <input type="text" name="preparedTitle" placeholder="Title or Position" className="common-input w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input type="date" name="preparedDate" className="common-input w-full" />
                            </div>
                            </div>
                        </div>
                    </div>
                }

                {currentPage === 8 && 
                    <div className="mb-4 text-left">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                        {/* Received By */}
                        <div className="space-y-4 mb-4">
                            <h3 className="text-md">Received By</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <input type="text" name="receivedSignature" placeholder="Signature" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                    <input type="text" name="receivedName" placeholder="Full Name" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title or Position</label>
                                    <input type="text" name="receivedTitle" placeholder="Title or Position" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input type="date" name="receivedDate" className="common-input w-full" />
                                </div>
                            </div>
                        </div>
                        {/* Registered by the Civil Registrar */}
                        <div className="space-y-4">
                            <h3 className="text-md">Registered by the Civil Registrar</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <input type="text" name="registrarSignature" placeholder="Signature" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                    <input type="text" name="registrarName" placeholder="Full Name" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title or Position</label>
                                    <input type="text" name="registrarTitle" placeholder="Title or Position" className="common-input w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input type="date" name="registrarDate" className="common-input w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {currentPage === 9 && 
                    <div className="mb-6 text-left space-y-2">
                        <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                REMARKS / ANNOTATIONS (For LCRO/OCRG Use Only)
                            </label>
                            <textarea
                                name="remarks"
                                placeholder="Enter remarks or annotations here..."
                                className="common-input w-full h-32 resize-none"
                                style={{borderRadius: '8px'}}
                            />
                        </div>
                        <div>
                            <InfoCard title="TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR" message="" isClosable={false}>
                                <div className="grid grid-cols-10 gap-1 mt-2">
                                    {Array.from({ length: 30 }).map((_, idx) => (
                                        <div key={idx} className="w-6 h-6 border border-gray-400 rounded-sm"></div>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>
                    </div>
                  
                }
            </div>
            <Divider text={pageTitles[(currentPage) - 1]}/>
            <div className="flex justify-center items-center space-x-4 my-4">
                <button 
                    type='button'
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                   <i className="fa-solid fa-angles-left"></i>
                </button>

                <span className="text-gray-700 font-medium">
                    {currentPage} / {pageTitles.length}
                </span>

                <button
                    type='button'
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                    disabled={currentPage === pageTitles.length}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageTitles.length))}
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </form>
    )
}