const db = require('../db');
const { writeLog } = require('../utils/logger');
const { parsedData : _birthParseData } = require('../helpers/BirthTesseract');
const { callPythonOCR } = require('../services/OCRService');
const generate = require('../helpers/birthGeneratePDF');
const puppeteer = require('puppeteer');
const { storeFile } = require('./FilesController');
async function create (req, res) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }

        const flatData = formData;
        writeLog(`[info] [BirthCertificateController][create] Received data: ${JSON.stringify(flatData)}`);

        //TODO: create file process
        if (flatData.filePath && Array.isArray(flatData.filePath) && flatData.filePath.length > 0) {
        const fileData = {
            creator_id: Number(flatData.creatorId),
            file_name: `birth_certificate_${Date.now()}.pdf`,
            file_paths: flatData.filePath
        };

        try {
            const fileId = await storeFile(fileData);
            writeLog(`[info] [BirthCertificateController][create] Stored file with ID: ${fileId}`);
        } catch (err) {
            writeLog(`[error] [BirthCertificateController][create] Failed to store file: ${err.message}`);
        }
        } else {
        writeLog(`[info] [BirthCertificateController][create] No file paths provided, skipping file storage.`);
        }


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
            fatherName: "affidavit_father_name",
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
            confirmation: "confirmation",
            fileId: "file_id",
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
        const response = await callPythonOCR(filePaths, "birth");
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
            result: response.result,
            filePaths: filePaths
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

async function download(req, res) {
    try {
        const data = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM birthcertificates WHERE id = ?`, [req.params.id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
        writeLog(`INFO [BirthCertificateController][download] ${JSON.stringify(data)}`);
        const html = generate(data);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({ 
            printBackground: true,
            width: "8.5in",   
            height: "13in",   
        });
        await browser.close();
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=birth_certificate.pdf",
            "Content-Length": pdfBuffer.length
        });
        res.send(pdfBuffer);
    } catch (error) {
        writeLog(`ERROR: [birth][download] ${error}`)
        console.error(error);
        res.status(500).json({ success: false, message: "Error generating PDF", error: error.message });
   }
}

async function latest(req, res) { 
    db.all(
    `
        SELECT 
        id, 
        CONCAT(child_first_name, " ", child_middle_name, " ", child_last_name) AS child_name, 
        sex, 
        child_birth_place,
        DATE(created_at) AS created_at, 
        CONCAT(city, ", ", province) AS residence 
        FROM birthcertificates ORDER BY created_at DESC LIMIT 5
    `,
    (err, rows) => {
      if (err) {
        console.error('❌ [DB Error]', err.message);
        return res.status(500).json({
          success: false,
          message: 'Database fetch failed',
          error: err.message,
        });
      }
  
      const list_of_death = rows;
  
      res.status(200).json({
        success: true,
        message: 'Death Certificate List',
        data: list_of_death,
      });
    }
  );
}

async function search(req, res) {
    try {
        const rawQuery = req.body || '';
        const params = new URLSearchParams(rawQuery);
        const firstName = params.get('firstName')?.trim() || '';
        const middleName = params.get('middleName')?.trim() || '';
        const lastName = params.get('lastName')?.trim() || '';
        const dateOfBirth = params.get('dateOfBirth')?.trim() || '';
        const placeOfBirth = params.get('placeOfBirth')?.trim() || '';
        const registryNumber = params.get('registryNumber')?.trim() || '';
        const fathersFirstName = params.get('fathersFirstName')?.trim() || '';
        const fathersMiddleName = params.get('fathersMiddleName')?.trim() || '';
        const fathersLastName = params.get('fathersLastName')?.trim() || '';
        const mothersFirstName = params.get('mothersFirstName')?.trim() || '';
        const mothersMiddleName = params.get('mothersMiddleName')?.trim() || '';
        const mothersLastName = params.get('mothersLastName')?.trim() || '';

        const conditions = [];
        const values = [];

        if (firstName) {
            conditions.push(`child_first_name LIKE ?`);
            values.push(`%${firstName}%`);
        }
        if (middleName) {
            conditions.push(`child_middle_name LIKE ?`);
            values.push(`%${middleName}%`);
        }
        if (lastName) {
            conditions.push(`child_last_name LIKE ?`);
            values.push(`%${lastName}%`);
        }
        if (dateOfBirth) {
            conditions.push(`child_birth_date LIKE ?`);
            values.push(`%${dateOfBirth}%`);
        }
        if (placeOfBirth) {
            conditions.push(`child_birth_place LIKE ?`);
            values.push(`%${placeOfBirth}%`);
        }
        if (registryNumber) {
            conditions.push(`registry_number LIKE ?`);
            values.push(`%${registryNumber}%`);
        }
        if (fathersFirstName) {
            conditions.push(`father_first_name LIKE ?`);
            values.push(`%${fathersFirstName}%`);
        }
        if (fathersMiddleName) {
            conditions.push(`father_middle_name LIKE ?`);
            values.push(`%${fathersMiddleName}%`);
        }
        if (fathersLastName) {
            conditions.push(`father_last_name LIKE ?`);
            values.push(`%${fathersLastName}%`);
        }
        if (mothersFirstName) {
            conditions.push(`maiden_first_name LIKE ?`);
            values.push(`%${mothersFirstName}%`);
        }
        if (mothersMiddleName) {
            conditions.push(`maiden_middle_name LIKE ?`);
            values.push(`%${mothersMiddleName}%`);
        }
        if (mothersLastName) {
            conditions.push(`maiden_last_name LIKE ?`);
            values.push(`%${mothersLastName}%`);
        }   

        let query = `
            SELECT 
                id,
                registry_number,
                child_first_name as first_name,
                child_middle_name as middle_name,
                child_last_name as last_name,
                date_of_birth,
                sex,
                child_birth_place,
                DATE(created_at) AS created_at,
                CONCAT(city, ", ", province) AS residence
            FROM birthcertificates
        `;

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        writeLog(`INFO [BirthCertificateController][search] Executing query: ${query} with values: ${values}`);
        db.all(query, values, (err, rows) => {
            if (err) {
                console.error('❌ [DB Error]', err.message);
                writeLog(`ERROR [birth][search] ${err.message}`);
                return res.status(500).json({
                    success: false,
                    message: 'Database fetch failed',
                    error: err.message,
                });
            }

            res.status(200).json({
                success: true,
                message: 'Search Results',
                data: rows,
            });
        });
    } catch (error) {
        console.error('❌ [Search Error]', error.message);
        writeLog(`ERROR [birth][search] ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Search failed',
            error: error.message,
        });
    }
}

