import SignaturePad from 'react-signature-canvas';
import { useState, useRef  } from "react";

export default function MarriageCertificateCreateForm() {
    const [husbandBirthDate, setHusbandBirthDate] = useState("");
    const [husbandAge, setHusbandAge] = useState("");
    const [wifeBirthDate, setWifeBirthDate] = useState("");
    const [wifeAge, setWifeAge] = useState("");

    // Handles the Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 14;


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

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 14;

    const handleHusbandBirthDate = (e) => {
        const value = e.target.value;
        setHusbandBirthDate(value);
        setHusbandAge(calculateAge(value));
    };

    const handleWifeBirthDate = (e) => {
        const value = e.target.value;
        setWifeBirthDate(value);
        setWifeAge(calculateAge(value));
    };

    // Handles for Husband and Wife's Signature
    const sigHusbandRef = useRef({});
    const sigWifeRef = useRef({});

    const clearHusband = () => sigHusbandRef.current.clear();
    const clearWife = () => sigWifeRef.current.clear();

    return (
        <>
            <form className="mt-5">

                {currentPage === 1 && (
                    <>
                        <div div className="w-full flex items-center gap-2 mb-3">
                            <div className="w-full">
                                <label>Province</label>
                                <input type="text" name="province" className="w-full common-input" placeholder="Province" />
                            </div>
                            <div className="w-full">
                                <label>City</label>
                                <input type="text" name="city" className="w-full common-input" placeholder="City/Municipality" />
                            </div>
                            <div className="w-full">
                                <label>Registry No.</label>
                                <input type="text" name="registry" className="w-full common-input" placeholder="Registry No." />
                            </div>
                        </div>

                        <div className="w-full flex items-stretch gap-1 mb-3">
                            {/* Husband Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Husband</h3>

                                <span>1. Name of contracting parties</span>

                                {/* Name inputs */}
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>First</label>
                                        <input type="text" name="husbandFirstName" className="w-full common-input" placeholder="First" />
                                    </div>
                                    <div className="w-full">
                                        <label>Middle</label>
                                        <input type="text" name="husbandMiddleName" className="w-full common-input" placeholder="Middle" />
                                    </div>
                                    <div className="w-full">
                                        <label>Last</label>
                                        <input type="text" name="husbandLastName" className="w-full common-input" placeholder="Last" />
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
                                        <input type="date" name="husbandBirthDate" value={husbandBirthDate} onChange={handleHusbandBirthDate} className="w-full common-input" />
                                    </div>
                                    <div className="w-full">
                                        <label>Age</label>
                                        <input type="text" name="husbandAge" value={husbandAge} className="w-full common-input" placeholder="Age" readOnly />
                                    </div>
                                </div>

                                {/* Place of Birth */}
                                <span>
                                    <p>3. Place of Birth</p>
                                </span>

                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>City/Municipality</label>
                                        <input type="text" name="husbandBirthCity" className="w-full common-input" placeholder="City/Municipality" />
                                    </div>
                                    <div className="w-full">
                                        <label>Province</label>
                                        <input type="text" name="husbandBirthProvince" className="w-full common-input" placeholder="Province" />
                                    </div>
                                    <div className="w-full">
                                        <label>Country</label>
                                        <input type="text" name="husbandBirthCountry" className="w-full common-input" placeholder="Country" />
                                    </div>
                                </div>
                            </div>

                            {/* Wife Column */}
                            <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                                <h3 className="text-center font-semibold mb-3">Wife</h3>

                                {/* Name label (empty but keeps alignment) */}
                                <span className="invisible">1. Name of contracting parties</span>

                                {/* Name inputs */}
                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>First</label>
                                        <input type="text" name="wifeFirstName" className="w-full common-input" placeholder="First" />
                                    </div>
                                    <div className="w-full">
                                        <label>Middle</label>
                                        <input type="text" name="wifeMiddleName" className="w-full common-input" placeholder="Middle" />
                                    </div>
                                    <div className="w-full">
                                        <label>Last</label>
                                        <input type="text" name="wifeLastName" className="w-full common-input" placeholder="Last" />
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
                                        <input type="date" name="wifeBirthDate" value={wifeBirthDate} onChange={handleWifeBirthDate} className="w-full common-input" />
                                    </div>
                                    <div className="w-full">
                                        <label>Age</label>
                                        <input type="text" name="wifeAge" value={wifeAge} className="w-full common-input" placeholder="Age" readOnly />
                                    </div>
                                </div>

                                {/* Place of Birth */}
                                <span className="invisible">
                                    <p>3. Place of Birth</p>
                                </span>

                                <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="w-full">
                                        <label>City/Municipality</label>
                                        <input type="text" name="wifeBirthCity" className="w-full common-input" placeholder="City/Municipality" />
                                    </div>
                                    <div className="w-full">
                                        <label>Province</label>
                                        <input type="text" name="wifeBirthProvince" className="w-full common-input" placeholder="Province" />
                                    </div>
                                    <div className="w-full">
                                        <label>Country</label>
                                        <input type="text" name="wifeBirthCountry" className="w-full common-input" placeholder="Country" />
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
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="certification" value="license" />
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
                    </>
                )}
            </form>

            <div className="flex justify-center items-center gap-4">
                {/* Previous Button */}
                <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </>

    );
}
