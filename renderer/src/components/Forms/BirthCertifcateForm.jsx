import React from 'react';
import { Divider } from '@components';
import { InfoCard } from '@components';
import { BirthCertificationValidation } from '@services';
import { UserSex } from '@enums';

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
        "For LCRO / Civil Registrar Use Only",
        "Affidavit of Acknowledgment / Admission of Paternity",
        "Affidavit of Acknowledgment / Admission of Paternity (Cont.)",
        "Affidavit for Delayed Registration of Birth",
        "Affidavit for Delayed Registration of Birth (Cont.)"
    ];

    //TODO: handle form data
    const [formData, setFormData] = React.useState({
        province: '',
        city: '',
        childFirstName: '',
        childMiddleName: '',
        childLastName: '',
        sex: '',
        dateOfBirth: '',
        typeOfBirth: '',
        multipleBirthOrder: '',
        birthOrder: '',
        birthWeight: '',
        maidenFirstName: '',
        maidenMiddleName: '',
        maidenLastName: '',
        citizenship: '',
        religion: '',
        childrenBornAlive: '',
        childrenStillLiving: '',
        childrenDeceased: '',
        occupation: '',
    });
    
    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, pageTitles.length));
        } else if (direction === 'prev') {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }
    }

    return (
        <>
            <form className="p-4 h-full mb-4">
                <div className='mb-4'>
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

                    {currentPage === 10 && 
                        <div className="mb-6 text-left space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                    
                            {/* Intro Statement */}
                            <p className="text-sm italic">
                                I/We, __________________ and __________________ of legal age, am/are the natural mother
                                and/or father of _____________________ born on _______________ at ______________.
                            </p>
                    
                            {/* Parent Names */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Mother&apos;s Full Name</label>
                                <input
                                    type="text"
                                    name="motherName"
                                    placeholder="Enter mother's full name"
                                    className="common-input w-full"
                                />
                            </div>
                    
                            <div>
                                <label className="block text-sm font-medium mb-1">Father&apos;s Full Name</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    placeholder="Enter father's full name"
                                    className="common-input w-full"
                                />
                            </div>
                    
                            {/* Child Info */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Child&apos;s Full Name</label>
                                <input
                                    type="text"
                                    name="childName"
                                    placeholder="Enter child's full name"
                                    className="common-input w-full"
                                />
                            </div>
                    
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="childBirthDate"
                                        className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place of Birth</label>
                                    <input
                                        type="text"
                                        name="childBirthPlace"
                                        placeholder="City / Municipality, Province"
                                        className="common-input w-full"
                                    />
                                </div>
                            </div>
                    
                            {/* Affidavit Declaration */}
                            <p className="text-sm italic">
                                I am / We are executing this affidavit to attest to the truthfulness of the
                                foregoing statements and for purposes of acknowledging my/our child.
                            </p>
                    
                            {/* Signature Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="text-center">
                                    <label className="block text-sm font-medium mb-2">Mother&apos;s Signature</label>
                                    <div className="border-t border-gray-400 pt-2 text-gray-600">
                                        Signature over printed name
                                    </div>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium mb-2">Father&apos;s Signature</label>
                                    <div className="border-t border-gray-400 pt-2 text-gray-600">
                                    Signature over printed name
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 11 && 
                        <div className="mb-6 text-left space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                      
                            {/* Jurat Text */}
                            <p className="text-sm italic">
                            <strong>SUBSCRIBED AND SWORN</strong> to before me this ______ day of _______________ by
                            __________________ and __________________, who exhibited to me (his/her) Community
                            Tax Cert. No. __________________ issued on _______________ at ___________________.
                            </p>
                      
                            {/* Date and Names */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date (Day)</label>
                                    <input
                                        type="number"
                                        name="juratDay"
                                        placeholder="e.g. 15"
                                        className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month & Year</label>
                                    <input
                                        type="text"
                                        name="juratMonthYear"
                                        placeholder="e.g. August 2025"
                                        className="common-input w-full"
                                    />
                                </div>
                            </div>
                      
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Affiant 1 (Name)</label>
                                    <input
                                        type="text"
                                        name="juratAffiant1"
                                        placeholder="First Affiant's Full Name"
                                        className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Affiant 2 (Name)</label>
                                    <input
                                        type="text"
                                        name="juratAffiant2"
                                        placeholder="Second Affiant's Full Name"
                                        className="common-input w-full"
                                    />
                                </div>
                            </div>
                      
                            {/* Community Tax Certificate Info */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Community Tax Certificate No.</label>
                                <input
                                    type="text"
                                    name="ctcNumber"
                                    placeholder="Enter CTC No."
                                    className="common-input w-full"
                                />
                            </div>
                      
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Issued</label>
                                    <input
                                    type="date"
                                    name="ctcDateIssued"
                                    className="common-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place Issued</label>
                                    <input
                                        type="text"
                                        name="ctcPlaceIssued"
                                        placeholder="City / Municipality, Province"
                                        className="common-input w-full"
                                    />
                                </div>
                            </div>
                      
                            {/* Administering Officer */}
                            <div className="mt-6 space-y-4">
                                <div className="text-center">
                                    <label className="block text-sm font-medium mb-2">Signature of the Administering Officer</label>
                                    <div className="border-t border-gray-400 pt-2 text-gray-600">
                                    Signature over printed name
                                    </div>
                                </div>
                        
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                    <input
                                    type="text"
                                    name="adminName"
                                    placeholder="Enter officer's name"
                                    className="common-input w-full"
                                    />
                                </div>
                        
                                <div>
                                    <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                                    <input
                                    type="text"
                                    name="adminPosition"
                                    placeholder="Enter position/title"
                                    className="common-input w-full"
                                    />
                                </div>
                        
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                    type="text"
                                    name="adminAddress"
                                    placeholder="Enter office address"
                                    className="common-input w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 12 && 
                        <div className="mb-6 text-left space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <p className="text-sm italic text-center">
                            (To be accomplished by the hospital/clinic administrator, father, mother, guardian, 
                            or the person himself/herself if 18 years old or over.)
                            </p>
                      
                            {/* Affiant Information */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                                <input type="text" name="affiantName" className="common-input w-full" />
                            </div>
                        
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Civil Status</label>
                                    <select name="civilStatus" className="common-input w-full">
                                        <option value="">Select</option>
                                        <option>Single</option>
                                        <option>Married</option>
                                        <option>Divorced</option>
                                        <option>Widow/Widower</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Residence / Postal Address</label>
                                    <input type="text" name="address" className="common-input w-full" />
                                </div>
                            </div>
                      
                            {/* Statement 1 - Applicant */}
                            <div>
                                <p className="text-sm font-medium mb-1">1. That I am the applicant for the delayed registration of:</p>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="custom-checkbox" name="applicantType" value="self" />
                                    <span>My birth in <input type="text" name="selfPob" className="border rounded px-2 py-1 ml-2" /> 
                                    on <input type="date" name="selfDob" className="border rounded px-2 py-1 ml-2" /></span>
                                </label>
                                <label className="flex items-center space-x-2 mt-2">
                                    <input type="checkbox" className="custom-checkbox" name="applicantType" value="child" />
                                    <span>The birth of <input type="text" name="childName" className="border rounded px-2 py-1 ml-2" /> 
                                    who was born in <input type="text" name="childPob" className="border rounded px-2 py-1 ml-2" /> 
                                    on <input type="date" name="childDob" className="border rounded px-2 py-1 ml-2" /></span>
                                </label>
                            </div>
                      
                            {/* Statement 2 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    2. That I/he/she was attended at birth by:
                                </p>
                                <input type="text" name="attendantName" placeholder="Name of Attendant" className="common-input w-full" />
                                <input type="text" name="attendantAddress" placeholder="Address of Attendant" className="common-input w-full mt-2" />
                            </div>
                      
                            {/* Statement 3 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    3. That I am/he/she is a citizen of:
                                </p>
                                <input typ  e="text" name="citizenship" className="common-input w-full" />
                            </div>
                      
                            {/* Statement 4 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    4. That my/his/her parents were:
                                </p>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="custom-checkbox" name="parentsStatus" value="married" />
                                    <span>Married on <input type="date" name="marriageDate" className="border rounded px-2 py-1 ml-2" /> 
                                    at <input type="text" name="marriagePlace" className="border rounded px-2 py-1 ml-2" /></span>
                                </label>
                                <label className="flex items-center space-x-2 mt-2">
                                    <input type="checkbox" className="custom-checkbox"  name="parentsStatus" value="notMarried" />
                                    <span>Not married but acknowledged/not acknowledged by father whose name is 
                                    <input type="text" name="fatherName" className="border rounded px-2 py-1 ml-2" /></span>
                                </label>
                            </div>
                        
                            {/* Statement 5 */}
                            <div>
                            <p className="text-sm font-medium mb-1">
                                5. That the reason for the delay in registering my/his/her birth was:
                            </p>
                            <textarea name="reasonDelay" className="common-input w-full" />
                            </div>
                        
                            {/* Statement 6 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    6. (For the applicant only) That I am married to:
                                </p>
                                <input type="text" name="spouseApplicant" placeholder="Spouse of Applicant" className="common-input w-full" />
                                <p className="text-sm font-medium mt-4">
                                    (If the applicant is other than the document owner) That I am married to:
                                </p>
                                <input type="text" name="spouseOwner" placeholder="Spouse of Document Owner" className="common-input w-full" />
                            </div>
                      
                            {/* Statement 7 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    7. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                                </p>
                            </div>
                      
                            {/* Jurat Section */}
                            <div className="pt-6 border-t">
                                <p className="text-sm italic">
                                    In truth whereof, I have affixed my signature below this ____ day of _____________ at __________________, Philippines.
                                </p>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium mb-1">Signature Over Printed Name of Affiant</label>
                                    <input type="text" name="affiantSignature" placeholder="__________________________" className="common-input w-full" />
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 13 &&
                        <div className="mb-6 text-left space-y-6">
                           <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                      
                            {/* Date & Place */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1"> Day of</label>
                                    <input
                                        type="text"
                                        name="juratDay"
                                        placeholder="Day"
                                        className="common-input"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1"> Month / Year</label>
                                    <input
                                        type="text"
                                        name="juratMonthYear"
                                        placeholder="Month / Year"
                                        className="common-input"
                                    />
                                </div>
                            </div>
                      
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">
                                    Place (City / Municipality, Province)
                                </label>
                                <input
                                    type="text"
                                    name="juratPlace"
                                    placeholder="e.g., Cebu City, Cebu"
                                    className="common-input"
                                />
                            </div>
                      
                            {/* Community Tax Certificate */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        CTC Number
                                    </label>
                                    <input
                                        type="text"
                                        name="ctcNumber"
                                        placeholder="Community Tax Cert. No."
                                        className="common-input"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Issued On
                                    </label>
                                    <input
                                        type="text"
                                        name="ctcIssuedOn"
                                        placeholder="Date Issued"
                                        className="common-input"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                    Issued At
                                    </label>
                                    <input
                                        type="text"
                                        name="ctcIssuedAt"
                                        placeholder="Place Issued"
                                        className="common-input"
                                    />
                                </div>
                            </div>
                      
                            {/* Administering Officer */}
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                    Signature of the Administering Officer
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerSignature"
                                        placeholder="Signature"
                                        className="common-input"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                    Name in Print
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerName"
                                        placeholder="Full Name"
                                        className="common-input"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                    Position / Title / Designation
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerPosition"
                                        placeholder="Position / Title / Designation"
                                        className="common-input"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                    Address
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerAddress"
                                        placeholder="Office Address"
                                        className="common-input"
                                    />
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <Divider text={pageTitles[(currentPage) - 1]}/>
            </form>
            <div className="flex justify-center items-center space-x-4 pb-8">
                <button 
                    type='button'
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange('prev')}
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
                    onClick={() => handlePageChange('next')}
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </>
    )
}