import React from 'react';
import SignaturePad from 'react-signature-canvas';
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { ErrorMessages, Divider, SignaturePlaceholder } from '@components';
import { MarriageCertValidation, MarriageCertServices } from '@services';
import { MarriageCertificate } from '@enums';
import { capitalizeFirst } from '../../../myTools/myTools';

export default function MarriageCertificateCreateForm() {
    // Handles the Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 11;
    const pageTitles = [
        "Marriage Details (Husband & Wife Information)",
        "Part II: Background Information (Husband & Wife)",
        "Part III: Background Information (Husband & Wife)",
        "Part IV: Certification of the Contracting Parties",
        "Part V: Certification of Solemnizing Officer",
        "Civil Registrar’s Certification & Remarks",
        "Affidavit of Solemnizing Officer",
        "Affidavit Completion & Oath",
        "Affidavit for Delayed Registration of Marriage",
        "Affidavit – Signature & Final Notarization",
        "Confirmation Notice"
    ];

    // Handles FormData
    const [formData, setFormData] = useState({
        // Page 1: formData Input Validation
        page1: {
            // Page 1: Province, City and Registry No.
            province: "",
            city: "",
            registry: "",

            // Page 1: formData Husband Information
            husbandFirstName: "",
            husbandMiddleName: "",
            husbandLastName: "",
            husbandBirthDate: "",
            husbandBirthCity: "",
            husbandBirthProvince: "",
            husbandBirthCountry: "",
            husbandAge: "",

            // Page 1: formData Wife Information
            wifeFirstName: "",
            wifeMiddleName: "",
            wifeLastName: "",
            wifeBirthDate: "",
            wifeBirthCity: "",
            wifeBirthProvince: "",
            wifeBirthCountry: "",
            wifeAge: "",
        },

        // Page 2: formData Input Validation
        page2: {
            // Page 2: Husband Information
            husbandSex: "",
            husbandCitizenship: "",
            husbandResidenceBarangay: "",
            husbandResidenceCity: "",
            husbandResidenceProvince: "",
            husbandResidenceCountry: "",
            husbandReligion: "",
            husbandCivilStatus: "",
            husbandFatherNameFirst: "",
            husbandFatherNameMiddle: "",
            husbandFatherNameLast: "",

            // Page 2: Wife Information
            wifeSex: "",
            wifeCitizenship: "",
            wifeResidenceBarangay: "",
            wifeResidenceCity: "",
            wifeResidenceProvince: "",
            wifeResidenceCountry: "",
            wifeReligion: "",
            wifeCivilStatus: "",
            wifeFatherNameFirst: "",
            wifeFatherNameMiddle: "",
            wifeFatherNameLast: "",
        },

        // Page 3: formData Input Validation
        page3: {
            // Page 3: Husband Information
            husbandFatherCitizenship: "",
            husbandMotherNameFirst: "",
            husbandMotherNameMiddle: "",
            husbandMotherNameLast: "",
            husbandMotherCitizenship: "",
            husbandConsentNameFirst: "",
            husbandConsentNameMiddle: "",
            husbandConsentNameLast: "",
            husbandRelationship: "",
            husbandConsentPersonBarangay: "",
            husbandConsentPersonCity: "",
            husbandConsentPersonProvince: "",
            husbandConsentPersonCountry: "",

            // Page 3: Wife Information
            wifeFatherCitizenship: "",
            wifeMotherNameFirst: "",
            wifeMotherNameMiddle: "",
            wifeMotherNameLast: "",
            wifeMotherCitizenship: "",
            wifeConsentNameFirst: "",
            wifeConsentNameMiddle: "",
            wifeConsentNameLast: "",
            wifeRelationship: "",
            wifeConsentPersonBarangay: "",
            wifeConsentPersonCity: "",
            wifeConsentPersonProvince: "",
            wifeConsentPersonCountry: "",
        },

        // Page 4: formData Input Validation
        page4: {
            placeOfMarriage: "",
            dateOfMarriage: "",
            timeOfMarriage: "",
            certHusbandName: "",
            certWifeName: "",
            marriageSettlement: "",
            certDay: "",
            certMonth: "",
            certYear: "",
        },

        // Page 5: formData Input Validation 
        page5: {
            certification: "",
            marriageLicenseNo: "",
            marriageIssuedOn: "",
            marriageIssuedAt: "",
            executiveOrder: "",
            officerPosition: "",
            officerReligion: "",
            witness1Name: "",
            witness2Name: "",
        },

        // Page 6: formData Input Validation
        page6: {
            receivedByName: "",
            receivedByTitle: "",
            receivedByDate: "",
            registrarName: "",
            registrarTitle: "",
            registrarDate: "",
            remarksAnnotation: "",
            civilRegistrar: "",
        },

        // Page 7: formData Input Validation
        page7: {
            witness3Name: "",
            witness4Name: "",
            affidavitOfficerName: "",
            affidavitOfficerOrganization: "",
            affidavitOfficerAddress: "",
            statement1Party1: "",
            statement1Party2: "",
            statement2a: false,
            statement2b: false,
            statement2c: false,
            statement2cParty1: "",
            statement2cParty2: "",
            statement2d: false,
            statement2e: false,
        },

        // Page 8: formData Input Validation
        page8: {
            affidavitDay: "",
            affidavitMonth: "",
            affidavitYear: "",
            affidavitPlace: "",
            swornDay: "",
            swornMonth: "",
            swornYear: "",
            swornAt: "",
            swornIssuedOn: "",
            swornIssuedAt: "",
            adminOfficerName: "",
            adminOfficerTitle: "",
            adminOfficerAddress: "",
        },

        // Page 9: formData Input Validation
        page9: {
            affiantName: "",
            affiantAddress: "",

            statement1OptionA: false,
            statement1MarriageWith: "",
            statement1PlaceA: "",
            statement1DateA: "",

            statement1OptionB: false,
            statement1MarriageBetween: "",
            statement1PlaceB: "",
            statement1DateB: "",

            solemnizingOfficer: "",

            ceremonyReligious: false,
            ceremonyCivil: false,
            ceremonyMuslim: false,
            ceremonyTribal: false,

            marriageWithLicense: false,
            marriageLicenseNo: "",
            marriageIssuedOn: "",
            marriageIssuedAt: "",

            marriageUnderArticle: false,
            articleNumber: "",

            citizenApplicant: "",
            citizenSpouse: "",

            reasonForDelay: "",

            affidavitDay: "",
            affidavitMonth: "",
            affidavitYear: "",
            affidavitPlace: "",
        },

        // Page 10: formData Input Validation
        page10: {
            swornDay: "",
            swornMonth: "",
            swornYear: "",
            swornPlace: "",
            swornIssuedOn: "",
            swornIssuedAt: "",
            administeringOfficerName: "",
            officerPosition: "",
            officerAddress: "",
        }

    });

    // Handles Input Change on Pages
    const handleInputChange = (event, section) => {
        const { name, type, value, checked } = event.target;
        setFormData((prevData) => {
            const updatedSection = {
                ...prevData[section],
                [name]: type === "checkbox" ? checked : value,
            };

            if (name === "husbandBirthDate") {
                updatedSection.husbandAge = calculateAge(value);
            }
            if (name === "wifeBirthDate") {
                updatedSection.wifeAge = calculateAge(value);
            }

            return {
                ...prevData,
                [section]: updatedSection,
            };
        });
    };

    // Handles Page and Validations
    const [errors, setErrors] = React.useState({});
    const handlePageChange = (direction) => {
        if (direction === "next") {
            const response = MarriageCertValidation.validateForm(
                formData[`page${currentPage}`],
                currentPage
            );

            if (Object.keys(response).length > 0) {
                setErrors(response);
                toast.error("Please fix the errors in the form.");
                console.log("[marriage form] Validation Errors:", response);
                console.log(
                    `[marriage form] form Data ${currentPage}:`, formData[`page${currentPage}`]
                );
            } else {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, pageTitles.length));
            }
        } else if (direction === "prev") {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return "";
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
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

    const initialFormData = {
        page1: {},
        page2: {},
        page3: {},
        page4: {},
        page5: {},
        page6: {},
        page7: {},
        page8: {},
        page9: {},
        page10: {},
        page11: {},
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final Form Data:", formData);
        MarriageCertServices.insertMarriageCertificate(formData)
            .then(response => {
                console.log("[Marriage Form]", response);
                toast.success("Marriage certificate added successfully!");

                setFormData(initialFormData);
                setCurrentPage(1);
            })
            .catch(error => {
                console.error("[Marriage Form]:", error);
            });
    }
    return (
        <>
            <form className="p-4 h-full" onSubmit={handleSubmit}>
                {currentPage === 1 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        <div className="w-full flex items-center gap-2 mb-3">
                            <div className="w-full">
                                <label>Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="Province"
                                    className={`w-full common-input ${errors.province ? 'input-error' : ''}`}
                                    value={formData.page1.province}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.province && <ErrorMessages errors={errors.province} />}
                            </div>
                            <div className="w-full">
                                <label>City</label>
                                <input
                                    type="text"
                                    placeholder="City/Municipality"
                                    name="city"
                                    className={`w-full common-input ${errors.city ? 'input-error' : ''}`}
                                    value={formData.page1.city}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.city && <ErrorMessages errors={errors.city} />}
                            </div>
                            <div className="w-full">
                                <label>Registry No.</label>
                                <input
                                    type="text"
                                    name="registry"
                                    placeholder="Registry No."
                                    className={`w-full common-input ${errors.registry ? 'input-error' : ''}`}
                                    value={formData.page1.registry}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.registry && <ErrorMessages errors={errors.registry} />}
                            </div>
                        </div>

                        <div className="w-full flex items-stretch gap-1 mb-3">
                            {/* Husband Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Husband</h3>

                                <span>1. Name of contracting parties</span>

                                {/* Name inputs */}
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>First</label>
                                        <input type="text"
                                            name="husbandFirstName"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.husbandFirstName ? 'input-error' : ''}`}
                                            value={formData.page1.husbandFirstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandFirstName && <ErrorMessages errors={errors.husbandFirstName} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Middle</label>
                                        <input
                                            type="text"
                                            name="husbandMiddleName"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.husbandMiddleName ? 'input-error' : ''}`}
                                            value={formData.page1.husbandMiddleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandMiddleName && <ErrorMessages errors={errors.husbandMiddleName} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Last</label>
                                        <input
                                            type="text"
                                            name="husbandLastName"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.husbandLastName ? 'input-error' : ''}`}
                                            value={formData.page1.husbandLastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandLastName && <ErrorMessages errors={errors.husbandLastName} />}
                                    </div>
                                </div>

                                {/* DOB + Age labels */}
                                <span>
                                    <p>2. Date of birth and Age</p>
                                </span>

                                {/* DOB + Age inputs */}
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            name="husbandBirthDate"
                                            className={`w-full common-input ${errors.husbandBirthDate ? 'input-error' : ''}`}
                                            value={formData.page1.husbandBirthDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandBirthDate && <ErrorMessages errors={errors.husbandBirthDate} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Age</label>
                                        <input
                                            type="text"
                                            name="husbandAge"
                                            placeholder="Age"
                                            value={formData.page1.husbandAge}
                                            className={`w-full common-input ${errors.husbandAge ? 'input-error' : ''}`}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            readOnly
                                        />
                                        {errors.husbandAge && <ErrorMessages errors={errors.husbandAge} />}
                                    </div>
                                </div>

                                {/* Place of Birth */}
                                <span>
                                    <p>3. Place of Birth</p>
                                </span>

                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>City/Municipality</label>
                                        <input
                                            type="text"
                                            name="husbandBirthCity"
                                            placeholder='City/Municipality'
                                            className={`w-full common-input ${errors.husbandBirthCity ? 'input-error' : ''}`}
                                            value={formData.page1.husbandBirthCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandBirthCity && <ErrorMessages errors={errors.husbandBirthCity} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Province</label>
                                        <input
                                            type="text"
                                            name="husbandBirthProvince"
                                            placeholder="Province"
                                            className={`w-full common-input ${errors.husbandBirthProvince ? 'input-error' : ''}`}
                                            value={formData.page1.husbandBirthProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandBirthProvince && <ErrorMessages errors={errors.husbandBirthProvince} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Country</label>
                                        <input
                                            type="text"
                                            name="husbandBirthCountry"
                                            placeholder="Country"
                                            className={`w-full common-input ${errors.husbandBirthCountry ? 'input-error' : ''}`}
                                            value={formData.page1.husbandBirthCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandBirthCountry && <ErrorMessages errors={errors.husbandBirthCountry} />}
                                    </div>
                                </div>
                            </div>

                            {/* Wife Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Wife</h3>

                                {/* Name label (empty but keeps alignment) */}
                                <span className="invisible">1. Name of contracting parties</span>

                                {/* Name inputs */}
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>First</label>
                                        <input
                                            type="text"
                                            name="wifeFirstName"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.wifeFirstName ? 'input-error' : ''}`}
                                            value={formData.page1.wifeFirstName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeFirstName && <ErrorMessages errors={errors.wifeFirstName} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Middle</label>
                                        <input
                                            type="text"
                                            name="wifeMiddleName"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.wifeMiddleName ? 'input-error' : ''}`}
                                            value={formData.page1.wifeMiddleName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeMiddleName && <ErrorMessages errors={errors.wifeMiddleName} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Last</label>
                                        <input
                                            type="text"
                                            name="wifeLastName"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.wifeLastName ? 'input-error' : ''}`}
                                            value={formData.page1.wifeLastName}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeLastName && <ErrorMessages errors={errors.wifeLastName} />}
                                    </div>
                                </div>

                                {/* DOB + Age labels (empty but aligned) */}
                                <span className="invisible">
                                    <p>2. Date of birth and Age</p>
                                </span>

                                {/* DOB + Age inputs */}
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            name="wifeBirthDate"
                                            className={`w-full common-input ${errors.wifeBirthDate ? 'input-error' : ''}`}
                                            value={formData.page1.wifeBirthDate}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeBirthDate && <ErrorMessages errors={errors.wifeBirthDate} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Age</label>
                                        <input type="text"
                                            name="wifeAge"
                                            placeholder="Age"
                                            value={formData.page1.wifeAge}
                                            className={`w-full common-input ${errors.wifeAge ? 'input-error' : ''}`}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            readOnly
                                        />
                                        {errors.wifeAge && <ErrorMessages errors={errors.wifeAge} />}
                                    </div>
                                </div>

                                {/* Place of Birth */}
                                <span className="invisible">
                                    <p>3. Place of Birth</p>
                                </span>

                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>City/Municipality</label>
                                        <input
                                            type="text"
                                            name="wifeBirthCity"
                                            placeholder="City/Municipality"
                                            className={`w-full common-input ${errors.wifeBirthCity ? 'input-error' : ''}`}
                                            value={formData.page1.wifeBirthCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeBirthCity && <ErrorMessages errors={errors.wifeBirthCity} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Province</label>
                                        <input
                                            type="text"
                                            name="wifeBirthProvince"
                                            placeholder="Province"
                                            className={`w-full common-input ${errors.wifeBirthProvince ? 'input-error' : ''}`}
                                            value={formData.page1.wifeBirthProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeBirthProvince && <ErrorMessages errors={errors.wifeBirthProvince} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Country</label>
                                        <input
                                            type="text"
                                            name="wifeBirthCountry"
                                            placeholder="Country"
                                            className={`w-full common-input ${errors.wifeBirthCountry ? 'input-error' : ''}`}
                                            value={formData.page1.wifeBirthCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeBirthCountry && <ErrorMessages errors={errors.wifeBirthCountry} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 2 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        <div className="w-full flex items-stretch gap-1 mb-3">
                            {/* Husband Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Husband</h3>
                                {/* Sex and Citizenship */}
                                <span>
                                    <p>4. Sex and Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>Sex</label>
                                        <select
                                            name="husbandSex"
                                            className={`common-input w-full ${errors.husbandSex ? 'input-error' : ''}`}
                                            value={formData.page2.husbandSex}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}>
                                            <option value="">Select sex</option>
                                            <option value={capitalizeFirst(MarriageCertificate.SexTypes.MALE)}>{capitalizeFirst(MarriageCertificate.SexTypes.MALE)}</option>
                                            <option value={capitalizeFirst(MarriageCertificate.SexTypes.FEMALE)}>{capitalizeFirst(MarriageCertificate.SexTypes.FEMALE)}</option>
                                        </select>
                                        {errors.husbandSex && <ErrorMessages errors={errors.husbandSex} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Citizenship</label>
                                        <input
                                            name="husbandCitizenship"
                                            placeholder="Citizenship"
                                            className={`w-full common-input ${errors.husbandCitizenship ? 'input-error' : ''}`}
                                            value={capitalizeFirst(formData.page2.husbandCitizenship)}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandCitizenship && <ErrorMessages errors={errors.husbandCitizenship} />}
                                    </div>
                                </div>

                                {/* Residence */}
                                <span>
                                    <p>5. Residence</p>
                                </span>
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandResidenceBarangay"
                                            placeholder="House No., St., Barangay"
                                            className={`w-full common-input ${errors.husbandResidenceBarangay ? 'input-error' : ''}`}
                                            value={formData.page2.husbandResidenceBarangay}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandResidenceBarangay && <ErrorMessages errors={errors.husbandResidenceBarangay} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandResidenceCity"
                                            placeholder="City/Municipality"
                                            className={`w-full common-input ${errors.husbandResidenceCity ? 'input-error' : ''}`}
                                            value={formData.page2.husbandResidenceCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandResidenceCity && <ErrorMessages errors={errors.husbandResidenceCity} />}
                                    </div>
                                    <div className="w-full">
                                        <input type="text"
                                            name="husbandResidenceProvince"
                                            placeholder="Province"
                                            className={`w-full common-input ${errors.husbandResidenceProvince ? 'input-error' : ''}`}
                                            value={formData.page2.husbandResidenceProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandResidenceProvince && <ErrorMessages errors={errors.husbandResidenceProvince} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandResidenceCountry"
                                            placeholder="Country"
                                            className={`w-full common-input ${errors.husbandResidenceCountry ? 'input-error' : ''}`}
                                            value={formData.page2.husbandResidenceCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandResidenceCountry && <ErrorMessages errors={errors.husbandResidenceCountry} />}
                                    </div>
                                </div>

                                <div className='flex items-center gap-1'>
                                    <div>
                                        {/* Religion/Religious sect */}
                                        <span>
                                            <p>6. Religion/Religous sect</p>
                                        </span>
                                        <div className="w-full mt-1 mb-3">
                                            <input
                                                type="text"
                                                name="husbandReligion"
                                                placeholder="Religion/Religious sect"
                                                className={`w-full common-input ${errors.husbandReligion ? 'input-error' : ''}`}
                                                value={formData.page2.husbandReligion}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.husbandReligion && <ErrorMessages errors={errors.husbandReligion} />}
                                        </div>
                                    </div>

                                    <div>
                                        {/* Civil Status */}
                                        <span>
                                            <p>7. Civil Status</p>
                                        </span>
                                        <div className="w-full mt-1 mb-3">
                                            <input
                                                type="text"
                                                name="husbandCivilStatus"
                                                placeholder="Civil Status"
                                                className={`w-full common-input ${errors.husbandCivilStatus ? 'input-error' : ''}`}
                                                value={formData.page2.husbandCivilStatus}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.husbandCivilStatus && <ErrorMessages errors={errors.husbandCivilStatus} />}
                                        </div>
                                    </div>
                                </div>


                                {/* Name of Father */}
                                <span>
                                    <p>8. Name of Father</p>
                                </span>
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandFatherNameFirst"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.husbandFatherNameFirst ? 'input-error' : ''}`}
                                            value={formData.page2.husbandFatherNameFirst}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandFatherNameFirst && <ErrorMessages errors={errors.husbandFatherNameFirst} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandFatherNameMiddle"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.husbandFatherNameMiddle ? 'input-error' : ''}`}
                                            value={formData.page2.husbandFatherNameMiddle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandFatherNameMiddle && <ErrorMessages errors={errors.husbandFatherNameMiddle} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandFatherNameLast"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.husbandFatherNameLast ? 'input-error' : ''}`}
                                            value={formData.page2.husbandFatherNameLast}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandFatherNameLast && <ErrorMessages errors={errors.husbandFatherNameLast} />}
                                    </div>
                                </div>
                            </div>

                            {/* Wife Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Wife</h3>
                                {/* Sex and Citizenship */}
                                <span className="invisible">
                                    <p>4. Sex and Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>Sex</label>
                                        <select
                                            name="wifeSex"
                                            className={`common-input w-full ${errors.wifeSex ? 'input-error' : ''}`}
                                            value={formData.page2.wifeSex}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}>
                                            <option value="">Select sex</option>
                                            <option value={capitalizeFirst(MarriageCertificate.SexTypes.MALE)}>{capitalizeFirst(MarriageCertificate.SexTypes.MALE)}</option>
                                            <option value={capitalizeFirst(MarriageCertificate.SexTypes.FEMALE)}>{capitalizeFirst(MarriageCertificate.SexTypes.FEMALE)}</option>
                                        </select>
                                        {errors.wifeSex && <ErrorMessages errors={errors.wifeSex} />}
                                    </div>
                                    <div className="w-full">
                                        <label>Citizenship</label>
                                        <input
                                            name="wifeCitizenship"
                                            placeholder="Citizenship"
                                            className={`w-full common-input ${errors.wifeCitizenship ? 'input-error' : ''}`}
                                            value={formData.page2.wifeCitizenship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeCitizenship && <ErrorMessages errors={errors.wifeCitizenship} />}
                                    </div>
                                </div>

                                {/* Residence */}
                                <span className="invisible">
                                    <p>5. Residence</p>
                                </span>
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeResidenceBarangay"
                                            placeholder="House No., St., Barangay"
                                            className={`w-full common-input ${errors.wifeResidenceBarangay ? 'input-error' : ''}`}
                                            value={formData.page2.wifeResidenceBarangay}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeResidenceBarangay && <ErrorMessages errors={errors.wifeResidenceBarangay} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeResidenceCity"
                                            placeholder="City/Municipality"
                                            className={`w-full common-input ${errors.wifeResidenceCity ? 'input-error' : ''}`}
                                            value={formData.page2.wifeResidenceCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeResidenceCity && <ErrorMessages errors={errors.wifeResidenceCity} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeResidenceProvince"
                                            placeholder="Province"
                                            className={`w-full common-input ${errors.wifeResidenceProvince ? 'input-error' : ''}`}
                                            value={formData.page2.wifeResidenceProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeResidenceProvince && <ErrorMessages errors={errors.wifeResidenceProvince} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeResidenceCountry"
                                            placeholder="Country"
                                            className={`w-full common-input ${errors.wifeResidenceCountry ? 'input-error' : ''}`}
                                            value={formData.page2.wifeResidenceCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeResidenceCountry && <ErrorMessages errors={errors.wifeResidenceCountry} />}
                                    </div>
                                </div>

                                <div className='flex items-center gap-1'>
                                    <div>
                                        {/* Religion/Religious sect */}
                                        <span className="invisible">
                                            <p>6. Religion/Religous sect</p>
                                        </span>
                                        <div className="w-full mt-1 mb-3">
                                            <input
                                                type="text"
                                                name="wifeReligion"
                                                placeholder="Religion/Religious sect"
                                                className={`w-full common-input ${errors.wifeReligion ? 'input-error' : ''}`}
                                                value={formData.page2.wifeReligion}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.wifeReligion && <ErrorMessages errors={errors.wifeReligion} />}
                                        </div>
                                    </div>

                                    <div>
                                        {/* Civil Status */}
                                        <span className="invisible">
                                            <p>7. Civil Status</p>
                                        </span>
                                        <div className="w-full mt-1 mb-3">
                                            <input
                                                type="text"
                                                name="wifeCivilStatus"
                                                placeholder="Civil Status"
                                                className={`w-full common-input ${errors.wifeCivilStatus ? 'input-error' : ''}`}
                                                value={formData.page2.wifeCivilStatus}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            />
                                            {errors.wifeCivilStatus && <ErrorMessages errors={errors.wifeCivilStatus} />}
                                        </div>
                                    </div>
                                </div>


                                {/* Name of Father */}
                                <span className="invisible">
                                    <p>8. Name of Father</p>
                                </span>
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeFatherNameFirst"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.wifeFatherNameFirst ? 'input-error' : ''}`}
                                            value={formData.page2.wifeFatherNameFirst}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeFatherNameFirst && <ErrorMessages errors={errors.wifeFatherNameFirst} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeFatherNameMiddle"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.wifeFatherNameMiddle ? 'input-error' : ''}`}
                                            value={formData.page2.wifeFatherNameMiddle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeFatherNameMiddle && <ErrorMessages errors={errors.wifeFatherNameMiddle} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeFatherNameLast"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.wifeFatherNameLast ? 'input-error' : ''}`}
                                            value={formData.page2.wifeFatherNameLast}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeFatherNameLast && <ErrorMessages errors={errors.wifeFatherNameLast} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 3 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        <div className="w-full flex items-stretch gap-1 mb-3">
                            {/* Husband Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Husband</h3>
                                {/* Father Citizenship */}
                                <span>
                                    <p>9. Father Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            name="husbandFatherCitizenship"
                                            placeholder="Citizenship"
                                            className={`w-full common-input ${errors.husbandFatherCitizenship ? 'input-error' : ''}`}
                                            value={formData.page3.husbandFatherCitizenship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandFatherCitizenship && <ErrorMessages errors={errors.husbandFatherCitizenship} />}
                                    </div>
                                </div>

                                {/* Maiden Name of Mother */}
                                <span>
                                    <p>10. Maiden Name of Mother</p>
                                </span>
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandMotherNameFirst"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.husbandMotherNameFirst ? 'input-error' : ''}`}
                                            value={formData.page3.husbandMotherNameFirst}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandMotherNameFirst && <ErrorMessages errors={errors.husbandMotherNameFirst} />}
                                    </div>
                                    <div className="w-full">
                                        <input type="text"
                                            name="husbandMotherNameMiddle"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.husbandMotherNameMiddle ? 'input-error' : ''}`}
                                            value={formData.page3.husbandMotherNameMiddle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandMotherNameMiddle && <ErrorMessages errors={errors.husbandMotherNameMiddle} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandMotherNameLast"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.husbandMotherNameLast ? 'input-error' : ''}`}
                                            value={formData.page3.husbandMotherNameLast}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandMotherNameLast && <ErrorMessages errors={errors.husbandMotherNameLast} />}
                                    </div>
                                </div>

                                {/* Mother Citizenship */}
                                <span>
                                    <p>11. Mother Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            name="husbandMotherCitizenship"
                                            placeholder="Citizenship"
                                            className={`w-full common-input ${errors.husbandMotherCitizenship ? 'input-error' : ''}`}
                                            value={formData.page3.husbandMotherCitizenship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandMotherCitizenship && <ErrorMessages errors={errors.husbandMotherCitizenship} />}
                                    </div>
                                </div>

                                {/* Name of Person/Wall Who Gave Consent or Advice */}
                                <span>
                                    <p>12. Name of Person/Wall Who Gave Consent or Advice</p>
                                </span>
                                <div className="flex flex-col items-center mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentNameFirst"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.husbandConsentNameFirst ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentNameFirst}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentNameFirst && <ErrorMessages errors={errors.husbandConsentNameFirst} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentNameMiddle"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.husbandConsentNameMiddle ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentNameMiddle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentNameMiddle && <ErrorMessages errors={errors.husbandConsentNameMiddle} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentNameLast"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.husbandConsentNameLast ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentNameLast}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentNameLast && <ErrorMessages errors={errors.husbandConsentNameLast} />}
                                    </div>
                                </div>

                                {/* Relationship */}
                                <span>
                                    <p>13. Relationship</p>
                                </span>
                                <div className="w-full flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandRelationship"
                                            placeholder="Relationship"
                                            className={`w-full common-input ${errors.husbandRelationship ? 'input-error' : ''}`}
                                            value={formData.page3.husbandRelationship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandRelationship && <ErrorMessages errors={errors.husbandRelationship} />}
                                    </div>
                                </div>

                                {/* Residence */}
                                <span>
                                    <p>14. Residence</p>
                                </span>
                                <div className="w-full flex flex-col items-center gap-1 mt-1">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentPersonBarangay"
                                            placeholder="House No., St., Barangay"
                                            className={`w-full common-input ${errors.husbandConsentPersonBarangay ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentPersonBarangay}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentPersonBarangay && <ErrorMessages errors={errors.husbandConsentPersonBarangay} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentPersonCity"
                                            placeholder="City/Municipality"
                                            className={`w-full common-input ${errors.husbandConsentPersonCity ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentPersonCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentPersonCity && <ErrorMessages errors={errors.husbandConsentPersonCity} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentPersonProvince"
                                            placeholder="Province"
                                            className={`w-full common-input ${errors.husbandConsentPersonProvince ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentPersonProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentPersonProvince && <ErrorMessages errors={errors.husbandConsentPersonProvince} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="husbandConsentPersonCountry"
                                            placeholder="Country"
                                            className={`w-full common-input ${errors.husbandConsentPersonCountry ? 'input-error' : ''}`}
                                            value={formData.page3.husbandConsentPersonCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandConsentPersonCountry && <ErrorMessages errors={errors.husbandConsentPersonCountry} />}
                                    </div>
                                </div>
                            </div>

                            {/* Wife Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Wife</h3>
                                {/* Father Citizenship */}
                                <span className="invisible">
                                    <p>9. Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            name="wifeFatherCitizenship"
                                            placeholder="Citizenship"
                                            className={`w-full common-input ${errors.wifeFatherCitizenship ? 'input-error' : ''}`}
                                            value={formData.page3.wifeFatherCitizenship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeFatherCitizenship && <ErrorMessages errors={errors.wifeFatherCitizenship} />}
                                    </div>
                                </div>

                                {/* Maiden Name of Mother */}
                                <span className="invisible">
                                    <p>10. Maiden Name of Mother</p>
                                </span>
                                <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeMotherNameFirst"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.wifeMotherNameFirst ? 'input-error' : ''}`}
                                            value={formData.page3.wifeMotherNameFirst}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeMotherNameFirst && <ErrorMessages errors={errors.wifeMotherNameFirst} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeMotherNameMiddle"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.wifeMotherNameMiddle ? 'input-error' : ''}`}
                                            value={formData.page3.wifeMotherNameMiddle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeMotherNameMiddle && <ErrorMessages errors={errors.wifeMotherNameMiddle} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeMotherNameLast"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.wifeMotherNameLast ? 'input-error' : ''}`}
                                            value={formData.page3.wifeMotherNameLast}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeMotherNameLast && <ErrorMessages errors={errors.wifeMotherNameLast} />}
                                    </div>
                                </div>

                                {/* Mother Citizenship */}
                                <span className="invisible">
                                    <p>11. Mother Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            name="wifeMotherCitizenship"
                                            placeholder="Citizenship"
                                            className={`w-full common-input ${errors.wifeMotherCitizenship ? 'input-error' : ''}`}
                                            value={formData.page3.wifeMotherCitizenship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeMotherCitizenship && <ErrorMessages errors={errors.wifeMotherCitizenship} />}
                                    </div>
                                </div>


                                {/* Name of Person/Wall Who Gave Consent or Advice */}
                                <span className="invisible">
                                    <p>12. Name of Person/Wall Who Gave Consent or Advice</p>
                                </span>
                                <div className="flex flex-col items-center mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentNameFirst"
                                            placeholder="First"
                                            className={`w-full common-input ${errors.wifeConsentNameFirst ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentNameFirst}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentNameFirst && <ErrorMessages errors={errors.wifeConsentNameFirst} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentNameMiddle"
                                            placeholder="Middle"
                                            className={`w-full common-input ${errors.wifeConsentNameMiddle ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentNameMiddle}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentNameMiddle && <ErrorMessages errors={errors.wifeConsentNameMiddle} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentNameLast"
                                            placeholder="Last"
                                            className={`w-full common-input ${errors.wifeConsentNameLast ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentNameLast}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentNameLast && <ErrorMessages errors={errors.wifeConsentNameLast} />}
                                    </div>
                                </div>

                                {/* Relationship */}
                                <span className="invisible">
                                    <p>13. Relationship</p>
                                </span>
                                <div className="w-full flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeRelationship"
                                            placeholder="Relationship"
                                            className={`w-full common-input ${errors.wifeRelationship ? 'input-error' : ''}`}
                                            value={formData.page3.wifeRelationship}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeRelationship && <ErrorMessages errors={errors.wifeRelationship} />}
                                    </div>
                                </div>

                                {/* Residence */}
                                <span className="invisible">
                                    <p>14. Residence</p>
                                </span>
                                <div className="w-full flex flex-col items-center gap-1 mt-1">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentPersonBarangay"
                                            placeholder="House No., St., Barangay"
                                            className={`w-full common-input ${errors.wifeConsentPersonBarangay ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentPersonBarangay}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentPersonBarangay && <ErrorMessages errors={errors.wifeConsentPersonBarangay} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentPersonCity"
                                            placeholder="City/Municipality"
                                            className={`w-full common-input ${errors.wifeConsentPersonCity ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentPersonCity}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentPersonCity && <ErrorMessages errors={errors.wifeConsentPersonCity} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentPersonProvince"
                                            placeholder="Province"
                                            className={`w-full common-input ${errors.wifeConsentPersonProvince ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentPersonProvince}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentPersonProvince && <ErrorMessages errors={errors.wifeConsentPersonProvince} />}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="wifeConsentPersonCountry"
                                            placeholder="Country"
                                            className={`w-full common-input ${errors.wifeConsentPersonCountry ? 'input-error' : ''}`}
                                            value={formData.page3.wifeConsentPersonCountry}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.wifeConsentPersonCountry && <ErrorMessages errors={errors.wifeConsentPersonCountry} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 4 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        {/* Place of Marriage */}
                        <span>
                            <p>15. Place of Marriage</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>Office of the/House of/Barangay of/Church of/Mosque (City/Municipality) (Province) </label>
                                <input
                                    type="text"
                                    name="placeOfMarriage"
                                    placeholder="Office of the/House of/Barangay of/Church of/Mosque (City/Municipality) (Province)"
                                    className={`w-full common-input ${errors.placeOfMarriage ? 'input-error' : ''}`}
                                    value={formData.page4.placeOfMarriage}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.placeOfMarriage && <ErrorMessages errors={errors.placeOfMarriage} />}
                            </div>
                        </div>

                        {/* Date and Time of Marriage */}
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>16. Date of Marriage</label>
                                <input
                                    type="date"
                                    name="dateOfMarriage"
                                    className={`w-full common-input ${errors.dateOfMarriage ? 'input-error' : ''}`}
                                    value={formData.page4.dateOfMarriage}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.dateOfMarriage && <ErrorMessages errors={errors.dateOfMarriage} />}
                            </div>
                            <div className="w-full">
                                <label>17. Time of Marriage</label>
                                <input
                                    type="time"
                                    name="timeOfMarriage"
                                    className={`w-full common-input ${errors.timeOfMarriage ? 'input-error' : ''}`}
                                    value={formData.page4.timeOfMarriage}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                {errors.timeOfMarriage && <ErrorMessages errors={errors.timeOfMarriage} />}
                            </div>
                        </div>

                        {/* Certification of the contracting parties */}
                        <span>
                            <p>18. Certification of the Contracting Parties</p>
                        </span>
                        <div className="text-sm leading-relaxed border border-pink-300 p-3 rounded mt-1 mb-3">
                            <p className="flex flex-wrap items-center">
                                THIS IS TO CERTIFY: That I,
                                <input
                                    type="text"
                                    name="certHusbandName"
                                    className={`border-b border-gray-500 mx-2 flex-1 min-w-[150px] text-center ${errors.certHusbandName ? 'input-error' : ''}`}
                                    value={formData.page4.certHusbandName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                and I,
                                <input
                                    type="text"
                                    name="certWifeName"
                                    className={`border-b border-gray-500 mx-2 flex-1 min-w-[150px] text-center ${errors.certWifeName ? 'input-error' : ''}`}
                                    value={formData.page4.certWifeName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />,
                                both of legal age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witnesses named below, take each other as husband and wife and certifying further that we:
                            </p>


                            <p className="mt-2">
                                <label className="mx-2">
                                    <input
                                        type="radio"
                                        name="marriageSettlement"
                                        value={MarriageCertificate.marriageSettlement.ENTERED}
                                        checked={formData.page4.marriageSettlement === MarriageCertificate.marriageSettlement.ENTERED}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    have entered, a copy of which is hereto attached
                                </label>
                                /
                                <label className="mx-2">
                                    <input
                                        type="radio"
                                        name="marriageSettlement"
                                        value={MarriageCertificate.marriageSettlement.NOTENTERED}
                                        checked={formData.page4.marriageSettlement === MarriageCertificate.marriageSettlement.NOTENTERED}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    />
                                    have not entered into a marriage settlement.
                                </label>
                            </p>

                            <p className="mt-2">
                                IN WITNESS WHEREOF, we have signed/marked with our fingerprint this certificate in quadruplicate this
                                <input
                                    type="text"
                                    name="certDay"
                                    className={`border-b border-gray-500 mx-2 w-12 text-center ${errors.certDay ? 'input-error' : ''}`}
                                    value={formData.page4.certDay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                day of
                                <input
                                    type="text"
                                    name="certMonth"
                                    className={`border-b border-gray-500 mx-2 w-12 text-center ${errors.certMonth ? 'input-error' : ''}`}
                                    value={formData.page4.certMonth}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                />
                                <input
                                    type="text"
                                    name="certYear"
                                    className={`border-b border-gray-500 mx-2 w-12 text-center ${errors.certYear ? 'input-error' : ''}`}
                                    value={formData.page4.certYear}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)} />.
                            </p>

                            <div className="flex justify-evenly items-center mt-4">
                                {/* Husband signature */}
                                <div className="flex flex-col items-center">
                                    <SignaturePlaceholder />
                                    <label className="text-center mt-1">(Signature of Husband)</label>
                                </div>

                                {/* Wife signature */}
                                <div className="flex flex-col items-center">
                                    <SignaturePlaceholder />
                                    <label className="text-center mt-1">(Signature of Wife)</label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 5 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        {/* Certification of Solemnizing Officer */}
                        <span>
                            <p>19. Certification of Solemnizing Officer</p>
                        </span>

                        <div className="mt-1 mb-3 text-sm leading-relaxed border border-pink-300 p-3 rounded">
                            <p>
                                THIS IS TO CERTIFY: THAT BEFORE ME, on the date and place above-written,
                                personally appeared the above-mentioned parties, with their mutual consent,
                                lawfully joined together in marriage which was solemnized by me in the presence
                                of the witnesses named below, all of legal age.
                            </p>

                            <p className="mt-3 pl-6 font-semibold">I CERTIFY FURTHER THAT:</p>

                            {/* Options a, b, c */}
                            <div className="mt-2 space-y-4 pl-8">
                                {/* Option A */}
                                <label className="flex items-start gap-2">
                                    <input
                                        type="radio"
                                        name="certification"
                                        value="license"
                                        checked={formData.page5.certification === "license"}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`mt-1 ${errors.certification ? "input-error" : ""}`}
                                    />
                                    <span className="flex flex-wrap">
                                        a. Marriage License No.&nbsp;
                                        <input
                                            type="text"
                                            name="marriageLicenseNo"
                                            value={formData.page5.marriageLicenseNo}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className={`border-b border-gray-500 w-32 text-center mx-1 ${errors.marriageLicenseNo ? "input-error" : ""
                                                }`}
                                        />
                                        &nbsp;issued on&nbsp;
                                        <input
                                            type="text"
                                            name="marriageIssuedOn"
                                            value={formData.page5.marriageIssuedOn}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className={`border-b border-gray-500 w-32 text-center mx-1 ${errors.marriageIssuedOn ? "input-error" : ""
                                                }`}
                                        />
                                        &nbsp;at&nbsp;
                                        <input
                                            type="text"
                                            name="marriageIssuedAt"
                                            value={formData.page5.marriageIssuedAt}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className={`border-b border-gray-500 w-48 text-center mx-1 ${errors.marriageIssuedAt ? "input-error" : ""
                                                }`}
                                        />
                                        &nbsp;in favor of said parties, was exhibited to me.
                                    </span>
                                </label>

                                {/* Option B */}
                                <label className="flex items-start gap-2">
                                    <input
                                        type="radio"
                                        name="certification"
                                        value="noLicense"
                                        checked={formData.page5.certification === "noLicense"}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`${errors.certification ? "input-error" : ""} mt-1`}
                                    />
                                    <span>
                                        b. No marriage license was necessary, the marriage being solemnized under
                                        Art.&nbsp;
                                        <input
                                            type="text"
                                            name="executiveOrder"
                                            value={formData.page5.executiveOrder}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className={`border-b border-gray-500 w-16 text-center mx-1 ${errors.executiveOrder ? "input-error" : ""
                                                }`}
                                        />
                                        &nbsp;of Executive Order No. 209.
                                    </span>
                                </label>

                                {/* Option C */}
                                <label className="flex items-start gap-2">
                                    <input
                                        type="radio"
                                        name="certification"
                                        value="pd1083"
                                        checked={formData.page5.certification === "pd1083"}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`${errors.certification ? "input-error" : ""} mt-1`}
                                    />
                                    <span>
                                        c. The marriage was solemnized in accordance with the provisions of
                                        Presidential Decree No. 1083.
                                    </span>
                                </label>
                            </div>

                            {/* Signature fields */}
                            <div className="flex justify-evenly items-center mt-6">
                                <div className="flex flex-col items-center">
                                    <SignaturePlaceholder />
                                    <label className="text-xs text-center mt-1">
                                        (Signature Over Printed Name of Solemnizing Officer)
                                    </label>
                                </div>

                                <div className="flex flex-col items-center">
                                    <input
                                        type="text"
                                        name="officerPosition"
                                        value={formData.page5.officerPosition}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`w-40 border-b border-gray-500 text-center ${errors.officerPosition ? "input-error" : ""
                                            }`}
                                    />
                                    <label className="text-xs text-center mt-1">(Position/Designation)</label>
                                </div>

                                <div className="flex flex-col items-center">
                                    <input
                                        type="text"
                                        name="officerReligion"
                                        value={formData.page5.officerReligion}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`w-56 border-b border-gray-500 text-center ${errors.officerReligion ? "input-error" : ""
                                            }`}
                                    />
                                    <label className="text-xs text-center mt-1">
                                        (Religion/Religious Sect, Registry No. and Expiration Date, if applicable)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 20a. Witnesses */}
                        <span>
                            <p>20a. Witnesses (Print Name and Sign)</p>
                        </span>

                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col items-center">
                                    <SignaturePlaceholder />
                                    <label className="text-xs mt-1">(Signature of Witness 1)</label>
                                    <input
                                        type="text"
                                        name="witness1Name"
                                        value={formData.page5.witness1Name}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        placeholder="Name in Print"
                                        className={`w-56 border-b border-gray-500 text-center mt-2 ${errors.witness1Name ? "input-error" : ""
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col items-center">
                                    <SignaturePlaceholder />
                                    <label className="text-xs mt-1">(Signature of Witness 2)</label>
                                    <input
                                        type="text"
                                        name="witness2Name"
                                        value={formData.page5.witness2Name}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        placeholder="Name in Print"
                                        className={`w-56 border-b border-gray-500 text-center mt-2 ${errors.witness2Name ? "input-error" : ""
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 6 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        {/* 21. Received By */}
                        <span>
                            <p>21. Received By</p>
                        </span>
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="flex flex-col items-center space-y-2">
                                <div className='w-[500px]'>
                                    <SignaturePlaceholder />
                                </div>
                                <input
                                    type="text"
                                    name="receivedByName"
                                    placeholder="Name in Print"
                                    value={formData.page6.receivedByName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`w-56 border-b border-gray-500 text-center ${errors.receivedByName ? "input-error" : ""
                                        }`}
                                />
                                <input
                                    type="text"
                                    name="receivedByTitle"
                                    placeholder="Title or Position"
                                    value={formData.page6.receivedByTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`w-56 border-b border-gray-500 text-center ${errors.receivedByTitle ? "input-error" : ""
                                        }`}
                                />
                                <input
                                    type="date"
                                    name="receivedByDate"
                                    value={formData.page6.receivedByDate}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`w-56 border-b border-gray-500 text-center ${errors.receivedByDate ? "input-error" : ""
                                        }`}
                                />
                            </div>
                        </div>

                        {/* 22. Registered by the Civil Registrar */}
                        <span>
                            <p>22. Registered by the Civil Registrar</p>
                        </span>
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="flex flex-col items-center space-y-2">
                                <div className='w-[500px]'>
                                    <SignaturePlaceholder />
                                </div>
                                <input
                                    type="text"
                                    name="registrarName"
                                    placeholder="Name in Print"
                                    value={formData.page6.registrarName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`w-56 border-b border-gray-500 text-center ${errors.registrarName ? "input-error" : ""
                                        }`}
                                />
                                <input
                                    type="text"
                                    name="registrarTitle"
                                    placeholder="Title or Position"
                                    value={formData.page6.registrarTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`w-56 border-b border-gray-500 text-center ${errors.registrarTitle ? "input-error" : ""
                                        }`}
                                />
                                <input
                                    type="date"
                                    name="registrarDate"
                                    value={formData.page6.registrarDate}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`w-56 border-b border-gray-500 text-center ${errors.registrarDate ? "input-error" : ""
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Remarks/Annotations */}
                        <span>
                            <p className="font-semibold">
                                REMARKS/ANNOTATIONS (For LCRO/OCRG/Shari'a Circuit Registrar use only.)
                            </p>
                        </span>
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <textarea
                                name="remarksAnnotation"
                                value={formData.page6.remarksAnnotation}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                className={`w-full common-textarea ${errors.remarksAnnotation ? "input-error" : ""
                                    }`}
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Civil Registrar */}
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <h3 className="text-md font-semibold">
                                TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR
                            </h3>
                            <input
                                type="text"
                                name="civilRegistrar"
                                value={formData.page6.civilRegistrar}
                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                className={`w-full common-input ${errors.civilRegistrar ? "input-error" : ""
                                    }`}
                            />
                        </div>
                    </>
                )}

                {currentPage === 7 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        {/* 20b. Witnesses */}
                        <span>
                            <p>20b. Witnesses (Print Name and Sign)</p>
                        </span>

                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Witness 3 */}
                                <div className="flex flex-col items-center">
                                    <div className='w-[250px]'>
                                        <SignaturePlaceholder />
                                    </div>
                                    <label className="text-xs mt-1">(Signature of Witness 3)</label>
                                    <input
                                        type="text"
                                        name="witness3Name"
                                        value={formData.page7.witness3Name}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        placeholder="Name in Print"
                                        className={`w-56 border-b border-gray-500 text-center mt-2 ${errors.witness3Name ? "input-error" : ""
                                            }`}
                                    />
                                </div>

                                {/* Witness 4 */}
                                <div className="flex flex-col items-center">
                                    <div className='w-[250px]'>
                                        <SignaturePlaceholder />
                                    </div>
                                    <label className="text-xs mt-1">(Signature of Witness 4)</label>
                                    <input
                                        type="text"
                                        name="witness4Name"
                                        value={formData.page7.witness4Name}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        placeholder="Name in Print"
                                        className={`w-56 border-b border-gray-500 text-center mt-2 ${errors.witness4Name ? "input-error" : ""
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className="block text-center font-semibold">
                            AFFIDAVIT OF SOLEMNIZING OFFICER
                        </h3>

                        {/* Officer affidavit */}
                        <div className="mt-1 mb-3">
                            <p>
                                I,{" "}
                                <input
                                    type="text"
                                    name="affidavitOfficerName"
                                    value={formData.page7.affidavitOfficerName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none ${errors.affidavitOfficerName ? "input-error" : ""
                                        }`}
                                />
                                , of legal age, Solemnizing Officer of{" "}
                                <input
                                    type="text"
                                    name="affidavitOfficerOrganization"
                                    value={formData.page7.affidavitOfficerOrganization}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none ${errors.affidavitOfficerOrganization ? "input-error" : ""
                                        }`}
                                />{" "}
                                with address at{" "}
                                <input
                                    type="text"
                                    name="affidavitOfficerAddress"
                                    value={formData.page7.affidavitOfficerAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none ${errors.affidavitOfficerAddress ? "input-error" : ""
                                        }`}
                                />
                                , after having sworn to in accordance with law, do hereby depose and
                                say:
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Statement 1 */}
                            <p>
                                1. That I have solemnized the marriage between{" "}
                                <input
                                    type="text"
                                    name="statement1Party1"
                                    value={formData.page7.statement1Party1}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none px-1 w-40 ${errors.statement1Party1 ? "input-error" : ""
                                        }`}
                                />{" "}
                                and{" "}
                                <input
                                    type="text"
                                    name="statement1Party2"
                                    value={formData.page7.statement1Party2}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none px-1 w-40 ${errors.statement1Party2 ? "input-error" : ""
                                        }`}
                                />
                                ;
                            </p>

                            {/* Statement 2 */}
                            <div className="flex gap-2">
                                <p>2.</p>
                                <div className="flex flex-col gap-3">
                                    {/* 2a */}
                                    <label className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="statement2a"
                                            checked={formData.page7.statement2a || false}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className="mt-1 scale-125"
                                        />
                                        <span>
                                            a. That I have ascertained the qualifications of contracting
                                            parties and have found no legal impediment for them to marry as
                                            required by Article 34 of the Family Code.
                                        </span>
                                    </label>

                                    {/* 2b */}
                                    <label className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="statement2b"
                                            checked={formData.page7.statement2b || false}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className="mt-1 scale-125"
                                        />
                                        <span>
                                            b. That this marriage was performed in{" "}
                                            <i>articulo mortis</i> or at the point of death.
                                        </span>
                                    </label>

                                    {/* 2c */}
                                    <label className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="statement2c"
                                            checked={formData.page7.statement2c || false}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className="mt-1 scale-125"
                                        />
                                        <span>
                                            c. That the contracting party/ies{" "}
                                            <input
                                                type="text"
                                                name="statement2cParty1"
                                                value={formData.page7.statement2cParty1}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                className="border-b border-black outline-none px-1 w-40"
                                            />{" "}
                                            and{" "}
                                            <input
                                                type="text"
                                                name="statement2cParty2"
                                                value={formData.page7.statement2cParty2}
                                                onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                                className="border-b border-black outline-none px-1 w-40"
                                            />
                                            , being at the point of death and physically unable to sign the
                                            foregoing certificate of marriage by signature or mark, one of
                                            the witnesses to the marriage sign for him or her by writing the
                                            dying party's name and beneath it, the witness' own signature
                                            preceded by the preposition "By".
                                        </span>
                                    </label>

                                    {/* 2d */}
                                    <label className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="statement2d"
                                            checked={formData.page7.statement2d || false}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className="mt-1 scale-125"
                                        />
                                        <span>
                                            d. That the residence of either party is so located that there is
                                            no means of transportation to enable concerned party/parties to
                                            appear personally before the civil registrar;
                                        </span>
                                    </label>

                                    {/* 2e */}
                                    <label className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="statement2e"
                                            checked={formData.page7.statement2e || false}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                            className="mt-1 scale-125"
                                        />
                                        <span>
                                            e. That the marriage was among Muslims or among members of the
                                            Ethnic Cultural Communities and that the marriage was solemnized
                                            in accordance with their customs and practices;
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 8 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        <div className="space-y-4 mb-3">
                            {/* Statement 3 */}
                            <p>
                                3. That I took the necessary steps to ascertain the ages and relationship
                                of contracting parties and that neither of them are under any legal
                                impediment to marry each other;
                            </p>

                            {/* Statement 4 */}
                            <p>
                                4. That I am executing this affidavit to attest to the truthfulness of
                                the foregoing statements for all legal intents and purposes.
                            </p>
                        </div>

                        {/* Affidavit Signature Line */}
                        <div className="mb-3">
                            <p>
                                In truth whereof, I have affixed my signature below this{" "}
                                <input
                                    type="text"
                                    name="affidavitDay"
                                    value={formData.page8.affidavitDay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[50px] text-center ${errors.affidavitDay ? "input-error" : ""
                                        }`}
                                />{" "}
                                day of{" "}
                                <input
                                    type="text"
                                    name="affidavitMonth"
                                    value={formData.page8.affidavitMonth}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[120px] text-center ${errors.affidavitMonth ? "input-error" : ""
                                        }`}
                                />
                                ,{" "}
                                <input
                                    type="text"
                                    name="affidavitYear"
                                    value={formData.page8.affidavitYear}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[80px] text-center ${errors.affidavitYear ? "input-error" : ""
                                        }`}
                                />{" "}
                                at{" "}
                                <input
                                    type="text"
                                    name="affidavitPlace"
                                    value={formData.page8.affidavitPlace}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[200px] text-center ${errors.affidavitPlace ? "input-error" : ""
                                        }`}
                                />
                                , Philippines.
                            </p>
                        </div>

                        {/* Solemnizing Officer */}
                        <div className="w-full flex justify-end mb-3">
                            <div className="flex flex-col items-center">
                                <SignaturePlaceholder />
                                <p className="text-xs">Signature Over Printed Name of the Solemnizing Officer</p>
                            </div>
                        </div>

                        {/* Subscribed and Sworn */}
                        <div className="mb-3">
                            <p>
                                <span>SUBSCRIBED AND SWORN</span> to before me this{" "}
                                <input
                                    type="text"
                                    name="swornDay"
                                    value={formData.page8.swornDay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[50px] text-center ${errors.swornDay ? "input-error" : ""
                                        }`}
                                />{" "}
                                day of{" "}
                                <input
                                    type="text"
                                    name="swornMonth"
                                    value={formData.page8.swornMonth}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[120px] text-center ${errors.swornMonth ? "input-error" : ""
                                        }`}
                                />
                                ,{" "}
                                <input
                                    type="text"
                                    name="swornYear"
                                    value={formData.page8.swornYear}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[80px] text-center ${errors.swornYear ? "input-error" : ""
                                        }`}
                                />{" "}
                                at{" "}
                                <input
                                    type="text"
                                    name="swornAt"
                                    value={formData.page8.swornAt}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[200px] text-center ${errors.swornAt ? "input-error" : ""
                                        }`}
                                />{" "}
                                issued on{" "}
                                <input
                                    type="text"
                                    name="swornIssuedOn"
                                    value={formData.page8.swornIssuedOn}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[120px] text-center ${errors.swornIssuedOn ? "input-error" : ""
                                        }`}
                                />
                                ,{" "}
                                <input
                                    type="text"
                                    name="swornIssuedAt"
                                    value={formData.page8.swornIssuedAt}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[200px] text-center ${errors.swornIssuedAt ? "input-error" : ""
                                        }`}
                                />
                                .
                            </p>
                        </div>

                        {/* Administering Officer */}
                        <div className="flex justify-around items-center mb-3">
                            <div className="flex flex-col items-center mb-3">
                                <SignaturePlaceholder />
                                <p className="text-xs">Signature of the Administering Officer</p>

                                <input
                                    type="text"
                                    name="adminOfficerName"
                                    value={formData.page8.adminOfficerName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[300px] text-center ${errors.adminOfficerName ? "input-error" : ""
                                        }`}
                                />
                                <p className="text-xs">Name in Print</p>
                            </div>

                            <div className="flex flex-col items-center mb-3">
                                <input
                                    type="text"
                                    name="adminOfficerTitle"
                                    value={formData.page8.adminOfficerTitle}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[300px] text-center ${errors.adminOfficerTitle ? "input-error" : ""
                                        }`}
                                />
                                <p className="text-xs">Position/Title/Designation</p>

                                <input
                                    type="text"
                                    name="adminOfficerAddress"
                                    value={formData.page8.adminOfficerAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-black outline-none w-[300px] text-center ${errors.adminOfficerAddress ? "input-error" : ""
                                        }`}
                                />
                                <p className="text-xs">Address</p>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 9 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        <h3 className="block text-center font-semibold">
                            AFFIDAVIT FOR DELAYED REGISTRATION OF MARRIAGE
                        </h3>

                        {/* Intro */}
                        <div className="mt-2 mb-5">
                            <p>
                                I,{" "}
                                <input
                                    type="text"
                                    name="affiantName"
                                    value={formData.page9.affiantName}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center ${errors.affiantName ? "input-error" : ""
                                        }`}
                                />
                                , of legal age, single/married/divorced/widow/widower, with
                                residence and postal address{" "}
                                <input
                                    type="text"
                                    name="affiantAddress"
                                    value={formData.page9.affiantAddress}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center ${errors.affiantAddress ? "input-error" : ""
                                        }`}
                                />
                                , after having duly sworn in accordance with law do hereby depose
                                and say:
                            </p>
                        </div>

                        <div className="space-y-4 mb-3">
                            {/* Statement 1 */}
                            <div className="flex flex-col mb-3">
                                <p>1. That I am the applicant for the delayed registration of</p>

                                {/* Option A */}
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="statement1OptionA"
                                        checked={formData.page9.statement1OptionA}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="scale-125"
                                    />
                                    my marriage with{" "}
                                    <input
                                        type="text"
                                        name="statement1MarriageWith"
                                        value={formData.page9.statement1MarriageWith}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    in{" "}
                                    <input
                                        type="text"
                                        name="statement1PlaceA"
                                        value={formData.page9.statement1PlaceA}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    on{" "}
                                    <input
                                        type="text"
                                        name="statement1DateA"
                                        value={formData.page9.statement1DateA}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="border-b border-b-black outline-none text-center"
                                    />
                                    .
                                </label>

                                {/* Option B */}
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="statement1OptionB"
                                        checked={formData.page9.statement1OptionB}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="scale-125"
                                    />
                                    my marriage between{" "}
                                    <input
                                        type="text"
                                        name="statement1MarriageBetween"
                                        value={formData.page9.statement1MarriageBetween}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    in{" "}
                                    <input
                                        type="text"
                                        name="statement1PlaceB"
                                        value={formData.page9.statement1PlaceB}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    on{" "}
                                    <input
                                        type="text"
                                        name="statement1DateB"
                                        value={formData.page9.statement1DateB}
                                        onChange={(e) =>
                                            handleInputChange(e, `page${currentPage}`)
                                        }
                                        className="border-b border-b-black outline-none text-center"
                                    />
                                    .
                                </label>
                            </div>

                            {/* Statement 2 */}
                            <div className="flex flex-col mb-3">
                                <p>
                                    2. That said marriage was solemnized by{" "}
                                    <input
                                        type="text"
                                        name="solemnizingOfficer"
                                        value={formData.page9.solemnizingOfficer}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center ${errors.solemnizingOfficer ? "input-error" : ""
                                            }`}
                                    />{" "}
                                    (Solemnizing Officer's name) under
                                </p>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="ceremonyReligious"
                                            checked={formData.page9.ceremonyReligious}
                                            onChange={(e) =>
                                                handleInputChange(e, `page${currentPage}`)
                                            }
                                            className="scale-125"
                                        />{" "}
                                        religious ceremony
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="ceremonyCivil"
                                            checked={formData.page9.ceremonyCivil}
                                            onChange={(e) =>
                                                handleInputChange(e, `page${currentPage}`)
                                            }
                                            className="scale-125"
                                        />{" "}
                                        civil ceremony
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="ceremonyMuslim"
                                            checked={formData.page9.ceremonyMuslim}
                                            onChange={(e) =>
                                                handleInputChange(e, `page${currentPage}`)
                                            }
                                            className="scale-125"
                                        />{" "}
                                        muslim rites
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="ceremonyTribal"
                                            checked={formData.page9.ceremonyTribal}
                                            onChange={(e) =>
                                                handleInputChange(e, `page${currentPage}`)
                                            }
                                            className="scale-125"
                                        />{" "}
                                        tribal rites
                                    </label>
                                </div>
                            </div>

                            {/* Statement 3 */}
                            <div className="flex flex-col mb-3">
                                <p>3. That the marriage was solemnized:</p>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="marriageWithLicense"
                                        checked={formData.page9.marriageWithLicense}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className="scale-125"
                                    />{" "}
                                    a. with marriage license no.{" "}
                                    <input
                                        type="text"
                                        name="marriageLicenseNo"
                                        value={formData.page9.marriageLicenseNo}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    issued on{" "}
                                    <input
                                        type="text"
                                        name="marriageIssuedOn"
                                        value={formData.page9.marriageIssuedOn}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    at{" "}
                                    <input
                                        type="text"
                                        name="marriageIssuedAt"
                                        value={formData.page9.marriageIssuedAt}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className="border-b border-b-black outline-none text-center"
                                    />
                                    ;
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="marriageUnderArticle"
                                        checked={formData.page9.marriageUnderArticle}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className="scale-125"
                                    />{" "}
                                    b. under the Article{" "}
                                    <input
                                        type="text"
                                        name="articleNumber"
                                        value={formData.page9.articleNumber}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className="border-b border-b-black outline-none text-center"
                                    />{" "}
                                    (marriages of exceptional character);
                                </label>
                            </div>

                            {/* Statement 4 */}
                            <p>
                                4. (If the applicant is either the wife or husband) That I am a
                                citizen of{" "}
                                <input
                                    type="text"
                                    name="citizenApplicant"
                                    value={formData.page9.citizenApplicant}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center ${errors.citizenApplicant ? "input-error" : ""
                                        }`}
                                />{" "}
                                and spouse is a citizen of{" "}
                                <input
                                    type="text"
                                    name="citizenSpouse"
                                    value={formData.page9.citizenSpouse}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center ${errors.citizenSpouse ? "input-error" : ""
                                        }`}
                                />
                                .
                            </p>

                            {/* Statement 5 */}
                            <p>
                                5. That the reason for the delay in registering our/their marriage
                                is{" "}
                                <input
                                    type="text"
                                    name="reasonForDelay"
                                    value={formData.page9.reasonForDelay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center ${errors.reasonForDelay ? "input-error" : ""
                                        }`}
                                />
                                .
                            </p>

                            {/* Statement 6 */}
                            <div className="flex flex-col">
                                <p>
                                    6. That I am executing this affidavit to attest to the
                                    truthfullness of the foregoing statements for all legal intents
                                    and purposes.
                                </p>
                                <span>
                                    In truth whereof, I have affixed my signature below this{" "}
                                    <input
                                        type="text"
                                        name="affidavitDay"
                                        value={formData.page9.affidavitDay}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center w-[100px] ${errors.affidavitDay ? "input-error" : ""
                                            }`}
                                    />{" "}
                                    day of{" "}
                                    <input
                                        type="text"
                                        name="affidavitMonth"
                                        value={formData.page9.affidavitMonth}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center ${errors.affidavitMonth ? "input-error" : ""
                                            }`}
                                    />
                                    ,{" "}
                                    <input
                                        type="text"
                                        name="affidavitYear"
                                        value={formData.page9.affidavitYear}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center ${errors.affidavitYear ? "input-error" : ""
                                            }`}
                                    />{" "}
                                    at{" "}
                                    <input
                                        type="text"
                                        name="affidavitPlace"
                                        value={formData.page9.affidavitPlace}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center ${errors.affidavitPlace ? "input-error" : ""
                                            }`}
                                    />
                                    , Philippines.
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 10 && (
                    <>
                        <h2 className="text-lg text-center font-semibold mb-3">{pageTitles[(currentPage) - 1]}</h2>
                        {/* Affiant Signature */}
                        <div className="flex justify-end mb-10">
                            <div className="flex flex-col items-center">
                                <SignaturePlaceholder />
                                <p className="text-sm">Signature Over Printed Name of Affiant</p>
                            </div>
                        </div>

                        {/* Sworn Statement */}
                        <div className="mb-5">
                            <p>
                                <span className="pl-5 font-bold">SUBSCRIBED AND SWORN</span> to
                                before me this{" "}
                                <input
                                    type="text"
                                    name="swornDay"
                                    value={formData.page10.swornDay}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center w-[100px] ${errors.swornDay ? "input-error" : ""
                                        }`}
                                />{" "}
                                day of{" "}
                                <input
                                    type="text"
                                    name="swornMonth"
                                    value={formData.page10.swornMonth}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center ${errors.swornMonth ? "input-error" : ""
                                        }`}
                                />
                                ,{" "}
                                <input
                                    type="text"
                                    name="swornYear"
                                    value={formData.page10.swornYear}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center w-[300px] ${errors.swornYear ? "input-error" : ""
                                        }`}
                                />{" "}
                                at{" "}
                                <input
                                    type="text"
                                    name="swornPlace"
                                    value={formData.page10.swornPlace}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center w-[300px] ${errors.swornPlace ? "input-error" : ""
                                        }`}
                                />{" "}
                                issued on{" "}
                                <input
                                    type="text"
                                    name="swornIssuedOn"
                                    value={formData.page10.swornIssuedOn}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center w-[300px] ${errors.swornIssuedOn ? "input-error" : ""
                                        }`}
                                />
                                ,{" "}
                                <input
                                    type="text"
                                    name="swornIssuedAt"
                                    value={formData.page10.swornIssuedAt}
                                    onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                    className={`border-b border-b-black outline-none text-center w-[300px] ${errors.swornIssuedAt ? "input-error" : ""
                                        }`}
                                />
                                .
                            </p>
                        </div>

                        {/* Administering Officer */}
                        <div className="mb-3">
                            <div className="flex justify-evenly gap-3">
                                <div className="flex flex-col items-center">
                                    <SignaturePlaceholder />
                                    <p className="text-sm">Signature of the Administering Officer</p>
                                    <input
                                        type="text"
                                        name="administeringOfficerName"
                                        value={formData.page10.administeringOfficerName}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center w-[300px] ${errors.administeringOfficerName ? "input-error" : ""
                                            }`}
                                    />
                                    <p className="text-sm">Name in Print</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <input
                                        type="text"
                                        name="officerPosition"
                                        value={formData.page10.officerPosition}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center w-[300px] ${errors.officerPosition ? "input-error" : ""
                                            }`}
                                    />
                                    <p className="text-sm">Position/Title/Designation</p>
                                    <input
                                        type="text"
                                        name="officerAddress"
                                        value={formData.page10.officerAddress}
                                        onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        className={`border-b border-b-black outline-none text-center w-[300px] ${errors.officerAddress ? "input-error" : ""
                                            }`}
                                    />
                                    <p className="text-sm">Address</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 11 && (
                    <>
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
                    </>
                )}
                <Divider text={pageTitles[(currentPage) - 1]} />
            </form>

            <div className="flex justify-center items-center space-x-4 pb-8">
                {/* Previous Button */}
                <button
                    type="button"
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                >
                    <i className="fa-solid fa-angles-left"></i>
                </button>

                {/* Page Number Display */}
                <span className="font-semibold">
                    {currentPage} / {pageTitles.length}
                </span>

                {/* Next Button */}
                <button
                    type="button"
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === pageTitles.length}
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </>
    );
}
