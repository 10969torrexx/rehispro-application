import { useEffect } from 'react';
import { SignaturePlaceholder } from '@components';
import { DeathCertServices } from "@services";
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function DeathCertificateView({ row }) {
    const [loading, setLoading] = useState(true);
    const [deceased, setDeceased] = useState({});
  
    useEffect(() => {
      if (!row) return; // ✅ avoid undefined
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await DeathCertServices.viewDeathCertificate(row.id);
          if (response && response.success && response.data) {
            setDeceased(response.data);
          } else {
            toast.error(response?.message || "Failed to load death certificates");
          }
        } catch (error) {
          toast.error(error.message || "Failed to fetch death certificates");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [row]); // ✅ re-fetch if row changes
    console.log(deceased);

    return (
        <>
            <div className="p-4 h-full mb-4 max-w-4xl mx-auto">
                <div className='mb-4'>
                    <div className="mb-4 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Deceased's Information</h2>
                        {/* Province & City / Municipality */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="Province"
                                    className="common-input"
                                    value={deceased.province || ''}
                                    readOnly
                                />
                            </div>  
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">City / Municipality</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City / Municipality"
                                    className="common-input"
                                    value={deceased.city || ''}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        {/* Deceased's Name */}
                        <div>
                            <label className="block text-sm font-medium">Deceased's Name</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First"
                                        className="common-input"
                                        value={deceased.first_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle (Optional)"
                                        className="common-input"
                                        value={deceased.middle_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last"
                                        className="common-input"
                                        value={deceased.last_name || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    
                        {/* Sex */}
                        <div>
                            <label className="block text-sm font-medium">Sex</label>
                            <select name="sex" className="w-full common-input" value={deceased.sex || ''} readOnly>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
    
                        {/* Date of Death & Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium">Date of Death</label>
                                <input
                                    type="date"
                                    name="dateOfDeath"
                                    className="w-full common-input"
                                    value={deceased.date_of_death || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="w-full common-input"
                                    value={deceased.date_of_birth || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                                            
                        {/* Age at Time of Death */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium">Age at Time of Death</label>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* If 1 year or above */}
                            <div className="flex-1">
                            <label className="block text-sm font-medium">If 1 year or above</label>
                            <input
                                type="number"
                                name="age_years"
                                placeholder="Years"
                                min="0"
                                className="common-input w-full pr-16"
                                value={deceased.age_years || 0}
                                readOnly
                            />
                            </div>

                            {/* If under 1 year */}
                            <div className="flex-1">
                            <label className="block text-sm font-medium">If under 1 year</label>
                            <div className="flex-1">
                                <input
                                type="number"
                                name="age_months"
                                placeholder="Months"
                                min="0"
                                max="12"
                                className="common-input w-full pr-16"
                                value={deceased.age_months || 0}
                                readOnly
                                />
                            </div>
                            <div className="flex-1 mt-2">
                                <input
                                type="number"
                                name="age_days"
                                placeholder="Days"
                                min="0"
                                max="365"
                                className="common-input w-full pr-16"
                                value={deceased.age_days || 0}
                                readOnly
                                />
                            </div>
                            </div>

                            {/* If under 24 hours */}
                            <div className="flex-1">
                            <label className="block text-sm font-medium">If under 24 hours</label>
                            <div className="flex-1">
                                <input
                                type="number"
                                name="age_hours"
                                placeholder="Hours"
                                min="0"
                                max="24"
                                className="common-input w-full pr-16"
                                value={deceased.age_hours || 0}
                                readOnly
                                />
                            </div>
                            <div className="flex-1 mt-2">
                                <input
                                type="number"
                                name="age_minutes"
                                placeholder="Minutes"
                                min="0"
                                max="60"
                                className="common-input w-full pr-16"
                                value={deceased.age_minutes || 0}
                                readOnly
                                />
                            </div>
                            </div>
                        </div>
                        </div>
    
                        {/* Place of Death */}
                        <div>
                            <label className="block text-sm font-medium">Place of Death</label>
                            <input
                                type="text"
                                name="placeOfDeath"
                                placeholder="Hospital/Clinic/Institution/House No., St., Barangay, City/Mun, Province"
                                className="w-full common-input"
                                value={deceased.place_of_death || ''}
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Status & Residence</h2>
                        {/* Civil Status */}
                        <div>
                            <label className="block text-sm font-medium">Civil Status</label>
                            <select name="civilStatus" className="w-full common-input" value={deceased.civil_status || ''} readOnly>
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widow">Widow</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>
                    
                        {/* Religion & Citizenship */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                                <input
                                    type="text"
                                    name="religion"
                                    placeholder="Religion"
                                    className="w-full common-input"
                                    value={deceased.religion || ''}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Citizenship</label>
                                <input
                                    type="text"
                                    name="citizenship"
                                    placeholder="Citizenship"
                                    className="w-full common-input"
                                    value={deceased.citizenship || ''}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        {/* Residence */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium">Residence</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceHouse"
                                        placeholder="House No."
                                        className="common-input"
                                        value={deceased.residence_house || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceStreet"
                                        placeholder="Street"
                                        className="common-input"
                                        value={deceased.residence_street || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceBarangay"
                                        placeholder="Barangay"
                                        className="common-input"
                                        value={deceased.residence_barangay || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceCity"
                                        placeholder="City / Municipality"
                                        className="common-input"
                                        value={deceased.residence_city || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceProvince"
                                        placeholder="Province"
                                        className="common-input"
                                        value={deceased.residence_province || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceCountry"
                                        placeholder="Country"
                                        className="common-input"
                                        value={deceased.residence_country || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
    
                        {/* Occupation */}
                        <div>
                            <label className="block text-sm font-medium">Occupation</label>
                            <input
                                type="text"
                                name="occupation"
                                placeholder="Occupation"
                                className="w-full common-input"
                                value={deceased.occupation || ''}
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Parents' Information</h2>
                        {/* Father’s Name */}
                        <div className="mb-8">
                            <label className="block text-base font-semibold mb-2">Father’s Name</label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="fatherFirstName"
                                        placeholder="First"
                                        className="w-full common-input"
                                        value={deceased.father_first_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="fatherMiddleName"
                                        placeholder="Middle"
                                        className="w-full common-input"
                                        value={deceased.father_middle_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="fatherLastName"
                                        placeholder="Last"
                                        className="w-full common-input"
                                        value={deceased.father_last_name || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
    
                        {/* Mother’s Maiden Name */}
                        <div className="mb-8">
                            <label className="block text-base font-semibold mb-2">Mother’s Maiden Name</label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="motherFirstName"
                                        placeholder="First"
                                        className="w-full common-input"
                                        value={deceased.mother_first_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="motherMiddleName"
                                        placeholder="Middle"
                                        className="w-full common-input"
                                        value={deceased.mother_middle_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="motherLastName"
                                        placeholder="Last"
                                        className="w-full common-input"
                                        value={deceased.mother_last_name || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
<div className="mb-6 space-y-6">
  <h2 className="text-lg text-center font-semibold">
    For Children Aged 0 to 7 Days
  </h2>

  {/* Age of Mother & Length of Pregnancy */}
  <div className="mb-8">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">
          Age of Mother
        </label>
        <input
          type="text"
          name="aged_of_mother"
          placeholder="Age of Mother"
          className="w-full common-input"
          value={deceased.aged_of_mother || ""}
          readOnly
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">
          Length of Pregnancy
        </label>
        <input
          type="text"
          name="length_of_pregnancy"
          placeholder="In Complete Weeks"
          className="w-full common-input"
          value={deceased.length_of_pregnancy || ""}
          readOnly
        />
      </div>
    </div>
  </div>

  {/* Method of Delivery */}
  <div className="p-2">
    <label className="block w-full text-sm font-medium mb-1">
      Method of Delivery
    </label>
    <input
      type="text"
      name="method_of_delivery"
      placeholder="e.g. Normal Spontaneous Vertex, Others"
      className="common-input w-full"
      value={deceased.method_of_delivery || ""}
      readOnly
    />
  </div>

  {/* Type of Birth */}
  <div className="mb-8">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">
          Type of Birth
        </label>
        <input
          type="text"
          name="type_of_birth"
          placeholder="Single, Twin, Triplets, etc."
          className="w-full common-input"
          value={deceased.type_of_birth || ""}
          readOnly
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">
          If Multiple Birth
        </label>
        <input
          type="text"
          name="if_multiple_birth"
          placeholder="First, Second, Third, etc."
          className="w-full common-input"
          value={deceased.if_multiple_birth || ""}
          readOnly
        />
      </div>
    </div>
  </div>

  {/* Medical Certificate Section */}
  <div className="flex flex-col items-center">
        <h2 className="text-lg text-center font-semibold">Medical Certificate</h2>
        <label className="text-center">(if the deceased is aged 7 days or below)</label>
    </div>

  <div>
    <label className="block text-sm font-medium">
      Main Disease Condition of Infant
    </label>
    <input
      type="text"
      name="main_disease_condition_of_infant"
      className="w-full common-input"
      value={deceased.main_disease_condition_of_infant || ""}
      readOnly
    />
  </div>

  <div>
    <label className="block text-sm font-medium">
      Other Diseases Conditions of Infant
    </label>
    <input
      type="text"
      name="other_diseases_conditions_of_infant"
      className="w-full common-input"
      value={deceased.other_diseases_conditions_of_infant || ""}
      readOnly
    />
  </div>

  <div>
    <label className="block text-sm font-medium">
      Main Maternal Disease Condition Affecting Infant
    </label>
    <input
      type="text"
      name="main_maternal_disease_condition_affecting_infant"
      className="w-full common-input"
      value={deceased.main_maternal_disease_condition_affecting_infant || ""}
      readOnly
    />
  </div>

  <div>
    <label className="block text-sm font-medium">
      Other Maternal Disease Condition Affecting Infant
    </label>
    <input
      type="text"
      name="other_maternal_disease_condition_affecting_infant"
      className="w-full common-input"
      value={deceased.other_maternal_disease_condition_affecting_infant || ""}
      readOnly
    />
  </div>

  <div>
    <label className="block text-sm font-medium">
      Other Relevant Circumstances
    </label>
    <input
      type="text"
      name="other_relevant_circumstances"
      className="w-full common-input"
      value={deceased.other_relevant_circumstances || ""}
      readOnly
    />
  </div>
</div>

                    <div className="mb-6 space-y-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg text-center font-semibold">Medical Certificate</h2>
                            <label className="text-center">(if the deceased is aged 8 days or over)</label>
                        </div>
                        {/* Causes of Death */}
                        <div>
                            <label className="block text-sm font-medium">Immediate Cause</label>
                            <input
                                type="text"
                                name="immediateCause"
                                className="w-full common-input"
                                value={deceased.immediate_cause || ''}
                                readOnly
                            />
                            <label className="block text-sm font-medium mt-2">Interval</label>
                            <input
                                type="text"
                                name="intervalImmediate"
                                className="w-full common-input"
                                value={deceased.interval_immediate || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Antecedent Cause</label>
                            <input
                                type="text"
                                name="antecedentCause"
                                className="w-full common-input"
                                value={deceased.antecedent_cause || ''}
                                readOnly
                            />
                            <label className="block text-sm font-medium mt-2">Interval</label>
                            <input
                                type="text"
                                name="intervalAntecedent"
                                className="w-full common-input"
                                value={deceased.interval_antecedent || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Underlying Cause</label>
                            <input
                                type="text"
                                name="underlyingCause"
                                className="w-full common-input"
                                value={deceased.underlying_cause || ''}
                                readOnly
                            />
                            <label className="block text-sm font-medium mt-2">Interval</label>
                            <input
                                type="text"
                                name="intervalUnderlying"
                                className="w-full common-input"
                                value={deceased.interval_underlying || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Other Significant Conditions</label>
                            <input
                                type="text"
                                name="otherConditions"
                                className="w-full common-input"
                                value={deceased.other_conditions || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Maternal Condition (if the deceased is female aged 15-49 years old)</label>
                            <select
                                name="maternalCondition"
                                className="w-full common-input"
                                value={deceased.maternal_condition || ''}
                                readOnly
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
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Manner of Death & Attendant Details</h2>
                        {/* Manner of Death */}
                        <div>
                            <label className="block text-sm font-medium">Manner of Death</label>
                            <select
                                name="mannerOfDeath"
                                className="w-full common-input"
                                value={deceased.manner_of_death || ''}
                                readOnly
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
                            <select
                                name="autopsy"
                                className="w-full common-input"
                                value={deceased.autopsy || ''}
                                readOnly
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        {/* Place of Occurrence */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Place of Occurrence (for external cause)</label>
                            <select
                                name="placeOccurrence"
                                className="w-full common-input"
                                value={deceased.place_occurrence || ''}
                                readOnly
                            >
                                <option value="">Select</option>
                                <option value="Home">Home</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Work">Work</option>
                                <option value="Public Place">Public Place</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* Attendant Type */}
                        <div className="p-2">
                            <label className="block w-full text-sm font-medium mb-1">Attended By</label>
                            <input
                                type="text"
                                name="attendant"
                                placeholder="Specify"
                                className="common-input mt-2 w-full"
                                value={deceased.attendant || ''}
                                readOnly
                            />
                        </div>
                        {/* Attendant Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">From (mm/dd/yy)</label>
                                <input
                                    type="date"
                                    name="attendantFrom"
                                    className="w-full common-input"
                                    value={deceased.attendant_from || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">To (mm/dd/yy)</label>
                                <input
                                    type="date"
                                    name="attendantTo"
                                    className="w-full common-input"
                                    value={deceased.attendant_to || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Certification of Death</h2>
                        {/* Certification Oath */}
                        <div className="text-sm leading-relaxed flex flex-wrap items-center">
                            <span>
                                I hereby certify that the foregoing particulars are correct as near as same can be ascertained and I further certify that I
                            </span>
                            <div className="p-2">
                                <div className="flex items-center space-x-2">
                                    <label className="inline-flex items-center mx-2">
                                        <input
                                            type="checkbox"
                                            name="attendedDeceased"
                                            className="custom-checkbox w-4 h-4"
                                            checked={deceased.attended_deceased === 'Yes'} // Assuming 'Yes'/'No' values
                                            readOnly
                                        />
                                        <span className="ml-1">have attended</span>
                                    </label>
                                    <span>/</span>
                                    <label className="inline-flex items-center mx-2">
                                        <input
                                            type="checkbox"
                                            name="notAttendedDeceased"
                                            className="custom-checkbox w-4 h-4"
                                            checked={deceased.attended_deceased === 'No'} // Assuming 'Yes'/'No' values
                                            readOnly
                                        />
                                        <span className="ml-1">have not attended</span>
                                    </label>
                                </div>
                            </div>
                            <span>the deceased and that death occurred at</span>
                            <input
                                type="time"
                                name="timeOfDeath"
                                className="common-input inline-block px-2 py-2 mx-2"
                                value={deceased.time_of_death || ''}
                                readOnly
                            />
                        </div>
    
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
                                    className="w-full common-input"
                                    value={deceased.physician_name || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title or Position</label>
                                <input
                                    type="text"
                                    name="physicianTitle"
                                    placeholder="Title/Position"
                                    className="w-full common-input"
                                    value={deceased.physician_title || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="physicianAddress"
                                    placeholder="Address"
                                    className="w-full common-input"
                                    value={deceased.physician_address || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="certificationDate"
                                    className="w-full common-input"
                                    value={deceased.certification_date || ''} // Assuming a column for this
                                    readOnly
                                />
                            </div>
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
                                    className="w-full common-input"
                                    value={deceased.health_officer_name || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="reviewedDate"
                                    className="w-full common-input"
                                    value={deceased.reviewed_date || ''} // Assuming a column for this
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Corpse Disposal</h2>
                        {/* Disposal Type */}
                        <div>
                            <label className="block text-sm font-medium">Corpse Disposal</label>
                            <select
                                name="disposalType"
                                className="w-full common-input"
                                value={deceased.disposal_type || ''}
                                readOnly
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
                                <input
                                    type="text"
                                    name="permitNumber"
                                    className="w-full common-input"
                                    value={deceased.permit_number || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date Issued</label>
                                <input
                                    type="date"
                                    name="permitDate"
                                    className="w-full common-input"
                                    value={deceased.permit_date || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Transfer Permit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium">Transfer Permit Number</label>
                            <input
                                type="text"
                                name="transferPermit"
                                className="w-full common-input"
                                value={deceased.transfer_permit || ''}
                                readOnly
                            />
                        </div>
                            <div>
                                <label className="block text-sm font-medium">Date Issued</label>
                                <input
                                    type="date"
                                    name="transferPermitDate"
                                    className="w-full common-input"
                                    value={deceased.transfer_permit_date || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Cemetery */}
                        <div>
                            <label className="block text-sm font-medium">Name of Cemetery or Crematory</label>
                            <input
                                type="text"
                                name="cemeteryName"
                                className="w-full common-input"
                                value={deceased.cemetery_name || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address of Cemetery or Crematory</label>
                            <input
                                type="text"
                                name="cemeteryAddress"
                                className="w-full common-input"
                                value={deceased.cemetery_address || ''}
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Certification and Registration Details</h2>
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
                                    <input
                                        type="text"
                                        name="informantName"
                                        placeholder="Full Name"
                                        className="w-full common-input"
                                        value={deceased.informant_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Relationship to the Deceased</label>
                                    <input
                                        type="text"
                                        name="informantRelationship"
                                        placeholder="Relationship"
                                        className="w-full common-input"
                                        value={deceased.informant_relationship || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="informantAddress"
                                        placeholder="Full Address"
                                        className="w-full common-input"
                                        value={deceased.informant_address || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="informantDate"
                                    className="w-full common-input"
                                    value={deceased.informant_date || ''}
                                    readOnly
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
                                    <input
                                        type="text"
                                        name="preparedName"
                                        placeholder="Full Name"
                                        className="w-full common-input"
                                        value={deceased.prepared_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title or Position</label>
                                    <input
                                        type="text"
                                        name="preparedTitle"
                                        placeholder="Title or Position"
                                        className="w-full common-input"
                                        value={deceased.prepared_title || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="preparedDate"
                                        className="w-full common-input"
                                        value={deceased.prepared_date || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
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
                                    <input
                                        type="text"
                                        name="receivedName"
                                        placeholder="Full Name"
                                        className="w-full common-input"
                                        value={deceased.received_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title or Position</label>
                                    <input
                                        type="text"
                                        name="receivedTitle"
                                        placeholder="Title or Position"
                                        className="w-full common-input"
                                        value={deceased.received_title || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="receivedDate"
                                        className="w-full common-input"
                                        value={deceased.received_date || ''}
                                        readOnly
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
                                    <input
                                        type="text"
                                        name="registrarName"
                                        placeholder="Full Name"
                                        className="w-full common-input"
                                        value={deceased.registrar_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title or Position</label>
                                    <input
                                        type="text"
                                        name="registrarTitle"
                                        placeholder="Title or Position"
                                        className="w-full common-input"
                                        value={deceased.registrar_title || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="registrarDate"
                                        className="w-full common-input"
                                        value={deceased.registrar_date || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-2">
                        <h2 className="text-lg text-center font-semibold">For LCRO / Civil Registrar Use Only</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                REMARKS / ANNOTATIONS (For LCRO/OCRG Use Only)
                            </label>
                            <textarea
                                name="remarks"
                                placeholder="Enter remarks or annotations here..."
                                className="common-textarea w-full h-32 resize-none"
                                value={deceased.remarks || ''}
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Postmortem Certifications</h2>
                        {/* Postmortem Certificate */}
                        <div>
                            <label className="block text-sm font-medium">Cause of Death (from Autopsy)</label>
                            <input
                                type="text"
                                name="postmortemCause"
                                className="w-full common-input"
                                value={deceased.postmortem_cause || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Name in Print</label>
                            <input
                                type="text"
                                name="postmortemName"
                                className="w-full common-input"
                                value={deceased.postmortem_name || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Title/Designation</label>
                            <input
                                type="text"
                                name="postmortemTitle"
                                className="w-full common-input"
                                value={deceased.postmortem_title || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                name="postmortemAddress"
                                className="w-full common-input"
                                value={deceased.postmortem_address || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <input
                                type="date"
                                name="postmortemDate"
                                className="w-full common-input"
                                value={deceased.postmortem_date || ''}
                                readOnly
                            />
                        </div>
                        <h2 className="text-lg text-center font-semibold">Embalmer Certification</h2>
                        {/* Embalmer Certification */}
                        <div>
                            <label className="block text-sm font-medium">Embalmer Name</label>
                            <input
                                type="text"
                                name="embalmerName"
                                className="w-full common-input"
                                value={deceased.embalmer_name || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Title/Designation</label>
                            <input
                                type="text"
                                name="embalmerTitle"
                                className="w-full common-input"
                                value={deceased.embalmer_title || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                name="embalmerAddress"
                                className="w-full common-input"
                                value={deceased.embalmer_address || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">License No.</label>
                            <input
                                type="text"
                                name="embalmerLicense"
                                className="w-full common-input"
                                value={deceased.embalmer_license || ''}
                                readOnly
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Issued On</label>
                                <input
                                    type="date"
                                    name="embalmerIssuedOn"
                                    className="w-full common-input"
                                    value={deceased.embalmer_issued_on || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Issued At</label>
                                <input
                                    type="text"
                                    name="embalmerIssuedAt"
                                    className="w-full common-input"
                                    value={deceased.embalmer_issued_at || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Expiry Date</label>
                            <input
                                type="date"
                                name="embalmerExpiry"
                                className="w-full common-input"
                                value={deceased.embalmer_expiry || ''}
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="mb-6 space-y-8">
                        <h2 className="text-lg text-center font-semibold">Affidavit for Delayed Registration of Death (Optional)</h2>
                        <p className="text-sm italic text-center">
                            (For delayed registration of death)
                        </p>
                        <p className="text-sm text-left">
                            I <span className="italic font-bold">{deceased.affiant_name || '_____________________________'}</span> ,<span className="italic font-bold">{deceased.affiant_civil_status || 'of legal age, single / married / divorced / widow / widower'}</span>, with residence and postal address at <span className="italic font-bold">{deceased.address || '_____________________________'}</span> after having been duly sworn in accordance with law, do hereby depose and say:
                        </p>
                        {/* Affiant Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                                <input
                                    type="text"
                                    name="affiantName"
                                    className="w-full common-input"
                                    value={deceased.affiant_name || ''}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Civil Status</label>
                                <select
                                    name="affiantCivilStatus"
                                    className="w-full common-input"
                                    value={deceased.affiant_civil_status || ''}
                                    readOnly
                                >
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widow">Widow</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Residence / Postal Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full common-input"
                                    value={deceased.address || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Statement 1 */}
                        <div>
                            <p className="text-sm font-medium mb-2">
                                1. That <span className="italic font-bold">{deceased.deceased_name || ''}</span> died on <span className="italic font-bold">{deceased.death_date || ''}</span> in <span className="italic font-bold">{deceased.death_place || ''}</span> and was buried/cremated in <span className="italic font-bold">{deceased.cemetery_name || ''}</span> on <span className="italic font-bold">{deceased.cemetery_address || ''}</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* <div>
                                    <input
                                        type="text"
                                        name="deceasedName"
                                        placeholder="Deceased Name"
                                        className="common-input"
                                        value={deceased.deceased_name || ''}
                                        readOnly
                                    />
                                </div> */}
                                {/* <div>
                                    <input
                                        type="date"
                                        name="deathDate"
                                        className="common-input"
                                        value={deceased.death_date || ''}
                                        readOnly
                                    />
                                </div> */}
                                {/* <div>
                                    <input
                                        type="text"
                                        name="deathPlace"
                                        placeholder="Place of Death/Burial"
                                        className="common-input"
                                        value={deceased.death_place || ''}
                                        readOnly
                                    />
                                </div> */}
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
                                        className="custom-checkbox w-4 h-4"
                                        name="notAttended"
                                        checked={deceased.attended_deceased === 'No'} // Assuming 1 for true, 0 for false
                                        readOnly
                                    />
                                    <span>Was not attended.</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="custom-checkbox w-4 h-4"
                                        name="notAttended"
                                        checked={deceased.attended_deceased === 'Yes'} // Assuming 1 for true, 0 for false
                                        readOnly
                                    />
                                    <span>Was attended.</span>
                                </label>
                                <input
                                    type="text"
                                    name="attendedBy"
                                    placeholder="Was attended by"
                                    className="common-input w-full md:w-auto"
                                    value={deceased.physician_name || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Statement 3 */}
                        <div>
                            <p className="text-sm font-medium mb-2">
                                3. That the cause of death of the deceased was 
                            </p>
                            <input
                                type="text"
                                name="causeOfDeath"
                                className="w-full common-input"
                                value={deceased.cause_of_death || ''}
                                readOnly
                            />
                        </div>
                        {/* Statement 4 */}
                        <div>
                            <p className="text-sm font-medium mb-2">
                                4. That the reason for the delay in registering this death was due to 
                            </p>
                            <textarea
                                name="reasonDelay"
                                className="common-textarea w-full h-24 resize-none"
                                value={deceased.reason_delay || ''}
                                readOnly
                            />
                        </div>
                        <div className="mb-6 space-y-6">
                            <p className="text-sm italic">
                                5. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                            </p>
                            <p className="text-sm italic">
                                In truth whereof, I have affixed my signature below this <span className="italic font-bold">{deceased.jurat_day || '____'}</span> day of <span className="italic font-bold">{deceased.jurat_month_year || '____________'}</span> at <span className="italic font-bold">{deceased.jurat_place || '____________'}</span>, Philippines.
                            </p>
                            {/* Jurat Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Day</label>
                                    <input
                                        type="number"
                                        name="juratDay"
                                        className="common-input"
                                        value={deceased.jurat_day || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month/Year</label>
                                    <input
                                        type="text"
                                        name="juratMonthYear"
                                        className="common-input"
                                        value={deceased.jurat_month_year || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place</label>
                                    <input
                                        type="text"
                                        name="juratPlace"
                                        className="common-input"
                                        value={deceased.jurat_place || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium mb-1">Signature</label>
                                    <SignaturePlaceholder />
                                </div>
                            </div>
                            {/* CTC Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">CTC Number</label>
                                    <input
                                        type="text"
                                        name="ctcNumber"
                                        className="common-input"
                                        value={deceased.ctc_number || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued On</label>
                                    <input
                                        type="date"
                                        name="ctcIssuedOn"
                                        className="common-input"
                                        value={deceased.ctc_issued_on || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued At</label>
                                    <input
                                        type="text"
                                        name="ctcIssuedAt"
                                        className="common-input"
                                        value={deceased.ctc_issued_at || ''}
                                        readOnly
                                    />
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
                                        className="common-input"
                                        value={deceased.admin_name || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                                    <input
                                        type="text"
                                        name="adminPosition"
                                        className="common-input"
                                        value={deceased.admin_position || ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="adminAddress"
                                        className="common-input"
                                        value={deceased.admin_address || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}