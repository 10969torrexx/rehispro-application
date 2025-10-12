const db = require('../db');
const { writeLog } = require('../utils/logger');
const { parsedData : _birthParseData } = require('../helpers/BirthTesseract');
const { callPythonOCR } = require('../services/OCRService');

function create (req, res) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }

        const flatData = formData;
        writeLog(`[info] [BirthCertificateController][create] Received data: ${JSON.stringify(flatData)}`);

        //TODO: process the attendant value
        const attendantMap = {
            attendantPhysician: "Physician",
            attendantNurse: "Nurse",
            attendantMidwife: "Midwife",
            attendantHilot: "Hilot",
        };

        let attendantValue = "";
        for (const key in attendantMap) {
            if (flatData[key] == "on" || flatData[key] === true) {
                attendantValue = attendantMap[key];
                break;
            }
        }

        if (
            !attendantValue &&
            (flatData.attendantOthers === "on" || flatData.attendantOthers === true)
        ) {
            attendantValue = flatData.attendantOthersSpecify?.trim() || "";
        }

        flatData.attendant = attendantValue || "";
        delete flatData.attendantPhysician;
        delete flatData.attendantNurse;
        delete flatData.attendantMidwife;
        delete flatData.attendantHilot;
        delete flatData.attendantOthers;
        delete flatData.attendantOthersSpecify;

        writeLog(`[info] [BirthCertificateController][create] Processed flat data: ${JSON.stringify(flatData)}`);

        const creatorId = Number(flatData.creatorId);
        if (!creatorId || isNaN(creatorId) || creatorId <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid or missing creator ID' });
        }

        const fieldMap = {
            // Core
            creatorId: "creator_id",
            creationType: "creation_type",
          
            // Page 1 - Child Information
            province: "province",
            city: "city",
            registryNumber: "registry_number",
            childFirstName: "child_first_name",
            childMiddleName: "child_middle_name",
            childLastName: "child_last_name",
            sex: "sex",
            dateOfBirth: "date_of_birth",
            place_of_birth_barangay: "place_of_birth_barangay",
            placeOfBirthCity: "place_of_birth_city",
            placeOfBirthProvince: "place_of_birth_province",
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
            attendant: "attendant",
          
            // Page 6 - Attendant Certification
            birthTime: "birth_time",
            birthDate: "birth_date",
            attendantName: "attendant_name",
            attendantTitle: "attendant_title",
            attendantAddress: "attendant_address",
          
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
          
            // Page 13 - Final Jurat / Affidavit
            finalJuratDay: "final_jurat_day",
            finalJuratMonthYear: "final_jurat_month_year",
            finalJuratPlace: "final_jurat_place",
            finalCtcNumber: "final_ctc_number",
            finalCtcIssuedOn: "final_ctc_issued_on",
            finalCtcIssuedAt: "final_ctc_issued_at",
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

        writeLog(`[info] [BirthCertificateController][create] Executing query: ${query} with values: ${values}`);

        db.run(query, values, function (err) {
            if (err) {
                writeLog(`[error] [BirthCertificateController][create] ${err.message}`);
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
        writeLog(`[error] [BirthCertificateController][create] ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

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

async function uploadAndScan(req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        const filePaths = req.files.map(file => file.path);
        const response = await callPythonOCR(filePaths);
        writeLog(`${response.success === true ? '[info]' : '[error]' } [uploadAndScan] ${JSON.stringify({
            success: response.success,
            message: response.message,
            data: response.result
        })}`);
        if (!response.success) {
            res.status(500).json({
                success: response.success,
                message: response.message,
            });
        } 
        res.status(200).json({
            success: response.success,
            message: response.message,
            result: response.result
        });
    } catch (error) {
        writeLog(`[error] [uploadAndScan] ${JSON.stringify(error)}`);
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message
        });
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
    uploadAndScan,
    view
};