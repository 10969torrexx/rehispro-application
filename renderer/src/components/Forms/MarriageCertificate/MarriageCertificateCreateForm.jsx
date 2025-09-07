import React from 'react';
import SignaturePad from 'react-signature-canvas';
import { useState, useRef  } from "react";
import { toast } from "react-toastify";
import { ErrorMessages } from '@components';
import { MarriageCertValidation } from '@services';

export default function MarriageCertificateCreateForm() {
    // Handles the Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    // Handles FormData
    const [formData, setFormData] = useState({
        // Page 1 - Validation
        page1: {
            // Province, City and Registry No.
            province: "",
            city: "",
            registry: "",

            // Husband Information
            husbandFirstName: "",
            husbandMiddleName: "",
            husbandLastName: "",
            husbandBirthDate: "",
            husbandBirthCtiy: "",
            husbandBirthProvince: "",
            husbandBirthCountry: "",
            
            // Wife Information
            wifeFirstName: "",
            wifeMiddleName: "",
            wifeLastName: "",
            wifeBirthDate: "",
            wifeBirthCity: "",
            wifeBirthProvince: "",
            wifeBirthCountry: "",
        }
    });
    
    // Handles Input Change on Pages
    const handleInputChange = (event, section) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
        const updatedSection = {
        ...prevData[section],
        [name]: value,
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
        if(direction === "next"){
            const response = MarriageCertValidation.validateForm(formData[`page${currentPage}`], currentPage);

            if (Object.keys(response).length > 0) {
                setErrors(response);
                toast.error("Please fix the errors in the form.");
            } else {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, pageTitles.length));
            }
            
        }else if (direction === 'prev') {
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

    // Handles for Husband and Wife's Signature
    const sigHusbandRef = useRef({});
    const sigWifeRef = useRef({});

    const clearHusband = () => sigHusbandRef.current.clear();
    const clearWife = () => sigWifeRef.current.clear();

    return (
        <>
            <form className="p-4 h-full">
                {currentPage === 1 && (
                    <>
                        <div div className="w-full flex items-center gap-2 mb-3">
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
                                            className={`w-full common-input ${errors.husbandBirthCtiy ? 'input-error' : ''}`}
                                            value={formData.page1.husbandBirthCtiy}
                                            onChange={(e) => handleInputChange(e, `page${currentPage}`)}
                                        />
                                        {errors.husbandBirthCtiy && <ErrorMessages errors={errors.husbandBirthCtiy} />}
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
                                        <select name="husbandSex" className="w-full common-input" >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label>Citizenship</label>
                                        <input name="husbandCitizenship" className="w-full common-input" placeholder="Citizenship"/>
                                    </div>
                                </div>

                                {/* Residence */}
                                <span>
                                    <p>5. Residence</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="husbandBarangay" className="w-full common-input" placeholder="House No., St., Barangay"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandCity" className="w-full common-input" placeholder="City/Municipality"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandProvince" className="w-full common-input" placeholder="Province"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandCountry" className="w-full common-input" placeholder="Country"/>
                                    </div>
                                </div>

                                {/* Religion/Religious sect */}
                                <span>
                                    <p>6. Religion/Religous sect</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input type="text" name="husbandReligion" className="w-full common-input" placeholder="Religion/Religious sect"/>
                                </div>

                                {/* Civil Status */}
                                <span>
                                    <p>7. Civil Status</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input type="text" name="husbandCivilStatus" className="w-full common-input" placeholder="Civil Status"/>
                                </div>

                                {/* Name of Father */}
                                <span>
                                    <p>8. Name of Father</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="husbandFatherNameFirst" className="w-full common-input" placeholder="First"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandFatherNameMiddle" className="w-full common-input" placeholder="Middle"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandFatherNameLast" className="w-full common-input" placeholder="Last"/>
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
                                        <select name="wifeSex" className="w-full common-input" >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label>Citizenship</label>
                                        <input name="wifeCitizenship" className="w-full common-input" placeholder="Citizenship"/>
                                    </div>
                                </div>

                                {/* Residence */}
                                <span className="invisible">
                                    <p>5. Residence</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="wifeBarangay" className="w-full common-input" placeholder="House No., St., Barangay"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeCity" className="w-full common-input" placeholder="City/Municipality"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeProvince" className="w-full common-input" placeholder="Province"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeCountry" className="w-full common-input" placeholder="Country"/>
                                    </div>
                                </div>

                                {/* Religion/Religious sect */}
                                <span className="invisible">
                                    <p>6. Religion/Religous sect</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input type="text" name="wifeReligion" className="w-full common-input" placeholder="Religion/Religious sect"/>
                                </div>

                                {/* Civil Status */}
                                <span className="invisible">
                                    <p>7. Civil Status</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input type="text" name="wifeCivilStatus" className="w-full common-input" placeholder="Civil Status"/>
                                </div>

                                {/* Name of Father */}
                                <span className="invisible">
                                    <p>8. Name of Father</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="wifeFatherNameFirst" className="w-full common-input" placeholder="First"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeFatherNameMiddle" className="w-full common-input" placeholder="Middle"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeFatherNameLast" className="w-full common-input" placeholder="Last"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 3 && (
                    <>
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
                                        <label>Citizenship</label>
                                        <input name="husbandFatherCitizenship" className="w-full common-input" placeholder="Citizenship"/>
                                    </div>
                                </div>

                                {/* Maiden Name of Mother */}
                                <span>
                                    <p>10. Maiden Name of Mother</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="husbandMotherNameFirst" className="w-full common-input" placeholder="First"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandMotherNameMiddle" className="w-full common-input" placeholder="Middle"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandMotherNameLast" className="w-full common-input" placeholder="Last"/>
                                    </div>
                                </div>

                                {/* Mother Citizenship */}
                                <span>
                                    <p>11. Mother Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>Citizenship</label>
                                        <input name="husbandMotherCitizenship" className="w-full common-input" placeholder="Citizenship"/>
                                    </div>
                                </div>

                                {/* Name of Person/Wall Who Gave Consent or Advice */}
                                <span>
                                    <p>12. Name of Person/Wall Who Gave Consent or Advice</p>
                                </span>
                                <div className="flex items-center mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentNameFirst" className="w-full common-input" placeholder="First"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentNameMiddle" className="w-full common-input" placeholder="Middle"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentNameLast" className="w-full common-input" placeholder="Last"/>
                                    </div>
                                </div>

                                {/* Relationship */}
                                <span>
                                    <p>13. Relationship</p>
                                </span>
                                <div className="w-full flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="husbandRelationship" className="w-full common-input" placeholder="Relationship"/>
                                    </div>
                                </div>

                                {/* Residence */}
                                <span>
                                    <p>14. Residence</p>
                                </span>
                                <div className="w-full flex items-center gap-1 mt-1">
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentPersonBarangay" className="w-full common-input" placeholder="House No., St., Barangay"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentPersonCity" className="w-full common-input" placeholder="City/Municipality"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentPersonProvince" className="w-full common-input" placeholder="Province"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="husbandConsentPersonCountry" className="w-full common-input" placeholder="Country"/>
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
                                        <label>Citizenship</label>
                                        <input name="wifeFatherCitizenship" className="w-full common-input" placeholder="Citizenship"/>
                                    </div>
                                </div>

                                {/* Maiden Name of Mother */}
                                <span className="invisible">
                                    <p>10. Maiden Name of Mother</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="wifeMotherNameFirst" className="w-full common-input" placeholder="First"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeMotherNameMiddle" className="w-full common-input" placeholder="Middle"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeMotherNameLast" className="w-full common-input" placeholder="Last"/>
                                    </div>
                                </div>

                                {/* Mother Citizenship */}
                                <span className="invisible">
                                    <p>11. Mother Citizenship</p>
                                </span>
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>Citizenship</label>
                                        <input name="wifeMotherCitizenship" className="w-full common-input" placeholder="Citizenship"/>
                                    </div>
                                </div>


                                 {/* Name of Person/Wall Who Gave Consent or Advice */}
                                <span className="invisible">
                                    <p>12. Name of Person/Wall Who Gave Consent or Advice</p>
                                </span>
                                <div className="flex items-center mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentNameFirst" className="w-full common-input" placeholder="First"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentNameMiddle" className="w-full common-input" placeholder="Middle"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentNameLast" className="w-full common-input" placeholder="Last"/>
                                    </div>
                                </div>

                                {/* Relationship */}
                                <span className="invisible">
                                    <p>13. Relationship</p>
                                </span>
                                <div className="w-full flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <input type="text" name="wifeRelationship" className="w-full common-input" placeholder="Relationship"/>
                                    </div>
                                </div>

                                {/* Residence */}
                                <span className="invisible">
                                    <p>14. Residence</p>
                                </span>
                                <div className="w-full flex items-center gap-1 mt-1">
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentPersonBarangay" className="w-full common-input" placeholder="House No., St., Barangay"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentPersonCity" className="w-full common-input" placeholder="City/Municipality"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentPersonProvince" className="w-full common-input" placeholder="Province"/>
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="wifeConsentPersonCountry" className="w-full common-input" placeholder="Country"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 4 && (
                    <>
                        {/* Place of Marriage */}
                        <span>
                            <p>15. Place of Marriage</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>Office of the/House of/Barangay of/Church of/Mosque (City/Municipality) (Province) </label>
                                <input type="text" name="placeOfMarriage" className="w-full common-input" placeholder="Office of the/House of/Barangay of/Church of/Mosque (City/Municipality) (Province)"/>
                            </div>
                        </div>

                        {/* Date and Time of Marriage */}
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>16. Date of Marriage</label>
                                <input
                                    type="date"
                                    name="dateOfMarriage"
                                    className="w-full common-input"
                                />
                            </div>
                            <div className="w-full">
                                <label>17. Time of Marriage</label>
                                <input
                                    type="time"
                                    name="timeOfMarriage"
                                    className="w-full common-input"
                                />
                            </div>
                        </div>

                        {/* Certification of the contracting parties */}
                        <span>
                            <p>18. Certification of the Contracting Parties</p>
                        </span>
                        <div className="text-sm leading-relaxed border border-pink-300 p-3 rounded mt-1 mb-3">
                            <p>
                                THIS IS TO CERTIFY: That I, 
                                <input type="text" name="certHusbandName" className="border-b border-gray-500 mx-2 w-40 text-center" /> 
                                and I, 
                                <input type="text" name="certWifeName" className="border-b border-gray-500 mx-2 w-40 text-center" />, 
                                both of legal age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witnesses named below, take each other as husband and wife and certifying further that we:
                            </p>

                            <p className="mt-2">
                                <label className="mx-2">
                                    <input type="radio" name="marriageSettlement" value="entered" className="mr-1" />
                                    have entered, a copy of which is hereto attached
                                </label>
                                /
                                <label className="mx-2">
                                    <input type="radio" name="marriageSettlement" value="notEntered" className="mr-1" />
                                    have not entered into a marriage settlement.
                                </label>
                            </p>

                            <p className="mt-2">
                                IN WITNESS WHEREOF, we have signed/marked with our fingerprint this certificate in quadruplicate this 
                                <input type="text" name="certDay" className="border-b border-gray-500 mx-2 w-12 text-center" /> 
                                day of 
                                <input type="text" name="certMonth" className="border-b border-gray-500 mx-2 w-28 text-center" /> 
                                <input type="text" name="certYear" className="border-b border-gray-500 mx-2 w-16 text-center" />.
                            </p>

                            <div className="flex justify-evenly items-center mt-4">
                                {/* Husband signature */}
                                <div className="flex flex-col items-center">
                                    <SignaturePad
                                        ref={sigHusbandRef}
                                        penColor="black"
                                        canvasProps={{ width: 300, height: 100, className: "border border-gray-500 rounded" }}
                                    />
                                    <button type="button" onClick={clearHusband} className="text-xs mt-1 text-blue-500">Clear</button>
                                    <label className="text-center mt-1">(Signature of Husband)</label>
                                </div>

                                {/* Wife signature */}
                                <div className="flex flex-col items-center">
                                    <SignaturePad
                                        ref={sigWifeRef}
                                        penColor="black"
                                        canvasProps={{ width: 300, height: 100, className: "border border-gray-500 rounded" }}
                                    />
                                    <button type="button" onClick={clearWife} className="text-xs mt-1 text-blue-500">Clear</button>
                                    <label className="text-center mt-1">(Signature of Wife)</label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 5 && (
                    <>
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
                        <div className="mt-2 space-y-2 pl-10">
                            <label className="flex items-start gap-2">
                                <input type="checkbox" name="certification" value="license" className="mt-1" />
                                <span>
                                    a. Marriage License No.{" "}
                                    <input
                                    type="text"
                                    name="marriageLicenseNo"
                                    className="border-b border-gray-500 w-32 text-center mx-1"
                                    />{" "}
                                    issued on{" "}
                                    <input
                                    type="text"
                                    name="marriageIssuedOn"
                                    className="border-b border-gray-500 w-32 text-center mx-1"
                                    />{" "}
                                    at{" "}
                                    <input
                                    type="text"
                                    name="marriageIssuedAt"
                                    className="border-b border-gray-500 w-48 text-center mx-1"
                                    />{" "}
                                    in favor of said parties, was exhibited to me.
                                </span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="certification" value="noLicense" />
                                b. No marriage license was necessary, the marriage being solemnized under Art.{" "}
                                <input
                                type="text"
                                name="executiveOrder"
                                className="border-b border-gray-500 w-16 text-center mx-1"
                                />{" "}
                                of Executive Order No. 209.
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="certification" value="pd1083" />
                                c. The marriage was solemnized in accordance with the provisions of Presidential Decree No. 1083.
                            </label>
                        </div>

                        {/* Signature fields */}
                        <div className="flex justify-evenly items-center mt-6">
                        <div className="flex flex-col items-center">
                            <input
                            type="text"
                            name="solemnizingOfficerName"
                            className="w-56 border-b border-gray-500 text-center"
                            />
                            <label className="text-xs text-center mt-1">
                            (Signature Over Printed Name of Solemnizing Officer)
                            </label>
                        </div>

                        <div className="flex flex-col items-center">
                            <input
                            type="text"
                            name="officerPosition"
                            className="w-40 border-b border-gray-500 text-center"
                            />
                            <label className="text-xs text-center mt-1">(Position/Designation)</label>
                        </div>

                        <div className="flex flex-col items-center">
                            <input
                            type="text"
                            name="officerReligion"
                            className="w-56 border-b border-gray-500 text-center"
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
                                <input
                                    type="text"
                                    name="witness1Signature"
                                    className="w-56 border-b border-gray-500 text-center"
                                />
                                <label className="text-xs mt-1">(Signature of Witness 1)</label>
                                <input
                                    type="text"
                                    name="witness1Name"
                                    placeholder="Name in Print"
                                    className="w-56 border-b border-gray-500 text-center mt-2"
                                />
                                </div>

                                <div className="flex flex-col items-center">
                                <input
                                    type="text"
                                    name="witness2Signature"
                                    className="w-56 border-b border-gray-500 text-center"
                                />
                                <label className="text-xs mt-1">(Signature of Witness 2)</label>
                                <input
                                    type="text"
                                    name="witness2Name"
                                    placeholder="Name in Print"
                                    className="w-56 border-b border-gray-500 text-center mt-2"
                                />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 6 && (
                    <>
                        {/* 21. Received By */}
                        <span>
                            <p>21. Received By</p>
                        </span>
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="flex flex-col items-center space-y-2">
                                <input
                                type="text"
                                name="receivedBySignature"
                                placeholder="Signature"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                                <input
                                type="text"
                                name="receivedByName"
                                placeholder="Name in Print"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                                <input
                                type="text"
                                name="receivedByTitle"
                                placeholder="Title or Position"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                                <input
                                type="date"
                                name="receivedByDate"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                            </div>
                        </div>

                        {/* 22. Registered by the Civil Registrar */}
                        <span>
                            <p>22. Registered by the Civil Registrar</p>
                        </span>
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="flex flex-col items-center space-y-2">
                                <input
                                type="text"
                                name="registrarSignature"
                                placeholder="Signature"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                                <input
                                type="text"
                                name="registrarName"
                                placeholder="Name in Print"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                                <input
                                type="text"
                                name="registrarTitle"
                                placeholder="Title or Position"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                                <input
                                type="date"
                                name="registrarDate"
                                className="w-56 border-b border-gray-500 text-center"
                                />
                            </div>
                        </div>

                        {/* Remarks/Annotations */}
                        <span>
                            <p className='font-semibold'>REMARKS/ANNOTATIONS (For LCRO/OCRG/Shari'a Circuit Registrar use only.)</p>
                        </span>
                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <textarea name="remarksAnnotation" className='w-full common-textarea' rows="3"></textarea>
                        </div>

                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <h3 className='text-md font-semibold'>TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR</h3>
                            <input type="text" name='civilRegistrar' className='w-full common-input'/>
                        </div>
                    </>
                )}

                {currentPage === 7 && (
                    <>
                        {/* 20a. Witnesses */}
                        <span>
                        <p>20b. Witnesses (Print Name and Sign)</p>
                        </span>

                        <div className="border border-pink-300 p-3 rounded mb-3">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col items-center">
                                <input
                                    type="text"
                                    name="witness3Signature"
                                    className="w-56 border-b border-gray-500 text-center"
                                />
                                <label className="text-xs mt-1">(Signature of Witness 1)</label>
                                <input
                                    type="text"
                                    name="witness3Name"
                                    placeholder="Name in Print"
                                    className="w-56 border-b border-gray-500 text-center mt-2"
                                />
                                </div>

                                <div className="flex flex-col items-center">
                                <input
                                    type="text"
                                    name="witness4Signature"
                                    className="w-56 border-b border-gray-500 text-center"
                                />
                                <label className="text-xs mt-1">(Signature of Witness 2)</label>
                                <input
                                    type="text"
                                    name="witness4Name"
                                    placeholder="Name in Print"
                                    className="w-56 border-b border-gray-500 text-center mt-2"
                                />
                                </div>
                            </div>
                        </div>

                        <h3 className='block text-center font-semibold'>AFFIDAVIT OF SOLEMNIZING OFFICER</h3>

                        <div className='mt-1 mb-3'>
                            <p>
                                I, <input type="text" className='border-b border-b-black outline-none'/>, of legal age, Solemnizing Officer of <input type="text" className='border-b border-b-black outline-none'/> with address at <input type="text" className='border-b border-b-black outline-none'/>, after having sworn to in accordance with law, do hereby depose and say:
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Statement 1 */}
                            <p>
                                1. That I have solemnized the marriage between{" "}
                                <input
                                type="text"
                                className="border-b border-black outline-none px-1 w-40"
                                />{" "}
                                and{" "}
                                <input
                                type="text"
                                className="border-b border-black outline-none px-1 w-40"
                                />
                                ;
                            </p>

                            {/* Statement 2 */}
                            <div className="flex gap-2">
                                <p>2.</p>
                                <div className="flex flex-col gap-3">
                                    {/* 2a */}
                                    <label className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-1 scale-125" />
                                        <span>
                                        a. That I have ascertained the qualifications of contracting parties
                                        and have found no legal impediment for them to marry as required by
                                        Article 34 of the Family Code.
                                        </span>
                                    </label>

                                    {/* 2b */}
                                    <label className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-1 scale-125" />
                                        <span>
                                        b. That this marriage was performed in <i>articulo mortis</i> or at
                                        the point of death.
                                        </span>
                                    </label>

                                    {/* 2c */}
                                    <label className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-1 scale-125" />
                                        <span>
                                        c. That the contracting party/ies{" "}
                                        <input
                                            type="text"
                                            className="border-b border-black outline-none px-1 w-40"
                                        />{" "}
                                        and{" "}
                                        <input
                                            type="text"
                                            className="border-b border-black outline-none px-1 w-40"
                                        />
                                        , being at the point of death and physically unable to sign the
                                        foregoing certificate of marriage by signature or mark, one of the
                                        witnesses to the marriage sign for him or her by writing the dying
                                        party's name and beneath it, the witness' own signature preceded by
                                        the preposition "By".
                                        </span>
                                    </label>

                                    {/* 2d */}
                                    <label className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-1 scale-125" />
                                        <span>
                                        d. That the residence of either party is so located that there is no means of transportation to enable concerned party/parties to appear personally before the civil registrar;
                                        </span>
                                    </label>

                                    {/* 2e */}
                                    <label className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-1 scale-125" />
                                        <span>
                                        e. That the marriage was among Muslims or among members of the Ethnic Cultural Communities and that the marriage was solemnized in accordance with their customs and practices;
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 8 && (
                    <>
                        <div className="space-y-4 mb-3">
                            {/* Statement 3 */}
                            <p>3. That I look the necessary steps to ascertain the ages and relationship of contracting parties and that neither of them are under any legal impediment to marry each other;</p>
                            
                            {/* Statement 4 */}
                            <p>4. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.</p>
                        </div>

                        <div className='mb-3'>
                            <p>In truth whereof, I have affixed my signature below this <input type="text" className='border-b border-black outline-none w-[50px]'/>{''}day of{''}<input type="text" className='border-b border-black outline-none'/>,{''}<input type="text" className='border-b border-black outline-none'/>{''}at<input type="text" className='border-b border-black outline-none'/>{''}, Philippines.</p>
                        </div>

                        <div className='w-full flex justify-end mb-3'>
                            <div className=' flex flex-col items-center'>
                                <input type="text" className='border-b border-black outline-none w-[300px]'/>
                                <p className='text-xs'>Signature Over Printed Name of the Solemnizing Officer</p>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p><span>SUBSCRIBED AND SWORN</span> to before me this{' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '} day of {' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '}, {' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '} at {' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '} issued on {' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '}, {' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '} at {' '}<input type="text" className='border-b border-b-black outline-none text-center'/>{' '}.</p>
                        </div>

                        <div className='flex justify-around items-center mb-3'>
                            <div className=' flex flex-col items-center mb-3'>
                                <input type="text" className='border-b border-black outline-none w-[300px]'/>
                                <p className='text-xs'>Signature of the Administering Officer</p>
                                <input type="text" className='border-b border-black outline-none w-[300px]'/>
                                <p className='text-xs'>Name in Print</p>
                            </div>
                            <div className=' flex flex-col items-center mb-3'>
                                <input type="text" className='border-b border-black outline-none w-[300px]'/>
                                <p className='text-xs'>Position/Title/Designation</p>
                                <input type="text" className='border-b border-black outline-none w-[300px]'/>
                                <p className='text-xs'>Address</p>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 9 && (
                    <>
                        <h3 className='block text-center font-semibold'>AFFIDAVIT FOR DELAYED REGISTRATION OF MARRIAGE</h3>

                        <div className='mt-2 mb-5'>
                            <p>I, <input type="text" className='border-b border-b-black outline-none text-center'/>{' '}, of legal age, single/married/divorced/widow/widower, with residence and postal address <input type="text" className='border-b border-b-black outline-none text-center'/>{' '}, after having duly sworn in accordance with law do hereby depose and say:</p>
                        </div>

                        <div className='space-y-4 mb-3'>
                            {/* Statement 1 */}
                            <div className="flex flex-col mb-3">
                                <p>1. That I am the applicant for the delayed registration of</p>
                                <label className='flex items-center gap-2'>
                                    <input type="checkbox" className='scale-125'/>
                                    my marriage with <input type="text" className='border-b border-b-black outline-none text-center'/>{' '} in <input type="text" className='border-b border-b-black outline-none text-center'/>{' '} on <input type="text" className='border-b border-b-black outline-none text-center'/>{' '}.
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="checkbox" className='scale-125'/>
                                    my marriage between <input type="text" className='border-b border-b-black outline-none text-center'/>{' '} in <input type="text" className='border-b border-b-black outline-none text-center'/>{' '} on <input type="text" className='border-b border-b-black outline-none text-center'/>{' '}.
                                </label>
                            </div>

                            {/* Statement 2 */}
                            <div className="flex flex-col mb-3">
                                <p>2. That said marriage was solemnized by <input type="text" className='border-b border-b-black outline-none text-center'/>{' '} (Solemnizing Officer's name) under</p>
                                <div className='flex items-center gap-3'>
                                <label className='flex items-center gap-1'>
                                    a. <input type="checkbox" className='scale-125'/> religious ceremony
                                </label>
                                <label className='flex items-center gap-1'>
                                    b. <input type="checkbox" className='scale-125'/> civil ceremony
                                </label>
                                <label className='flex items-center gap-1'>
                                   c. <input type="checkbox" className='scale-125'/> muslim rites
                                </label>
                                <label className='flex items-center gap-1'>
                                   d. <input type="checkbox" className='scale-125'/> tribal rites
                                </label>
                                </div>
                            </div>

                            {/* Statement 3 */}
                            <div className="flex flex-col mb-3">
                                <p>3. That the marriage was solemnized:</p>
                                <label className='flex items-center gap-1'>
                                    <input type="checkbox" className='scale-125'/> a. with marriage license no. <input type="text" className='border-b border-b-black outline-none text-center'/> issued on <input type="text" className='border-b border-b-black outline-none text-center'/> at <input type="text" className='border-b border-b-black outline-none text-center'/>; 
                                </label>
                                <label className='flex items-center gap-1'>
                                    <input type="checkbox" className='scale-125'/> b. under the Article <input type="text" className='border-b border-b-black outline-none text-center'/> (marriages of exceptional character); 
                                </label>
                            </div>

                            {/* Statement 4 */}
                            <p>4. (If the applicant is either the wife or husband) That I am a citizen of <input type="text" className='border-b border-b-black outline-none text-center'/> and spouse is a citizen of <input type="text" className='border-b border-b-black outline-none text-center'/>.</p>
                            
                            {/* Statement 5 */}
                            <p>5. That the reason for the delay in registering our/their marriage is <input type="text" className='border-b border-b-black outline-none text-center'/>.</p>
                            
                            {/* Statement 6 */}
                            <div className="flex flex-col">
                                <p>6. That I am executing this affidavit to attest to the truthfullness of the foregoing statements for all legal intents and puposes.</p>
                                <span>
                                    In truth whereof, I have affixed my signature below this <input type="text" className='border-b border-b-black outline-none text-center w-[100px]'/> day of <input type="text" className='border-b border-b-black outline-none text-center'/>, <input type="text" className='border-b border-b-black outline-none text-center'/> at <input type="text" className='border-b border-b-black outline-none text-center'/>, Philippines.
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 10 && (
                    <>
                        <div className='flex justify-end mb-10'>
                            <div className='flex flex-col items-center'>
                                <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>
                                <p className='text-sm'>Signature Over Printed Name of Affiant</p>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <p><span className='pl-5 font-bold'>SUBSCRIBED AND SWORN</span> to before me this <input type="text" className='border-b border-b-black outline-none text-center w-[100px]'/>{' '} day of <input type="text" className='border-b border-b-black outline-none text-center'/>, <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/> at <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/> issued on <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>, <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/> at <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>.</p>
                        </div>

                        <div className='mb-3'>
                            <div className="flex justify-evenly gap-3">
                                <div className='flex flex-col items-center'>
                                    <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>
                                    <p className='text-sm'>Signature of the Administering Officer</p>
                                    <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>
                                    <p className='text-sm'>Name in Print</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>
                                    <p className='text-sm'>Position/Title/Designation</p>
                                    <input type="text" className='border-b border-b-black outline-none text-center w-[300px]'/>
                                    <p className='text-sm'>Address</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
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
                    {currentPage} / {totalPages}
                </span>

                {/* Next Button */}
                <button
                    type="button"
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </>
    );
}
