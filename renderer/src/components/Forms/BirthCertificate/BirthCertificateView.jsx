import { useEffect } from 'react';
import { SignaturePlaceholder } from '@components';
import { BirthCertServices } from "@services";
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function BirthCertificateView({ row }) {
    const [loading, setLoading] = useState(true);
    const [birth, setBirth] = useState({});
  
    useEffect(() => {
      if (!row) return; // ✅ avoid undefined
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await BirthCertServices.viewBirthCertificate(row.id);
          if (response && response.success && response.data) {
            setBirth(response.data);
          } else {
            toast.error(response?.message || "Failed to load birth certificates");
          }
        } catch (error) {
          toast.error(error.message || "Failed to fetch birth certificates");
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
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">General Information</h2>
  
                  {/* Province & City / Municipality*/}
                  <div className="w-full flex items-center gap-2 mb-3">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Province</label>
                          <input
                              type="text"
                              name="province"
                              placeholder="Province"
                              className="w-full common-input"
                              value={birth.province || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">City / Municipality</label>
                          <input
                              type="text"
                              name="city"
                              placeholder="City / Municipality"
                              className="w-full common-input"
                              value={birth.city || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Child’s Name */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Child’s Name</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="child_first_name"
                                  placeholder="First"
                                  className="w-full common-input"
                                  value={birth.child_first_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="child_middle_name"
                                  placeholder="Middle (Optional)"
                                  className="w-full common-input"
                                  value={birth.child_middle_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="child_last_name"
                                  placeholder="Last"
                                  className="w-full common-input"
                                  value={birth.child_last_name || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
  
                  {/* Sex & Date of Birth */}
                  <div className="flex flex-col sm:flex-row gap-2">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Sex</label>
                          <select
                              name="sex"
                              className="common-input w-full"
                              value={birth.sex || ""}
                              readOnly
                          >
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                          </select>
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Date of Birth</label>
                          <input
                              type="date"
                              name="date_of_birth"
                              className="common-input w-full"
                              value={birth.date_of_birth || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Type of Birth & Multiple Birth */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Type of Birth (Single, Twin, Triplet, etc)</label>
                          <input
                              type="text"
                              name="type_of_birth"
                              placeholder="Type of Birth"
                              className="common-input w-full"
                              value={birth.type_of_birth || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">If Multiple Birth, Child was (First, Second, Third, etc)</label>
                          <input
                              type="text"
                              name="multiple_birth_order"
                              placeholder="Order"
                              className="common-input w-full"
                              value={birth.multiple_birth_order || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Birth Order & Weight at Birth */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Birth Order (First, Second, Third, etc)</label>
                          <input
                              type="text"
                              name="birth_order"
                              placeholder="Birth Order"
                              className="common-input w-full"
                              value={birth.birth_order || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Weight at Birth</label>
                          <input
                              type="number"
                              name="birth_weight"
                              placeholder="Weight in Kilograms (kg)"
                              className="common-input w-full"
                              value={birth.birth_weight || ""}
                              readOnly
                          />
                      </div>
                  </div>
              </div>
  
              {/* Page 2 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Mother’s Information</h2>
  
                  {/* Maiden Name */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Maiden Name</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="maiden_first_name"
                                  placeholder="First Name"
                                  className="w-full common-input"
                                  value={birth.maiden_first_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="maiden_middle_name"
                                  placeholder="Middle Name"
                                  className="w-full common-input"
                                  value={birth.maiden_middle_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="maiden_last_name"
                                  placeholder="Last Name"
                                  className="w-full common-input"
                                  value={birth.maiden_last_name || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
  
                  {/* Citizenship & Religion */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Citizenship</label>
                          <input
                              type="text"
                              name="citizenship"
                              placeholder="Citizenship"
                              className="common-input w-full"
                              value={birth.citizenship || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                          <input
                              type="text"
                              name="religion"
                              placeholder="Religion / Religious Sect"
                              className="common-input w-full"
                              value={birth.religion || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Children Statistics */}
                  <div className="space-y-3">
                      <label className="block text-sm font-medium">Total number of Children Born Alive</label>
                      <input
                          type="number"
                          name="children_born_alive"
                          placeholder="Total Children Born Alive"
                          className="common-input w-full"
                          value={birth.children_born_alive || ""}
                          readOnly
                      />
                      <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full">
                              <label className="block text-sm font-medium">No. of Children Still Living (including this birth)</label>
                              <input
                                  type="number"
                                  name="children_still_living"
                                  placeholder="Children Still Living"
                                  className="common-input w-full"
                                  value={birth.children_still_living || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium">No. of Children Born Alive but are now Dead</label>
                              <input
                                  type="number"
                                  name="children_deceased"
                                  placeholder="Children Deceased"
                                  className="common-input w-full"
                                  value={birth.children_deceased || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
  
                  {/* Occupation & Age */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Occupation</label>
                          <input
                              type="text"
                              name="occupation"
                              placeholder="Occupation"
                              className="common-input w-full"
                              value={birth.occupation || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Age at the time of this birth</label>
                          <input
                              type="number"
                              name="age_at_birth"
                              placeholder="Age"
                              className="common-input w-full"
                              value={birth.age_at_birth || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Residence */}
                  <div>
                      <label className="block text-sm font-medium mb-2">Residence</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="residence_house"
                                  placeholder="House No., Street, Barangay"
                                  className="common-input w-full"
                                  value={birth.residence_house || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="residence_city"
                                  placeholder="City / Municipality"
                                  className="common-input w-full"
                                  value={birth.residence_city || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="residence_province"
                                  placeholder="Province"
                                  className="common-input w-full"
                                  value={birth.residence_province || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="residence_country"
                                  placeholder="Country"
                                  className="common-input w-full"
                                  value={birth.residence_country || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
              </div>
  
              {/* Page 3 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Father’s Information</h2>
  
                  {/* Father’s Name */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Father’s Name</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_first_name"
                                  placeholder="First Name"
                                  className="common-input w-full"
                                  value={birth.father_first_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_middle_name"
                                  placeholder="Middle Name"
                                  className="common-input w-full"
                                  value={birth.father_middle_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_last_name"
                                  placeholder="Last Name"
                                  className="common-input w-full"
                                  value={birth.father_last_name || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
  
                  {/* Citizenship & Religion */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Citizenship</label>
                          <input
                              type="text"
                              name="father_citizenship"
                              placeholder="Citizenship"
                              className="common-input w-full"
                              value={birth.father_citizenship || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Religion / Religious Sect</label>
                          <input
                              type="text"
                              name="father_religion"
                              placeholder="Religion"
                              className="common-input w-full"
                              value={birth.father_religion || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Occupation & Age */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Occupation</label>
                          <input
                              type="text"
                              name="father_occupation"
                              placeholder="Occupation"
                              className="common-input w-full"
                              value={birth.father_occupation || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Age at the time of this birth</label>
                          <input
                              type="number"
                              name="father_age_at_birth"
                              placeholder="Age"
                              className="common-input w-full"
                              value={birth.father_age_at_birth || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Residence */}
                  <div>
                      <label className="block text-sm font-medium mb-2">Residence</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_residence_street"
                                  placeholder="House No., St., Barangay"
                                  className="common-input w-full"
                                  value={birth.father_residence_street || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_residence_city"
                                  placeholder="City / Municipality"
                                  className="common-input w-full"
                                  value={birth.father_residence_city || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_residence_province"
                                  placeholder="Province"
                                  className="common-input w-full"
                                  value={birth.father_residence_province || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="father_residence_country"
                                  placeholder="Country"
                                  className="common-input w-full"
                                  value={birth.father_residence_country || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
              </div>
  
              {/* Page 4 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Marriage Information</h2>
  
                  {/* Date of Marriage */}
                  <div>
                      <label className="block w-full text-sm font-medium mb-1">Date of Marriage</label>
                      <input
                          type="date"
                          name="date_of_marriage"
                          className="common-input w-full"
                          value={birth.date_of_marriage || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Place of Marriage */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Place of Marriage</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="marriage_city"
                                  placeholder="City / Municipality"
                                  className="common-input w-full"
                                  value={birth.marriage_city || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="marriage_province"
                                  placeholder="Province"
                                  className="common-input w-full"
                                  value={birth.marriage_province || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <input
                                  type="text"
                                  name="marriage_country"
                                  placeholder="Country"
                                  className="common-input w-full"
                                  value={birth.marriage_country || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
              </div>
  
              {/* Page 5 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Attendant Information</h2>
  
                  {/* Type of Attendant */}
                  <div className="p-2">
                      <label className="block w-full text-sm font-medium mb-1">Type of Attendant</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <label className="flex items-center space-x-2">
                              <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  name="attendant_physician"
                                  checked={birth.attendant_physician !== 0? true : false}
                                  readOnly
                              />
                              <span>Physician</span>
                          </label>
                          <label className="flex items-center space-x-2">
                              <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  name="attendant_nurse"
                                  checked={birth.attendant_nurse !== 0? true : false}
                                  readOnly
                              />
                              <span>Nurse</span>
                          </label>
                          <label className="flex items-center space-x-2">
                              <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  name="attendant_midwife"
                                  checked={birth.attendant_midwife !== 0? true : false}
                                  readOnly
                              />
                              <span>Midwife</span>
                          </label>
                          <label className="flex items-center space-x-2">
                              <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  name="attendant_hilot"
                                  checked={birth.attendant_hilot !== 0? true : false}
                                  readOnly
                              />
                              <span>Hilot</span>
                          </label>
                      </div>
  
                      {/* Others */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-3">
                          <label className="flex items-center space-x-2">
                              <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  name="attendant_others"
                                  checked={birth.attendant_others !== 0? true : false}
                                  readOnly
                              />
                              <span>Others (Specify)</span>
                          </label>
                          <input
                              type="text"
                              name="attendant_others_specify"
                              placeholder="Specify"
                              className="common-input w-full mt-2 sm:mt-0"
                              value={birth.attendant_others_specify || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Date of Attendance */}
                  <div>
                      <label className="block w-full text-sm font-medium mb-1">Date of Attendance</label>
                      <input
                          type="date"
                          name="date_of_attendance"
                          className="common-input w-full"
                          value={birth.date_of_attendance || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Name and Title of Attendant */}
                  <div>
                      <label className="block w-full text-sm font-medium mb-1">Name and Title of Attendant</label>
                      <input
                          type="text"
                          name="attendant_name_title"
                          placeholder="Enter name and title"
                          className="common-input w-full"
                          value={birth.attendant_name_title || ""}
                          readOnly
                      />
                  </div>
              </div>
  
              {/* Page 6 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Birth Certification</h2>
  
                  {/* Birth Details */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Time of Birth</label>
                          <input
                              type="time"
                              name="birth_time"
                              className="common-input w-full"
                              value={birth.birth_time || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Date of Birth</label>
                          <input
                              type="date"
                              name="birth_date"
                              className="common-input w-full"
                              value={birth.birth_date || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Attendant Details */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Name in Print</label>
                          <input
                              type="text"
                              name="attendant_name"
                              placeholder="Full Name"
                              className="common-input w-full"
                              value={birth.attendant_name || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Title or Position</label>
                          <input
                              type="text"
                              name="attendant_title"
                              placeholder="Physician / Nurse / Midwife"
                              className="common-input w-full"
                              value={birth.attendant_title || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Address */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input
                          type="text"
                          name="attendant_address"
                          placeholder="House No., Street, Barangay, City/Municipality, Province"
                          className="common-input w-full"
                          value={birth.attendant_address || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Signature and Date */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Date Signed</label>
                          <input
                              type="date"
                              name="attendant_date_signed"
                              className="common-input w-full"
                              value={birth.attendant_date_signed || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Signature</label>
                          <SignaturePlaceholder />
                      </div>
                  </div>
              </div>
  
              {/* Page 7 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Certification</h2>
  
                  {/* Certification of Informant */}
                  <div className="space-y-4">
                      <h3 className="text-md">Certification of Informant</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Signature</label>
                              <SignaturePlaceholder />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Name in Print</label>
                              <input
                                  type="text"
                                  name="informant_name"
                                  placeholder="Full Name"
                                  className="common-input w-full"
                                  value={birth.informant_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Relationship to the Child</label>
                              <input
                                  type="text"
                                  name="informant_relationship"
                                  placeholder="Relationship"
                                  className="common-input w-full"
                                  value={birth.informant_relationship || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Address</label>
                              <input
                                  type="text"
                                  name="informant_address"
                                  placeholder="Full Address"
                                  className="common-input w-full"
                                  value={birth.informant_address || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium mb-1">Date</label>
                          <input
                              type="date"
                              name="informant_date"
                              className="common-input w-full"
                              value={birth.informant_date || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Prepared By */}
                  <div className="space-y-4">
                      <h3 className="text-md">Prepared By</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Signature</label>
                              <SignaturePlaceholder />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Name in Print</label>
                              <input
                                  type="text"
                                  name="prepared_name"
                                  placeholder="Full Name"
                                  className="common-input w-full"
                                  value={birth.prepared_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Title or Position</label>
                              <input
                                  type="text"
                                  name="prepared_title"
                                  placeholder="Title or Position"
                                  className="common-input w-full"
                                  value={birth.prepared_title || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Date</label>
                              <input
                                  type="date"
                                  name="prepared_date"
                                  className="common-input w-full"
                                  value={birth.prepared_date || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
              </div>
  
              {/* Page 8 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Received and Registered</h2>
  
                  {/* Received By */}
                  <div className="space-y-4">
                      <h3 className="text-md">Received By</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Signature</label>
                              <SignaturePlaceholder />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Name in Print</label>
                              <input
                                  type="text"
                                  name="received_name"
                                  placeholder="Full Name"
                                  className="common-input w-full"
                                  value={birth.received_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Title or Position</label>
                              <input
                                  type="text"
                                  name="received_title"
                                  placeholder="Title or Position"
                                  className="common-input w-full"
                                  value={birth.received_title || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Date</label>
                              <input
                                  type="date"
                                  name="received_date"
                                  className="common-input w-full"
                                  value={birth.received_date || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
  
                  {/* Registered by the Civil Registrar */}
                  <div className="space-y-4">
                      <h3 className="text-md">Registered by the Civil Registrar</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Signature</label>
                              <SignaturePlaceholder />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Name in Print</label>
                              <input
                                  type="text"
                                  name="registrar_name"
                                  placeholder="Full Name"
                                  className="common-input w-full"
                                  value={birth.registrar_name || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Title or Position</label>
                              <input
                                  type="text"
                                  name="registrar_title"
                                  placeholder="Title or Position"
                                  className="common-input w-full"
                                  value={birth.registrar_title || ""}
                                  readOnly
                              />
                          </div>
                          <div className="w-full">
                              <label className="block text-sm font-medium mb-1">Date</label>
                              <input
                                  type="date"
                                  name="registrar_date"
                                  className="common-input w-full"
                                  value={birth.registrar_date || ""}
                                  readOnly
                              />
                          </div>
                      </div>
                  </div>
              </div>
  
              {/* Page 9 */}
              <div className="mb-6 text-left space-y-2">
                  <h2 className="text-lg text-center font-semibold">Remarks / Annotations</h2>
                  <div>
                      <label className="block text-sm font-medium mb-1">REMARKS / ANNOTATIONS (For LCRO/OCRG Use Only)</label>
                      <textarea
                          name="remarks"
                          placeholder="Enter remarks or annotations here..."
                          className="common-textarea w-full h-32 resize-none"
                          value={birth.remarks || ""}
                          readOnly
                      />
                  </div>
                  <div>
                      <h3 className="text-md font-semibold">TO BE FILLED-UP AT THE OFFICE OF THE CIVIL REGISTRAR</h3>
                      <input
                          type="text"
                          name="office_boxes"
                          className="w-full common-input"
                          value={birth.office_boxes || ""}
                          readOnly
                      />
                  </div>
              </div>
  
              {/* Page 10 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Affidavit of Acknowledgment / Admission of Paternity</h2>
  
                  {/* Intro Statement */}
                  <p className="text-sm italic w-full">
                      I/We, <input type="text" name="mother_name" className="border-b border-gray-500 w-40 text-center" value={birth.mother_name || ""} readOnly /> and
                      <input type="text" name="father_name" className="border-b border-gray-500 w-40 text-center" value={birth.father_name || ""} readOnly />,
                      of legal age, am/are the natural mother and/or father of
                      <input type="text" name="child_name" className="border-b border-gray-500 w-40 text-center" value={birth.child_name || ""} readOnly /> born on
                      <input type="date" name="child_birth_date" className="border-b border-gray-500 w-40 text-center" value={birth.child_birth_date || ""} readOnly /> at
                      <input type="text" name="child_birth_place" className="border-b border-gray-500 w-40 text-center" value={birth.child_birth_place || ""} readOnly />.
                  </p>
  
                  {/* Parent Names */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Mother&apos;s Full Name</label>
                      <input
                          type="text"
                          name="mother_name"
                          placeholder="Enter mother's full name"
                          className="common-input w-full"
                          value={birth.mother_name || ""}
                          readOnly
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium mb-1">Father&apos;s Full Name</label>
                      <input
                          type="text"
                          name="father_name"
                          placeholder="Enter father's full name"
                          className="common-input w-full"
                          value={birth.father_first_name + " " + birth.father_middle_name + " " + birth.father_last_name || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Child Info */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Child&apos;s Full Name</label>
                      <input
                          type="text"
                          name="child_name"
                          placeholder="Enter child's full name"
                          className="common-input w-full"
                          value={birth.child_first_name + " " + birth.child_middle_name + " " + birth.child_last_name || ""}
                          readOnly
                      />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Date of Birth</label>
                          <input
                              type="date"
                              name="child_birth_date"
                              className="common-input w-full"
                              value={birth.child_birth_date || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Place of Birth</label>
                          <input
                              type="text"
                              name="child_birth_place"
                              placeholder="City / Municipality, Province"
                              className="common-input w-full"
                              value={birth.child_birth_place || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Affidavit Declaration */}
                  <p className="text-sm italic">
                      I am / We are executing this affidavit to attest to the truthfulness of the
                      foregoing statements and for purposes of acknowledging my/our child.
                  </p>
  
                  {/* Signature Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div className="text-center">
                          <label className="block text-sm font-medium mb-2">Mother&apos;s Signature</label>
                          <SignaturePlaceholder />
                      </div>
                      <div className="text-center">
                          <label className="block text-sm font-medium mb-2">Father&apos;s Signature</label>
                          <SignaturePlaceholder />
                      </div>
                  </div>
              </div>
  
              {/* Page 11 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Jurat for Acknowledgment / Admission of Paternity</h2>
  
                  {/* Jurat Text */}
                  <p className="text-sm italic">
                      <strong>SUBSCRIBED AND SWORN</strong> to before me this
                      <input type="number" name="jurat_day" className="border-b border-gray-500 w-12 text-center" value={birth.jurat_day || ""} readOnly /> day of
                      <input type="text" name="jurat_month_year" className="border-b border-gray-500 w-32 text-center" value={birth.jurat_month_year || ""} readOnly /> by
                      <input type="text" name="jurat_affiant1" className="border-b border-gray-500 w-40 text-center" value={birth.jurat_affiant1 || ""} readOnly /> and
                      <input type="text" name="jurat_affiant2" className="border-b border-gray-500 w-40 text-center" value={birth.jurat_affiant2 || ""} readOnly />,
                      who exhibited to me (his/her) Community Tax Cert. No.
                      <input type="text" name="ctc_number" className="border-b border-gray-500 w-32 text-center" value={birth.ctc_number || ""} readOnly /> issued on
                      <input type="date" name="ctc_date_issued" className="border-b border-gray-500 w-32 text-center" value={birth.ctc_date_issued || ""} readOnly /> at
                      <input type="text" name="ctc_place_issued" className="border-b border-gray-500 w-40 text-center" value={birth.ctc_place_issued || ""} readOnly />.
                  </p>
  
                  {/* Date and Names */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Date (Day)</label>
                          <input
                              type="number"
                              name="juratDay"
                              placeholder="e.g. 15"
                              className="common-input w-full"
                              value={birth.jurat_day || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Month & Year</label>
                          <input
                              type="text"
                              name="jurat_month_year"
                              placeholder="e.g. August 2025"
                              className="common-input w-full"
                              value={birth.jurat_month_year || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Affiant 1 (Name)</label>
                          <input
                              type="text"
                              name="jurat_affiant1"
                              placeholder="First Affiant's Full Name"
                              className="common-input w-full"
                              value={birth.jurat_affiant1 || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Affiant 2 (Name)</label>
                          <input
                              type="text"
                              name="jurat_affiant2"
                              placeholder="Second Affiant's Full Name"
                              className="common-input w-full"
                              value={birth.jurat_affiant2 || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Community Tax Certificate Info */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Community Tax Certificate No.</label>
                      <input
                          type="text"
                          name="ctc_number"
                          placeholder="Enter CTC No."
                          className="common-input w-full"
                          value={birth.ctc_number || ""}
                          readOnly
                      />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Date Issued</label>
                          <input
                              type="date"
                              name="ctc_date_issued"
                              className="common-input w-full"
                              value={birth.ctc_date_issued || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Place Issued</label>
                          <input
                              type="text"
                              name="ctc_place_issued"
                              placeholder="City / Municipality, Province"
                              className="common-input w-full"
                              value={birth.ctc_place_issued || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Administering Officer */}
                  <div className="space-y-4">
                      <div className="text-center">
                          <label className="block text-sm font-medium mb-2">Signature of the Administering Officer</label>
                          <SignaturePlaceholder />
                      </div>
                      <div>
                          <label className="block text-sm font-medium mb-1">Name in Print</label>
                          <input
                              type="text"
                              name="admin_name"
                              placeholder="Enter officer's name"
                              className="common-input w-full"
                              value={birth.admin_name || ""}
                              readOnly
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                          <input
                              type="text"
                              name="admin_position"
                              placeholder="Enter position/title"
                              className="common-input w-full"
                              value={birth.admin_position || ""}
                              readOnly
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium mb-1">Address</label>
                          <input
                              type="text"
                              name="admin_address"
                              placeholder="Enter office address"
                              className="common-input w-full"
                              value={birth.admin_address || ""}
                              readOnly
                          />
                      </div>
                  </div>
              </div>
  
              {/* Page 12 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Affidavit for Delayed Registration of Birth</h2>
                  <p className="text-sm italic text-center">
                      (To be accomplished by the hospital/clinic administrator, father, mother, guardian,
                      or the person himself/herself if 18 years old or over.)
                  </p>
  
                  <p className="text-sm italic">
                      I <input type="text" name="affiant_name" className="border-b border-gray-500 w-40 text-center" value={birth.affiant_name || ""} readOnly />,
                      of legal age, <select name="civil_status" className="border-b border-gray-500 w-40 text-center" value={birth.civil_status || ""} readOnly>
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widow">Widow</option>
                      </select>, with residence and postal address at
                      <input type="text" name="address" className="border-b border-gray-500 w-60 text-center" value={birth.address || ""} readOnly />,
                      after having been duly sworn in accordance with law, do hereby depose and say:
                  </p>
  
                  {/* Affiant Information */}
                  <div>
                      <label className="block text-sm font-medium mb-1">Name of Affiant</label>
                      <input
                          type="text"
                          name="affiant_name"
                          className="common-input w-full"
                          value={birth.affiant_name || ""}
                          readOnly
                      />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Civil Status</label>
                          <select
                              name="civil_status"
                              className="common-input w-full"
                              value={birth.civil_status || ""}
                              readOnly
                          >
                              <option value="">Select</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Divorced">Divorced</option>
                              <option value="Widow">Widow</option>
                          </select>
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Residence / Postal Address</label>
                          <input
                              type="text"
                              name="address"
                              className="common-input w-full"
                              value={birth.address || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Statement 1 - Applicant */}
                  <div>
                      <p className="text-sm font-medium mb-1">1. That I am the applicant for the delayed registration of:</p>
                      <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                          <input
                              type="checkbox"
                              className="custom-checkbox"
                              name="self_checkbox"
                              checked={birth.self_checkbox === 'on' ? true : false}
                              readOnly
                          />
                          <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="whitespace-nowrap">My birth in</span>
                              <input
                                  type="text"
                                  name="self_pob"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.self_pob  || ""}
                                  readOnly
                              />
                              <span className="whitespace-nowrap">on</span>
                              <input
                                  type="date"
                                  name="self_dob"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.self_dob || ""}
                                  readOnly
                              />
                          </span>
                      </label>
                      <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                          <input
                              type="checkbox"
                              className="custom-checkbox"
                              name="child_checkbox"
                              checked={birth.child_checkbox === 'on' ? true : false}
                              readOnly
                          />
                          <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="whitespace-nowrap">The birth of</span>
                              <input
                                  type="text"
                                  name="child_name_affidavit"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.child_name_affidavit || ""}
                                  readOnly
                              />
                              <span className="whitespace-nowrap">who was born in</span>
                              <input
                                  type="text"
                                  name="child_pob"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.child_pob || ""}
                                  readOnly
                              />
                              <span className="whitespace-nowrap">on</span>
                              <input
                                  type="date"
                                  name="child_dob"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.child_dob || ""}
                                  readOnly
                              />
                          </span>
                      </label>
                  </div>
  
                  {/* Statement 2 */}
                  <div>
                      <p className="text-sm font-medium mb-1">2. That I/he/she was attended at birth by:</p>
                      <input
                          type="text"
                          name="affidavit_attendant_name"
                          placeholder="Name of Attendant"
                          className="common-input w-full"
                          value={birth.affidavit_attendant_name || ""}
                          readOnly
                      />
                      <input
                          type="text"
                          name="affidavit_attendant_address"
                          placeholder="Address of Attendant"
                          className="common-input w-full mt-2"
                          value={birth.affidavit_attendant_address || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Statement 3 */}
                  <div>
                      <p className="text-sm font-medium mb-1">3. That I am/he/she is a citizen of:</p>
                      <input
                          type="text"
                          name="affidavit_citizenship"
                          className="common-input w-full"
                          value={birth.affidavit_citizenship || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Statement 4 */}
                  <div>
                      <p className="text-sm font-medium mb-1">4. That my/his/her parents were:</p>
                      <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                          <input
                              type="checkbox"
                              className="custom-checkbox"
                              name="parents_status"
                              value="married"
                              checked={birth.parents_status === "married" ? true : false}
                              readOnly
                          />
                          <span className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="whitespace-nowrap">Married on</span>
                              <input
                                  type="date"
                                  name="marriage_date"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.marriage_date || ""}
                                  readOnly
                              />
                              <span className="whitespace-nowrap">at</span>
                              <input
                                  type="text"
                                  name="marriage_place"
                                  className="common-input w-full sm:flex-1"
                                  value={birth.marriage_place || ""}
                                  readOnly
                              />
                          </span>
                      </label>
                      <label className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full mb-2">
                          <input
                              type="checkbox"
                              className="custom-checkbox"
                              name="parents_status"
                              value="not married"
                              checked={birth.parents_status === "not married" ? true : false}
                              readOnly
                          />
                          <span className="flex-1 flex flex-col gap-2">
                              <span className="whitespace-wrap">Not married but acknowledged/not acknowledged by father whose name is</span>
                              <input
                                  type="text"
                                  name="affidavit_father_name"
                                  className="common-input w-full"
                                  value={birth.affidavit_father_name || ""}
                                  readOnly
                              />
                          </span>
                      </label>
                  </div>
  
                  {/* Statement 5 */}
                  <div>
                      <p className="text-sm font-medium mb-1">5. That the reason for the delay in registering my/his/her birth was:</p>
                      <textarea
                          name="reason_delay"
                          className="common-textarea w-full h-24 resize-none"
                          value={birth.reason_delay || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Statement 6 */}
                  <div>
                      <p className="text-sm font-medium mb-1">6. (For the applicant only) That I am married to:</p>
                      <input
                          type="text"
                          name="spouse_applicant"
                          placeholder="Spouse of Applicant"
                          className="common-input w-full"
                          value={birth.spouse_applicant || ""}
                          readOnly
                      />
                      <p className="text-sm font-medium mt-4">(If the applicant is other than the document owner) That I am married to:</p>
                      <input
                          type="text"
                          name="spouse_owner"
                          placeholder="Spouse of Document Owner"
                          className="common-input w-full"
                          value={birth.spouse_owner || ""}
                          readOnly
                      />
                  </div>
              </div>
  
              {/* Page 13 */}
              <div className="mb-6 text-left space-y-6">
                  <h2 className="text-lg text-center font-semibold">Jurat for Delayed Registration</h2>
  
                  {/* Statement 7 */}
                  <div>
                      <p className="text-sm font-medium mb-1">
                          7. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal intents and purposes.
                      </p>
                  </div>
  
                  {/* Jurat Section */}
                  <div className="pt-6">
                      <p className="text-sm italic">
                          In truth whereof, I have affixed my signature below this
                          <input type="number" name="final_jurat_day" className="border-b border-gray-500 w-12 text-center" value={birth.final_jurat_day || ""} readOnly /> day of
                          <input type="text" name="final_jurat_month_year" className="border-b border-gray-500 w-32 text-center" value={birth.final_jurat_month_year || ""} readOnly /> at
                          <input type="text" name="final_jurat_place" className="border-b border-gray-500 w-40 text-center" value={birth.final_jurat_place || ""} readOnly />, Philippines.
                      </p>
                  </div>
  
                  {/* Date & Place */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Day of</label>
                          <input
                              type="number"
                              name="final_jurat_day"
                              placeholder="Day"
                              className="common-input"
                              value={birth.final_jurat_day || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Month / Year</label>
                          <input
                              type="text"
                              name="final_jurat_month_year"
                              placeholder="Month / Year"
                              className="common-input"
                              value={birth.final_jurat_month_year || ""}
                              readOnly
                          />
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="block text-sm font-medium mb-1">Place (City / Municipality, Province)</label>
                      <input
                          type="text"
                          name="final_jurat_place"
                          placeholder="e.g., Cebu City, Cebu"
                          className="common-input"
                          value={birth.final_jurat_place || ""}
                          readOnly
                      />
                  </div>
  
                  {/* Community Tax Certificate */}
                  <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">CTC Number</label>
                      <input
                          type="text"
                          name="final_ctc_number"
                          placeholder="Community Tax Cert. No."
                          className="common-input"
                          value={birth.final_ctc_number || ""}
                          readOnly
                      />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Issued On</label>
                          <input
                              type="date"
                              name="final_ctc_issued_on"
                              placeholder="Date Issued"
                              className="common-input"
                              value={birth.final_ctc_issued_on || ""}
                              readOnly
                          />
                      </div>
                      <div className="w-full">
                          <label className="block text-sm font-medium mb-1">Issued At</label>
                          <input
                              type="text"
                              name="final_ctc_issued_at"
                              placeholder="Place Issued"
                              className="common-input"
                              value={birth.final_ctc_issued_at || ""}
                              readOnly
                          />
                      </div>
                  </div>
  
                  {/* Administering Officer */}
                  <div className="space-y-4">
                      <div className="flex flex-col">
                          <label className="block text-sm font-medium mb-1">Signature of the Administering Officer</label>
                          <SignaturePlaceholder />
                      </div>
                      <div className="flex flex-col">
                          <label className="block text-sm font-medium mb-1">Name in Print</label>
                          <input
                              type="text"
                              name="admin_officer_name"
                              placeholder="Full Name"
                              className="common-input"
                              value={birth.admin_officer_name || ""}
                              readOnly
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="block text-sm font-medium mb-1">Position / Title / Designation</label>
                          <input
                              type="text"
                              name="admin_officer_position"
                              placeholder="Position / Title / Designation"
                              className="common-input"
                              value={birth.admin_officer_position || ""}
                              readOnly
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="block text-sm font-medium mb-1">Address</label>
                          <input
                              type="text"
                              name="admin_officer_address"
                              placeholder="Office Address"
                              className="common-input"
                              value={birth.admin_officer_address || ""}
                              readOnly
                          />
                      </div>
                  </div>
              </div>
          </form>
      </>
  );}