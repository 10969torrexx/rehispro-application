import React from 'react';
import { Divider } from '@components';
import { InfoCard } from '@components';
import { DeathCertValidation } from '@services';
import { ErrorMessages, SignaturePlaceholder } from '@components';
import { DeathCertServices } from '@services';
import { toast } from 'react-toastify';
import { capitalizeFirst } from '../../../myTools/myTools';
import { AllCaps } from '../../../myTools/myTools';
import axios from 'axios';

export default function DeathCertificateCreate() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageTitles = [ 
        "Deceased's Information", 
        "Status & Residence", 
        "Parents' Information", 
        "For Children Aged 0 to 7 Days", 
        "Medical Certificate", 
        "Manner of Death & Attendant Details", 
        "Certification of Death", 
        "Corpse Disposal", 
        "Certification and Registration Details",
        "Certification and Registration Details (Cont.)",
        "For LCRO / Civil Registrar Use Only",
        "Postmortem & Embalmer Certifications",
        "Affidavit for Delayed Registration of Death (Optional)",
        "Affidavit for Delayed Registration of Death (Cont.)",
        "Confirmation Notice"
    ];

    const [formData, setFormData] = React.useState({
        // Page 1 - Deceased's Information (merged original page1 and page2)
        page1: {
            creatorId: JSON.parse(localStorage.getItem('user'))?.id || null,
            creationType: "manual",
            province: "",
            city: "",
            registry_number: "",
            firstName: "",
            middleName: "",
            lastName: "",
            sex: "",
            dateOfDeath: "",
            dateOfBirth: "",
            ageYears: "",
            ageMonths: "",
            ageDays: "",
            ageHours: "",
            ageMinutes: "",
            placeOfDeath: ""
        },
      
        // Page 2 - Status & Residence 
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
      
        // Page 3 - Parents' Information
        page3: {
            fatherFirstName: "",
            fatherMiddleName: "",
            fatherLastName: "",
            motherFirstName: "",
            motherMiddleName: "",
            motherLastName: ""
        },      

        // Page 3b - For Children Aged 0 to 7 Days
        page4: {
            agedOfMother: "",
            methodOfDelivery: "",
            methodOfDeliverySpecify: "",
            lengthOfPregnancy: "",
            typeOfBirth: "",
            ifMultipleBirth: "",

            mainDiseaseConditionOfInfant: "",
            otherDiseasesConditionsOfInfant: "",
            mainMaternalDiseaseConditionAffectingInfant: "",
            otherMaternalDiseaseConditionAffectingInfant: "",
            otherRelevantCircumstances: ""
        },

      
        // Page 4 - Medical Certificate
        page5: {
            immediateCause: "",
            antecedentCause: "",
            underlyingCause: "",
            intervalImmediate: "",
            intervalAntecedent: "",
            intervalUnderlying: "",
            otherConditions: "",
            maternalCondition: ""
        },

        // Page 5 - Manner of Death & Attendant 
        page6: {
            mannerOfDeath: "",
            autopsy: "",
            placeOccurrence: "",
            attendant: "",
            attendantOthersSpecify: "",
            attendantFrom: "",
            attendantTo: ""
        },

        // Page 6 - Certification of Death 
        page7: {
            attendedDeceased: false,
            notAttendedDeceased: false,
            timeOfDeath: "",
            physicianName: "",
            physicianTitle: "",
            physicianAddress: "",
            healthOfficerName: ""
        },

        // Page 7 - Corpse Disposal (original page9)
        page8: {
            disposalType: "",
            permitNumber: "",
            permitDate: "",
            transferPermit: "",
            transferPermitDate: "",
            cemeteryName: "",
            cemeteryAddress: ""
        },

        // Page 8 - Informant & Prepared By (original page10)
        page9: {
            informantName: "",
            informantRelationship: "",
            informantAddress: "",
            informantDate: "",
            preparedName: "",
            preparedTitle: "",
            preparedDate: ""
        },

        // Page 9 - Received & Registered By (original page11)
        page10: {
            receivedName: "",
            receivedTitle: "",
            receivedDate: "",
            registrarName: "",
            registrarTitle: "",
            registrarDate: ""
        },

        // Page 10 - Remarks / Annotations (original page12)
        page11: {
            remarks: "",      
            officeBoxes: [] 
        },
        // Page 11 - Postmortem & Embalmer (original page13)
        page12: {
            postmortemCause: "",
            postmortemName: "",
            postmortemTitle: "",
            postmortemAddress: "",
            postmortemDate: "",
            embalmeredName: "",
            embalmerName: "",
            embalmerTitle: "",
            embalmerAddress: "",
            embalmerLicense: "",
            embalmerIssuedOn: "",
            embalmerIssuedAt: "",
            embalmerExpiry: ""
        },
        // Page 12 - Affidavit for Delayed Registration (original page14)
        page13: {
            affiantName: "",
            affiantCivilStatus: "",
            address: "",
            deceasedName: "",
            deathDate: "",
            deathPlace: "",
            delayedCemeteryName: "",
            delayedCemeteryAddress: "",
            wasAttended: false,
            ctcPlace: false,
            attendedBy: "",
            causeOfDeath: "",
            reasonDelay: ""
        },
        // Page 13 - Affidavit Jurat (original page15)
        page14: {
            juratDay: "",
            juratMonthYear: "",
            juratPlace: "",
            ctcDay: "",
            ctcMonthYear: "",
            ctcPlace: "",
            ctcIssuedOn: "",
            ctcIssuedAt: "",
            adminName: "",
            adminPosition: "",
            adminAddress: ""
        },

        page15: {
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
    //TODO: handle changes pages & validations
    const [errors, setErrors] = React.useState({});
    const handlePageChange = (direction) => {
        if (direction === 'next') {
            const response = DeathCertValidation.validateForm(formData[`page${currentPage}`], currentPage);
            if (Object.keys(response).length > 0) {
                setErrors(response);
                toast.error("Please fix the errors in the form.");
                console.log("[Death form] Validation Errors:", response);
                console.log(
                    `[Death form] form Data ${currentPage}:`, formData[`page${currentPage}`]
                );
            } else {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, pageTitles.length));
            }
        } else if (direction === 'prev') {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // flatten all page objects into one object
        const flatData = Object.assign(
            {},
            formData.page1,
            formData.page2,
            formData.page3,
            formData.page4,
            formData.page5,
            formData.page6,
            formData.page7,
            formData.page8,
            formData.page9,
            formData.page10,
            formData.page11,
            formData.page12,
            formData.page13,
            formData.page14,
            formData.page15
        );
    
        console.log("Final Flat Data:", flatData);
    
        DeathCertServices.insertDeathCertificate(flatData)
            .then((response) => {
                console.log("[Death Form]", response);
                toast.success(response.message || "Death certificate created successfully");
    
                // reset form state (same as your original code)
                setFormData({
                    page1: {
                        creatorId: 1,
                        creationType: "manual",
                        province: "",
                        city: "",
                        registry_number: "",
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        sex: "",
                        dateOfDeath: "",
                        dateOfBirth: "",
                        ageYears: "",
                        ageMonths: "",
                        ageDays: "",
                        ageHours: "",
                        ageMinutes: "",
                        placeOfDeath: ""
                    },
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
                    page3: {
                        fatherFirstName: "",
                        fatherMiddleName: "",
                        fatherLastName: "",
                        motherFirstName: "",
                        motherMiddleName: "",
                        motherLastName: ""
                    },
                    page4: {
                        agedOfMother: "",
                        methodOfDelivery: "",
                        methodOfDeliverySpecify: "",
                        lengthOfPregnancy: "",
                        typeOfBirth: "",
                        ifMultipleBirth: "",

                        mainDiseaseConditionOfInfant: "",
                        otherDiseasesConditionsOfInfant: "",
                        mainMaternalDiseaseConditionAffectingInfant: "",
                        otherMaternalDiseaseConditionAffectingInfant: "",
                        otherRelevantCircumstances: ""
                    },
                    page5: {
                        immediateCause: "",
                        antecedentCause: "",
                        underlyingCause: "",
                        intervalImmediate: "",
                        intervalAntecedent: "",
                        intervalUnderlying: "",
                        otherConditions: "",
                        maternalCondition: ""
                    },
                    page6: {
                        mannerOfDeath: "",
                        autopsy: "",
                        placeOccurrence: "",
                        attendant: "",
                        attendantOthersSpecify: "",
                        attendantFrom: "",
                        attendantTo: ""
                    },
                    page7: {
                        attendedDeceased: false,
                        notAttendedDeceased: false,
                        timeOfDeath: "",
                        physicianName: "",
                        physicianTitle: "",
                        physicianAddress: "",
                        healthOfficerName: ""
                    },
                    page8: {
                        disposalType: "",
                        permitNumber: "",
                        permitDate: "",
                        transferPermit: "",
                        transferPermitDate: "",
                        cemeteryName: "",
                        cemeteryAddress: ""
                    },
                    page9: {
                        informantName: "",
                        informantRelationship: "",
                        informantAddress: "",
                        informantDate: "",
                        preparedName: "",
                        preparedTitle: "",
                        preparedDate: ""
                    },
                    page10: {
                        receivedName: "",
                        receivedTitle: "",
                        receivedDate: "",
                        registrarName: "",
                        registrarTitle: "",
                        registrarDate: ""
                    },
                    page11: {
                        remarks: "",
                        officeBoxes: []
                    },
                    page12: {
                        postmortemCause: "",
                        postmortemName: "",
                        postmortemTitle: "",
                        postmortemAddress: "",
                        postmortemDate: "",
                        embalmeredName: "",
                        embalmerName: "",
                        embalmerTitle: "",
                        embalmerAddress: "",
                        embalmerLicense: "",
                        embalmerIssuedOn: "",
                        embalmerIssuedAt: "",
                        embalmerExpiry: ""
                    },
                    page13: {
                        affiantName: "",
                        affiantCivilStatus: "",
                        address: "",
                        deceasedName: "",
                        deathDate: "",
                        deathPlace: "",
                        delayedCemeteryName: "",
                        delayedCemeteryAddress: "",
                        wasAttended: false,
                        ctcPlace: false,
                        attendedBy: "",
                        causeOfDeath: "",
                        reasonDelay: ""
                    },
                    page14: {
                        juratDay: "",
                        juratMonthYear: "",
                        juratPlace: "",
                        ctcDay: "",
                        ctcMonthYear: "",
                        ctcPlace: "",
                        ctcIssuedOn: "",
                        ctcIssuedAt: "",
                        adminName: "",
                        adminPosition: "",
                        adminAddress: ""
                    },
                    page15: {
                        confirmation: false
                    }
                });
    
                setCurrentPage(1);
                setErrors({});
            })
            .catch((error) => {
                console.error("[Death Form]:", error);
                toast.error(error.message || "Failed to create death certificate");
            });
    };
    
    
      return (
        <>
            <form className="p-4 h-full mb-4 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                <div className='mb-4'>
                    {currentPage === 1 && 
                        <div className="mb-4 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                           { /* Province & City / Municipality */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">Province</label>
                                    <input
                                        type="text"
                                        name="province"
                                        placeholder="Province"
                                        className={`common-input ${errors.province ? 'input-error' : ''}`}
                                        value={formData.page1.province}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.province && <ErrorMessages errors={errors.province} />}
                                </div>

                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">City / Municipality</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City / Municipality" 
                                        className={`common-input ${errors.city ? 'input-error' : ''}`}
                                        value={formData.page1.city}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.city && <ErrorMessages errors={errors.city} />}
                                </div>

                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">Registry Number</label>
                                    <input
                                        type="text"
                                        name="registry_number"
                                        placeholder="Registry Number" 
                                        className={`common-input ${errors.registry_number ? 'input-error' : ''}`}
                                        value={formData.page1.registry_number}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.city && <ErrorMessages errors={errors.registry_number} />}
                                </div>
                            </div>

                            {/* Deceased's Name */}
                            <div>
                                <label className="block text-sm font-medium">1. Name</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First"
                                            className={`common-input ${errors.firstName ? 'input-error' : ''}`}
                                            value={formData.page1.firstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.firstName && <ErrorMessages errors={errors.firstName} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <input
                                            type="text" 
                                            name="middleName"
                                            placeholder="Middle (Optional)"
                                            className={`common-input ${errors.middleName ? 'input-error' : ''}`}
                                            value={formData.page1.middleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.middleName && <ErrorMessages errors={errors.middleName} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last"
                                            className={`common-input ${errors.lastName ? 'input-error' : ''}`}
                                            value={formData.page1.lastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.lastName && <ErrorMessages errors={errors.lastName} />}
                                    </div>
                                </div>
                            </div>
                    
                            {/* Sex */}
                            <div>
                                <label className="block text-sm font-medium">2. Sex</label>
                                <select name="sex" className={`w-full common-input ${errors.sex ? 'input-error' : ''}`}
                                    value={formData.page1.sex}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.sex && <ErrorMessages errors={errors.sex} />}
                            </div>

                            {/* Date of Death & Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium">3. Date of Death</label>
                                    <input
                                        type="date"
                                        name="dateOfDeath"
                                        className={`w-full common-input ${errors.dateOfDeath ? 'input-error' : ''}`}
                                        value={formData.page1.dateOfDeath}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                        />
                                    {errors.dateOfDeath && <ErrorMessages errors={errors.dateOfDeath} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">5. Date of Birth</label>
                                    <input type="date" name="dateOfBirth" className={`w-full common-input ${errors.dateOfBirth ? 'input-error' : ''}`}
                                        value={formData.page1.dateOfBirth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.dateOfBirth && <ErrorMessages errors={errors.dateOfBirth} />}
                                </div>
                            </div>
                    
                            {/* Age at Time of Death */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">6. Age at Time of Death</label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium">If 1 year or above</label>
                                            <input
                                                type="number"
                                                name="ageYears"
                                                placeholder="Years"
                                                min="0"
                                                className={`common-input w-full pr-16 ${errors.ageYears ? 'input-error' : ''}`}
                                                value={formData.page1.ageYears}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                        {errors.ageYears && <ErrorMessages errors={errors.ageYears} />}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium">If under 1 year</label>
                                            <div className="flex-1">
                                                    <input
                                                        type="number"
                                                        name="ageMonths"
                                                        placeholder="Months"
                                                        min="0"
                                                        max="12"
                                                        className={`common-input w-full pr-16 ${errors.ageMonths ? 'input-error' : ''}`}
                                                        value={formData.page1.ageMonths}
                                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                    />
                                                {errors.ageMonths && <ErrorMessages errors={errors.ageMonths} />}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                        type="number"
                                                        name="ageDays"
                                                        placeholder="Days"
                                                        min="0"
                                                        max="365"
                                                        className={`common-input w-full pr-16 ${errors.ageDays ? 'input-error' : ''}`}
                                                        value={formData.page1.ageDays}
                                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                    />
                                                {errors.ageDays && <ErrorMessages errors={errors.ageDays} />}

                                            </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium">If under 24 hours</label>
                                        <div className="flex-1">
                                                <input
                                                    type="number"
                                                    name="ageHours"
                                                    placeholder="Hours"
                                                    min="0"
                                                    max="24"
                                                    className={`common-input w-full pr-16 ${errors.ageHours ? 'input-error' : ''}`}
                                                    value={formData.page1.ageHours}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                            {errors.ageHours && <ErrorMessages errors={errors.ageHours} />}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                    type="number"
                                                    name="ageMinutes"
                                                    placeholder="Minutes"
                                                    min="0"
                                                    max="60"
                                                    className={`common-input w-full pr-16 ${errors.ageMinutes ? 'input-error' : ''}`}
                                                    value={formData.page1.ageMinutes}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                            {errors.ageMinutes && <ErrorMessages errors={errors.ageMinutes} />}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Place of Death */}
                            <div>
                                <label className="block text-sm font-medium">6. Place of Death</label>
                                <input
                                    type="text"
                                    name="placeOfDeath"
                                    placeholder="Hospital/Clinic/Institution/House No., St., Barangay, City/Mun, Province"
                                    className={`w-full common-input ${errors.placeOfDeath ? 'input-error' : ''}`}
                                    value={formData.page1.placeOfDeath}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.placeOfDeath && <ErrorMessages errors={errors.placeOfDeath} />}
                            </div>
                        </div>
                    }

                    {currentPage === 2 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Civil Status */}
                            <div>
                                <label className="block text-sm font-medium">7. Civil Status</label>
                                <select name="civilStatus" className={`w-full common-input ${errors.civilStatus ? 'input-error' : ''}`}
                                    value={formData.page2.civilStatus}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widow">Widow</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widower">Widower</option>
                                </select>
                                {errors.civilStatus && <ErrorMessages errors={errors.civilStatus} />}
                            </div>
                        
                            {/* Religion & Citizenship */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">8. Religion / Religious Sect</label>
                                    <input
                                        type="text"
                                        name="religion"
                                        placeholder="Religion"
                                        className={`w-full common-input ${errors.religion ? 'input-error' : ''}`}
                                        value={formData.page2.religion}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.religion && <ErrorMessages errors={errors.religion} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">9. Citizenship</label>
                                    <input
                                        type="text"
                                        name="citizenship"
                                        placeholder="Citizenship"
                                        className={`w-full common-input ${errors.citizenship ? 'input-error' : ''}`}
                                        value={formData.page2.citizenship}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.citizenship && <ErrorMessages errors={errors.citizenship} />}
                                </div>
                            </div>

                            {/* Residence */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium">10. Residence</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="residenceHouse"
                                            placeholder="House No."
                                            className={`common-input ${errors.residenceHouse ? 'input-error' : ''}`}
                                            value={formData.page2.residenceHouse}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceHouse && <ErrorMessages errors={errors.residenceHouse} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="residenceStreet"
                                            placeholder="Street"
                                            className={`common-input ${errors.residenceStreet ? 'input-error' : ''}`}
                                            value={formData.page2.residenceStreet}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceStreet && <ErrorMessages errors={errors.residenceStreet} />}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="residenceBarangay"
                                            placeholder="Barangay"
                                            className={`common-input ${errors.residenceBarangay ? 'input-error' : ''}`}
                                            value={formData.page2.residenceBarangay}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceBarangay && <ErrorMessages errors={errors.residenceBarangay} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="residenceCity"
                                            placeholder="City / Municipality"
                                            className={`common-input ${errors.residenceCity ? 'input-error' : ''}`}
                                            value={formData.page2.residenceCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceCity && <ErrorMessages errors={errors.residenceCity} />}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="residenceProvince"
                                            placeholder="Province"
                                            className={`common-input ${errors.residenceProvince ? 'input-error' : ''}`}
                                            value={formData.page2.residenceProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceProvince && <ErrorMessages errors={errors.residenceProvince} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="residenceCountry"
                                            placeholder="Country"
                                            className={`common-input ${errors.residenceCountry ? 'input-error' : ''}`}
                                            value={formData.page2.residenceCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceCountry && <ErrorMessages errors={errors.residenceCountry} />}
                                    </div>
                                </div>
                            </div>

                            {/* Occupation */}
                            <div>
                                <label className="block text-sm font-medium">11. Occupation</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Occupation"
                                    className={`w-full common-input ${errors.occupation ? 'input-error' : ''}`}
                                    value={formData.page2.occupation}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.occupation && <ErrorMessages errors={errors.occupation} />}
                            </div>
                        </div>
                    }

                    {currentPage === 3 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Father’s Name */}
                            <div className="mb-8">
                            <label className="block text-base mb-2">12. Name of Father</label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                <input
                                    type="text"
                                    name="fatherFirstName"
                                    placeholder="First"
                                    className={`w-full common-input ${errors.fatherFirstName ? 'border-red-500' : ''}`}
                                    value={formData.page3.fatherFirstName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.fatherFirstName && <ErrorMessages errors={errors.fatherFirstName} />}
                                </div>
                                <div className="flex-1">
                                <input
                                    type="text"
                                    name="fatherMiddleName"
                                    placeholder="Middle"
                                    className={`w-full common-input ${errors.fatherMiddleName ? 'border-red-500' : ''}`}
                                    value={formData.page3.fatherMiddleName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.fatherMiddleName && <ErrorMessages errors={errors.fatherMiddleName} />}
                                </div>
                                <div className="flex-1">
                                <input
                                    type="text"
                                    name="fatherLastName"
                                    placeholder="Last"
                                    className={`w-full common-input ${errors.fatherLastName ? 'border-red-500' : ''}`}
                                    value={formData.page3.fatherLastName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.fatherLastName && <ErrorMessages errors={errors.fatherLastName} />}
                                </div>
                            </div>
                            </div>

                            {/* Mother’s Maiden Name */}
                            <div className="mb-8">
                            <label className="block text-base mb-2">13. Maiden Name of Mother</label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                <input
                                    type="text"
                                    name="motherFirstName"
                                    placeholder="First"
                                    className={`w-full common-input ${errors.motherFirstName ? 'border-red-500' : ''}`}
                                    value={formData.page3.motherFirstName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.motherFirstName && <ErrorMessages errors={errors.motherFirstName} />}
                                </div>
                                <div className="flex-1">
                                <input
                                    type="text"
                                    name="motherMiddleName"
                                    placeholder="Middle"
                                    className={`w-full common-input ${errors.motherMiddleName ? 'border-red-500' : ''}`}
                                    value={formData.page3.motherMiddleName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.motherMiddleName && <ErrorMessages errors={errors.motherMiddleName} />}
                                </div>
                                <div className="flex-1">
                                <input
                                    type="text"
                                    name="motherLastName"
                                    placeholder="Last"
                                    className={`w-full common-input ${errors.motherLastName ? 'border-red-500' : ''}`}
                                    value={formData.page3.motherLastName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.motherLastName && <ErrorMessages errors={errors.motherLastName} />}
                                </div>
                            </div>
                        </div>                         
                    </div>
                    }

                    {currentPage === 4 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <div className="mb-8">
                                  {/* Age of mother */}
                                  <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">14. Age of Mother</label>
                                        <input
                                            type="number"
                                            name="agedOfMother"
                                            placeholder="Age of Mother"
                                            className={`w-full common-input ${errors.agedOfMother ? 'border-red-500' : ''}`}
                                            value={formData.page4.agedOfMother}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.agedOfMother && <ErrorMessages errors={errors.agedOfMother} />}
                                    </div>
                                    <div className='flex-1'>
                                        <label className="block w-full text-sm font-medium mb-1">15. Method of Delivery</label>
                                        <select
                                            name="methodOfDelivery"
                                            className={`common-input w-full ${errors.methodOfDelivery ? 'input-error' : ''}`}
                                            value={formData.page4.methodOfDelivery || ""}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        >
                                            <option value="">Select</option>
                                            <option value="Normal Spontaneous Vertex">Normal Spontaneous Vertex</option>
                                            <option value="Others">Others (Specify)</option>
                                        </select>
                                        {formData.page4.methodOfDelivery === "Others" && (
                                            <input
                                            type="text"
                                            name="methodOfDeliverySpecify"
                                            placeholder="Specify"
                                            className={`common-input mt-2 w-full ${errors.methodOfDeliverySpecify ? 'input-error' : ''}`}
                                            value={formData.page4.methodOfDeliverySpecify}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                        )}
                                        {errors.methodOfDeliverySpecify && <ErrorMessages errors={errors.methodOfDeliverySpecify} />}
                                        {errors.attendantOthersSpecify && <ErrorMessages errors={errors.attendantOthersSpecify} />}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">16. Length of Pregnancy</label>
                                <input
                                    type="text"
                                    name="lengthOfPregnancy"
                                    placeholder="In Complete Weeks"
                                    className={`w-full common-input ${errors.lengthOfPregnancy ? 'border-red-500' : ''}`}
                                    value={formData.page4.lengthOfPregnancy}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.lengthOfPregnancy && <ErrorMessages errors={errors.lengthOfPregnancy} />}
                            </div>

                            <div className="mb-8">
                                  {/* Type of Birth */}
                                  <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">17. Type of Birth</label>
                                        <input
                                            type="text"
                                            name="typeOfBirth"
                                            placeholder="Single, Twin, Triplets, etc"
                                            className={`w-full common-input ${errors.typeOfBirth ? 'border-red-500' : ''}`}
                                            value={formData.page4.typeOfBirth}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.typeOfBirth && <ErrorMessages errors={errors.typeOfBirth} />}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">18. If Multiple Birth</label>
                                        <input
                                            type="text"
                                            name="ifMultipleBirth"
                                            placeholder="First, Second, Third, etc."
                                            className={`w-full common-input ${errors.ifMultipleBirth ? 'border-red-500' : ''}`}
                                            value={formData.page4.ifMultipleBirth}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.ifMultipleBirth && <ErrorMessages errors={errors.ifMultipleBirth} />}
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-lg text-center font-semibold">Medical Certificate</h2>
                            <div><label htmlFor="" className='mb-2'>19a. Cause of Death</label></div>
                            <div>
                                
                                <label className="block text-sm font-medium">a. Main Disease Condition of Infant</label>
                                <input type="text" name="mainDiseaseConditionOfInfant" className={`w-full common-input ${errors.mainDiseaseConditionOfInfant ? 'input-error' : ''}`}
                                    value={formData.page4.mainDiseaseConditionOfInfant}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.mainDiseaseConditionOfInfant && <ErrorMessages errors={errors.mainDiseaseConditionOfInfant} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">b. Other Diseases Conditions of Infant</label>
                                <input type="text" name="otherDiseasesConditionsOfInfant" className={`w-full common-input ${errors.otherDiseasesConditionsOfInfant ? 'input-error' : ''}`}
                                    value={formData.page4.otherDiseasesConditionsOfInfant}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.otherDiseasesConditionsOfInfant && <ErrorMessages errors={errors.otherDiseasesConditionsOfInfant} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">c. Main Maternal Disease Condition Affecting Infant</label>
                                <input type="text" name="mainMaternalDiseaseConditionAffectingInfant" className={`w-full common-input ${errors.mainMaternalDiseaseConditionAffectingInfant ? 'input-error' : ''}`}
                                    value={formData.page4.mainMaternalDiseaseConditionAffectingInfant}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.mainMaternalDiseaseConditionAffectingInfant && <ErrorMessages errors={errors.mainMaternalDiseaseConditionAffectingInfant} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">d. Other Maternal Disease Condition Affecting Infant</label>
                                <input type="text" name="otherMaternalDiseaseConditionAffectingInfant" className={`w-full common-input ${errors.otherMaternalDiseaseConditionAffectingInfant ? 'input-error' : ''}`}
                                    value={formData.page4.otherMaternalDiseaseConditionAffectingInfant}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.otherMaternalDiseaseConditionAffectingInfant && <ErrorMessages errors={errors.otherMaternalDiseaseConditionAffectingInfant} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">e. Other Relevant Circumstances</label>
                                <input type="text" name="otherRelevantCircumstances" className={`w-full common-input ${errors.otherRelevantCircumstances ? 'input-error' : ''}`}
                                    value={formData.page4.otherRelevantCircumstances}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.otherRelevantCircumstances && <ErrorMessages errors={errors.otherRelevantCircumstances} />}
                            </div>
                    </div>
                    }

                    {currentPage === 5 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <label className="block text-center text-sm font-medium">(if the deceased is aged 8 days or over)</label>
                            {/* Causes of Death */}
                            <div>
                                <label className="block text-sm font-medium">Immediate Cause</label>
                                <input type="text" name="immediateCause" className={`w-full common-input ${errors.immediateCause ? 'input-error' : ''}`}
                                    value={formData.page5.immediateCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.immediateCause && <ErrorMessages errors={errors.immediateCause} />}
                                <label className="block text-sm font-medium mt-2">Interval</label>
                                <input type="text" name="intervalImmediate" className={`w-full common-input ${errors.intervalImmediate ? 'input-error' : ''}`}
                                    value={formData.page5.intervalImmediate}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.intervalImmediate && <ErrorMessages errors={errors.intervalImmediate} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Antecedent Cause</label>
                                <input type="text" name="antecedentCause" className={`w-full common-input ${errors.antecedentCause ? 'input-error' : ''}`}
                                    value={formData.page5.antecedentCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.antecedentCause && <ErrorMessages errors={errors.antecedentCause} />}
                                <label className="block text-sm font-medium mt-2">Interval</label>
                                <input type="text" name="intervalAntecedent" className={`w-full common-input ${errors.intervalAntecedent ? 'input-error' : ''}`}
                                    value={formData.page5.intervalAntecedent}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.intervalAntecedent && <ErrorMessages errors={errors.intervalAntecedent} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Underlying Cause</label>
                                <input type="text" name="underlyingCause" className={`w-full common-input ${errors.underlyingCause ? 'input-error' : ''}`}
                                    value={formData.page5.underlyingCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.underlyingCause && <ErrorMessages errors={errors.underlyingCause} />}
                                <label className="block text-sm font-medium mt-2">Interval</label>
                                <input type="text" name="intervalUnderlying" className={`w-full common-input ${errors.intervalUnderlying ? 'input-error' : ''}`}
                                    value={formData.page5.intervalUnderlying}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.intervalUnderlying && <ErrorMessages errors={errors.intervalUnderlying} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Other Significant Conditions</label>
                                <input type="text" name="otherConditions" className={`w-full common-input ${errors.otherConditions ? 'input-error' : ''}`}
                                    value={formData.page5.otherConditions}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.otherConditions && <ErrorMessages errors={errors.otherConditions} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Maternal Condition (if the deceased is female aged 15-49 years old)</label>
                                <select name="maternalCondition" className={`w-full common-input ${errors.maternalCondition ? 'input-error' : ''}`}
                                    value={formData.page5.maternalCondition}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Pregnant, not in labor">Pregnant, not in labor</option>
                                    <option value="Pregnant, in labor">Pregnant, in labor</option>
                                    <option value="Less than 42 days after delivery">Less than 42 days after delivery</option>
                                    <option value="42 days to 1 year after delivery">42 days to 1 year after delivery</option>
                                    <option value="None">None</option>
                                </select>
                                {errors.maternalCondition && <ErrorMessages errors={errors.maternalCondition} />}
                            </div>
                        </div>
                    }

                    {currentPage === 6 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Manner of Death */}
                            <div>
                                <label className="block text-sm font-medium">Manner of Death</label>
                                <select name="mannerOfDeath" className={`w-full common-input ${errors.mannerOfDeath ? 'input-error' : ''}`}
                                    value={formData.page6.mannerOfDeath}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Homicide">Homicide</option>
                                    <option value="Suicide">Suicide</option>
                                    <option value="Accident">Accident</option>
                                    <option value="Legal Intervention">Legal Intervention</option>
                                    <option value="Natural">Natural</option>
                                </select>
                                {errors.mannerOfDeath && <ErrorMessages errors={errors.mannerOfDeath} />}
                            </div>
                            {/* Autopsy */}
                            <div>
                                <label className="block text-sm font-medium">Autopsy</label>
                                <select name="autopsy" className={`w-full common-input ${errors.autopsy ? 'input-error' : ''}`}
                                    value={formData.page6.autopsy}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {errors.autopsy && <ErrorMessages errors={errors.autopsy} />}
                            </div>
                            {/* Place of Occurrence */}
                            <div>
                            <label className="block text-sm font-medium mb-1">Place of Occurrence (for external cause)</label>
                            <select
                                name="placeOccurrence"
                                className={`w-full common-input ${errors.placeOccurrence ? 'input-error' : ''}`}
                                value={formData.page6.placeOccurrence}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                            >
                                <option value="">Select</option>
                                <option value="Home">Home</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Work">Work</option>
                                <option value="Public Place">Public Place</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.placeOccurrence && <ErrorMessages errors={errors.placeOccurrence} />}
                            </div>
                            {/* Attendant Type */}
                            <div className={`p-2 ${errors.attendantGroup ? 'input-error' : ''}`}>
                            <label className="block w-full text-sm font-medium mb-1">Attended By</label>
                            
                            <select
                                name="attendant"
                                className={`common-input w-full ${errors.attendant ? 'input-error' : ''}`}
                                value={formData.page6.attendant || ""}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                            >
                                <option value="">Select</option>
                                <option value="Private Physician">Private Physician</option>
                                <option value="Public Health Authority">Public Health Authority</option>
                                <option value="Hospital">Hospital</option>
                                <option value="None">None</option>
                                <option value="Others">Others (Specify)</option>
                            </select>

                            {formData.page6.attendant === "Others" && (
                                <input
                                type="text"
                                name="attendantOthersSpecify"
                                placeholder="Specify"
                                className={`common-input mt-2 w-full ${errors.attendantOthersSpecify ? 'input-error' : ''}`}
                                value={formData.page6.attendantOthersSpecify}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                            )}

                            {errors.attendant && <ErrorMessages errors={errors.attendant} />}
                            {errors.attendantOthersSpecify && <ErrorMessages errors={errors.attendantOthersSpecify} />}
                            </div>

                            {/* Attendant Duration */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">From (mm/dd/yy)</label>
                                    <input type="date" name="attendantFrom" className={`w-full common-input ${errors.attendantFrom ? 'input-error' : ''}`}
                                        value={formData.page6.attendantFrom}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.attendantFrom && <ErrorMessages errors={errors.attendantFrom} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">To (mm/dd/yy)</label>
                                    <input type="date" name="attendantTo" className={`w-full common-input ${errors.attendantTo ? 'input-error' : ''}`}
                                        value={formData.page6.attendantTo}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.attendantTo && <ErrorMessages errors={errors.attendantTo} />}
                                </div>
                            </div>
                        </div>
                    }

                {currentPage === 7 && 
                <div className="mb-6 space-y-8">
                    <h2 className="text-lg text-center font-semibold">
                    {pageTitles[currentPage - 1]}
                    </h2>

                    {/* Certification Oath */}
                    <div className="text-sm leading-relaxed flex flex-wrap items-center">
                        <span>
                            I hereby certify that the foregoing particulars are correct as near as same can be ascertained and I further certify that I
                        </span>

                        <div className={`p-2 ${errors.attendedDeceasedGroup ? 'input-error' : ''}`}>  
                            <div className="flex items-center space-x-2">
                                <label className="inline-flex items-center mx-2">
                                <input 
                                    type="checkbox" 
                                    name="attendedDeceased" 
                                    className="custom-checkbox w-4 h-4"
                                    checked={formData.page7.attendedDeceased || false}
                                    onChange={() => {
                                    handleInputChange(
                                        { target: { name: "attendedDeceased", value: !formData.page7.attendedDeceased } },
                                        `page${currentPage}`
                                    );
                                    handleInputChange(
                                        { target: { name: "notAttendedDeceased", value: false } },
                                        // { target: { name: "notAttended", value: false, readOnly: true }},
                                        `page${currentPage}`
                                    );
                                    }}
                                />
                                <span className="ml-1">have attended</span>
                                </label>

                                <span>/</span>

                                <label className="inline-flex items-center mx-2">
                                <input 
                                    type="checkbox" 
                                    name="notAttendedDeceased" 
                                    className="custom-checkbox w-4 h-4"
                                    checked={formData.page7.notAttendedDeceased || false}
                                    onChange={() => {
                                    handleInputChange(
                                        { target: { name: "notAttendedDeceased", value: !formData.page7.notAttendedDeceased } },
                                        `page${currentPage}`
                                    );
                                    handleInputChange(
                                        { target: { name: "attendedDeceased", value: false }},
                                        `page${currentPage}`
                                    );
                                    }}
                                />
                                <span className="ml-1">have not attended </span>
                                </label>
                            </div>

                            {errors.attendedDeceasedGroup && (
                                <p className="text-red-500 text-sm mt-1">{errors.attendedDeceasedGroup}</p>
                            )}
                            </div>
                        </div>
                        <span>the deceased and that death occurred at</span>
                            <input 
                                type="time" 
                                name="timeOfDeath" 
                                className={`common-input inline-block  px-2 py-2 mx-2 ${errors.timeOfDeath ? 'input-error' : ''}`}
                                value={formData.page7.timeOfDeath || ""}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                            />
                            {errors.timeOfDeath && <ErrorMessages errors={errors.timeOfDeath} />}



                    {/* Physician Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Signature</label>
                        <div className="flex flex-col">
                        <SignaturePlaceholder />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                        <input 
                        type="text" 
                        name="physicianName" 
                        placeholder="Full Name"
                        className={`w-full common-input ${errors.physicianName ? 'input-error' : ''}`} 
                        value={formData.page7.physicianName || ""}
                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                        />
                        {errors.physicianName && <ErrorMessages errors={errors.physicianName} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                        <input 
                        type="text" 
                        name="physicianTitle" 
                        placeholder="Title/Position"
                        className={`w-full common-input ${errors.physicianTitle ? 'input-error' : ''}`} 
                        value={formData.page7.physicianTitle || ""}
                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                        />
                        {errors.physicianTitle && <ErrorMessages errors={errors.physicianTitle} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input 
                        type="text" 
                        name="physicianAddress" 
                        placeholder="Address"
                        className={`w-full common-input ${errors.physicianAddress ? 'input-error' : ''}`} 
                        value={formData.page7.physicianAddress || ""}
                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                        />
                        {errors.physicianAddress && <ErrorMessages errors={errors.physicianAddress} />}
                    </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input 
                        type="date" 
                        name="certificationDate" 
                        className={` w-full common-input ${errors.certificationDate ? 'input-error' : ''}`} 
                        value={formData.page7.certificationDate || ""}
                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                        />
                        {errors.certificationDate && <ErrorMessages errors={errors.certificationDate} />}
                    </div>


                    {/* Reviewed By */}
                    <div className="space-y-4">
                    <p className="font-medium text-sm">REVIEWED BY:</p>
                    <div>
                        <label className="block text-sm font-medium mb-1">Signature Over Printed Name of Health Officer</label>
                        <input 
                        type="text" 
                        name="healthOfficerName" 
                        placeholder="Full Name"
                        className={`w-full common-input ${errors.healthOfficerName ? 'input-error' : ''}`} 
                        value={formData.page7.healthOfficerName || ""}
                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                        />
                        {errors.healthOfficerName && <ErrorMessages errors={errors.healthOfficerName} />}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input 
                        type="date" 
                        name="reviewedDate" 
                        className={`w-full common-input ${errors.reviewedDate ? 'input-error' : ''}`} 
                        value={formData.page7.reviewedDate || ""}
                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                        />
                        {errors.reviewedDate && <ErrorMessages errors={errors.reviewedDate} />}
                    </div>
                    </div>
                </div>
                }

                    {currentPage === 8 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Disposal Type */}
                            <div>
                                <label className="block text-sm font-medium">Corpse Disposal</label>
                                <select name="disposalType" className={`w-full common-input ${errors.disposalType ? 'input-error' : ''}`}
                                    value={formData.page8.disposalType}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                >
                                    <option value="">Select</option>
                                    <option value="Burial">Burial</option>
                                    <option value="Cremation">Cremation</option>
                                    <option value="Others">Others (Specify)</option>
                                </select>
                                {errors.disposalType && <ErrorMessages errors={errors.disposalType} />}
                            </div>
                            {/* Permit */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Burial/Cremation Permit Number</label>
                                    <input type="text" name="permitNumber" className={`w-full common-input ${errors.permitNumber ? 'input-error' : ''}`}
                                        value={formData.page8.permitNumber}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.permitNumber && <ErrorMessages errors={errors.permitNumber} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Date Issued</label>
                                    <input type="date" name="permitDate" className={`w-full common-input ${errors.permitDate ? 'input-error' : ''}`}
                                        value={formData.page8.permitDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.permitDate && <ErrorMessages errors={errors.permitDate} />}
                                </div>
                            </div>
                            {/* Transfer Permit */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Transfer Permit Number</label>
                                    <input type="text" name="transferPermit" className={`w-full common-input ${errors.transferPermit ? 'input-error' : ''}`}
                                        value={formData.page8.transferPermit}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.transferPermit && <ErrorMessages errors={errors.transferPermit} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Date Issued</label>
                                    <input type="date" name="transferPermitDate" className={`w-full common-input ${errors.transferPermitDate ? 'input-error' : ''}`}
                                        value={formData.page8.transferPermitDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.transferPermitDate && <ErrorMessages errors={errors.transferPermitDate} />}
                                </div>
                            </div>
                            {/* Cemetery */}
                            <div>
                                <label className="block text-sm font-medium">Name of Cemetery or Crematory</label>
                                <input type="text" name="cemeteryName" className={`w-full common-input ${errors.cemeteryName ? 'input-error' : ''}`}
                                    value={formData.page8.cemeteryName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.cemeteryName && <ErrorMessages errors={errors.cemeteryName} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address of Cemetery or Crematory</label>
                                <input type="text" name="cemeteryAddress" className={`w-full common-input ${errors.cemeteryAddress ? 'input-error' : ''}`}
                                    value={formData.page8.cemeteryAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.cemeteryAddress && <ErrorMessages errors={errors.cemeteryAddress} />}
                            </div>
                        </div>
                    }

                    {currentPage === 9 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Certification of Informant */}
                            <div className="space-y-4">
                                <h3 className="text-md">Certification of Informant</h3>
                                <label className="block text-sm font-medium mb-1">I hereby certify that all information supplied are true and correct to my own knowledge and belief.</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Signature</label>
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="informantName" placeholder="Full Name" 
                                            className={`w-full common-input ${errors.informantName ? 'input-error' : ''}`} 
                                            value={formData.page9.informantName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.informantName && <ErrorMessages errors={errors.informantName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Relationship to the Deceased</label>
                                        <input type="text" name="informantRelationship" placeholder="Relationship" 
                                            className={`w-full common-input ${errors.informantRelationship ? 'input-error' : ''}`} 
                                            value={formData.page9.informantRelationship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.informantRelationship && <ErrorMessages errors={errors.informantRelationship} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input type="text" name="informantAddress" placeholder="Full Address" 
                                            className={`w-full common-input ${errors.informantAddress ? 'input-error' : ''}`} 
                                            value={formData.page9.informantAddress}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.informantAddress && <ErrorMessages errors={errors.informantAddress} />}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input type="date" name="informantDate" 
                                        className={`w-full common-input ${errors.informantDate ? 'input-error' : ''}`} 
                                        value={formData.page9.informantDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.informantDate && <ErrorMessages errors={errors.informantDate} />}
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
                                            className={`w-full common-input ${errors.preparedName ? 'input-error' : ''}`} 
                                            value={formData.page9.preparedName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.preparedName && <ErrorMessages errors={errors.preparedName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="preparedTitle" placeholder="Title or Position" 
                                            className={`w-full common-input ${errors.preparedTitle ? 'input-error' : ''}`} 
                                            value={formData.page9.preparedTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.preparedTitle && <ErrorMessages errors={errors.preparedTitle} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="preparedDate" 
                                            className={`w-full common-input ${errors.preparedDate ? 'input-error' : ''}`} 
                                            value={formData.page9.preparedDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                        />
                                        {errors.preparedDate && <ErrorMessages errors={errors.preparedDate} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 10 && 
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
                                            className={`w-full common-input ${errors.receivedName ? 'input-error' : ''}`} 
                                            value={formData.page10.receivedName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.receivedName && <ErrorMessages errors={errors.receivedName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="receivedTitle" placeholder="Title or Position" 
                                            className={`w-full common-input ${errors.receivedTitle ? 'input-error' : ''}`} 
                                            value={formData.page10.receivedTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.receivedTitle && <ErrorMessages errors={errors.receivedTitle} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="receivedDate" 
                                            className={`w-full common-input ${errors.receivedDate ? 'input-error' : ''}`} 
                                            value={formData.page10.receivedDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                        />
                                        {errors.receivedDate && <ErrorMessages errors={errors.receivedDate} />}
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
                                            className={`w-full common-input ${errors.registrarName ? 'input-error' : ''}`}
                                            value={formData.page10.registrarName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.registrarName && <ErrorMessages errors={errors.registrarName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="registrarTitle" placeholder="Title or Position" 
                                            className={`w-full common-input ${errors.registrarTitle ? 'input-error' : ''}`}
                                            value={formData.page10.registrarTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.registrarTitle && <ErrorMessages errors={errors.registrarTitle} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="registrarDate" 
                                            className={`w-full common-input ${errors.registrarDate ? 'input-error' : ''}`}
                                            value={formData.page10.registrarDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                        />
                                        {errors.registrarDate && <ErrorMessages errors={errors.registrarDate} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 11 && 
                        <div className="mb-6 space-y-2">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    REMARKS / ANNOTATIONS (For LCRO/OCRG Use Only)
                                </label>
                                <textarea
                                    name="remarks"
                                    placeholder="Enter remarks or annotations here..."
                                    className={`common-textarea w-full h-32 resize-none ${errors.remarks ? 'input-error' : ''}`}
                                    value={formData.page11.remarks}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.remarks && <ErrorMessages errors={errors.remarks} />}
                            </div>
                        </div>
                    }

                    {currentPage === 12 && 
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">Postmortem Certificate</h2>
                            
                            <p className="text-sm italic w-full break-words whitespace-normal">
                            I HEREBY CERTIFY that I have performed an autopsy upon the body of the deceased and that the cause of death was: 
                            <span className="italic font-bold break-words">
                                {formData.page12.postmortemCause || '____________________________________________'}
                            </span>.
                            </p>

                            {/* Postmortem Certificate */}
                            <div>
                                <label className="block text-sm font-medium">Cause of Death (from Autopsy)</label>
                                <textarea name="postmortemCause" className={`common-textarea w-full h-32 resize-none ${errors.postmortemCause ? 'input-error' : ''}`}
                                    value={formData.page12.postmortemCause}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.postmortemCause && <ErrorMessages errors={errors.postmortemCause} />}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium">Name in Print</label>
                                <input
                                type="text"
                                name="postmortemName"
                                className={`w-full common-input ${errors.postmortemName ? 'input-error' : ''}`}
                                value={formData.page12.postmortemName}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.postmortemName && <ErrorMessages errors={errors.postmortemName} />}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Title/Designation</label>
                                <input
                                type="text"
                                name="postmortemTitle"
                                className={`w-full common-input ${errors.postmortemTitle ? 'input-error' : ''}`}
                                value={formData.page12.postmortemTitle}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.postmortemTitle && <ErrorMessages errors={errors.postmortemTitle} />}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <input
                                type="text"
                                name="postmortemAddress"
                                className={`w-full common-input ${errors.postmortemAddress ? 'input-error' : ''}`}
                                value={formData.page12.postmortemAddress}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.postmortemAddress && <ErrorMessages errors={errors.postmortemAddress} />}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Date</label>
                                <input
                                type="date"
                                name="postmortemDate"
                                className={`w-full common-input ${errors.postmortemDate ? 'input-error' : ''}`}
                                value={formData.page12.postmortemDate}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                />
                                {errors.postmortemDate && <ErrorMessages errors={errors.postmortemDate} />}
                            </div>
                            </div>

                            <h2 className="text-lg text-center font-semibold">Embalmer Certification</h2>

                            <p className="text-sm italic">
                                 I HEREBY CERTIFY that I have embalmed <spam className="italic font-bold">{formData.page12.embalmeredName || '__________________'} </spam> {' '} following all the regulations prescribed by the Department of Health.
                            </p>

                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input type="text" name="embalmeredName" className={`w-full common-input ${errors.embalmerName ? 'input-error' : ''}`}
                                    value={formData.page12.embalmeredName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.embalmeredName && <ErrorMessages errors={errors.embalmeredName} />}
                            </div>

                            {/* Embalmer Certification */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div>
                                    <label className="block text-sm font-medium">Embalmer Name</label>
                                    <input
                                    type="text"
                                    name="embalmerName"
                                    className={`w-full common-input ${errors.embalmerName ? 'input-error' : ''}`}
                                    value={formData.page12.embalmerName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.embalmerName && <ErrorMessages errors={errors.embalmerName} />}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Title/Designation</label>
                                    <input
                                    type="text"
                                    name="embalmerTitle"
                                    className={`w-full common-input ${errors.embalmerTitle ? 'input-error' : ''}`}
                                    value={formData.page12.embalmerTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.embalmerTitle && <ErrorMessages errors={errors.embalmerTitle} />}
                                </div>
                                <div>
                                <label className="block text-sm font-medium">Address</label>
                                <input type="text" name="embalmerAddress" className={`w-full common-input ${errors.embalmerAddress ? 'input-error' : ''}`}
                                    value={formData.page12.embalmerAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.embalmerAddress && <ErrorMessages errors={errors.embalmerAddress} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">License No.</label>
                                    <input type="text" name="embalmerLicense" className={`w-full common-input ${errors.embalmerLicense ? 'input-error' : ''}`}
                                        value={formData.page12.embalmerLicense}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.embalmerLicense && <ErrorMessages errors={errors.embalmerLicense} />}
                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Issued On</label>
                                    <input type="date" name="embalmerIssuedOn" className={`w-full common-input ${errors.embalmerIssuedOn ? 'input-error' : ''}`}
                                        value={formData.page12.embalmerIssuedOn}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    />
                                    {errors.embalmerIssuedOn && <ErrorMessages errors={errors.embalmerIssuedOn} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Issued At</label>
                                    <input type="text" name="embalmerIssuedAt" className={`w-full common-input ${errors.embalmerIssuedAt ? 'input-error' : ''}`}
                                        value={formData.page12.embalmerIssuedAt}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.embalmerIssuedAt && <ErrorMessages errors={errors.embalmerIssuedAt} />}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <input type="date" name="embalmerExpiry" className={`w-full common-input ${errors.embalmerExpiry ? 'input-error' : ''}`}
                                    value={formData.page12.embalmerExpiry}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                />
                                {errors.embalmerExpiry && <ErrorMessages errors={errors.embalmerExpiry} />}
                            </div>
                        </div>
                    }

                    {currentPage === 13 && 
                        <div className="mb-6 space-y-8">
                          <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                          <p className="text-sm italic text-center">
                            (For delayed registration of death)
                          </p>
                          <p className="text-sm text-left">
                            I <spam className="italic font-bold">{formData.page13.affiantName || '_____________________________'}</spam> , of legal age, <spam className="italic font-bold">{formData.page13.affiantCivilStatus || 'single / married / divorced / widow / widower'}</spam>, with residence and postal address at <spam className="italic font-bold">{formData.page13.address || '_____________________________'}</spam>  after having been duly sworn in accordance with law, do hereby depose and say:
                          </p>
                        
                          {/* Affiant Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                              <input 
                                type="text" 
                                name="affiantName" 
                                className={`w-full common-input ${errors.affiantName ? 'input-error' : ''}`} 
                                value={formData.page13.affiantName}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                              />
                              {errors.affiantName && <ErrorMessages errors={errors.affiantName} />}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Civil Status</label>
                              <select name="affiantCivilStatus" 
                                className={`w-full common-input ${errors.affiantCivilStatus ? 'input-error' : ''}`}
                                value={formData.page13.affiantCivilStatus}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                              >
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widow">Widow</option>
                              </select>
                              {errors.affiantCivilStatus && <ErrorMessages errors={errors.affiantCivilStatus} />}
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1">Residence / Postal Address</label>
                              <input 
                                type="text" 
                                name="address" 
                                className={`w-full common-input ${errors.address ? 'input-error' : ''}`}
                                value={formData.page13.address}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                              />
                              {errors.address && <ErrorMessages errors={errors.address} />}
                            </div>
                          </div>
                        
                          {/* Statement 1 */}
                          <div>
                            <p className="text-sm font-medium mb-2">
                              1. That <span className="italic font-bold ">{formData.page13.deceasedName || '__________________'}</span> died on <span className="italic font-bold">{formData.page13.deathDate || '__________________'}</span> at <span className="italic font-bold">{formData.page13.deathPlace || '__________________'}</span> and was buried/cremated in <span className="italic font-bold">{formData.page13.delayedCemeteryName || '__________________'}</span> on <span className="italic font-bold">{formData.page13.delayedCemeteryAddress || '__________________'}</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <input type="text" name="deceasedName" placeholder="Deceased Name" className={`common-input ${errors.deceasedName ? 'input-error' : ''}`}
                                  value={formData.page13.deceasedName}
                                  onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.deceasedName && <ErrorMessages errors={errors.deceasedName} />}
                              </div>
                              <div>
                                <input type="date" name="deathDate" className={`common-input ${errors.deathDate ? 'input-error' : ''}`}
                                  value={formData.page13.deathDate}
                                  onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                />
                                {errors.deathDate && <ErrorMessages errors={errors.deathDate} />}
                              </div>
                              <div>
                                <input type="text" name="deathPlace" placeholder="Place of Death" className={`common-input ${errors.deathPlace ? 'input-error' : ''}`}
                                  value={formData.page13.deathPlace}
                                  onChange={(e) => handleInputChange(e, `page${currentPage}`)} 
                                />
                                {errors.deathPlace && <ErrorMessages errors={errors.deathPlace} />}
                              </div>
                              <div>
                                <input type="text" name="delayedCemeteryName" placeholder="Cemetery name or cremation location" className={`common-input ${errors.delayedCemeteryName ? 'input-error' : ''}`}
                                  value={formData.page13.delayedCemeteryName}
                                  onChange={(e) => handleInputChange(e, `page${currentPage}`)} 
                                />
                                {errors.delayedCemeteryName && <ErrorMessages errors={errors.delayedCemeteryName} />}
                              </div>
                              <div>
                                <input type="text" name="delayedCemeteryAddress" placeholder="Cemetery/Cremation address" className={`common-input ${errors.delayedCemeteryAddress ? 'input-error' : ''}`}
                                  value={formData.page13.delayedCemeteryAddress}
                                  onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.delayedCemeteryAddress && <ErrorMessages errors={errors.delayedCemeteryAddress} />}
                              </div>
                            </div>
                          </div>
                        
                          {/* Statement 2 */}
                          <div>
                            <p className="text-sm font-medium mb-2">
                              2. That the deceased at the time of his/her death:
                            </p>
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className={`custom-checkbox w-4 h-4 ${errors.wasAttended ? 'input-error' : ''}`}
                                name="wasAttended"
                                checked={formData.page13.wasAttended || false}
                                onChange={() => {
                                handleInputChange(
                                    { target: { name: "wasAttended", value: !formData.page13.wasAttended } },
                                    `page${currentPage}`
                                );
                                handleInputChange(
                                    { target: { name: "ctcPlace", value: false } },
                                    `page${currentPage}`
                                );
                                }}
                            />
                            <span>Was attended.</span>
                            </label>

                            <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className={`custom-checkbox w-4 h-4 ${errors.ctcPlace ? 'input-error' : ''}`}
                                name="ctcPlace"
                                checked={formData.page13.ctcPlace || false}
                                onChange={() => {
                                handleInputChange(
                                    { target: { name: "ctcPlace", value: !formData.page13.ctcPlace } },
                                    `page${currentPage}`
                                );
                                handleInputChange(
                                    { target: { name: "wasAttended", value: false } },
                                    `page${currentPage}`
                                );
                                }}
                            />
                            <span>Was not attended.</span>
                            </label>
                              <input type="text" name="attendedBy" placeholder="Was attended by" className={`common-input w-full md:w-auto ${errors.attendedBy ? 'input-error' : ''}`}
                                value={formData.page13.wasAttended === true ? formData.page13.attendedBy : formData.page13.attendedBy = ""}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                disabled={formData.page13.wasAttended === true ? false : true}
                                
                              />
                            </div>
                            {errors.attendedBy && <ErrorMessages errors={errors.attendedBy} />}
                          </div>
                        
                          {/* Statement 3 */}
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              3. That the cause of death of the deceased was
                            </label>
                            <input type="text" name="causeOfDeath" className={`w-full common-input ${errors.causeOfDeath ? 'input-error' : ''}`}
                              value={formData.page13.causeOfDeath}
                              onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                            />
                            {errors.causeOfDeath && <ErrorMessages errors={errors.causeOfDeath} />}
                        </div>

                        {/* Statement 4 */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                            4. That the reason for the delay in registering this death was due to
                            </label>
                            <textarea name="reasonDelay" className={`common-textarea w-full h-24 resize-none ${errors.reasonDelay ? 'input-error' : ''}`}
                            value={formData.page13.reasonDelay}
                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                            />
                            {errors.reasonDelay && <ErrorMessages errors={errors.reasonDelay} />}
                        </div>
                        </div>                    }

                    {currentPage === 14 && 
                        // ...existing code...
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <p className="text-sm italic">
                                5. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                            </p>
                            <p className="text-sm italic">
                                In truth whereof, I have affixed my signature below this <spam className="italic font-bold">{formData.page14.juratDay || '____'}</spam> day of <spam className="italic font-bold">{formData.page14.juratMonthYear || '_____________'}</spam> at <spam className="italic font-bold">{formData.page14.juratPlace || '_____________'}</spam>, Philippines.
                            </p>
                        
                            {/* Jurat Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Day</label>
                                    <input
                                        type="number"
                                        name="juratDay"
                                        className={`common-input ${errors.juratDay ? 'input-error' : ''}`}
                                        value={formData.page14.juratDay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratDay && <ErrorMessages errors={errors.juratDay} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month/Year</label>
                                    <input
                                        type="text"
                                        name="juratMonthYear"
                                        className={`common-input ${errors.juratMonthYear ? 'input-error' : ''}`}
                                        value={formData.page14.juratMonthYear}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratMonthYear && <ErrorMessages errors={errors.juratMonthYear} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place</label>
                                    <input
                                        type="text"
                                        name="juratPlace"
                                        className={`common-input ${errors.juratPlace ? 'input-error' : ''}`}
                                        value={formData.page14.juratPlace}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratPlace && <ErrorMessages errors={errors.juratPlace} />}
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <SignaturePlaceholder />
                                </div>
                                <div className='col-span-3 text-center'>
                                    <input
                                        type="text"
                                        name=""
                                        readOnly
                                        className={`common-input w-full text-center`}
                                        value={formData.page13.affiantName}
                                    />
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                </div>

                            </div>
                            <p className="text-sm italic">
                                <strong>SUBSCRIBED AND SWORN</strong> to before me this <spam className="italic font-bold">{formData.page14.ctcDay || '____'}</spam> day of <spam className="italic font-bold">{formData.page14.ctcMonthYear || '_____________'}</spam> at <spam className="italic font-bold">{formData.page14.ctcPlace || '_____________'}</spam>, Philippines, affiant who exhibited to me his Community Tax Cert. issued on <spam className="italic font-bold">{formData.page14.ctcIssuedOn || '_____________'}</spam> at <spam className="italic font-bold">{formData.page14.ctcIssuedAt || '_____________'}</spam>.
                            </p>
                        

                            {/* CTC Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Day</label>
                                    <input
                                        type="number"
                                        name="ctcDay"
                                        className={`common-input ${errors.ctcDay ? 'input-error' : ''}`}
                                        value={formData.page14.ctcDay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ctcDay && <ErrorMessages errors={errors.ctcDay} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month/Year</label>
                                    <input
                                        type="text"
                                        name="ctcMonthYear"
                                        className={`common-input ${errors.ctcMonthYear ? 'input-error' : ''}`}
                                        value={formData.page14.ctcMonthYear}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ctcMonthYear && <ErrorMessages errors={errors.ctcMonthYear} />}
                                </div>

                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place</label>
                                    <input
                                        type="text"
                                        name="ctcPlace"
                                        className={`common-input ${errors.ctcPlace ? 'input-error' : ''}`}
                                        value={formData.page14.ctcPlace}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ctcPlace && <ErrorMessages errors={errors.ctcPlace} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued On</label>
                                    <input
                                        type="date"
                                        name="ctcIssuedOn"
                                        className={`common-input ${errors.ctcIssuedOn ? 'input-error' : ''}`}
                                        value={formData.page14.ctcIssuedOn}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        onClick={(e) => e.target.showPicker && e.target.showPicker()} // 👈 open calendar when clicking anywhere
                                    />
                                    {errors.ctcIssuedOn && <ErrorMessages errors={errors.ctcIssuedOn} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued At</label>
                                    <input
                                        type="text"
                                        name="ctcIssuedAt"
                                        className={`common-input ${errors.ctcIssuedAt ? 'input-error' : ''}`}
                                        value={formData.page14.ctcIssuedAt}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ctcIssuedAt && <ErrorMessages errors={errors.ctcIssuedAt} />}
                                </div>
                            </div>
                        
                            {/* Admin Officer Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <SignaturePlaceholder />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                    <input
                                        type="text"
                                        name="adminName"
                                        className={`common-input ${errors.adminName ? 'input-error' : ''}`}
                                        value={formData.page14.adminName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminName && <ErrorMessages errors={errors.adminName} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                                    <input
                                        type="text"
                                        name="adminPosition"
                                        className={`common-input ${errors.adminPosition ? 'input-error' : ''}`}
                                        value={formData.page14.adminPosition}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminPosition && <ErrorMessages errors={errors.adminPosition} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="adminAddress"
                                        className={`common-input ${errors.adminAddress ? 'input-error' : ''}`}
                                        value={formData.page14.adminAddress}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminAddress && <ErrorMessages errors={errors.adminAddress} />}
                                </div>
                            </div>
                        </div>
                    }
                    {currentPage === 15 && 
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
                                        className={`custom-checkbox ${errors.confirmation ? 'input-error' : ''}`}
                                        name="confirmation"
                                        checked={formData[`page${currentPage}`]?.confirmation || false}
                                        onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                    />
                                    {errors.confirmation && <ErrorMessages errors={errors.confirmation} />}
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