import React from 'react';
import { Divider } from '@components';
import { SignaturePlaceholder } from '@components';

export default function DeathCertificateCreate() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageTitles = [ 
        "Deceased's Information", 
        "Status & Residence", 
        "Parents' Information", 
        "Medical Certificate", 
        "Manner of Death & Attendant Details", 
        "Certification of Death", 
        "Corpse Disposal", 
        "Certification and Registration Details",
        "Certification and Registration Details (Cont.)",
        "For LCRO / Civil Registrar Use Only",
        "Postmortem & Embalmer Certifications",
        "Affidavit for Delayed Registration of Death",
        "Affidavit for Delayed Registration of Death (Cont.)",
        "Confirmation Notice"
    ];

    const [formData, setFormData] = React.useState({
        // Page 1 - Deceased's Information (merged original page1 and page2)
        page1: {
            creatorId: null,
            creationType: "",
            province: "",
            city: "",
            firstName: "",
            middleName: "",
            lastName: "",
            sex: "",
            dateOfDeath: "",
            dateOfBirth: "",
            ageYears: "",
            ageDays: "",
            ageHours: "",
            ageMinutes: "",
            placeOfDeath: ""
        },
      
        // Page 2 - Status & Residence (original page3)
        page2: {
            civilStatus: "",
            religion: "",
            citizenship: "",
            residenceHouse: "",
            residenceStreet: "",
            residenceBarangay: "",
            residenceCity: "",
            residenceProvince: "",
            residenceCountry: "",
            occupation: ""
        },
      
        // Page 3 - Parents' Information (original page4)
        page3: {
            fatherFirstName: "",
            fatherMiddleName: "",
            fatherLastName: "",
            motherFirstName: "",
            motherMiddleName: "",
            motherLastName: ""
        },
      
        // Page 4 - Medical Certificate (original page5)
        page4: {
            immediateCause: "",
            antecedentCause: "",
            underlyingCause: "",
            intervalImmediate: "",
            intervalAntecedent: "",
            intervalUnderlying: "",
            otherConditions: "",
            maternalCondition: ""
        },

        // Page 5 - Manner of Death & Attendant (original page6)
        page5: {
            mannerOfDeath: "",
            autopsy: "",
            placeOccurrence: "",
            attendantPrivatePhysician: false,
            attendantPublicHealth: false,
            attendantHospital: false,
            attendantNone: false,
            attendantOthers: false,
            attendantOthersSpecify: "",
            attendantFrom: "",
            attendantTo: ""
        },

        // Page 6 - Certification of Death (original page7)
        page6: {
            physicianName: "",
            physicianTitle: "",
            physicianAddress: "",
            healthOfficerName: ""
        },

        // Page 7 - Corpse Disposal (original page8)
        page7: {
            disposalType: "",
            permitNumber: "",
            permitDate: "",
            transferPermit: "",
            cemeteryName: "",
            cemeteryAddress: ""
        },

        // Page 8 - Informant & Prepared By (original page9)
        page8: {
            informantName: "",
            informantRelationship: "",
            informantAddress: "",
            informantDate: "",
            preparedName: "",
            preparedTitle: "",
            preparedDate: ""
        },

        // Page 9 - Received & Registered By (original page10)
        page9: {
            receivedName: "",
            receivedTitle: "",
            receivedDate: "",
            registrarName: "",
            registrarTitle: "",
            registrarDate: ""
        },

        // Page 10 - Remarks / Annotations (original page11)
        page10: {
            remarks: "",      
            officeBoxes: [] 
        },
        // Page 11 - Postmortem & Embalmer (original page12)
        page11: {
            postmortemCause: "",
            postmortemName: "",
            postmortemTitle: "",
            postmortemAddress: "",
            postmortemDate: "",
            embalmerName: "",
            embalmerLicense: "",
            embalmerIssuedOn: "",
            embalmerIssuedAt: "",
            embalmerExpiry: ""
        },
        // Page 12 - Affidavit for Delayed Registration (original page13)
        page12: {
            affiantName: "",
            civilStatus: "",
            address: "",
            deceasedName: "",
            deathDate: "",
            deathPlace: "",
            attendedBy: "",
            notAttended: false,
            causeOfDeath: "",
            reasonDelay: ""
        },
        // Page 13 - Affidavit Jurat (original page14)
        page13: {
            juratDay: "",
            juratMonthYear: "",
            juratPlace: "",
            ctcNumber: "",
            ctcIssuedOn: "",
            ctcIssuedAt: "",
            adminName: "",
            adminPosition: "",
            adminAddress: ""
        },

        page14: {
            confirmation: false
        }
    });

    const handleInputChange = (event, section) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value
            }
        }));
    };

    const handleCheckboxChange = (event, section) => {
        const { name, value, checked } = event.target;
        setFormData((prevData) => {
          const prevSection = prevData[section] || {};
          let newValue;
      
          if (value) {
            newValue = checked ? value : "";
          } else {
            newValue = checked;
          }
      
          return {
            ...prevData,
            [section]: {
              ...prevSection,
              [name]: newValue,
            },
          };
        });
    };

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, pageTitles.length));
        } else if (direction === 'prev') {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final Form Data:", formData);
    };

    return (
        <>
            <form className="p-4 h-full mb-4 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                <div className='mb-4'>
                    {currentPage === 1 && 
                        <div className="mb-4 space-y-6">
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
                                        value={formData.page1.province}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">City / Municipality</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City / Municipality"
                                        className="common-input"
                                        value={formData.page1.city}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                    
                            {/* Deceased’s Name */}
                            <div>
                                <label className="block text-sm font-medium">Deceased’s Name</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First"
                                            className="w-full common-input"
                                            value={formData.page1.firstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="middleName"
                                            placeholder="Middle (Optional)"
                                            className="w-full common-input"
                                            value={formData.page1.middleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last"
                                            className="w-full common-input"
                                            value={formData.page1.lastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                    
                            {/* Sex */}
                            <div>
                                <label className="block text-sm font-medium">Sex</label>
                                <select name="sex" className="common-input w-full"
                                    value={formData.page1.sex}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            {/* Date of Death & Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium">Date of Death</label>
                                    <input type="date" name="dateOfDeath" className="common-input w-full"
                                        value={formData.page1.dateOfDeath}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Date of Birth</label>
                                    <input type="date" name="dateOfBirth" className="common-input w-full"
                                        value={formData.page1.dateOfBirth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                    
                            {/* Age at Time of Death */}
                            <div>
                                <label className="block text-sm font-medium">Age at Time of Death</label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                    <input
                                        type="number"
                                        name="ageYears"
                                        placeholder="Years"
                                        className="common-input"
                                        value={formData.page1.ageYears}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="number"
                                        name="ageDays"
                                        placeholder="Days"
                                        className="common-input"
                                        value={formData.page1.ageDays}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="number"
                                        name="ageHours"
                                        placeholder="Hours"
                                        className="common-input"
                                        value={formData.page1.ageHours}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="number"
                                        name="ageMinutes"
                                        placeholder="Min/Sec"
                                        className="common-input"
                                        value={formData.page1.ageMinutes}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                    
                            {/* Place of Death */}
                            <div>
                                <label className="block text-sm font-medium">Place of Death</label>
                                <input
                                    type="text"
                                    name="placeOfDeath"
                                    placeholder="Hospital/Clinic/Institution/House No., St., Barangay, City/Mun, Province"
                                    className="common-input w-full"
                                    value={formData.page1.placeOfDeath}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 2 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Civil Status */}
                            <div>
                                <label className="block text-sm font-medium">Civil Status</label>
                                <select name="civilStatus" className="common-input w-full"
                                    value={formData.page2.civilStatus}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widow">Widow</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                        
                            {/* Religion & Citizenship */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Religion / Religious Sect</label>
                                    <input
                                        type="text"
                                        name="religion"
                                        placeholder="Religion"
                                        className="common-input w-full"
                                        value={formData.page2.religion}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Citizenship</label>
                                    <input
                                        type="text"
                                        name="citizenship"
                                        placeholder="Citizenship"
                                        className="common-input w-full"
                                        value={formData.page2.citizenship}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
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
                                        placeholder="House No."
                                        className="common-input"
                                        value={formData.page2.residenceHouse}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="residenceStreet"
                                        placeholder="Street"
                                        className="common-input"
                                        value={formData.page2.residenceStreet}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="residenceBarangay"
                                        placeholder="Barangay"
                                        className="common-input"
                                        value={formData.page2.residenceBarangay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="residenceCity"
                                        placeholder="City / Municipality"
                                        className="common-input"
                                        value={formData.page2.residenceCity}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="residenceProvince"
                                        placeholder="Province"
                                        className="common-input"
                                        value={formData.page2.residenceProvince}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="residenceCountry"
                                        placeholder="Country"
                                        className="common-input"
                                        value={formData.page2.residenceCountry}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                        
                            {/* Occupation */}
                            <div>
                                <label className="block text-sm font-medium">Occupation</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Occupation"
                                    className="common-input w-full"
                                    value={formData.page2.occupation}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 3 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Father’s Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Father’s Name</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                        type="text"
                                        name="fatherFirstName"
                                        placeholder="First"
                                        className="common-input"
                                        value={formData.page3.fatherFirstName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="fatherMiddleName"
                                        placeholder="Middle"
                                        className="common-input"
                                        value={formData.page3.fatherMiddleName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="fatherLastName"
                                        placeholder="Last"
                                        className="common-input"
                                        value={formData.page3.fatherLastName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                        
                            {/* Mother’s Maiden Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Mother’s Maiden Name</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                        type="text"
                                        name="motherFirstName"
                                        placeholder="First"
                                        className="common-input"
                                        value={formData.page3.motherFirstName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="motherMiddleName"
                                        placeholder="Middle"
                                        className="common-input"
                                        value={formData.page3.motherMiddleName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input
                                        type="text"
                                        name="motherLastName"
                                        placeholder="Last"
                                        className="common-input"
                                        value={formData.page3.motherLastName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 4 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Causes of Death */}
                            <div>
                                <label className="block text-sm font-medium">Immediate Cause</label>
                                <input type="text" name="immediateCause" className="common-input w-full"
                                    value={formData.page4.immediateCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                <label className="block text-sm font-medium mt-2">Interval</label>
                                <input type="text" name="intervalImmediate" className="common-input w-full"
                                    value={formData.page4.intervalImmediate}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Antecedent Cause</label>
                                <input type="text" name="antecedentCause" className="common-input w-full"
                                    value={formData.page4.antecedentCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                <label className="block text-sm font-medium mt-2">Interval</label>
                                <input type="text" name="intervalAntecedent" className="common-input w-full"
                                    value={formData.page4.intervalAntecedent}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Underlying Cause</label>
                                <input type="text" name="underlyingCause" className="common-input w-full"
                                    value={formData.page4.underlyingCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                <label className="block text-sm font-medium mt-2">Interval</label>
                                <input type="text" name="intervalUnderlying" className="common-input w-full"
                                    value={formData.page4.intervalUnderlying}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Other Significant Conditions</label>
                                <input type="text" name="otherConditions" className="common-input w-full"
                                    value={formData.page4.otherConditions}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Maternal Condition (if applicable)</label>
                                <select name="maternalCondition" className="common-input w-full"
                                    value={formData.page4.maternalCondition}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Pregnant, not in labor">Pregnant, not in labor</option>
                                    <option value="Pregnant, in labor">Pregnant, in labor</option>
                                    <option value="Less than 42 days after delivery">Less than 42 days after delivery</option>
                                    <option value="42 days to 1 year after delivery">42 days to 1 year after delivery</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                        </div>
                    }

                    {currentPage === 5 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Manner of Death */}
                            <div>
                                <label className="block text-sm font-medium">Manner of Death</label>
                                <select name="mannerOfDeath" className="common-input w-full"
                                    value={formData.page5.mannerOfDeath}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Homicide">Homicide</option>
                                    <option value="Suicide">Suicide</option>
                                    <option value="Accident">Accident</option>
                                    <option value="Legal Intervention">Legal Intervention</option>
                                    <option value="Natural">Natural</option>
                                </select>
                            </div>
                            {/* Autopsy */}
                            <div>
                                <label className="block text-sm font-medium">Autopsy</label>
                                <select name="autopsy" className="common-input w-full"
                                    value={formData.page5.autopsy}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            {/* Place of Occurrence */}
                            <div>
                                <label className="block text-sm font-medium">Place of Occurrence (for external cause)</label>
                                <input type="text" name="placeOccurrence" placeholder="e.g., Home, Farm, Factory, Street" className="common-input w-full"
                                    value={formData.page5.placeOccurrence}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            {/* Attendant Type */}
                            <div className="p-2">
                                <label className="block w-full text-sm font-medium mb-1">Attended By</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantPrivatePhysician" 
                                            checked={formData.page5.attendantPrivatePhysician}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Private Physician</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantPublicHealth" 
                                            checked={formData.page5.attendantPublicHealth}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Public Health Authority</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantHospital"
                                            checked={formData.page5.attendantHospital}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Hospital</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantNone" 
                                            checked={formData.page5.attendantNone}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>None</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantOthers"
                                            checked={formData.page5.attendantOthers}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Others (Specify)</span>
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    name="attendantOthersSpecify"
                                    placeholder="Specify"
                                    className="common-input mt-2 w-full"
                                    value={formData.page5.attendantOthersSpecify}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    disabled={!formData.page5.attendantOthers}
                                />
                            </div>
                            {/* Attendant Duration */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">From (mm/dd/yy)</label>
                                    <input type="date" name="attendantFrom" className="common-input w-full"
                                        value={formData.page5.attendantFrom}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">To (mm/dd/yy)</label>
                                    <input type="date" name="attendantTo" className="common-input w-full"
                                        value={formData.page5.attendantTo}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 6 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Physician Certification */}
                            <div>
                                <label className="block text-sm font-medium">Name in Print</label>
                                <input type="text" name="physicianName" placeholder="Full Name" className="common-input w-full"
                                    value={formData.page6.physicianName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Title or Position</label>
                                <input type="text" name="physicianTitle" placeholder="Title/Position" className="common-input w-full"
                                    value={formData.page6.physicianTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <input type="text" name="physicianAddress" placeholder="Address" className="common-input w-full"
                                    value={formData.page6.physicianAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            {/* Reviewed By */}
                            <div>
                                <label className="block text-sm font-medium">Reviewed By (Health Officer Name)</label>
                                <input type="text" name="healthOfficerName" placeholder="Full Name" className="common-input w-full"
                                    value={formData.page6.healthOfficerName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 7 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Disposal Type */}
                            <div>
                                <label className="block text-sm font-medium">Corpse Disposal</label>
                                <select name="disposalType" className="common-input w-full"
                                    value={formData.page7.disposalType}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Burial">Burial</option>
                                    <option value="Cremation">Cremation</option>
                                    <option value="Others">Others (Specify)</option>
                                </select>
                            </div>
                            {/* Permit */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Burial/Cremation Permit Number</label>
                                    <input type="text" name="permitNumber" className="common-input w-full"
                                        value={formData.page7.permitNumber}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Date Issued</label>
                                    <input type="date" name="permitDate" className="common-input w-full"
                                        value={formData.page7.permitDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                            {/* Transfer Permit */}
                            <div>
                                <label className="block text-sm font-medium">Transfer Permit Number</label>
                                <input type="text" name="transferPermit" className="common-input w-full"
                                    value={formData.page7.transferPermit}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            {/* Cemetery */}
                            <div>
                                <label className="block text-sm font-medium">Name of Cemetery or Crematory</label>
                                <input type="text" name="cemeteryName" className="common-input w-full"
                                    value={formData.page7.cemeteryName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address of Cemetery or Crematory</label>
                                <input type="text" name="cemeteryAddress" className="common-input w-full"
                                    value={formData.page7.cemeteryAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 8 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Certification of Informant */}
                            <div className="space-y-4">
                                <h3 className="text-md">Certification of Informant</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Signature</label>
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="informantName" placeholder="Full Name" 
                                            className="common-input w-full" 
                                            value={formData.page8.informantName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Relationship to the Deceased</label>
                                        <input type="text" name="informantRelationship" placeholder="Relationship" 
                                            className="common-input w-full" 
                                            value={formData.page8.informantRelationship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input type="text" name="informantAddress" placeholder="Full Address" 
                                            className="common-input w-full" 
                                            value={formData.page8.informantAddress}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input type="date" name="informantDate" 
                                        className="common-input w-full" 
                                        value={formData.page8.informantDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>

                            {/* Prepared By */}
                            <div className="space-y-4">
                                <h3 className="text-md">Prepared By</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Signature</label>
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="preparedName" placeholder="Full Name" 
                                            className="common-input w-full" 
                                            value={formData.page8.preparedName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="preparedTitle" placeholder="Title or Position" 
                                            className="common-input w-full" 
                                            value={formData.page8.preparedTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="preparedDate" 
                                            className="common-input w-full" 
                                            value={formData.page8.preparedDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 9 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Received By */}
                            <div className="space-y-4">
                                <h3 className="text-md">Received By</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Signature</label>
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="receivedName" placeholder="Full Name" 
                                            className="common-input w-full" 
                                            value={formData.page9.receivedName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="receivedTitle" placeholder="Title or Position" 
                                            className="common-input w-full" 
                                            value={formData.page9.receivedTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="receivedDate" 
                                            className="common-input w-full" 
                                            value={formData.page9.receivedDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Registered By */}
                            <div className="space-y-4">
                                <h3 className="text-md">Registered by the Civil Registrar</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Signature</label>
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="registrarName" placeholder="Full Name" 
                                            className="common-input w-full"
                                            value={formData.page9.registrarName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="registrarTitle" placeholder="Title or Position" 
                                            className="common-input w-full"
                                            value={formData.page9.registrarTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="registrarDate" 
                                            className="common-input w-full"
                                            value={formData.page9.registrarDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 10 && 
                        <div className="mb-6 space-y-2">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    REMARKS / ANNOTATIONS (For LCRO/OCRG Use Only)
                                </label>
                                <textarea
                                    name="remarks"
                                    placeholder="Enter remarks or annotations here..."
                                    className="common-textarea w-full h-32 resize-none"
                                    value={formData.page10.remarks}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 11 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Postmortem Certificate */}
                            <div>
                                <label className="block text-sm font-medium">Cause of Death (from Autopsy)</label>
                                <input type="text" name="postmortemCause" className="common-input w-full"
                                    value={formData.page11.postmortemCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Name in Print</label>
                                <input type="text" name="postmortemName" className="common-input w-full"
                                    value={formData.page11.postmortemName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Title/Designation</label>
                                <input type="text" name="postmortemTitle" className="common-input w-full"
                                    value={formData.page11.postmortemTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <input type="text" name="postmortemAddress" className="common-input w-full"
                                    value={formData.page11.postmortemAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date</label>
                                <input type="date" name="postmortemDate" className="common-input w-full"
                                    value={formData.page11.postmortemDate}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            {/* Embalmer Certification */}
                            <div>
                                <label className="block text-sm font-medium">Embalmer Name</label>
                                <input type="text" name="embalmerName" className="common-input w-full"
                                    value={formData.page11.embalmerName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">License No.</label>
                                <input type="text" name="embalmerLicense" className="common-input w-full"
                                    value={formData.page11.embalmerLicense}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Issued On</label>
                                    <input type="date" name="embalmerIssuedOn" className="common-input w-full"
                                        value={formData.page11.embalmerIssuedOn}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Issued At</label>
                                    <input type="text" name="embalmerIssuedAt" className="common-input w-full"
                                        value={formData.page11.embalmerIssuedAt}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <input type="date" name="embalmerExpiry" className="common-input w-full"
                                    value={formData.page11.embalmerExpiry}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 12 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <p className="text-sm italic text-center">
                                (For delayed registration of death)
                            </p>
                            <p className='text-sm italic'>
                                I _____________________________ , of legal age, single / married / divorced / widow / widower, with residence and postal address at ______________________________________________________ after having been duly sworn in accordance with law, do hereby depose and say:
                            </p>
                            {/* Affiant Info */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                                <input 
                                    type="text" 
                                    name="affiantName" 
                                    className="common-input w-full" 
                                    value={formData.page12.affiantName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Civil Status</label>
                                    <select name="civilStatus" 
                                        className="common-input w-full"
                                        value={formData.page12.civilStatus}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widow">Widow</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Residence / Postal Address</label>
                                    <input 
                                        type="text" 
                                        name="address" 
                                        className="common-input w-full"
                                        value={formData.page12.address}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                            {/* Statement 1 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    1. That ___________________ died on ___________________ at ___________________ and was buried/cremated in ___________________ 
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input type="text" name="deceasedName" placeholder="Deceased Name" className="common-input"
                                        value={formData.page12.deceasedName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input type="date" name="deathDate" className="common-input"
                                        value={formData.page12.deathDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    <input type="text" name="deathPlace" placeholder="Place of Death/Burial" className="common-input"
                                        value={formData.page12.deathPlace}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                            {/* Statement 2 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    2. That the deceased at the time of his/her death:
                                </p>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className='custom-checkbox' name="notAttended" 
                                        checked={formData.page12.notAttended}
                                        onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                    />
                                    <span>Was not attended.</span>
                                </label>
                                <input type="text" name="attendedBy" placeholder="Was attended by" className="common-input w-full mt-2"
                                    value={formData.page12.attendedBy}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    disabled={formData.page12.notAttended}
                                />
                            </div>
                            {/* Statement 3 */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    3. That the cause of death of the deceased was
                                </label>
                                <input type="text" name="causeOfDeath" className="common-input w-full"
                                    value={formData.page12.causeOfDeath}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            {/* Statement 4 */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    4. That the reason for the delay in registering this death was due to
                                </label>
                                <textarea name="reasonDelay" className="common-textarea w-full h-24 resize-none"
                                    value={formData.page12.reasonDelay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 13 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <p className="text-sm italic">
                                5. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                            </p>
                            <p className="text-sm italic">
                                In truth whereof, I have affixed my signature below this ____ day of _____________ at __________________, Philippines.
                            </p>
                            {/* Jurat Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Day</label>
                                    <input type="number" name="juratDay" className="common-input"
                                        value={formData.page13.juratDay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month/Year</label>
                                    <input type="text" name="juratMonthYear" className="common-input"
                                        value={formData.page13.juratMonthYear}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place</label>
                                    <input type="text" name="juratPlace" className="common-input"
                                        value={formData.page13.juratPlace}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                            {/* CTC */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">CTC Number</label>
                                    <input type="text" name="ctcNumber" className="common-input"
                                        value={formData.page13.ctcNumber}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued On</label>
                                    <input type="date" name="ctcIssuedOn" className="common-input"
                                        value={formData.page13.ctcIssuedOn}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued At</label>
                                    <input type="text" name="ctcIssuedAt" className="common-input"
                                        value={formData.page13.ctcIssuedAt}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                            </div>
                            {/* Admin Officer */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name in Print</label>
                                <input type="text" name="adminName" className="common-input"
                                    value={formData.page13.adminName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                                <input type="text" name="adminPosition" className="common-input"
                                    value={formData.page13.adminPosition}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input type="text" name="adminAddress" className="common-input"
                                    value={formData.page13.adminAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            </div>
                        </div>
                    }

                    {currentPage === 14 && 
                        <div className="p-4 border rounded-lg bg-yellow-50 space-y-3 shadow-sm">
                            <div className="flex justify-center">
                            <i className="fa-solid fa-bell text-yellow-500 text-2xl"></i>
                            </div>
                      
                            <p className="text-sm text-gray-700 text-center font-medium">
                            ⚠️ Please double-check that all the information you have provided is accurate and complete before proceeding.
                            </p>
                        
                            <div className="flex flex-col items-center space-y-3">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                        name="confirmation"
                                        checked={formData[`page${currentPage}`]?.confirmation || false}
                                        onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                    />
                                    <span className="text-sm font-medium">Yes, I confirm.</span>
                                </label>

                                <button 
                                    type="submit"
                                    className="btn-primary px-4 py-2 rounded-full disabled:opacity-50"
                                    disabled={!formData[`page${currentPage}`]?.confirmation}
                                >
                                    Submit
                                </button>
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