import { useEffect } from 'react';
import { SignaturePlaceholder } from '@components';
import { MarriageCertServices } from "@services";
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function MarriageCertificateView({ row }) {
    const [loading, setLoading] = useState(true);
    const [marriage, setMarriage] = useState({});
    console.log(row.id);

    useEffect(() => {
      if (!row) return; // ✅ avoid undefined
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await MarriageCertServices.viewMarriageCertificate(row.id);
          if (response && response.success && response.data) {
            setMarriage(response.data);
          } else {
            toast.error(response?.message || "Failed to load marriage certificates");
          }
        } catch (error) {
          toast.error(error.message || "Failed to fetch marriage certificates");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [row]); // ✅ re-fetch if row changes

    return (
        <>
            <form className="p-4 h-full mb-4 max-w-4xl mx-auto">
                {/* Page 1 */}
                <div className="w-full flex items-center gap-2 mb-3">
                    <div className="w-full">
                        <label>Province</label>
                        <input
                            type="text"
                            name="province"
                            placeholder="Province"
                            className="w-full common-input"
                            value={marriage.province || ""}
                            readOnly
                        />
                    </div>
                    <div className="w-full">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City/Municipality"
                            className="w-full common-input"
                            value={marriage.city || ""}
                            readOnly
                        />
                    </div>
                    <div className="w-full">
                        <label>Registry No.</label>
                        <input
                            type="text"
                            name="registry"
                            placeholder="Registry No."
                            className="w-full common-input"
                            value={marriage.registry || ""}
                            readOnly
                        />
                    </div>
                </div>
    
                <div className="w-full flex items-stretch gap-1 mb-3">
                    {/* Husband Column */}
                    <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                        <h3 className="text-center font-semibold mb-3">Husband</h3>
    
                        <span>1. Name of contracting parties</span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>First</label>
                                <input
                                    type="text"
                                    name="husbandFirstName"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.husband_first_name || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Middle</label>
                                <input
                                    type="text"
                                    name="husbandMiddleName"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.husband_middle_name || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Last</label>
                                <input
                                    type="text"
                                    name="husbandLastName"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.husband_last_name || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>2. Date of birth and Age</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="husbandBirthDate"
                                    className="w-full common-input"
                                    value={marriage.husband_birth_date || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Age</label>
                                <input
                                    type="text"
                                    name="husbandAge"
                                    placeholder="Age"
                                    className="w-full common-input"
                                    value={marriage.husband_age || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>3. Place of Birth</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>City/Municipality</label>
                                <input
                                    type="text"
                                    name="husbandBirthCity"
                                    placeholder="City/Municipality"
                                    className="w-full common-input"
                                    value={marriage.husband_birth_city || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Province</label>
                                <input
                                    type="text"
                                    name="husbandBirthProvince"
                                    placeholder="Province"
                                    className="w-full common-input"
                                    value={marriage.husband_birth_province || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Country</label>
                                <input
                                    type="text"
                                    name="husbandBirthCountry"
                                    placeholder="Country"
                                    className="w-full common-input"
                                    value={marriage.husband_birth_country || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
    
                    {/* Wife Column */}
                    <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                        <h3 className="text-center font-semibold mb-3">Wife</h3>
    
                        <span className="invisible">1. Name of contracting parties</span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>First</label>
                                <input
                                    type="text"
                                    name="wifeFirstName"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.wife_first_name || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Middle</label>
                                <input
                                    type="text"
                                    name="wifeMiddleName"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.wife_middle_name || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Last</label>
                                <input
                                    type="text"
                                    name="wifeLastName"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.wife_last_name || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>2. Date of birth and Age</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="wifeBirthDate"
                                    className="w-full common-input"
                                    value={marriage.wife_birth_date || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Age</label>
                                <input
                                    type="text"
                                    name="wifeAge"
                                    placeholder="Age"
                                    className="w-full common-input"
                                    value={marriage.wife_age || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
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
                                    className="w-full common-input"
                                    value={marriage.wife_birth_city || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Province</label>
                                <input
                                    type="text"
                                    name="wifeBirthProvince"
                                    placeholder="Province"
                                    className="w-full common-input"
                                    value={marriage.wife_birth_province || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label>Country</label>
                                <input
                                    type="text"
                                    name="wifeBirthCountry"
                                    placeholder="Country"
                                    className="w-full common-input"
                                    value={marriage.wife_birth_country || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Page 2 */}
                <div className="w-full flex items-stretch gap-1 mb-3">
                    {/* Husband Column */}
                    <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                        <h3 className="text-center font-semibold mb-3">Husband</h3>
                        <span>
                            <p>4. Sex and Citizenship</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>Sex</label>
                                <select
                                    name="husbandSex"
                                    className="common-input w-full"
                                    value={marriage.husband_sex || ""}
                                    disabled
                                >
                                    <option value="">Select sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label>Citizenship</label>
                                <input
                                    type="text"
                                    name="husbandCitizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={marriage.husband_citizenship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>5. Residence</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandResidenceBarangay"
                                    placeholder="House No., St., Barangay"
                                    className="w-full common-input"
                                    value={marriage.husband_residence_barangay || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandResidenceCity"
                                    placeholder="City/Municipality"
                                    className="w-full common-input"
                                    value={marriage.husband_residence_city || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandResidenceProvince"
                                    placeholder="Province"
                                    className="w-full common-input"
                                    value={marriage.husband_residence_province || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandResidenceCountry"
                                    placeholder="Country"
                                    className="w-full common-input"
                                    value={marriage.husband_residence_country || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <div className="flex items-center gap-1">
                            <div>
                                <span>
                                    <p>6. Religion/Religious sect</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input
                                        type="text"
                                        name="husbandReligion"
                                        placeholder="Religion/Religious sect"
                                        className="w-full common-input"
                                        value={marriage.husband_religion || ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <span>
                                    <p>7. Civil Status</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input
                                        type="text"
                                        name="husbandCivilStatus"
                                        placeholder="Civil Status"
                                        className="w-full common-input"
                                        value={marriage.husband_civil_status || ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
    
                        <span>
                            <p>8. Name of Father</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandFatherNameFirst"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.husband_father_name_first || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandFatherNameMiddle"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.husband_father_name_middle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandFatherNameLast"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.husband_father_name_last || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
    
                    {/* Wife Column */}
                    <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                        <h3 className="text-center font-semibold mb-3">Wife</h3>
                        <span className="invisible">
                            <p>4. Sex and Citizenship</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <label>Sex</label>
                                <select
                                    name="wifeSex"
                                    className="common-input w-full"
                                    value={marriage.wife_sex || ""}
                                    disabled
                                >
                                    <option value="">Select sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label>Citizenship</label>
                                <input
                                    type="text"
                                    name="wifeCitizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={marriage.wife_citizenship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>5. Residence</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeResidenceBarangay"
                                    placeholder="House No., St., Barangay"
                                    className="w-full common-input"
                                    value={marriage.wife_residence_barangay || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeResidenceCity"
                                    placeholder="City/Municipality"
                                    className="w-full common-input"
                                    value={marriage.wife_residence_city || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeResidenceProvince"
                                    placeholder="Province"
                                    className="w-full common-input"
                                    value={marriage.wife_residence_province || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeResidenceCountry"
                                    placeholder="Country"
                                    className="w-full common-input"
                                    value={marriage.wife_residence_country || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <div className="flex items-center gap-1">
                            <div>
                                <span className="invisible">
                                    <p>6. Religion/Religious sect</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input
                                        type="text"
                                        name="wifeReligion"
                                        placeholder="Religion/Religious sect"
                                        className="w-full common-input"
                                        value={marriage.wife_religion || ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <span className="invisible">
                                    <p>7. Civil Status</p>
                                </span>
                                <div className="w-full mt-1 mb-3">
                                    <input
                                        type="text"
                                        name="wifeCivilStatus"
                                        placeholder="Civil Status"
                                        className="w-full common-input"
                                        value={marriage.wife_civil_status || ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>8. Name of Father</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeFatherNameFirst"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.wife_father_name_first || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeFatherNameMiddle"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.wife_father_name_middle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeFatherNameLast"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.wife_father_name_last || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Page 3 */}
                <div className="w-full flex items-stretch gap-1 mb-3">
                    {/* Husband Column */}
                    <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                        <h3 className="text-center font-semibold mb-3">Husband</h3>
                        <span>
                            <p>9. Father Citizenship</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandFatherCitizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={marriage.husband_father_citizenship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>10. Maiden Name of Mother</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandMotherNameFirst"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.husband_mother_name_first || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandMotherNameMiddle"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.husband_mother_name_middle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandMotherNameLast"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.husband_mother_name_last || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>11. Mother Citizenship</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandMotherCitizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={marriage.husband_mother_citizenship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>12. Name of Person Who Gave Consent or Advice</p>
                        </span>
                        <div className="flex flex-col items-center mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentNameFirst"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_name_first || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentNameMiddle"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_name_middle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentNameLast"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_name_last || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>13. Relationship</p>
                        </span>
                        <div className="w-full flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandRelationship"
                                    placeholder="Relationship"
                                    className="w-full common-input"
                                    value={marriage.husband_relationship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span>
                            <p>14. Residence</p>
                        </span>
                        <div className="w-full flex flex-col items-center gap-1 mt-1">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentPersonBarangay"
                                    placeholder="House No., St., Barangay"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_person_barangay || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentPersonCity"
                                    placeholder="City/Municipality"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_person_city || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentPersonProvince"
                                    placeholder="Province"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_person_province || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="husbandConsentPersonCountry"
                                    placeholder="Country"
                                    className="w-full common-input"
                                    value={marriage.husband_consent_person_country || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
    
                    {/* Wife Column */}
                    <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                        <h3 className="text-center font-semibold mb-3">Wife</h3>
                        <span className="invisible">
                            <p>9. Father Citizenship</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeFatherCitizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={marriage.wife_father_citizenship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>10. Maiden Name of Mother</p>
                        </span>
                        <div className="flex flex-col items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeMotherNameFirst"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.wife_mother_name_first || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeMotherNameMiddle"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.wife_mother_name_middle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeMotherNameLast"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.wife_mother_name_last || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>11. Mother Citizenship</p>
                        </span>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeMotherCitizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={marriage.wife_mother_citizenship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>12. Name of Person Who Gave Consent or Advice</p>
                        </span>
                        <div className="flex flex-col items-center mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentNameFirst"
                                    placeholder="First"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_name_first || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentNameMiddle"
                                    placeholder="Middle"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_name_middle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentNameLast"
                                    placeholder="Last"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_name_last || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>13. Relationship</p>
                        </span>
                        <div className="w-full flex items-center gap-1 mt-1 mb-3">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeRelationship"
                                    placeholder="Relationship"
                                    className="w-full common-input"
                                    value={marriage.wife_relationship || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        <span className="invisible">
                            <p>14. Residence</p>
                        </span>
                        <div className="w-full flex flex-col items-center gap-1 mt-1">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentPersonBarangay"
                                    placeholder="House No., St., Barangay"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_person_barangay || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentPersonCity"
                                    placeholder="City/Municipality"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_person_city || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentPersonProvince"
                                    placeholder="Province"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_person_province || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="wifeConsentPersonCountry"
                                    placeholder="Country"
                                    className="w-full common-input"
                                    value={marriage.wife_consent_person_country || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Page 4 */}
                <span>
                    <p>15. Place of Marriage</p>
                </span>
                <div className="flex items-center gap-1 mt-1 mb-3">
                    <div className="w-full">
                        <label>Office of the/House of/Barangay of/Church of/Mosque (City/Municipality) (Province)</label>
                        <input
                            type="text"
                            name="placeOfMarriage"
                            placeholder="Office of the/House of/Barangay of/Church of/Mosque (City/Municipality) (Province)"
                            className="w-full common-input"
                            value={marriage.place_of_marriage || ""}
                            readOnly
                        />
                    </div>
                </div>
    
                <div className="flex items-center gap-1 mt-1 mb-3">
                    <div className="w-full">
                        <label>16. Date of Marriage</label>
                        <input
                            type="date"
                            name="dateOfMarriage"
                            className="w-full common-input"
                            value={marriage.date_of_marriage || ""}
                            readOnly
                        />
                    </div>
                    <div className="w-full">
                        <label>17. Time of Marriage</label>
                        <input
                            type="time"
                            name="timeOfMarriage"
                            className="w-full common-input"
                            value={marriage.time_of_marriage || ""}
                            readOnly
                        />
                    </div>
                </div>
    
                <span>
                    <p>18. Certification of the Contracting Parties</p>
                </span>
                <div className="text-sm leading-relaxed border border-pink-300 p-3 rounded mt-1 mb-3">
                    <p className="flex flex-wrap items-center">
                        THIS IS TO CERTIFY: That I,
                        <input
                            type="text"
                            name="certHusbandName"
                            className="border-b border-gray-500 mx-2 flex-1 min-w-[150px] text-center"
                            value={marriage.cert_husband_name || ""}
                            readOnly
                        />
                        and I,
                        <input
                            type="text"
                            name="certWifeName"
                            className="border-b border-gray-500 mx-2 flex-1 min-w-[150px] text-center"
                            value={marriage.cert_wife_name || ""}
                            readOnly
                        />,
                        both of legal age, of our own free will and accord, and in the presence of the person solemnizing this marriage and of the witnesses named below, take each other as husband and wife and certifying further that we:
                    </p>
    
                    <p className="mt-2">
                        <label className="mx-2">
                            <input
                                type="radio"
                                name="marriageSettlement"
                                value="entered"
                                checked={marriage.marriage_settlement === "entered"}
                                disabled
                            />
                            have entered, a copy of which is hereto attached
                        </label>
                        /
                        <label className="mx-2">
                            <input
                                type="radio"
                                name="marriageSettlement"
                                value="notEntered"
                                checked={marriage.marriage_settlement === "notEntered"}
                                disabled
                            />
                            have not entered into a marriage settlement.
                        </label>
                    </p>
    
                    <p className="mt-2">
                        IN WITNESS WHEREOF, we have signed/marked with our fingerprint this certificate in quadruplicate this
                        <input
                            type="text"
                            name="certDay"
                            className="border-b border-gray-500 mx-2 w-12 text-center"
                            value={marriage.cert_day || ""}
                            readOnly
                        />
                        day of
                        <input
                            type="text"
                            name="certMonth"
                            className="border-b border-gray-500 mx-2 w-12 text-center"
                            value={marriage.cert_month || ""}
                            readOnly
                        />
                        <input
                            type="text"
                            name="certYear"
                            className="border-b border-gray-500 mx-2 w-12 text-center"
                            value={marriage.cert_year || ""}
                            readOnly
                        />.
                    </p>
    
                    <div className="flex justify-evenly items-center mt-4">
                        <div className="flex flex-col items-center">
                            <SignaturePlaceholder />
                            <label className="text-center mt-1">(Signature of Husband)</label>
                        </div>
                        <div className="flex flex-col items-center">
                            <SignaturePlaceholder />
                            <label className="text-center mt-1">(Signature of Wife)</label>
                        </div>
                    </div>
                </div>
    
                {/* Page 5 */}
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
    
                    <div className="mt-2 space-y-4 pl-8">
                        <label className="flex items-start gap-2">
                            <input
                                type="radio"
                                name="certification"
                                value="license"
                                checked={marriage.certification === "license"}
                                disabled
                            />
                            <span className="flex flex-wrap">
                                a. Marriage License No.&nbsp;
                                <input
                                    type="text"
                                    name="marriageLicenseNo"
                                    className="border-b border-gray-500 w-32 text-center mx-1"
                                    value={marriage.marriage_license_no || ""}
                                    readOnly
                                />
                                &nbsp;issued on&nbsp;
                                <input
                                    type="text"
                                    name="marriageIssuedOn"
                                    className="border-b border-gray-500 w-32 text-center mx-1"
                                    value={marriage.marriage_issued_on || ""}
                                    readOnly
                                />
                                &nbsp;at&nbsp;
                                <input
                                    type="text"
                                    name="marriageIssuedAt"
                                    className="border-b border-gray-500 w-48 text-center mx-1"
                                    value={marriage.marriage_issued_at || ""}
                                    readOnly
                                />
                                &nbsp;in favor of said parties, was exhibited to me.
                            </span>
                        </label>
    
                        <label className="flex items-start gap-2">
                            <input
                                type="radio"
                                name="certification"
                                value="noLicense"
                                checked={marriage.certification === "noLicense"}
                                disabled
                            />
                            <span>
                                b. No marriage license was necessary, the marriage being solemnized under
                                Art.&nbsp;
                                <input
                                    type="text"
                                    name="executiveOrder"
                                    className="border-b border-gray-500 w-16 text-center mx-1"
                                    value={marriage.executive_order || ""}
                                    readOnly
                                />
                                &nbsp;of Executive Order No. 209.
                            </span>
                        </label>
    
                        <label className="flex items-start gap-2">
                            <input
                                type="radio"
                                name="certification"
                                value="pd1083"
                                checked={marriage.certification === "pd1083"}
                                disabled
                            />
                            <span>
                                c. The marriage was solemnized in accordance with the provisions of
                                Presidential Decree No. 1083.
                            </span>
                        </label>
                    </div>
    
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
                                className="w-40 border-b border-gray-500 text-center"
                                value={marriage.officer_position || ""}
                                readOnly
                            />
                            <label className="text-xs text-center mt-1">(Position/Designation)</label>
                        </div>
    
                        <div className="flex flex-col items-center">
                            <input
                                type="text"
                                name="officerReligion"
                                className="w-56 border-b border-gray-500 text-center"
                                value={marriage.officer_religion || ""}
                                readOnly
                            />
                            <label className="text-xs text-center mt-1">
                                (Religion/Religious Sect, Registry No. and Expiration Date, if applicable)
                            </label>
                        </div>
                    </div>
                </div>
    
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
                                placeholder="Name in Print"
                                className="w-56 border-b border-gray-500 text-center mt-2"
                                value={marriage.witness1_name || ""}
                                readOnly
                            />
                        </div>
    
                        <div className="flex flex-col items-center">
                            <SignaturePlaceholder />
                            <label className="text-xs mt-1">(Signature of Witness 2)</label>
                            <input
                                type="text"
                                name="witness2Name"
                                placeholder="Name in Print"
                                className="w-56 border-b border-gray-500 text-center mt-2"
                                value={marriage.witness2_name || ""}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
    
                {/* Page 6 */}
                <span>
                    <p>21. Received By</p>
                </span>
                <div className="border border-pink-300 p-3 rounded mb-3">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-[500px]">
                            <SignaturePlaceholder />
                        </div>
                        <input
                            type="text"
                            name="receivedByName"
                            placeholder="Name in Print"
                            className="w-56 border-b border-gray-500 text-center"
                            value={marriage.received_by_name || ""}
                            readOnly
                        />
                        <input
                            type="text"
                            name="receivedByTitle"
                            placeholder="Title or Position"
                            className="w-56 border-b border-gray-500 text-center"
                            value={marriage.received_by_title || ""}
                            readOnly
                        />
                        <input
                            type="date"
                            name="receivedByDate"
                            className="w-56 border-b border-gray-500 text-center"
                            value={marriage.received_by_date || ""}
                            readOnly
                        />
                    </div>
                </div>
    
                <span>
                    <p>22. Registered by the Civil Registrar</p>
                </span>
                <div className="border border-pink-300 p-3 rounded mb-3">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-[500px]">
                            <SignaturePlaceholder />
                        </div>
                        <input
                            type="text"
                            name="registrarName"
                            placeholder="Name in Print"
                            className="w-56 border-b border-gray-500 text-center"
                            value={marriage.registrar_name || ""}
                            readOnly
                        />
                        <input
                            type="text"
                            name="registrarTitle"
                            placeholder="Title or Position"
                            className="w-56 border-b border-gray-500 text-center"
                            value={marriage.registrar_title || ""}
                            readOnly
                        />
                        <input
                            type="date"
                            name="registrarDate"
                            className="w-56 border-b border-gray-500 text-center"
                            value={marriage.registrar_date || ""}
                            readOnly
                        />
                    </div>
                </div>
    
                <span>
                    <p className="font-semibold">
                        REMARKS/ANNOTATIONS (For LCRO/OCRG/Shari'a Circuit Registrar use only.)
                    </p>
                </span>
                <div className="border border-pink-300 p-3 rounded mb-3">
                    <textarea
                        name="remarksAnnotation"
                        className="w-full common-textarea"
                        rows="3"
                        value={marriage.remarks_annotation || ""}
                        readOnly
                    />
                </div>
    
                <div className="border border-pink-300 p-3 rounded mb-3">
                    <h3 className="text-md font-semibold">
                        TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR
                    </h3>
                    <input
                        type="text"
                        name="civilRegistrar"
                        className="w-full common-input"
                        value={marriage.civil_registrar || ""}
                        readOnly
                    />
                </div>
    
                {/* Page 7 */}
                <span>
                    <p>20b. Witnesses (Print Name and Sign)</p>
                </span>
                <div className="border border-pink-300 p-3 rounded mb-3">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-[250px]">
                                <SignaturePlaceholder />
                            </div>
                            <label className="text-xs mt-1">(Signature of Witness 3)</label>
                            <input
                                type="text"
                                name="witness3Name"
                                placeholder="Name in Print"
                                className="w-56 border-b border-gray-500 text-center mt-2"
                                value={marriage.witness3_name || ""}
                                readOnly
                            />
                        </div>
    
                        <div className="flex flex-col items-center">
                            <div className="w-[250px]">
                                <SignaturePlaceholder />
                            </div>
                            <label className="text-xs mt-1">(Signature of Witness 4)</label>
                            <input
                                type="text"
                                name="witness4Name"
                                placeholder="Name in Print"
                                className="w-56 border-b border-gray-500 text-center mt-2"
                                value={marriage.witness4_name || ""}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
    
                <h3 className="block text-center font-semibold">
                    AFFIDAVIT OF SOLEMNIZING OFFICER
                </h3>
                <div className="mt-1 mb-3">
                    <p>
                        I,
                        <input
                            type="text"
                            name="affidavitOfficerName"
                            className="border-b border-black outline-none"
                            value={marriage.affidavit_officer_name || ""}
                            readOnly
                        />
                        , of legal age, Solemnizing Officer of
                        <input
                            type="text"
                            name="affidavitOfficerOrganization"
                            className="border-b border-black outline-none"
                            value={marriage.affidavit_officer_organization || ""}
                            readOnly
                        />
                        with address at
                        <input
                            type="text"
                            name="affidavitOfficerAddress"
                            className="border-b border-black outline-none"
                            value={marriage.affidavit_officer_address || ""}
                            readOnly
                        />
                        , after having sworn to in accordance with law, do hereby depose and
                        say:
                    </p>
                </div>
    
                <div className="space-y-4">
                    <p>
                        1. That I have solemnized the marriage between
                        <input
                            type="text"
                            name="statement1Party1"
                            className="border-b border-black outline-none px-1 w-40"
                            value={marriage.statement1_party1 || ""}
                            readOnly
                        />
                        and
                        <input
                            type="text"
                            name="statement1Party2"
                            className="border-b border-black outline-none px-1 w-40"
                            value={marriage.statement1_party2 || ""}
                            readOnly
                        />
                        ;
                    </p>
    
                    <div className="flex gap-2">
                        <p>2.</p>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    name="statement2a"
                                    className="mt-1 scale-125"
                                    checked={marriage.statement2a === 1}
                                    readOnly
                                />
                                <span>
                                    a. That I have ascertained the qualifications of contracting
                                    parties and have found no legal impediment for them to marry as
                                    required by Article 34 of the Family Code.
                                </span>
                            </label>
    
                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    name="statement2b"
                                    className="mt-1 scale-125"
                                    checked={marriage.statement2b === 1}
                                    readOnly
                                />
                                <span>
                                    b. That this marriage was performed in
                                    <i>articulo mortis</i> or at the point of death.
                                </span>
                            </label>
    
                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    name="statement2c"
                                    className="mt-1 scale-125"
                                    checked={marriage.statement2c === 1}
                                    readOnly
                                />
                                <span>
                                    c. That the contracting party/ies
                                    <input
                                        type="text"
                                        name="statement2cParty1"
                                        className="border-b border-black outline-none px-1 w-40"
                                        value={marriage.statement2c_party1 || ""}
                                        readOnly
                                    />
                                    and
                                    <input
                                        type="text"
                                        name="statement2cParty2"
                                        className="border-b border-black outline-none px-1 w-40"
                                        value={marriage.statement2c_party2 || ""}
                                        readOnly
                                    />
                                    , being at the point of death and physically unable to sign the
                                    foregoing certificate of marriage by signature or mark, one of
                                    the witnesses to the marriage sign for him or her by writing the
                                    dying party's name and beneath it, the witness' own signature
                                    preceded by the preposition "By".
                                </span>
                            </label>
    
                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    name="statement2d"
                                    className="mt-1 scale-125"
                                    checked={marriage.statement2d === 1}
                                    readOnly
                                />
                                <span>
                                    d. That the residence of either party is so located that there is
                                    no means of transportation to enable concerned party/parties to
                                    appear personally before the civil registrar;
                                </span>
                            </label>
    
                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    name="statement2e"
                                    className="mt-1 scale-125"
                                    checked={marriage.statement2e === 1}
                                    readOnly
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
    
                {/* Page 8 */}
                <div className="space-y-4 mb-3">
                    <p>
                        3. That I took the necessary steps to ascertain the ages and relationship
                        of contracting parties and that neither of them are under any legal
                        impediment to marry each other;
                    </p>
                    <p>
                        4. That I am executing this affidavit to attest to the truthfulness of
                        the foregoing statements for all legal intents and purposes.
                    </p>
                </div>
    
                <div className="mb-3">
                    <p>
                        In truth whereof, I have affixed my signature below this
                        <input
                            type="text"
                            name="affidavitDay"
                            className="border-b border-black outline-none w-[50px] text-center"
                            value={marriage.affidavit_day || ""}
                            readOnly
                        />
                        day of
                        <input
                            type="text"
                            name="affidavitMonth"
                            className="border-b border-black outline-none w-[120px] text-center"
                            value={marriage.affidavit_month || ""}
                            readOnly
                        />
                        ,
                        <input
                            type="text"
                            name="affidavitYear"
                            className="border-b border-black outline-none w-[80px] text-center"
                            value={marriage.affidavit_year || ""}
                            readOnly
                        />
                        at
                        <input
                            type="text"
                            name="affidavitPlace"
                            className="border-b border-black outline-none w-[200px] text-center"
                            value={marriage.affidavit_place || ""}
                            readOnly
                        />
                        , Philippines.
                    </p>
                </div>
    
                <div className="w-full flex justify-end mb-3">
                    <div className="flex flex-col items-center">
                        <SignaturePlaceholder />
                        <p className="text-xs">Signature Over Printed Name of the Solemnizing Officer</p>
                    </div>
                </div>
    
                <div className="mb-3">
                    <p>
                        <span>SUBSCRIBED AND SWORN</span> to before me this
                        <input
                            type="text"
                            name="swornDay"
                            className="border-b border-black outline-none w-[50px] text-center"
                            value={marriage.sworn_day || ""}
                            readOnly
                        />
                        day of
                        <input
                            type="text"
                            name="swornMonth"
                            className="border-b border-black outline-none w-[120px] text-center"
                            value={marriage.sworn_month || ""}
                            readOnly
                        />
                        ,
                        <input
                            type="text"
                            name="swornYear"
                            className="border-b border-black outline-none w-[80px] text-center"
                            value={marriage.sworn_year || ""}
                            readOnly
                        />
                        at
                        <input
                            type="text"
                            name="swornAt"
                            className="border-b border-black outline-none w-[200px] text-center"
                            value={marriage.sworn_at || ""}
                            readOnly
                        />
                        issued on
                        <input
                            type="text"
                            name="swornIssuedOn"
                            className="border-b border-black outline-none w-[120px] text-center"
                            value={marriage.sworn_issued_on || ""}
                            readOnly
                        />
                        ,
                        <input
                            type="text"
                            name="swornIssuedAt"
                            className="border-b border-black outline-none w-[200px] text-center"
                            value={marriage.sworn_issued_at || ""}
                            readOnly
                        />
                        .
                    </p>
                </div>
    
                <div className="flex justify-around items-center mb-3">
                    <div className="flex flex-col items-center mb-3">
                        <SignaturePlaceholder />
                        <p className="text-xs">Signature of the Administering Officer</p>
                        <input
                            type="text"
                            name="adminOfficerName"
                            className="border-b border-black outline-none w-[300px] text-center"
                            value={marriage.admin_officer_name || ""}
                            readOnly
                        />
                        <p className="text-xs">Name in Print</p>
                    </div>
    
                    <div className="flex flex-col items-center mb-3">
                        <input
                            type="text"
                            name="adminOfficerTitle"
                            className="border-b border-black outline-none w-[300px] text-center"
                            value={marriage.admin_officer_title || ""}
                            readOnly
                        />
                        <p className="text-xs">Position/Title/Designation</p>
                        <input
                            type="text"
                            name="adminOfficerAddress"
                            className="border-b border-black outline-none w-[300px] text-center"
                            value={marriage.admin_officer_address || ""}
                            readOnly
                        />
                        <p className="text-xs">Address</p>
                    </div>
                </div>
    
                {/* Page 9 */}
                <h3 className="block text-center font-semibold">
                    AFFIDAVIT FOR DELAYED REGISTRATION OF MARRIAGE
                </h3>
                <div className="mt-2 mb-5">
                    <p>
                        I,
                        <input
                            type="text"
                            name="affiantName"
                            className="border-b border-b-black outline-none text-center"
                            value={marriage.affiant_name || ""}
                            readOnly
                        />
                        , of legal age, single/married/divorced/widow/widower, with
                        residence and postal address
                        <input
                            type="text"
                            name="affiantAddress"
                            className="border-b border-b-black outline-none text-center"
                            value={marriage.affiant_address || ""}
                            readOnly
                        />
                        , after having duly sworn in accordance with law do hereby depose
                        and say:
                    </p>
                </div>
    
                <div className="space-y-4 mb-3">
                    <div className="flex flex-col mb-3">
                        <p>1. That I am the applicant for the delayed registration of</p>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="statement1OptionA"
                                className="scale-125"
                                checked={marriage.statement1_option_a === 1}
                                readOnly
                            />
                            my marriage with
                            <input
                                type="text"
                                name="statement1MarriageWith"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.statement1_marriage_with || ""}
                                readOnly
                            />
                            in
                            <input
                                type="text"
                                name="statement1PlaceA"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.statement1_place_a || ""}
                                readOnly
                            />
                            on
                            <input
                                type="text"
                                name="statement1DateA"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.statement1_date_a || ""}
                                readOnly
                            />
                            .
                        </label>
    
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="statement1OptionB"
                                className="scale-125"
                                checked={marriage.statement1_option_b === 1}
                                readOnly
                            />
                            my marriage between
                            <input
                                type="text"
                                name="statement1MarriageBetween"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.statement1_marriage_between || ""}
                                readOnly
                            />
                            in
                            <input
                                type="text"
                                name="statement1PlaceB"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.statement1_place_b || ""}
                                readOnly
                            />
                            on
                            <input
                                type="text"
                                name="statement1DateB"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.statement1_date_b || ""}
                                readOnly
                            />
                            .
                        </label>
                    </div>
    
                    <div className="flex flex-col mb-3">
                        <p>
                            2. That said marriage was solemnized by
                            <input
                                type="text"
                                name="solemnizingOfficer"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.solemnizing_officer || ""}
                                readOnly
                            />
                            (Solemnizing Officer's name) under
                        </p>
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="ceremonyReligious"
                                    className="scale-125"
                                    checked={marriage.ceremony_religious === 1}
                                    readOnly
                                />
                                religious ceremony
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="ceremonyCivil"
                                    className="scale-125"
                                    checked={marriage.ceremony_civil === 1}
                                    readOnly
                                />
                                civil ceremony
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="ceremonyMuslim"
                                    className="scale-125"
                                    checked={marriage.ceremony_muslim === 1}
                                    readOnly
                                />
                                muslim rites
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="ceremonyTribal"
                                    className="scale-125"
                                    checked={marriage.ceremony_tribal === 1}
                                    readOnly
                                />
                                tribal rites
                            </label>
                        </div>
                    </div>
    
                    <div className="flex flex-col mb-3">
                        <p>3. That the marriage was solemnized:</p>
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="marriageWithLicense"
                                className="scale-125"
                                checked={marriage.marriage_with_license === 1}
                                readOnly
                            />
                            a. with marriage license no.
                            <input
                                type="text"
                                name="marriageLicenseNoPage9"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.marriage_license_no_page9 || ""}
                                readOnly
                            />
                            issued on
                            <input
                                type="text"
                                name="marriageIssuedOnPage9"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.marriage_issued_on_page9 || ""}
                                readOnly
                            />
                            at
                            <input
                                type="text"
                                name="marriageIssuedAtPage9"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.marriage_issued_at_page9 || ""}
                                readOnly
                            />
                            ;
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="marriageUnderArticle"
                                className="scale-125"
                                checked={marriage.marriage_under_article === 1}
                                readOnly
                            />
                            b. under the Article
                            <input
                                type="text"
                                name="articleNumber"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.article_number || ""}
                                readOnly
                            />
                            (marriages of exceptional character);
                        </label>
                    </div>
    
                    <p>
                        4. (If the applicant is either the wife or husband) That I am a
                        citizen of
                        <input
                            type="text"
                            name="citizenApplicant"
                            className="border-b border-b-black outline-none text-center"
                            value={marriage.citizen_applicant || ""}
                            readOnly
                        />
                        and spouse is a citizen of
                        <input
                            type="text"
                            name="citizenSpouse"
                            className="border-b border-b-black outline-none text-center"
                            value={marriage.citizen_spouse || ""}
                            readOnly
                        />
                        .
                    </p>
    
                    <p>
                        5. That the reason for the delay in registering our/their marriage
                        is
                        <input
                            type="text"
                            name="reasonForDelay"
                            className="border-b border-b-black outline-none text-center"
                            value={marriage.reason_for_delay || ""}
                            readOnly
                        />
                        .
                    </p>
    
                    <div className="flex flex-col">
                        <p>
                            6. That I am executing this affidavit to attest to the
                            truthfulness of the foregoing statements for all legal intents
                            and purposes.
                        </p>
                        <span>
                            In truth whereof, I have affixed my signature below this
                            <input
                                type="text"
                                name="affidavitDayPage9"
                                className="border-b border-b-black outline-none text-center w-[100px]"
                                value={marriage.affidavit_day_page9 || ""}
                                readOnly
                            />
                            day of
                            <input
                                type="text"
                                name="affidavitMonthPage9"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.affidavit_month_page9 || ""}
                                readOnly
                            />
                            ,
                            <input
                                type="text"
                                name="affidavitYearPage9"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.affidavit_year_page9 || ""}
                                readOnly
                            />
                            at
                            <input
                                type="text"
                                name="affidavitPlacePage9"
                                className="border-b border-b-black outline-none text-center"
                                value={marriage.affidavit_place_page9 || ""}
                                readOnly
                            />
                            , Philippines.
                        </span>
                    </div>
                </div>
    
                {/* Page 10 */}
                <div className="flex justify-end mb-10">
                    <div className="flex flex-col items-center">
                        <SignaturePlaceholder />
                        <p className="text-sm">Signature Over Printed Name of Affiant</p>
                    </div>
                </div>
    
                <div className="mb-5">
                    <p>
                        <span className="pl-5 font-bold">SUBSCRIBED AND SWORN</span> to
                        before me this
                        <input
                            type="text"
                            name="swornDayPage10"
                            className="border-b border-b-black outline-none text-center w-[100px]"
                            value={marriage.sworn_day_page10 || ""}
                            readOnly
                        />
                        day of
                        <input
                            type="text"
                            name="swornMonthPage10"
                            className="border-b border-b-black outline-none text-center"
                            value={marriage.sworn_month_page10 || ""}
                            readOnly
                        />
                        ,
                        <input
                            type="text"
                            name="swornYearPage10"
                            className="border-b border-b-black outline-none text-center w-[300px]"
                            value={marriage.sworn_year_page10 || ""}
                            readOnly
                        />
                        at
                        <input
                            type="text"
                            name="swornPlacePage10"
                            className="border-b border-b-black outline-none text-center w-[300px]"
                            value={marriage.sworn_place_page10 || ""}
                            readOnly
                        />
                        issued on
                        <input
                            type="text"
                            name="swornIssuedOnPage10"
                            className="border-b border-b-black outline-none text-center w-[300px]"
                            value={marriage.sworn_issued_on_page10 || ""}
                            readOnly
                        />
                        ,
                        <input
                            type="text"
                            name="swornIssuedAtPage10"
                            className="border-b border-b-black outline-none text-center w-[300px]"
                            value={marriage.sworn_issued_at_page10 || ""}
                            readOnly
                        />
                        .
                    </p>
                </div>
    
                <div className="mb-3">
                    <div className="flex justify-evenly gap-3">
                        <div className="flex flex-col items-center">
                            <SignaturePlaceholder />
                            <p className="text-sm">Signature of the Administering Officer</p>
                            <input
                                type="text"
                                name="administeringOfficerName"
                                className="border-b border-black outline-none w-[300px] text-center"
                                value={marriage.administering_officer_name || ""}
                                readOnly
                            />
                            <p className="text-sm">Name in Print</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <input
                                type="text"
                                name="officerPositionPage10"
                                className="border-b border-black outline-none w-[300px] text-center"
                                value={marriage.officer_position_page10 || ""}
                                readOnly
                            />
                            <p className="text-sm">Position/Title/Designation</p>
                            <input
                                type="text"
                                name="officerAddressPage10"
                                className="border-b border-black outline-none w-[300px] text-center"
                                value={marriage.officer_address_page10 || ""}
                                readOnly
                            />
                            <p className="text-sm">Address</p>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