async function createFile(req, res) {
    try {
        const formData = req.body;
        writeLog(`INFO [birth][createFile] ${JSON.stringify(formData)}`);
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }
        const fieldMap = {
            creatorId : 'creator_id',
            registryNumber: 'registry_number',
            dateOfBirth: 'date_of_birth',
            placeOfBirth:'child_birth_place',
            firstName: 'child_first_name',
            middleName: 'child_middle_name',
            lastName: 'child_last_name',
            sex: 'child_gender',
            fathersFirstName: 'father_first_name',
            fathersMiddleName: 'father_middle_name',
            fathersLastName: 'father_last_name',
            mothersFirstName: 'maiden_first_name',
            mothersMiddleName: 'maiden_middle_name',
            mothersLastName: 'maiden_last_name',
            filePath: 'sample',
            fileNames: 'sample'
        }

        const columns = [];
        const values = [];
        for (const key in formData) {
            if (fieldMap[key]) {
                columns.push(fieldMap[key]);
                values.push(formData[key]);
            }
        }
        const placeholders = columns.map(() => '?').join(', ');
        const query = `
            INSERT INTO birth_uploads (${columns.join(', ')})
            VALUES (${placeholders})
        `;
        db.run(query, values, function (err) {
            if (err) {
                console.error('[DB Error]', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Database insert failed',
                    error: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: 'File Stored',
                id: this.lastID
            });
        });

    } catch (error) {
        writeLog('[BirthController Error]', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
   
module.exports = {
    create,
    list,
    latest,
    uploadAndScan,
    view,
    download,
    search,
    createFile
};