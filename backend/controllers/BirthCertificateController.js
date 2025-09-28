const { data } = require('autoprefixer');
const db = require('../db');
const bcrypt = require('bcryptjs');
const { writeLog } = require('../utils/logger');
const { logQuery, interpolateQuery } = require('../utils/querytrace');
const Tesseract = require('tesseract.js');
const path = require('path');

function create (req, res) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }

        // 🔹 Flatten directly (your frontend already sends structured formData)
        const flatData = formData;

        // 🔹 Validate creatorId
        const creatorId = Number(flatData.creatorId);
        if (!creatorId || isNaN(creatorId) || creatorId <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid or missing creator ID' });
        }

        // 🔹 Map frontend camelCase → database snake_case
        const fieldMap = {
            // Core
            creatorId: "creator_id",
            creationType: "creation_type",
          
            // Page 1 - Child Information
            province: "province",
            city: "city",
            childFirstName: "child_first_name",
            childMiddleName: "child_middle_name",
            childLastName: "child_last_name",
            sex: "sex",
            dateOfBirth: "date_of_birth",
            typeOfBirth: "type_of_birth",
            multipleBirthOrder: "multiple_birth_order",
            birthOrder: "birth_order",
            birthWeight: "birth_weight",
          
            // Page 2 - Mother Information
            maidenFirstName: "maiden_first_name",
            maidenMiddleName: "maiden_middle_name",
            maidenLastName: "maiden_last_name",
            citizenship: "citizenship",
            religion: "religion",
            childrenBornAlive: "children_born_alive",
            childrenStillLiving: "children_still_living",
            childrenDeceased: "children_deceased",
            occupation: "occupation",
            ageAtBirth: "age_at_birth",
            residenceHouse: "residence_house",
            residenceCity: "residence_city",
            residenceProvince: "residence_province",
            residenceCountry: "residence_country",
          
            // Page 3 - Father Information
            fatherFirstName: "father_first_name",
            fatherMiddleName: "father_middle_name",
            fatherLastName: "father_last_name",
            fatherCitizenship: "father_citizenship",
            fatherReligion: "father_religion",
            fatherOccupation: "father_occupation",
            fatherAgeAtBirth: "father_age_at_birth",
            fatherResidenceStreet: "father_residence_street",
            fatherResidenceCity: "father_residence_city",
            fatherResidenceProvince: "father_residence_province",
            fatherResidenceCountry: "father_residence_country",
          
            // Page 4 - Marriage Information
            dateOfMarriage: "date_of_marriage",
            marriageCity: "marriage_city",
            marriageProvince: "marriage_province",
            marriageCountry: "marriage_country",
          
            // Page 5 - Attendant Information
            attendantPhysician: "attendant_physician",
            attendantNurse: "attendant_nurse",
            attendantMidwife: "attendant_midwife",
            attendantHilot: "attendant_hilot",
            attendantOthers: "attendant_others",
            attendantOthersSpecify: "attendant_others_specify",
            dateOfAttendance: "date_of_attendance",
            attendantNameTitle: "attendant_name_title",
          
            // Page 6 - Attendant Certification
            birthTime: "birth_time",
            birthDate: "birth_date",
            attendantName: "attendant_name",
            attendantTitle: "attendant_title",
            attendantAddress: "attendant_address",
            attendantDateSigned: "attendant_date_signed",
            attendantSignature: "attendant_signature",
          
            // Page 7 - Informant & Prepared By
            informantName: "informant_name",
            informantRelationship: "informant_relationship",
            informantAddress: "informant_address",
            informantDate: "informant_date",
            preparedName: "prepared_name",
            preparedTitle: "prepared_title",
            preparedDate: "prepared_date",
          
            // Page 8 - Civil Registrar Section
            receivedName: "received_name",
            receivedTitle: "received_title",
            receivedDate: "received_date",
            registrarSignature: "registrar_signature",
            registrarName: "registrar_name",
            registrarTitle: "registrar_title",
            registrarDate: "registrar_date",
          
            // Page 9 - Remarks / Annotations
            remarks: "remarks",
            officeBoxes: "office_boxes",
          
            // Page 10 - Affidavit of Acknowledgment
            motherName: "mother_name",
            fatherName: "father_name",
            childName: "child_name",
            childBirthDate: "child_birth_date",
            childBirthPlace: "child_birth_place",
          
            // Page 11 - Jurat
            juratDay: "jurat_day",
            juratMonthYear: "jurat_month_year",
            juratAffiant1: "jurat_affiant1",
            juratAffiant2: "jurat_affiant2",
            ctcNumber: "ctc_number",
            ctcDateIssued: "ctc_date_issued",
            ctcPlaceIssued: "ctc_place_issued",
            adminName: "admin_name",
            adminPosition: "admin_position",
            adminAddress: "admin_address",
            adminSignature: "admin_signature",
          
            // Page 12 - Affidavit
            affiantName: "affiant_name",
            civilStatus: "civil_status",
            address: "address",

            selfCheckbox: "self_checkbox",
            selfPob: "self_pob",
            selfDob: "self_dob",

            childCheckbox: "child_checkbox",
            childName: "child_name_affidavit",
            childPob: "child_pob",
            childDob: "child_dob",

            attendantName: "affidavit_attendant_name",
            attendantAddress: "affidavit_attendant_address",
            citizenship: "affidavit_citizenship",

            parentsStatus: "parents_status",
            marriageDate: "marriage_date",
            marriagePlace: "marriage_place",
            fatherName: "affidavit_father_name",   // ✅ special mapping

            reasonDelay: "reason_delay",
            spouseApplicant: "spouse_applicant",
            spouseOwner: "spouse_owner",
            affiantSignature: "affiant_signature",
          
            // Page 13 - Final Jurat / Affidavit
            finalJuratDay: "final_jurat_day",
            finalJuratMonthYear: "final_jurat_month_year",
            finalJuratPlace: "final_jurat_place",
            finalCtcNumber: "final_ctc_number",
            finalCtcIssuedOn: "final_ctc_issued_on",
            finalCtcIssuedAt: "final_ctc_issued_at",
            adminOfficerSignature: "admin_officer_signature",
            adminOfficerName: "admin_officer_name",
            adminOfficerPosition: "admin_officer_position",
            adminOfficerAddress: "admin_officer_address",
          
            // Page 14 - Confirmation
            confirmation: "confirmation"
          };
          

        // 🔹 Build SQL dynamically
        const columns = [];
        const values = [];

        for (const key in flatData) {
            if (fieldMap[key]) {
                columns.push(fieldMap[key]);
                values.push(flatData[key]);
            }
        }

        const placeholders = columns.map(() => "?").join(", ");

        const query = `
            INSERT INTO birthcertificates (${columns.join(", ")})
            VALUES (${placeholders})
        `;

        console.log("🟢 Columns:", columns);
        console.log("🟢 Values length:", values.length);

        db.run(query, values, function (err) {
            if (err) {
                console.error("[DB Error]", err.message);
                return res.status(500).json({
                    success: false,
                    message: "Database insert failed",
                    error: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Birth Certificate Created Successfully",
                id: this.lastID
            });
        });

    } catch (error) {
        console.error("[Controller Error]", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// LIST Death Certificate
function list (req, res) {
    console.log("🔍 Attempting to fetch birth certificates..."); // Add this
    db.all(
        `
        SELECT 
        id, 
        CONCAT(child_first_name, " ", child_middle_name, " ", child_last_name) AS child_name, 
        sex, 
        CONCAT(maiden_first_name, " ", maiden_middle_name, " ", maiden_last_name) AS mother_name,
        CONCAT(father_first_name, " ", father_middle_name, " ", father_last_name) AS father_name,
        DATE(created_at) AS created_at, 
        CONCAT(city, ", ", province) AS residence 
        FROM birthcertificates
        `, 
        (err, rows) => {
        if (err) {
            console.error('❌ [DB Error]', err.message);
            return res.status(500).json({
                success: false,
                message: 'Database fetch failed',
                error: err.message
            });
        }
        const list_of_birth = rows;
        // console.log("🟢 List of death certificates:", list_of_death.length, list_of_death);
        res.status(200).json({
            success: true,
            message: 'Birth Certificate List',
            data: list_of_birth
        });
    });
};

function update() {

}

function remove() {

}

function find() {
}

async function scanImage(req, res) {
    try{
        res.status(200).json({ success: true, message: 'File upload endpoint hit' });
    }
    catch (error) {
        console.error('❌ [Upload Error]', error);
        res.status(500).json({ success: false, message: 'File upload failed', error: error.message });
    }

}

function view(req, res) {
    console.log("Attempting to fetch birth certificate with ID:", req.params.id);

    db.get(
      `SELECT * FROM birthcertificates WHERE id = ?`,
      [req.params.id],
      (err, row) => {
        if (err) {
          console.error('❌ [DB Error]', err.message);
          return res.status(500).json({
            success: false,
            message: 'Database fetch failed',
            error: err.message,
          });
        }
    
        const birth_certificate = row;
    
        res.status(200).json({
          success: true,
          message: 'Birth Certificate Found',
          data: birth_certificate,
        });
      }
    );
}

module.exports = {
    create,
    list,
    update,
    remove,
    find,
    scanImage,
    view
};