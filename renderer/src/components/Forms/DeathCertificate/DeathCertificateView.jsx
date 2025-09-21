import React from 'react';
import { Divider } from '@components';
import { InfoCard } from '@components';
import { SignaturePlaceholder } from '@components';

export default function DeathCertificateView() {
    return (
        <>
            <div className="p-4 h-full mb-4 max-w-4xl mx-auto">
                <div className='mb-4'>
                    <div className="mb-4 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        {/* Province & City / Municipality */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium mb-1">Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="Province"
                                    className="common-input"
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
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle (Optional)"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                
                        {/* Sex */}
                        <div>
                            <label className="block text-sm font-medium">Sex</label>
                            <select name="sex" className="w-full common-input" disabled>
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
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="w-full common-input"
                                    readOnly
                                />
                            </div>
                        </div>
                
                        {/* Age at Time of Death */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Age at Time of Death</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="ageYears"
                                            placeholder="Years"
                                            min="0"
                                            className="common-input w-full pr-16"
                                            readOnly
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            Years
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="ageDays"
                                            placeholder="Days"
                                            min="0"
                                            max="365"
                                            className="common-input w-full pr-16"
                                            readOnly
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            Days
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="ageHours"
                                            placeholder="Hours"
                                            min="0"
                                            max="24"
                                            className="common-input w-full pr-16"
                                            readOnly
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            Hrs
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="ageMinutes"
                                            placeholder="Minutes"
                                            min="0"
                                            max="60"
                                            className="common-input w-full pr-16"
                                            readOnly
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            Min
                                        </span>
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
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        {/* Civil Status */}
                        <div>
                            <label className="block text-sm font-medium">Civil Status</label>
                            <select name="civilStatus" className="w-full common-input" disabled>
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
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceStreet"
                                        placeholder="Street"
                                        className="common-input"
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
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceCity"
                                        placeholder="City / Municipality"
                                        className="common-input"
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
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="residenceCountry"
                                        placeholder="Country"
                                        className="common-input"
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
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
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
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="fatherMiddleName"
                                        placeholder="Middle"
                                        className="w-full common-input"
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="fatherLastName"
                                        placeholder="Last"
                                        className="w-full common-input"
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
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="motherMiddleName"
                                        placeholder="Middle"
                                        className="w-full common-input"
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="motherLastName"
                                        placeholder="Last"
                                        className="w-full common-input"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        {/* Causes of Death */}
                        <div>
                            <label className="block text-sm font-medium">Immediate Cause</label>
                            <input
                                type="text"
                                name="immediateCause"
                                className="w-full common-input"
                                readOnly
                            />
                            <label className="block text-sm font-medium mt-2">Interval</label>
                            <input
                                type="text"
                                name="intervalImmediate"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Antecedent Cause</label>
                            <input
                                type="text"
                                name="antecedentCause"
                                className="w-full common-input"
                                readOnly
                            />
                            <label className="block text-sm font-medium mt-2">Interval</label>
                            <input
                                type="text"
                                name="intervalAntecedent"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Underlying Cause</label>
                            <input
                                type="text"
                                name="underlyingCause"
                                className="w-full common-input"
                                readOnly
                            />
                            <label className="block text-sm font-medium mt-2">Interval</label>
                            <input
                                type="text"
                                name="intervalUnderlying"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Other Significant Conditions</label>
                            <input
                                type="text"
                                name="otherConditions"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Maternal Condition (if applicable)</label>
                            <select
                                name="maternalCondition"
                                className="w-full common-input"
                                disabled
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
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        {/* Manner of Death */}
                        <div>
                            <label className="block text-sm font-medium">Manner of Death</label>
                            <select
                                name="mannerOfDeath"
                                className="w-full common-input"
                                disabled
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
                                disabled
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
                                disabled
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
                            <select
                                name="attendant"
                                className="common-input w-full"
                                disabled
                            >
                                <option value="">Select</option>
                                <option value="Private Physician">Private Physician</option>
                                <option value="Public Health Authority">Public Health Authority</option>
                                <option value="Hospital">Hospital</option>
                                <option value="None">None</option>
                                <option value="Others">Others (Specify)</option>
                            </select>
                            <input
                                type="text"
                                name="attendantOthersSpecify"
                                placeholder="Specify"
                                className="common-input mt-2 w-full"
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
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">To (mm/dd/yy)</label>
                                <input
                                    type="date"
                                    name="attendantTo"
                                    className="w-full common-input"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
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
                                            disabled
                                        />
                                        <span className="ml-1">have attended</span>
                                    </label>
                                    <span>/</span>
                                    <label className="inline-flex items-center mx-2">
                                        <input
                                            type="checkbox"
                                            name="notAttendedDeceased"
                                            className="custom-checkbox w-4 h-4"
                                            disabled
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
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="certificationDate"
                                    className="w-full common-input"
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
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="reviewedDate"
                                    className="w-full common-input"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        {/* Disposal Type */}
                        <div>
                            <label className="block text-sm font-medium">Corpse Disposal</label>
                            <select
                                name="disposalType"
                                className="w-full common-input"
                                disabled
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
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date Issued</label>
                                <input
                                    type="date"
                                    name="permitDate"
                                    className="w-full common-input"
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Transfer Permit */}
                        <div>
                            <label className="block text-sm font-medium">Transfer Permit Number</label>
                            <input
                                type="text"
                                name="transferPermit"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        {/* Cemetery */}
                        <div>
                            <label className="block text-sm font-medium">Name of Cemetery or Crematory</label>
                            <input
                                type="text"
                                name="cemeteryName"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address of Cemetery or Crematory</label>
                            <input
                                type="text"
                                name="cemeteryAddress"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
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
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="preparedDate"
                                        className="w-full common-input"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
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
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="receivedDate"
                                        className="w-full common-input"
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
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="registrarDate"
                                        className="w-full common-input"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 space-y-2">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                REMARKS / ANNOTATIONS (For LCRO/OCRG Use Only)
                            </label>
                            <textarea
                                name="remarks"
                                placeholder="Enter remarks or annotations here..."
                                className="common-textarea w-full h-32 resize-none"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6 space-y-6">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        {/* Postmortem Certificate */}
                        <div>
                            <label className="block text-sm font-medium">Cause of Death (from Autopsy)</label>
                            <input
                                type="text"
                                name="postmortemCause"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Name in Print</label>
                            <input
                                type="text"
                                name="postmortemName"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Title/Designation</label>
                            <input
                                type="text"
                                name="postmortemTitle"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                name="postmortemAddress"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <input
                                type="date"
                                name="postmortemDate"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        {/* Embalmer Certification */}
                        <div>
                            <label className="block text-sm font-medium">Embalmer Name</label>
                            <input
                                type="text"
                                name="embalmerName"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">License No.</label>
                            <input
                                type="text"
                                name="embalmerLicense"
                                className="w-full common-input"
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
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Issued At</label>
                                <input
                                    type="text"
                                    name="embalmerIssuedAt"
                                    className="w-full common-input"
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
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6 space-y-8">
                        <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
                        <p className="text-sm italic text-center">
                            (For delayed registration of death)
                        </p>
                        <p className="text-sm italic text-center">
                            I _____________________________ , of legal age, single / married / divorced / widow / widower, with residence and postal address at ______________________________________________________ after having been duly sworn in accordance with law, do hereby depose and say:
                        </p>
                        {/* Affiant Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                                <input
                                    type="text"
                                    name="affiantName"
                                    className="w-full common-input"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Civil Status</label>
                                <select
                                    name="affiantCivilStatus"
                                    className="w-full common-input"
                                    disabled
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
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Statement 1 */}
                        <div>
                            <p className="text-sm font-medium mb-2">
                                1. That <span className="italic">[Deceased Name]</span> died on <span className="italic">[Date]</span> at <span className="italic">[Place]</span> and was buried/cremated in <span className="italic">[Burial Place]</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="deceasedName"
                                        placeholder="Deceased Name"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        name="deathDate"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="deathPlace"
                                        placeholder="Place of Death/Burial"
                                        className="common-input"
                                        readOnly
                                    />
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
                                        className="common-input"
                                        name="notAttended"
                                        disabled
                                    />
                                    <span>Was not attended.</span>
                                </label>
                                <input
                                    type="text"
                                    name="attendedBy"
                                    placeholder="Was attended by"
                                    className="common-input w-full md:w-auto"
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Statement 3 */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                3. That the cause of death of the deceased was
                            </label>
                            <input
                                type="text"
                                name="causeOfDeath"
                                className="w-full common-input"
                                readOnly
                            />
                        </div>
                        {/* Statement 4 */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                4. That the reason for the delay in registering this death was due to
                            </label>
                            <textarea
                                name="reasonDelay"
                                className="common-textarea w-full h-24 resize-none"
                                readOnly
                            />
                        </div>
                        <div className="mb-6 space-y-6">
                            <h2 className="text-lg text-center font-semibold">Death Certificate</h2>
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
                                    <input
                                        type="number"
                                        name="juratDay"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month/Year</label>
                                    <input
                                        type="text"
                                        name="juratMonthYear"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Place</label>
                                    <input
                                        type="text"
                                        name="juratPlace"
                                        className="common-input"
                                        readOnly
                                    />
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
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued On</label>
                                    <input
                                        type="date"
                                        name="ctcIssuedOn"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issued At</label>
                                    <input
                                        type="text"
                                        name="ctcIssuedAt"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* Admin Officer Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name in Print</label>
                                    <input
                                        type="text"
                                        name="adminName"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                                    <input
                                        type="text"
                                        name="adminPosition"
                                        className="common-input"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="adminAddress"
                                        className="common-input"
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