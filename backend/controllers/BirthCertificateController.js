const { data } = require('autoprefixer');
const db = require('../db');
const bcrypt = require('bcryptjs');
const { writeLog } = require('../utils/logger');
const { write } = require('original-fs');
const { json } = require('body-parser');

function create(req, res) {
    try {
        const formData = req.body;
        if (!formData || formData.length === 0) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }

        // TODO: complete the insert query
        const query = `INSERT INTO birthcertificates (
            creator_id,
            creation_type,

            province,
            city,
            child_first_name,
            child_middle_name,
            child_last_name,
            sex,
            date_of_birth,
            type_of_birth,
            multiple_birth_order,
            birth_order,
            birth_weight,

            maiden_first_name,
            maiden_middle_name,
            maiden_last_name,
            citizenship,
            religion,
            children_born_alive,
            children_still_living,
            children_deceased,
            occupation,
            age_at_birth,
            residence_house,
            residence_city,
            residence_province,
            residence_country,

            father_first_name,
            father_middle_name,
            father_last_name,
            father_citizenship,
            father_religion,
            father_occupation,
            father_age_at_birth,
            father_residence_street,
            father_residence_city,
            father_residence_province,
            father_residence_country,

            date_of_marriage,
            marriage_city,
            marriage_province,
            marriage_country,

            attendant_physician,
            attendant_nurse,
            attendant_midwife,
            attendant_hilot,
            attendant_others,
            attendant_others_specify,
            date_of_attendance,
            attendant_name_title,

            birth_time,
            birth_date,
            attendant_name,
            attendant_title,
            attendant_address,
            attendant_date_signed,
            attendant_signature,

            informant_name,
            informant_relationship,
            informant_address,
            informant_date,
            prepared_name,
            prepared_title,
            prepared_date,

            received_name,
            received_title,
            received_date,
            registrar_signature,
            registrar_name,
            registrar_title,
            registrar_date,

            remarks,
            office_boxes,

            mother_name,
            father_name,
            child_name,
            child_birth_date,
            child_birth_place,

            jurat_day,
            jurat_month_year,
            jurat_affiant1,
            jurat_affiant2,
            ctc_number,
            ctc_date_issued,
            ctc_place_issued,
            admin_name,
            admin_position,
            admin_address,
            admin_signature,

            affiant_name,
            civil_status,
            address,
            self_checkbox,
            self_pob,
            self_dob,
            child_checkbox,
            child_name_affidavit,
            child_pob,
            child_dob,
            affidavit_attendant_name,
            affidavit_attendant_address,
            affidavit_citizenship,
            parents_status,
            marriage_date,
            marriage_place,
            affidavit_father_name,
            reason_delay,
            spouse_applicant,
            spouse_owner,
            affiant_signature,

            final_jurat_day,
            final_jurat_month_year,
            final_jurat_place,
            final_ctc_number,
            final_ctc_issued_on,
            final_ctc_issued_at,
            admin_officer_signature,
            admin_officer_name,
            admin_officer_position,
            admin_officer_address
        )
        VALUES (
            ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?,
            ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ? 
        );

        `; 
        
        //TODO: map the formData to the values array in the correct order
        const values = [
            // creator_id and creation_type
            formData.creatorId || null,                  // fallback if you have session/user
            formData.creationType || null,

            // Page 1 - Child Information
            formData.page1?.province || null,
            formData.page1?.city || null,
            formData.page1?.childFirstName || null,
            formData.page1?.childMiddleName || null,
            formData.page1?.childLastName || null,
            formData.page1?.sex || null,
            formData.page1?.dateOfBirth || null,
            formData.page1?.typeOfBirth || null,
            formData.page1?.multipleBirthOrder || null,
            formData.page1?.birthOrder || null,
            formData.page1?.birthWeight || null,

            // Page 2 - Mother Information
            formData.page2?.maidenFirstName || null,
            formData.page2?.maidenMiddleName || null,
            formData.page2?.maidenLastName || null,
            formData.page2?.citizenship || null,
            formData.page2?.religion || null,
            formData.page2?.childrenBornAlive || null,
            formData.page2?.childrenStillLiving || null,
            formData.page2?.childrenDeceased || null,
            formData.page2?.occupation || null,
            formData.page2?.ageAtBirth || null,
            formData.page2?.residenceHouse || null,
            formData.page2?.residenceCity || null,
            formData.page2?.residenceProvince || null,
            formData.page2?.residenceCountry || null,

            // Page 3 - Father Information
            formData.page3?.fatherFirstName || null,
            formData.page3?.fatherMiddleName || null,
            formData.page3?.fatherLastName || null,
            formData.page3?.fatherCitizenship || null,
            formData.page3?.fatherReligion || null,
            formData.page3?.fatherOccupation || null,
            formData.page3?.fatherAgeAtBirth || null,
            formData.page3?.fatherResidenceStreet || null,
            formData.page3?.fatherResidenceCity || null,
            formData.page3?.fatherResidenceProvince || null,
            formData.page3?.fatherResidenceCountry || null,

            // Page 4 - Marriage Information
            formData.page4?.dateOfMarriage || null,
            formData.page4?.marriageCity || null,
            formData.page4?.marriageProvince || null,
            formData.page4?.marriageCountry || null,

            // Page 5 - Attendant Information
            formData.page5?.attendantPhysician ? 1 : 0,
            formData.page5?.attendantNurse ? 1 : 0,
            formData.page5?.attendantMidwife ? 1 : 0,
            formData.page5?.attendantHilot ? 1 : 0,
            formData.page5?.attendantOthers ? 1 : 0,
            formData.page5?.attendantOthersSpecify || null,
            formData.page5?.dateOfAttendance || null,
            formData.page5?.attendantNameTitle || null,

            // Page 6 - Attendant Certification
            formData.page6?.birthTime || null,
            formData.page6?.birthDate || null,
            formData.page6?.attendantName || null,
            formData.page6?.attendantTitle || null,
            formData.page6?.attendantAddress || null,
            formData.page6?.attendantDateSigned || null,
            formData.page6?.attendantSignature || null,

            // Page 7 - Informant & Prepared By
            formData.page7?.informantName || null,
            formData.page7?.informantRelationship || null,
            formData.page7?.informantAddress || null,
            formData.page7?.informantDate || null,
            formData.page7?.preparedName || null,
            formData.page7?.preparedTitle || null,
            formData.page7?.preparedDate || null,

            // Page 8 - Civil Registrar Section
            formData.page8?.receivedName || null,
            formData.page8?.receivedTitle || null,
            formData.page8?.receivedDate || null,
            formData.page8?.registrarSignature || null,
            formData.page8?.registrarName || null,
            formData.page8?.registrarTitle || null,
            formData.page8?.registrarDate || null,

            // Page 9 - Remarks
            formData.page9?.remarks || null,
            JSON.stringify(formData.page9?.officeBoxes || []),

            // Page 10 - Affidavit of Acknowledgment
            formData.page10?.motherName || null,
            formData.page10?.fatherName || null,
            formData.page10?.childName || null,
            formData.page10?.childBirthDate || null,
            formData.page10?.childBirthPlace || null,

            // Page 11 - Jurat
            formData.page11?.juratDay || null,
            formData.page11?.juratMonthYear || null,
            formData.page11?.juratAffiant1 || null,
            formData.page11?.juratAffiant2 || null,
            formData.page11?.ctcNumber || null,
            formData.page11?.ctcDateIssued || null,
            formData.page11?.ctcPlaceIssued || null,
            formData.page11?.adminName || null,
            formData.page11?.adminPosition || null,
            formData.page11?.adminAddress || null,
            formData.page11?.adminSignature || null,

            // Page 12 - Affidavit
            formData.page12?.affiantName || null,
            formData.page12?.civilStatus || null,
            formData.page12?.address || null,
            formData.page12?.selfCheckbox ? 1 : 0,
            formData.page12?.selfPob || null,
            formData.page12?.selfDob || null,
            formData.page12?.childCheckbox ? 1 : 0,
            formData.page12?.childName || null,
            formData.page12?.childPob || null,
            formData.page12?.childDob || null,
            formData.page12?.attendantName || null,
            formData.page12?.attendantAddress || null,
            formData.page12?.citizenship || null,
            formData.page12?.parentsStatus || null,
            formData.page12?.marriageDate || null,
            formData.page12?.marriagePlace || null,
            formData.page12?.fatherName || null,
            formData.page12?.reasonDelay || null,
            formData.page12?.spouseApplicant || null,
            formData.page12?.spouseOwner || null,
            formData.page12?.affiantSignature || null,

            // Page 13 - Final Jurat
            formData.page13?.juratDay || null,
            formData.page13?.juratMonthYear || null,
            formData.page13?.juratPlace || null,
            formData.page13?.ctcNumber || null,
            formData.page13?.ctcIssuedOn || null,
            formData.page13?.ctcIssuedAt || null,
            formData.page13?.adminOfficerSignature || null,
            formData.page13?.adminOfficerName || null,
            formData.page13?.adminOfficerPosition || null,
            formData.page13?.adminOfficerAddress || null,

            // Page 14 - Confirmation
            formData.page14?.confirmation ? 1 : 0,
        ];

        writeLog(`[birth controller] create formData: ${JSON.stringify(values)}`);
        writeLog(`[birth controller] query: ${JSON.stringify([query])}`);

        //TODO: running the insert query
        db.run(query, values, function (err) {
            if (err) {
                writeLog(`[birth controller] error: ${JSON.stringify(
                    { message: err.message, code: err.code, errno: err.errno, stack: err.stack },
                    null,
                    2
                )}`);
                console.error('Insert error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to create birth certificate', 
                    error: err 
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Birth certificate created successfully',
                id: this.lastID
            });
        });
    
    } catch (error) {
        writeLog(`[birth controller] error: ${JSON.stringify(error)}`);
        return res.status(500).json({
            success: false, 
            message: 'Server Error', 
            error: error.message 
        });
    }
}

function read() {

}

function update() {

}

function remove() {

}

function find() {

}

module.exports = {
    create,
    read,
    update,
    remove,
    find
};