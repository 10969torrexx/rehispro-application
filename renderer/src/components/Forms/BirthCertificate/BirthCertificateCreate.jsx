import React, {useEffect, useState} from 'react';
import { Divider } from '@components';
import { InfoCard } from '@components';
import { BirthCertValidation } from '@services';
import { BirthCertificate, CivilStatus, MarriageStatus } from '@enums';
import { capitalizeFirst } from '../../../myTools/myTools';
import { toast } from "react-toastify";
import { ErrorMessages, SignaturePlaceholder } from '@components';
import { AllCaps, StringToDate } from '@myTools';
import { BirthCertServices } from '@services';

export default function BirthCertificateCreate({defaultOCRValues}) {
    const [currentPage, setCurrentPage] = useState(1); //TODO: handle current page
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
        "Affidavit for Delayed Registration of Birth (Cont.)",
        "Confirmation Notice"
    ];

    //TODO: handle form data
    const [formData, setFormData] = useState({
        // Page 1 - Child Information
        page1: {
            creatorId: JSON.parse(localStorage.getItem('user'))?.id || null,
            creationType: BirthCertificate.CreationType.MANUAL,
            province: defaultOCRValues?.province ?? "",
            city: defaultOCRValues?.city ?? "",
            registryNumber: defaultOCRValues?.registry_number ?? "",
            childFirstName: defaultOCRValues?.child_first_name ?? "",
            childMiddleName: defaultOCRValues?.child_middle_name ?? "",
            childLastName: defaultOCRValues?.child_last_name ?? "",
            sex: defaultOCRValues?.sex ?? "",
            // dateOfBirth: StringToDate(`${defaultOCRValues?.dateOfBirth_day}, ${defaultOCRValues?.dateOfBirth_month}, ${defaultOCRValues?.dateOfBirth_year}`) ?? "",
            dateOfBirth: StringToDate(`${defaultOCRValues?.dateOfBirth_year}-${defaultOCRValues?.dateOfBirth_month}-${defaultOCRValues?.dateOfBirth_day}`) ?? "",
            placeOfBirthBarangay: (`${defaultOCRValues?.placeOfBirth_barangay} / ${defaultOCRValues?.placeOfBirth_hospital}`) ?? "",
            placeOfBirthCity: defaultOCRValues?.placeOfBirth_city ?? "",
            placeOfBirthProvince: defaultOCRValues?.placeOfBirth_province ?? "",
            typeOfBirth: defaultOCRValues?.type_of_birth ?? "",
            multipleBirthOrder: defaultOCRValues?.multiple_birth_order ?? "",
            birthOrder: defaultOCRValues?.birth_order ?? "",
            birthWeight: defaultOCRValues?.birth_weight ?? ""
        },

        // Page 2 - Mother Information
        page2: {
            maidenFirstName: "",
            maidenMiddleName: "",
            maidenLastName: "",
            citizenship: "",
            religion: "",
            childrenBornAlive: "",
            childrenStillLiving: "",
            childrenDeceased: "",
            occupation: "",
            ageAtBirth: "",
            residenceHouse: "", 
            residenceCity: "",
            residenceProvince: "",
            residenceCountry: ""
        },

        // Page 3 - Father Information
        page3: {
            fatherFirstName: "",
            fatherMiddleName: "",
            fatherLastName: "",
            fatherCitizenship: "",
            fatherReligion: "",
            fatherOccupation: "",
            fatherAgeAtBirth: "",
            fatherResidenceStreet: "",
            fatherResidenceCity: "",
            fatherResidenceProvince: "",
            fatherResidenceCountry: ""
        },

        // Page 4 - Marriage Information
        page4: {
            dateOfMarriage: "",
            marriageCity: "",
            marriageProvince: "",
            marriageCountry: ""
        },

        // Page 5 - Attendant Information
        page5: {
            attendantPhysician: false,
            attendantNurse: false,
            attendantMidwife: false,
            attendantHilot: false,
            attendantOthers: false,
            attendantOthersSpecify: "",
            dateOfAttendance: "",
            attendantNameTitle: ""
        },

        // Page 6 - Attendant Certification
        page6: {
            birthTime: "",
            birthDate: "",
            attendantName: "",
            attendantTitle: "",
            attendantAddress: "",
            attendantDateSigned: "",
            attendantSignature: ""
        },

        // Page 7 - Informant & Prepared By
        page7: {
            // informantSignature: "",
            informantName: "",
            informantRelationship: "",
            informantAddress: "",
            informantDate: "",
            // preparedBySignature: "",
            preparedName: "",
            preparedTitle: "",
            preparedDate: ""
        },

        // Page 8 - Civil Registrar Section
        page8: {
            // receivedSignature: "",
            receivedName: "",
            receivedTitle: "",
            receivedDate: "",
            registrarSignature: "",
            registrarName: "",
            registrarTitle: "",
            registrarDate: ""
        },

        // Page 9 - Remarks / Annotations
        page9: {
            remarks: "",
            officeBoxes: []
        },
        // Page 10 - Affidavit of Acknowledgment
        page10: {
            motherName: "",
            fatherName: "",
            childName: "",
            childBirthDate: "",
            childBirthPlace: "",
        },
        // Page 11 - Jurat
        page11: {
            juratDay: "",
            juratMonthYear: "",
            juratAffiant1: "",
            juratAffiant2: "",
            ctcNumber: "",
            ctcDateIssued: "",
            ctcPlaceIssued: "",
            adminName: "",
            adminPosition: "",
            adminAddress: "",
            adminSignature: "" // optional if you want a text input for digital signature
        },
        // --- Page 12: Affidavit ---
        page12: {
            affiantName: "",
            civilStatus: "",
            address: "",

            selfCheckbox: false, // "self" or "child"
            selfPob: "",
            selfDob: "",

            childCheckbox: false,
            childName: "",
            childPob: "",
            childDob: "",

            attendantName: "",
            attendantAddress: "",
            citizenship: "",

            parentsStatus: "", // "married" or "notMarried"
            marriageDate: "",
            marriagePlace: "",
            fatherName: "",

            reasonDelay: "",
            spouseApplicant: "",
            spouseOwner: "",
            affiantSignature: "",
        },
        // --- Page 13: Final Jurat / Affidavit ---
        page13: {
            finalJuratDay: "",
            finalJuratMonthYear: "",
            finalJuratPlace: "",
            finalCtcNumber: "",
            finalCtcIssuedOn: "",
            finalCtcIssuedAt: "",
            adminOfficerSignature: "",
            adminOfficerName: "",
            adminOfficerPosition: "",
            adminOfficerAddress: "",
        },

        page14: {
            confirmation: false
        }
    });

    //TODO: handle change inputs on pages
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
    const [errors, setErrors] = useState({});
    const handlePageChange = (direction) => {
        if (direction === 'next') {
            const response = BirthCertValidation.validateForm(formData[`page${currentPage}`], currentPage);
            if (Object.keys(response).length > 0) {
                setErrors(response);
                toast.error("Please fix the errors in the form.");
                console.log("[birth form] Validation Errors:", response);
                console.log(
                    `[birth form] form Data ${currentPage}:`, formData[`page${currentPage}`]
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
          formData.page14
        );
      
        console.log("Final Flat Birth Data:", flatData);
      
        BirthCertServices.insertBirthCertificate(flatData)
          .then((response) => {
            console.log("[Birth Form]", response);
            toast.success(response.message || "Birth certificate created successfully");
      
            // reset form state
            setFormData({
              page1: {
                creatorId: JSON.parse(localStorage.getItem('user'))?.id || null,
                creationType: BirthCertificate.CreationType.MANUAL,
                province: "",
                city: "",
                childFirstName: "",
                childMiddleName: "",
                childLastName: "",
                sex: "",
                dateOfBirth: "",
                typeOfBirth: "",
                multipleBirthOrder: "",
                birthOrder: "",
                birthWeight: ""
              },
              page2: {
                maidenFirstName: "",
                maidenMiddleName: "",
                maidenLastName: "",
                citizenship: "",
                religion: "",
                childrenBornAlive: "",
                childrenStillLiving: "",
                childrenDeceased: "",
                occupation: "",
                ageAtBirth: "",
                residenceHouse: "",
                residenceCity: "",
                residenceProvince: "",
                residenceCountry: ""
              },
              page3: {
                fatherFirstName: "",
                fatherMiddleName: "",
                fatherLastName: "",
                fatherCitizenship: "",
                fatherReligion: "",
                fatherOccupation: "",
                fatherAgeAtBirth: "",
                fatherResidenceStreet: "",
                fatherResidenceCity: "",
                fatherResidenceProvince: "",
                fatherResidenceCountry: ""
              },
              page4: {
                dateOfMarriage: "",
                marriageCity: "",
                marriageProvince: "",
                marriageCountry: ""
              },
              page5: {
                attendantPhysician: false,
                attendantNurse: false,
                attendantMidwife: false,
                attendantHilot: false,
                attendantOthers: false,
                attendantOthersSpecify: "",
                dateOfAttendance: "",
                attendantNameTitle: ""
              },
              page6: {
                birthTime: "",
                birthDate: "",
                attendantName: "",
                attendantTitle: "",
                attendantAddress: "",
                attendantDateSigned: "",
                attendantSignature: ""
              },
              page7: {
                informantName: "",
                informantRelationship: "",
                informantAddress: "",
                informantDate: "",
                preparedName: "",
                preparedTitle: "",
                preparedDate: ""
              },
              page8: {
                receivedName: "",
                receivedTitle: "",
                receivedDate: "",
                registrarSignature: "",
                registrarName: "",
                registrarTitle: "",
                registrarDate: ""
              },
              page9: {
                remarks: "",
                officeBoxes: []
              },
              page10: {
                motherName: "",
                fatherName: "",
                childName: "",
                childBirthDate: "",
                childBirthPlace: ""
              },
              page11: {
                juratDay: "",
                juratMonthYear: "",
                juratAffiant1: "",
                juratAffiant2: "",
                ctcNumber: "",
                ctcDateIssued: "",
                ctcPlaceIssued: "",
                adminName: "",
                adminPosition: "",
                adminAddress: "",
                adminSignature: ""
              },
              page12: {
                affiantName: "",
                civilStatus: "",
                address: "",
                selfCheckbox: false,
                selfPob: "",
                selfDob: "",
                childCheckbox: false,
                childName: "",
                childPob: "",
                childDob: "",
                attendantName: "",
                attendantAddress: "",
                citizenship: "",
                parentsStatus: "",
                marriageDate: "",
                marriagePlace: "",
                fatherName: "",
                reasonDelay: "",
                spouseApplicant: "",
                spouseOwner: "",
                affiantSignature: ""
              },
              page13: {
                finalJuratDay: "",
                finalJuratMonthYear: "",
                finalJuratPlace: "",
                finalCtcNumber: "",
                finalCtcIssuedOn: "",
                finalCtcIssuedAt: "",
                adminOfficerSignature: "",
                adminOfficerName: "",
                adminOfficerPosition: "",
                adminOfficerAddress: ""
              },
              page14: {
                confirmation: false
              }
            });
      
            setCurrentPage(1);
            setErrors({});
          })
          .catch((error) => {
            console.error("[Birth Form]:", error);
            toast.error(error.message || "Failed to create birth certificate");
          });
    };

    return (
        <>
            <form className="p-4 h-full mb-4" onSubmit={handleSubmit}>
                <div className='mb-4'>
                    {currentPage === 1 &&
                        <div className="mb-4 text-left space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            {/* Province & City / Municipality */}
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
                                    <label className="block text-sm font-medium mb-1">Registry No.</label>
                                    <input
                                        type="text"
                                        name="registryNumber"
                                        placeholder="City / Municipality"
                                        className={`common-input ${errors.registryNumber ? 'input-error' : ''}`}
                                        value={formData.page1.registryNumber}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.city && <ErrorMessages errors={errors.registryNumber} />}
                                </div>
                            </div>

                            {/* Child’s Name */}
                            <div>
                                <label className="block text-sm font-medium">1. Name</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div>
                                        <input
                                            type="text"
                                            name="childFirstName"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.childFirstName ? 'input-error' : ''}`}
                                            value={formData.page1.childFirstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.childFirstName && <ErrorMessages errors={errors.childFirstName} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="childMiddleName"
                                            placeholder="Middle (Optional)"
                                            className={`w-full common-input ${errors.childMiddleName ? 'input-error' : ''}`}
                                            value={formData.page1.childMiddleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.childMiddleName && <ErrorMessages errors={errors.childMiddleName} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="childLastName"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.childLastName ? 'input-error' : ''}`}
                                            value={formData.page1.childLastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.childLastName && <ErrorMessages errors={errors.childLastName} />}
                                    </div>
                                </div>
                            </div>

                            {/* Sex & Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-x-2">
                                <div>
                                    <label className="block text-sm font-medium">2. Sex</label>
                                    <select name="sex" className={`common-input w-full ${errors.sex ? 'input-error' : ''}`}
                                        value={formData.page1.sex}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    >
                                        <option value="">Select</option>
                                        <option value={capitalizeFirst(BirthCertificate.SexTypes.MALE)}>{capitalizeFirst(BirthCertificate.SexTypes.MALE)}</option>
                                        <option value={capitalizeFirst(BirthCertificate.SexTypes.FEMALE)}>{capitalizeFirst(BirthCertificate.SexTypes.FEMALE)}</option>
                                    </select>
                                    {errors.sex && <ErrorMessages errors={errors.sex} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">3. Date of Birth</label>
                                    <input type="date" name="dateOfBirth" data-value={formData.page1.dateOfBirth} className={`common-input w-full ${errors.dateOfBirth ? 'input-error' : ''}`}
                                        value={formData.page1.dateOfBirth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.dateOfBirth && <ErrorMessages errors={errors.dateOfBirth} />}
                                </div>
                            </div>

                            {/* Place of Birth */}
                            <div>
                                <label className="block text-sm font-medium">4. Place of Birth</label>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                                    <div className="">
                                        <input type="text" 
                                            name="placeOfBirthBarangay" 
                                            className={`w-full common-input ${errors.placeOfBirthBarangay ? 'input-error' : ''} `}
                                            value={formData.page1.placeOfBirthBarangay}
                                            placeholder='Name of Hospital / Clinic / Institution / House No., St, Barangay'
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.dateOfBirth && <ErrorMessages errors={errors.placeOfBirthBarangay} />}
                                    </div>
                                  
                                    <div className="">
                                        <input type="text" 
                                            name="placeOfBirthCity" 
                                            className={`w-full common-input ${errors.placeOfBirthCity ? 'input-error' : ''} `}
                                            value={formData.page1.placeOfBirthCity}
                                            placeholder='City / Municipality'
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.dateOfBirth && <ErrorMessages errors={errors.placeOfBirthCity} />}
                                    </div>

                                     <div className="">
                                        <input type="text" 
                                            name="placeOfBirthProvince" 
                                            className={`w-full common-input ${errors.placeOfBirthProvince ? 'input-error' : ''} `}
                                            value={formData.page1.placeOfBirthProvince}
                                            placeholder='Province'
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.dateOfBirth && <ErrorMessages errors={errors.placeOfBirthProvince} />}
                                    </div>
                                </div>
                            </div>

                            {/* Type of Birth & Multiple Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        5a. Type of Birth (Single, Twin, Triplet, etc)
                                    </label>
                                    <input
                                        type="text"
                                        name="typeOfBirth"
                                        placeholder="Type of Birth"
                                        className={`common-input ${errors.typeOfBirth ? 'input-error' : ''}`}
                                        value={formData.page1.typeOfBirth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.typeOfBirth && <ErrorMessages errors={errors.typeOfBirth} />}
                                </div>

                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        5b. If Multiple Birth, Child was (First, Second, Third, etc)
                                    </label>
                                    <input
                                        type="text"
                                        name="multipleBirthOrder"
                                        placeholder="Order"
                                        className={`common-input ${errors.multipleBirthOrder ? 'input-error' : ''}`}
                                        value={formData.page1.multipleBirthOrder}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.multipleBirthOrder && <ErrorMessages errors={errors.multipleBirthOrder} />}
                                </div>
                            </div>

                            {/* Birth Order & Weight at Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        5c. Birth Order (First, Second, Third, etc)
                                    </label>
                                    <input
                                        type="text"
                                        name="birthOrder"
                                        placeholder="Birth Order"
                                        className={`common-input ${errors.birthOrder ? 'input-error' : ''}`}
                                        value={formData.page1.birthOrder}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.birthOrder && <ErrorMessages errors={errors.birthOrder} />}
                                </div>

                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">6. Weight at Birth</label>
                                    <input
                                        type="number"
                                        name="birthWeight"
                                        placeholder="Weight in grams (g)"
                                        className={`common-input ${errors.birthWeight ? 'input-error' : ''}`}
                                        value={formData.page1.birthWeight}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.birthWeight && <ErrorMessages errors={errors.birthWeight} />}
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
                                    <div>
                                        <input
                                            type="text"
                                            name="maidenFirstName"
                                            placeholder="First Name"
                                            className={`w-full common-input ${errors.maidenFirstName ? 'input-error' : ''}`}
                                            value={formData.page2.maidenFirstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.maidenFirstName && <ErrorMessages errors={errors.maidenFirstName} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="maidenMiddleName"
                                            placeholder="Middle Name"
                                            className={`w-full common-input ${errors.maidenMiddleName ? 'input-error' : ''}`}
                                            value={formData.page2.maidenMiddleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.maidenMiddleName && <ErrorMessages errors={errors.maidenMiddleName} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="maidenLastName"
                                            placeholder="Last Name"
                                            className={`w-full common-input ${errors.maidenLastName ? 'input-error' : ''}`}
                                            value={formData.page2.maidenLastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.maidenLastName && <ErrorMessages errors={errors.maidenLastName} />}
                                    </div>
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
                                        className={`common-input w-full ${errors.citizenship ? 'input-error' : ''}`}
                                        value={formData.page2.citizenship}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.citizenship && <ErrorMessages errors={errors.citizenship} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                                    <input
                                        type="text"
                                        name="religion"
                                        placeholder="Religion / Religious Sect"
                                        className={`common-input w-full ${errors.religion ? 'input-error' : ''}`}
                                        value={formData.page2.religion}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.religion && <ErrorMessages errors={errors.religion} />}
                                </div>
                            </div>

                            {/* Children Statistics */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium">Total number of Children Born Alive</label>
                                <input
                                    type="number"
                                    name="childrenBornAlive"
                                    placeholder="Total Children Born Alive"
                                    className={`common-input w-full ${errors.childrenBornAlive ? 'input-error' : ''}`}
                                    value={formData.page2.childrenBornAlive}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.childrenBornAlive && <ErrorMessages errors={errors.childrenBornAlive} />}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">
                                            No. of Children Still Living (including this birth)
                                        </label>
                                        <input
                                            type="number"
                                            name="childrenStillLiving"
                                            placeholder="Children Still Living"
                                            className={`common-input w-full ${errors.childrenStillLiving ? 'input-error' : ''}`}
                                            value={formData.page2.childrenStillLiving}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.childrenStillLiving && <ErrorMessages errors={errors.childrenStillLiving} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            No. of Children Born Alive but are now Dead
                                        </label>
                                        <input
                                            type="number"
                                            name="childrenDeceased"
                                            placeholder="Children Deceased"
                                            className={`common-input w-full ${errors.childrenDeceased ? 'input-error' : ''}`}
                                            value={formData.page2.childrenDeceased}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.childrenDeceased && <ErrorMessages errors={errors.childrenDeceased} />}
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
                                        className={`common-input ${errors.occupation ? 'input-error' : ''}`}
                                        value={formData.page2.occupation}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.occupation && <ErrorMessages errors={errors.occupation} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">Age at the time of this birth</label>
                                    <input
                                        type="number"
                                        name="ageAtBirth"
                                        placeholder="Age"
                                        className={`common-input ${errors.ageAtBirth ? 'input-error' : ''}`}
                                        value={formData.page2.ageAtBirth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ageAtBirth && <ErrorMessages errors={errors.ageAtBirth} />}
                                </div>
                            </div>

                            {/* Residence */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Residence</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="residenceHouse"
                                            placeholder="House No., Street, Barangay"
                                            className={`common-input w-full ${errors.residenceHouse ? 'input-error' : ''}`}
                                            value={formData.page2.residenceHouse}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceHouse && <ErrorMessages errors={errors.residenceHouse} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="residenceCity"
                                            placeholder="City / Municipality"
                                            className={`common-input w-full ${errors.residenceCity ? 'input-error' : ''}`}
                                            value={formData.page2.residenceCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceCity && <ErrorMessages errors={errors.residenceCity} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="residenceProvince"
                                            placeholder="Province"
                                            className={`common-input w-full ${errors.residenceProvince ? 'input-error' : ''}`}
                                            value={formData.page2.residenceProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceProvince && <ErrorMessages errors={errors.residenceProvince} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="residenceCountry"
                                            placeholder="Country"
                                            className={`common-input w-full ${errors.residenceCountry ? 'input-error' : ''}`}
                                            value={formData.page2.residenceCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.residenceCountry && <ErrorMessages errors={errors.residenceCountry} />}
                                    </div>
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
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherFirstName"
                                            placeholder="First Name"
                                            className={`common-input w-full ${errors.fatherFirstName ? 'input-error' : ''}`}
                                            value={formData.page3.fatherFirstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherFirstName && <ErrorMessages errors={errors.fatherFirstName} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherMiddleName"
                                            placeholder="Middle Name"
                                            className={`common-input w-full ${errors.fatherMiddleName ? 'input-error' : ''}`}
                                            value={formData.page3.fatherMiddleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherMiddleName && <ErrorMessages errors={errors.fatherMiddleName} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherLastName"
                                            placeholder="Last Name"
                                            className={`common-input w-full ${errors.fatherLastName ? 'input-error' : ''}`}
                                            value={formData.page3.fatherLastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherLastName && <ErrorMessages errors={errors.fatherLastName} />}
                                    </div>
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
                                        className={`common-input w-full ${errors.fatherCitizenship ? 'input-error' : ''}`}
                                        value={formData.page3.fatherCitizenship}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.fatherCitizenship && <ErrorMessages errors={errors.fatherCitizenship} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                                    <input
                                        type="text"
                                        name="fatherReligion"
                                        placeholder="Religion"
                                        className={`common-input w-full ${errors.fatherReligion ? 'input-error' : ''}`}
                                        value={formData.page3.fatherReligion}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.fatherReligion && <ErrorMessages errors={errors.fatherReligion} />}
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
                                        className={`common-input w-full ${errors.fatherOccupation ? 'input-error' : ''}`}
                                        value={formData.page3.fatherOccupation}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.fatherOccupation && <ErrorMessages errors={errors.fatherOccupation} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">Age at the time of this birth</label>
                                    <input
                                        type="number"
                                        name="fatherAgeAtBirth"
                                        placeholder="Age"
                                        className={`common-input w-full ${errors.fatherAgeAtBirth ? 'input-error' : ''}`}
                                        value={formData.page3.fatherAgeAtBirth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.fatherAgeAtBirth && <ErrorMessages errors={errors.fatherAgeAtBirth} />}
                                </div>
                            </div>

                            {/* Residence */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Residence</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherResidenceStreet"
                                            placeholder="House No., St., Barangay"
                                            className={`common-input w-full ${errors.fatherResidenceStreet ? 'input-error' : ''}`}
                                            value={formData.page3.fatherResidenceStreet}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherResidenceStreet && <ErrorMessages errors={errors.fatherResidenceStreet} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherResidenceCity"
                                            placeholder="City / Municipality"
                                            className={`common-input w-full ${errors.fatherResidenceCity ? 'input-error' : ''}`}
                                            value={formData.page3.fatherResidenceCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherResidenceCity && <ErrorMessages errors={errors.fatherResidenceCity} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherResidenceProvince"
                                            placeholder="Province"
                                            className={`common-input w-full ${errors.fatherResidenceProvince ? 'input-error' : ''}`}
                                            value={formData.page3.fatherResidenceProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherResidenceProvince && <ErrorMessages errors={errors.fatherResidenceProvince} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="fatherResidenceCountry"
                                            placeholder="Country"
                                            className={`common-input w-full ${errors.fatherResidenceCountry ? 'input-error' : ''}`}
                                            value={formData.page3.fatherResidenceCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.fatherResidenceCountry && <ErrorMessages errors={errors.fatherResidenceCountry} />}
                                    </div>
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
                                    className={`common-input w-full ${errors.dateOfMarriage ? 'input-error' : ''}`}
                                    value={formData.page4.dateOfMarriage}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.dateOfMarriage && <ErrorMessages errors={errors.dateOfMarriage} />}
                            </div>

                            {/* Place of Marriage */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Place of Marriage</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="marriageCity"
                                            placeholder="City / Municipality"
                                            className={`common-input w-full ${errors.marriageCity ? 'input-error' : ''}`}
                                            value={formData.page4.marriageCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.marriageCity && <ErrorMessages errors={errors.marriageCity} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="marriageProvince"
                                            placeholder="Province"
                                            className={`common-input w-full ${errors.marriageProvince ? 'input-error' : ''}`}
                                            value={formData.page4.marriageProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.marriageProvince && <ErrorMessages errors={errors.marriageProvince} />}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="marriageCountry"
                                            placeholder="Country"
                                            className={`common-input w-full ${errors.marriageCountry ? 'input-error' : ''}`}
                                            value={formData.page4.marriageCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.marriageCountry && <ErrorMessages errors={errors.marriageCountry} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 5 &&
                        <div className="mb-6 text-left space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>

                            {/* Type of Attendant */}
                            <div className={`p-2 ${errors.attendantGroup ? 'input-error' : ''}`}>
                                <label className="block w-full text-sm font-medium mb-1">Type of Attendant</label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantPhysician"
                                            checked={formData.page5.attendantPhysician}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Physician</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantNurse"
                                            checked={formData.page5.attendantNurse}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Nurse</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantMidwife"
                                            checked={formData.page5.attendantMidwife}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Midwife</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantHilot"
                                            checked={formData.page5.attendantHilot}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Hilot</span>
                                    </label>
                                </div>

                                {/* Others */}
                                <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-3">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className='custom-checkbox' name="attendantOthers"
                                            checked={formData.page5.attendantOthers}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                        <span>Others (Specify)</span>
                                    </label>
                                    <div className='mt-2 md:mt-0 w-full'>
                                        <input
                                            type="text"
                                            name="attendantOthersSpecify"
                                            placeholder="Specify"
                                            className={`common-input w-full ${errors.attendantOthersSpecify ? 'input-error' : ''}`}
                                            value={formData.page5.attendantOthersSpecify}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            disabled={!formData.page5.attendantOthers}
                                        />
                                        {errors.attendantOthersSpecify && <ErrorMessages errors={errors.attendantOthersSpecify} />}
                                    </div>
                                </div>
                                {errors.attendantGroup && <ErrorMessages errors={errors.attendantGroup} />}
                            </div>

                            {/* Date of Attendance */}
                            <div>
                                <label className="block w-full text-sm font-medium mb-1">Date of Attendance</label>
                                <input
                                    type="date"
                                    name="dateOfAttendance"
                                    className={`common-input w-full ${errors.dateOfAttendance ? 'input-error' : ''}`}
                                    value={formData.page5.dateOfAttendance}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.dateOfAttendance && <ErrorMessages errors={errors.dateOfAttendance} />}
                            </div>

                            {/* Name and Title of Attendant */}
                            <div>
                                <label className="block w-full text-sm font-medium mb-1">Name and Title of Attendant</label>
                                <input
                                    type="text"
                                    name="attendantNameTitle"
                                    placeholder="Enter name and title"
                                    className={`common-input w-full ${errors.attendantNameTitle ? 'input-error' : ''}`}
                                    value={formData.page5.attendantNameTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.attendantNameTitle && <ErrorMessages errors={errors.attendantNameTitle} />}
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
                                        className={`common-input w-full ${errors.birthTime ? 'input-error' : ''}`}
                                        value={formData.page6.birthTime}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.birthTime && <ErrorMessages errors={errors.birthTime} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        className={`common-input w-full ${errors.birthDate ? 'input-error' : ''}`}
                                        value={formData.page6.birthDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.birthDate && <ErrorMessages errors={errors.birthDate} />}
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
                                        className={`common-input w-full ${errors.attendantName ? 'input-error' : ''}`}
                                        value={formData.page6.attendantName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.attendantName && <ErrorMessages errors={errors.attendantName} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title or Position</label>
                                    <input
                                        type="text"
                                        name="attendantTitle"
                                        placeholder="Physician / Nurse / Midwife"
                                        className={`common-input w-full ${errors.attendantTitle ? 'input-error' : ''}`}
                                        value={formData.page6.attendantTitle}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.attendantTitle && <ErrorMessages errors={errors.attendantTitle} />}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="attendantAddress"
                                    placeholder="House No., Street, Barangay, City/Municipality, Province"
                                    className={`common-input w-full ${errors.attendantAddress ? 'input-error' : ''}`}
                                    value={formData.page6.attendantAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.attendantAddress && <ErrorMessages errors={errors.attendantAddress} />}
                            </div>

                            {/* Signature and Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Signed</label>
                                    <input
                                        type="date"
                                        name="attendantDateSigned"
                                        className={`common-input w-full ${errors.attendantDateSigned ? 'input-error' : ''}`}
                                        value={formData.page6.attendantDateSigned}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <input
                                        type="text"
                                        name="attendantSignature"
                                        placeholder="Signature"
                                        className={`common-input w-full ${errors.attendantSignature ? 'input-error' : ''}`}
                                        value={formData.page6.attendantSignature}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
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
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="informantName" placeholder="Full Name"
                                            className={`common-input w-full ${errors.informantName ? 'input-error' : ''}`}
                                            value={formData.page7.informantName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.informantName && <ErrorMessages errors={errors.informantName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Relationship to the Child</label>
                                        <input type="text" name="informantRelationship" placeholder="Relationship"
                                            className={`common-input w-full ${errors.informantRelationship ? 'input-error' : ''}`}
                                            value={formData.page7.informantRelationship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.informantRelationship && <ErrorMessages errors={errors.informantRelationship} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input type="text" name="informantAddress" placeholder="Full Address"
                                            className={`common-input w-full ${errors.informantAddress ? 'input-error' : ''}`}
                                            value={formData.page7.informantAddress}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.informantAddress && <ErrorMessages errors={errors.informantAddress} />}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input type="date" name="informantDate"
                                        className={`common-input w-full ${errors.informantDate ? 'input-error' : ''}`}
                                        value={formData.page7.informantDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
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
                                            className={`common-input w-full ${errors.preparedName ? 'input-error' : ''}`}
                                            value={formData.page7.preparedName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.preparedName && <ErrorMessages errors={errors.preparedName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="preparedTitle" placeholder="Title or Position"
                                            className={`common-input w-full ${errors.preparedTitle ? 'input-error' : ''}`}
                                            value={formData.page7.preparedTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.preparedTitle && <ErrorMessages errors={errors.preparedTitle} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="preparedDate"
                                            className={`common-input w-full ${errors.preparedDate ? 'input-error' : ''}`}
                                            value={formData.page7.preparedDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.preparedDate && <ErrorMessages errors={errors.preparedDate} />}
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
                                        <SignaturePlaceholder />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name in Print</label>
                                        <input type="text" name="receivedName" placeholder="Full Name"
                                            className={`common-input w-full ${errors.receivedName ? 'input-error' : ''}`}
                                            value={formData.page8.receivedName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.receivedName && <ErrorMessages errors={errors.receivedName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="receivedTitle" placeholder="Title or Position"
                                            className={`common-input w-full ${errors.receivedTitle ? 'input-error' : ''}`}
                                            value={formData.page8.receivedTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.receivedTitle && <ErrorMessages errors={errors.receivedTitle} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="receivedDate"
                                            className={`common-input w-full ${errors.receivedDate ? 'input-error' : ''}`}
                                            value={formData.page8.receivedDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.receivedDate && <ErrorMessages errors={errors.receivedDate} />}
                                    </div>
                                </div>
                            </div>
                            {/* Registered by the Civil Registrar */}
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
                                            className={`common-input w-full ${errors.registrarName ? 'input-error' : ''}`}
                                            value={formData.page8.registrarName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.registrarName && <ErrorMessages errors={errors.registrarName} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title or Position</label>
                                        <input type="text" name="registrarTitle" placeholder="Title or Position"
                                            className={`common-input w-full ${errors.registrarTitle ? 'input-error' : ''}`}
                                            value={formData.page8.registrarTitle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.registrarTitle && <ErrorMessages errors={errors.registrarTitle} />}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input type="date" name="registrarDate"
                                            className={`common-input w-full ${errors.registrarDate ? 'input-error' : ''}`}
                                            value={formData.page8.registrarDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.registrarDate && <ErrorMessages errors={errors.registrarDate} />}
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
                                    className={`common-textarea w-full h-32 resize-none ${errors.remarks ? 'input-error' : ''}`}
                                    value={formData.page9.remarks}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.remarks && <ErrorMessages errors={errors.remarks} />}
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
                            <p className="text-sm italic w-full">
                                I/We, {formData.page10.motherName
                                    ? <u className="font-semibold"> {formData.page10.motherName} </u>
                                    : " __________________ "}
                                and {formData.page10.fatherName
                                    ? <u className="font-semibold"> {formData.page10.fatherName} </u>
                                    : " __________________ "}
                                of legal age, am/are the natural mother and/or father of {formData.page10.childName
                                    ? <u className="font-semibold"> {formData.page10.childName} </u>
                                    : " __________________ "} born on {formData.page10.childBirthDate
                                        ? <u className="font-semibold"> {formData.page10.childBirthDate} </u>
                                        : " __________________ "} at {formData.page10.childBirthPlace
                                            ? <u className="font-semibold"> {formData.page10.childBirthPlace} </u>
                                            : " __________________ "} .
                            </p>


                            {/* Parent Names */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Mother&apos;s Full Name</label>
                                <input
                                    type="text"
                                    name="motherName"
                                    placeholder="Enter mother's full name"
                                    className={`common-input w-full ${errors.motherName ? 'input-error' : ''}`}
                                    value={formData.page10.motherName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.motherName && <ErrorMessages errors={errors.motherName} />}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Father&apos;s Full Name</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    placeholder="Enter father's full name"
                                    className={`common-input w-full ${errors.fatherName ? 'input-error' : ''}`}
                                    value={formData.page10.fatherName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.fatherName && <ErrorMessages errors={errors.fatherName} />}
                            </div>

                            {/* Child Info */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Child&apos;s Full Name</label>
                                <input
                                    type="text"
                                    name="childName"
                                    placeholder="Enter child's full name"
                                    className={`common-input w-full ${errors.childName ? 'input-error' : ''}`}
                                    value={formData.page10.childName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.childName && <ErrorMessages errors={errors.childName} />}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="childBirthDate"
                                        className={`common-input w-full ${errors.childBirthDate ? 'input-error' : ''}`}
                                        value={formData.page10.childBirthDate}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place of Birth</label>
                                    <input
                                        type="text"
                                        name="childBirthPlace"
                                        placeholder="City / Municipality, Province"
                                        className={`common-input w-full ${errors.childBirthPlace ? 'input-error' : ''}`}
                                        value={formData.page10.childBirthPlace}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.childBirthPlace && <ErrorMessages errors={errors.childBirthPlace} />}
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
                                    <label className="block text-sm font-medium mb-2">{AllCaps(formData.page10.motherName)}</label>
                                    <div className="border-t border-gray-400 pt-2 text-gray-600">
                                        Signature over printed name
                                    </div>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium mb-2">{AllCaps(formData.page10.fatherName)}</label>
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
                                        className={`common-input w-full ${errors.juratDay ? 'input-error' : ''}`}
                                        value={formData.page11.juratDay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratDay && <ErrorMessages errors={errors.juratDay} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month & Year</label>
                                    <input
                                        type="text"
                                        name="juratMonthYear"
                                        placeholder="e.g. August 2025"
                                        className={`common-input w-full ${errors.juratMonthYear ? 'input-error' : ''}`}
                                        value={formData.page11.juratMonthYear}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratMonthYear && <ErrorMessages errors={errors.juratMonthYear} />}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Affiant 1 (Name)</label>
                                    <input
                                        type="text"
                                        name="juratAffiant1"
                                        placeholder="First Affiant's Full Name"
                                        className={`common-input w-full ${errors.juratAffiant1 ? 'input-error' : ''}`}
                                        value={formData.page11.juratAffiant1}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratAffiant1 && <ErrorMessages errors={errors.juratAffiant1} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Affiant 2 (Name)</label>
                                    <input
                                        type="text"
                                        name="juratAffiant2"
                                        placeholder="Second Affiant's Full Name"
                                        className={`common-input w-full ${errors.juratAffiant2 ? 'input-error' : ''}`}
                                        value={formData.page11.juratAffiant2}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.juratAffiant2 && <ErrorMessages errors={errors.juratAffiant2} />}
                                </div>
                            </div>

                            {/* Community Tax Certificate Info */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Community Tax Certificate No.</label>
                                <input
                                    type="text"
                                    name="ctcNumber"
                                    placeholder="Enter CTC No."
                                    className={`common-input w-full ${errors.ctcNumber ? 'input-error' : ''}`}
                                    value={formData.page11.ctcNumber}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.ctcNumber && <ErrorMessages errors={errors.ctcNumber} />}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Issued</label>
                                    <input
                                        type="date"
                                        name="ctcDateIssued"
                                        className={`common-input w-full ${errors.ctcDateIssued ? 'input-error' : ''}`}
                                        value={formData.page11.ctcDateIssued}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ctcDateIssued && <ErrorMessages errors={errors.ctcDateIssued} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place Issued</label>
                                    <input
                                        type="text"
                                        name="ctcPlaceIssued"
                                        placeholder="City / Municipality, Province"
                                        className={`common-input w-full ${errors.ctcPlaceIssued ? 'input-error' : ''}`}
                                        value={formData.page11.ctcPlaceIssued}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.ctcPlaceIssued && <ErrorMessages errors={errors.ctcPlaceIssued} />}
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
                                        className={`common-input w-full ${errors.adminName ? 'input-error' : ''}`}
                                        value={formData.page11.adminName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminName && <ErrorMessages errors={errors.adminName} />}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                                    <input
                                        type="text"
                                        name="adminPosition"
                                        placeholder="Enter position/title"
                                        className={`common-input w-full ${errors.adminPosition ? 'input-error' : ''}`}
                                        value={formData.page11.adminPosition}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminPosition && <ErrorMessages errors={errors.adminPosition} />}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="adminAddress"
                                        placeholder="Enter office address"
                                        className={`common-input w-full ${errors.adminAddress ? 'input-error' : ''}`}
                                        value={formData.page11.adminAddress}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminAddress && <ErrorMessages errors={errors.adminAddress} />}
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

                            <p className='text-sm italic'>
                                I _____________________________ , of legal age, single / married / divorced / widow / widower, with residence and postal address at ______________________________________________________ after having been duly sworn in accordance with law, do hereby depose and say:
                            </p>

                            {/* Affiant Information */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                                <input
                                    type="text"
                                    name="affiantName"
                                    className={`common-input w-full ${errors.affiantName ? 'input-error' : ''}`}
                                    value={formData.page12.affiantName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.affiantName && <ErrorMessages errors={errors.affiantName} />}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Civil Status</label>
                                    <select name="civilStatus"
                                        className={`common-input w-full ${errors.civilStatus ? 'input-error' : ''}`}
                                        value={formData.page12.civilStatus}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    >
                                        <option value="">Select</option>
                                        <option value={capitalizeFirst(CivilStatus.SINGLE)}>{capitalizeFirst(CivilStatus.SINGLE)}</option>
                                        <option value={capitalizeFirst(CivilStatus.MARRIED)}>{capitalizeFirst(CivilStatus.MARRIED)}</option>
                                        <option value={capitalizeFirst(CivilStatus.DIVORCED)}>{capitalizeFirst(CivilStatus.DIVORCED)}</option>
                                        <option value={capitalizeFirst(CivilStatus.WIDOW)}>{capitalizeFirst(CivilStatus.WIDOW)}</option>
                                    </select>
                                    {errors.civilStatus && <ErrorMessages errors={errors.civilStatus} />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Residence / Postal Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={`common-input w-full ${errors.address ? 'input-error' : ''}`}
                                        value={formData.page12.address}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.address && <ErrorMessages errors={errors.address} />}
                                </div>
                            </div>

                            {/* Statement 1 - Applicant */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    1. That I am the applicant for the delayed registration of:
                                </p>

                                <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox mb-2 sm:mb-0"
                                            name="selfCheckbox"
                                            checked={formData.page12.selfCheckbox}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                    </div>

                                    <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="whitespace-nowrap">My birth in</span>
                                            <div className="flex flex-col flex-1">
                                                <input
                                                    type="text"
                                                    name="selfPob"
                                                    className={`common-input w-full sm:flex-1 ${errors.selfPob ? 'input-error' : ''}`}
                                                    disabled={!formData.page12.selfCheckbox}
                                                    value={formData.page12.selfPob}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                                {errors.selfPob && (<ErrorMessages errors={errors.selfPob} />)}
                                            </div>
                                        </div>


                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="whitespace-nowrap">on</span>
                                            <div className="flex flex-col flex-1">
                                                <input
                                                    type="date"
                                                    name="selfDob"
                                                    className={`common-input w-full sm:flex-1 ${errors.selfDob ? 'input-error' : ''}`}
                                                    disabled={!formData.page12.selfCheckbox}
                                                    value={formData.page12.selfDob}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                                {errors.selfDob && <ErrorMessages errors={errors.selfDob} />}
                                            </div>
                                        </div>
                                    </span>
                                </label>

                                <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox mb-2 sm:mb-0"
                                            name="childCheckbox"
                                            checked={formData.page12.childCheckbox}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                    </div>

                                    <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="whitespace-nowrap">The birth of</span>
                                            <div className="flex flex-col flex-1">
                                                <input
                                                    type="text"
                                                    name="childName"
                                                    className={`common-input w-full sm:flex-1 ${errors.childName ? 'input-error' : ''}`}
                                                    disabled={!formData.page12.childCheckbox}
                                                    value={formData.page12.childName}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                                {errors.childName && <ErrorMessages errors={errors.childName} />}
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="whitespace-nowrap">who was born in</span>
                                            <div className="flex flex-col flex-1">
                                                <input
                                                    type="text"
                                                    name="childPob"
                                                    className={`common-input w-full sm:flex-1 ${errors.childPob ? 'input-error' : ''}`}
                                                    disabled={!formData.page12.childCheckbox}
                                                    value={formData.page12.childPob}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                                {errors.childPob && <ErrorMessages errors={errors.childPob} />}
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="whitespace-nowrap">on</span>
                                            <div className="flex flex-col flex-1">
                                                <input
                                                    type="date"
                                                    name="childDob"
                                                    className={`common-input w-full sm:flex-1 ${errors.childDob ? 'input-error' : ''}`}
                                                    disabled={!formData.page12.childCheckbox}
                                                    value={formData.page12.childDob}
                                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                />
                                                {errors.childDob && <ErrorMessages errors={errors.childDob} />}
                                            </div>
                                        </div>
                                    </span>
                                </label>
                            </div>

                            {/* Statement 2 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    2. That I/he/she was attended at birth by:
                                </p>
                                <div>
                                    <input
                                        type="text"
                                        name="attendantName"
                                        placeholder="Name of Attendant"
                                        className={`common-input w-full ${errors.attendantName ? 'input-error' : ''}`}
                                        value={formData.page12.attendantName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.attendantName && <ErrorMessages errors={errors.attendantName} />}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="attendantAddress"
                                        placeholder="Address of Attendant"
                                        className={`common-input w-full mt-2 ${errors.attendantAddress ? 'input-error' : ''}`}
                                        value={formData.page12.attendantAddress}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.attendantAddress && <ErrorMessages errors={errors.attendantAddress} />}
                                </div>
                            </div>

                            {/* Statement 3 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    3. That I am/he/she is a citizen of:
                                </p>
                                <div>
                                    <input
                                        type="text"
                                        name="citizenship"
                                        className={`common-input w-full ${errors.citizenship ? 'input-error' : ''}`}
                                        value={formData.page12.citizenship}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.citizenship && <ErrorMessages errors={errors.citizenship} />}
                                </div>
                            </div>

                            {/* Statement 4 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    4. That my/his/her parents were:
                                </p>

                                {/* Married option */}
                                <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox"
                                            name="parentsStatus"
                                            value={MarriageStatus.MARRIED}
                                            checked={formData.page12.parentsStatus == MarriageStatus.MARRIED}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                    </div>

                                    <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                        <span className="whitespace-nowrap">Married on</span>

                                        <div className="flex flex-col flex-1">
                                            <input
                                                type="date"
                                                name="marriageDate"
                                                className={`common-input w-full sm:flex-1 ${errors.marriageDate ? 'input-error' : ''}`}
                                                disabled={formData.page12.parentsStatus != MarriageStatus.MARRIED}
                                                value={formData.page12.marriageDate}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.marriageDate && <ErrorMessages errors={errors.marriageDate} />}
                                        </div>

                                        <span className="whitespace-nowrap">at</span>
                                        <div className="flex flex-col flex-1">
                                            <input
                                                type="text"
                                                name="marriagePlace"
                                                className={`common-input w-full sm:flex-1 ${errors.marriagePlace ? 'input-error' : ''}`}
                                                disabled={formData.page12.parentsStatus != MarriageStatus.MARRIED}
                                                value={formData.page12.marriagePlace}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.marriagePlace && <ErrorMessages errors={errors.marriagePlace} />}
                                        </div>
                                    </span>
                                </label>

                                {/* Not Married option */}
                                <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox"
                                            name="parentsStatus"
                                            value={MarriageStatus.NOT_MARRIED}
                                            checked={formData.page12.parentsStatus == MarriageStatus.NOT_MARRIED}
                                            onChange={(e) => handleCheckboxChange(e, `page${currentPage}`)}
                                        />
                                    </div>

                                    <span className="flex-1 flex flex-col gap-2">
                                        <span className="whitespace-wrap">
                                            Not married but acknowledged/not acknowledged by father whose name is
                                        </span>

                                        <div className="flex flex-col flex-1">
                                            <input
                                                type="text"
                                                name="fatherName"
                                                className={`common-input w-full ${errors.fatherName ? 'input-error' : ''}`}
                                                disabled={formData.page12.parentsStatus != MarriageStatus.NOT_MARRIED}
                                                value={formData.page12.fatherName}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.fatherName && <ErrorMessages errors={errors.fatherName} />}
                                        </div>
                                    </span>
                                </label>
                            </div>

                            {/* Statement 5 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    5. That the reason for the delay in registering my/his/her birth was:
                                </p>
                                <textarea
                                    name="reasonDelay"
                                    className={`common-textarea w-full h-24 resize-none ${errors.reasonDelay ? 'input-error' : ''}`}
                                    value={formData.page12.reasonDelay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.reasonDelay && <ErrorMessages errors={errors.reasonDelay} />}
                            </div>

                            {/* Statement 6 */}
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    6. (For the applicant only) That I am married to:
                                </p>
                                <div>
                                    <input
                                        type="text"
                                        name="spouseApplicant"
                                        placeholder="Spouse of Applicant"
                                        className={`common-input w-full ${errors.spouseApplicant ? 'input-error' : ''}`}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.spouseApplicant && <ErrorMessages errors={errors.spouseApplicant} />}
                                </div>
                                <p className="text-sm font-medium mt-4">
                                    (If the applicant is other than the document owner) That I am married to:
                                </p>
                                <div>
                                    <input
                                        type="text"
                                        name="spouseOwner"
                                        placeholder="Spouse of Document Owner"
                                        className={`common-input w-full ${errors.spouseOwner ? 'input-error' : ''}`}
                                        value={formData.page12.spouseOwner}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.spouseOwner && <ErrorMessages errors={errors.spouseOwner} />}
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 13 &&
                        <div className="mb-6 text-left space-y-6">
                            <h2 className="text-lg text-center font-semibold">{pageTitles[(currentPage) - 1]}</h2>
                            <div className=''>
                                {/* Statement 7 */}
                                <div>
                                    <p className="text-sm font-medium mb-1">
                                        7. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                                    </p>
                                </div>

                                {/* Jurat Section */}
                                <div className="pt-6">
                                    <p className="text-sm italic">
                                        In truth whereof, I have affixed my signature below this ____ day of _____________ at __________________, Philippines.
                                    </p>
                                </div>
                            </div>
                            {/* Date & Place */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1"> Day of</label>
                                    <input
                                        type="number"
                                        name="finalJuratDay"
                                        placeholder="Day"
                                        className={`common-input ${errors.finalJuratDay ? 'input-error' : ''}`}
                                        value={formData.page13.finalJuratDay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.finalJuratDay && <ErrorMessages errors={errors.finalJuratDay} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1"> Month / Year</label>
                                    <input
                                        type="date"
                                        name="finalJuratMonthYear"
                                        placeholder="Month / Year"
                                        className={`common-input ${errors.finalJuratMonthYear ? 'input-error' : ''}`}
                                        value={formData.page13.finalJuratMonthYear}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.finalJuratMonthYear && <ErrorMessages errors={errors.finalJuratMonthYear} />}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">
                                    Place (City / Municipality, Province)
                                </label>
                                <input
                                    type="text"
                                    name="finalJuratPlace"
                                    placeholder="e.g., Cebu City, Cebu"
                                    className={`common-input ${errors.finalJuratPlace ? 'input-error' : ''}`}
                                    value={formData.page13.finalJuratPlace}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.finalJuratPlace && <ErrorMessages errors={errors.finalJuratPlace} />}
                            </div>

                            {/* Community Tax Certificate */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        CTC Number
                                    </label>
                                    <input
                                        type="text"
                                        name="finalCtcNumber"
                                        placeholder="Community Tax Cert. No."
                                        className={`common-input ${errors.finalCtcNumber ? 'input-error' : ''}`}
                                        value={formData.page13.finalCtcNumber}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.finalCtcNumber && <ErrorMessages errors={errors.finalCtcNumber} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Issued On
                                    </label>
                                    <input
                                        type="date"
                                        name="finalCtcIssuedOn"
                                        placeholder="Date Issued"
                                        className={`common-input ${errors.finalCtcIssuedOn ? 'input-error' : ''}`}
                                        value={formData.page13.finalCtcIssuedOn}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.finalCtcIssuedOn && <ErrorMessages errors={errors.finalCtcIssuedOn} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Issued At
                                    </label>
                                    <input
                                        type="text"
                                        name="finalCtcIssuedAt"
                                        placeholder="Place Issued"
                                        className={`common-input ${errors.finalCtcIssuedAt ? 'input-error' : ''}`}
                                        value={formData.page13.finalCtcIssuedAt}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.finalCtcIssuedAt && <ErrorMessages errors={errors.finalCtcIssuedAt} />}
                                </div>
                            </div>

                            {/* Administering Officer */}
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Signature of the Administering Officer
                                    </label>
                                    <SignaturePlaceholder />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Name in Print
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerName"
                                        placeholder="Full Name"
                                        className={`common-input ${errors.adminOfficerName ? 'input-error' : ''}`}
                                        value={formData.page13.adminOfficerName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminOfficerName && <ErrorMessages errors={errors.adminOfficerName} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Position / Title / Designation
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerPosition"
                                        placeholder="Position / Title / Designation"
                                        className={`common-input ${errors.adminOfficerPosition ? 'input-error' : ''}`}
                                        value={formData.page13.adminOfficerPosition}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminOfficerPosition && <ErrorMessages errors={errors.adminOfficerPosition} />}
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="adminOfficerAddress"
                                        placeholder="Office Address"
                                        className={`common-input ${errors.adminOfficerAddress ? 'input-error' : ''}`}
                                        value={formData.page13.adminOfficerAddress}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    {errors.adminOfficerAddress && <ErrorMessages errors={errors.adminOfficerAddress} />}
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage == 14 &&
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
                <Divider text={pageTitles[(currentPage) - 1]} />
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