// backend\controllers\MarriageCertificateController.js
const db = require('../db');
const { writeLog } = require('../utils/logger');
const { logQuery, interpolateQuery } = require('../utils/querytrace');
const { callPythonOCR } = require('../services/OCRService');

function create(req, res) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }

        const flatData = formData;

        // Validate creatorId
        const creatorId = Number(flatData.creatorId);
        if (!creatorId || isNaN(creatorId) || creatorId <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid or missing creator ID' });
        }

        const fieldMap = {
            // Page 1
            creatorId: "creator_id",
            creationType: "creation_type",
            province: "province",
            city: "city",
            registry: "registry",
            husbandFirstName: "husband_first_name",
            husbandMiddleName: "husband_middle_name",
            husbandLastName: "husband_last_name",
            husbandBirthDate: "husband_birth_date",
            husbandBirthCity: "husband_birth_city",
            husbandBirthProvince: "husband_birth_province",
            husbandBirthCountry: "husband_birth_country",
            husbandAge: "husband_age",
            wifeFirstName: "wife_first_name",
            wifeMiddleName: "wife_middle_name",
            wifeLastName: "wife_last_name",
            wifeBirthDate: "wife_birth_date",
            wifeBirthCity: "wife_birth_city",
            wifeBirthProvince: "wife_birth_province",
            wifeBirthCountry: "wife_birth_country",
            wifeAge: "wife_age",

            // Page 2
            husbandSex: "husband_sex",
            husbandCitizenship: "husband_citizenship",
            husbandResidenceBarangay: "husband_residence_barangay",
            husbandResidenceCity: "husband_residence_city",
            husbandResidenceProvince: "husband_residence_province",
            husbandResidenceCountry: "husband_residence_country",
            husbandReligion: "husband_religion",
            husbandCivilStatus: "husband_civil_status",
            husbandFatherNameFirst: "husband_father_name_first",
            husbandFatherNameMiddle: "husband_father_name_middle",
            husbandFatherNameLast: "husband_father_name_last",
            wifeSex: "wife_sex",
            wifeCitizenship: "wife_citizenship",
            wifeResidenceBarangay: "wife_residence_barangay",
            wifeResidenceCity: "wife_residence_city",
            wifeResidenceProvince: "wife_residence_province",
            wifeResidenceCountry: "wife_residence_country",
            wifeReligion: "wife_religion",
            wifeCivilStatus: "wife_civil_status",
            wifeFatherNameFirst: "wife_father_name_first",
            wifeFatherNameMiddle: "wife_father_name_middle",
            wifeFatherNameLast: "wife_father_name_last",

            // Page 3
            husbandFatherCitizenship: "husband_father_citizenship",
            husbandMotherNameFirst: "husband_mother_name_first",
            husbandMotherNameMiddle: "husband_mother_name_middle",
            husbandMotherNameLast: "husband_mother_name_last",
            husbandMotherCitizenship: "husband_mother_citizenship",
            husbandConsentNameFirst: "husband_consent_name_first",
            husbandConsentNameMiddle: "husband_consent_name_middle",
            husbandConsentNameLast: "husband_consent_name_last",
            husbandRelationship: "husband_relationship",
            husbandConsentPersonBarangay: "husband_consent_person_barangay",
            husbandConsentPersonCity: "husband_consent_person_city",
            husbandConsentPersonProvince: "husband_consent_person_province",
            husbandConsentPersonCountry: "husband_consent_person_country",
            wifeFatherCitizenship: "wife_father_citizenship",
            wifeMotherNameFirst: "wife_mother_name_first",
            wifeMotherNameMiddle: "wife_mother_name_middle",
            wifeMotherNameLast: "wife_mother_name_last",
            wifeMotherCitizenship: "wife_mother_citizenship",
            wifeConsentNameFirst: "wife_consent_name_first",
            wifeConsentNameMiddle: "wife_consent_name_middle",
            wifeConsentNameLast: "wife_consent_name_last",
            wifeRelationship: "wife_relationship",
            wifeConsentPersonBarangay: "wife_consent_person_barangay",
            wifeConsentPersonCity: "wife_consent_person_city",
            wifeConsentPersonProvince: "wife_consent_person_province",
            wifeConsentPersonCountry: "wife_consent_person_country",

            // Page 4
            placeOfMarriage: "place_of_marriage",
            dateOfMarriage: "date_of_marriage",
            timeOfMarriage: "time_of_marriage",
            certHusbandName: "cert_husband_name",
            certWifeName: "cert_wife_name",
            marriageSettlement: "marriage_settlement",
            certDay: "cert_day",
            certMonth: "cert_month",
            certYear: "cert_year",

            // Page 5
            certification: "certification",
            marriageLicenseNo: "marriage_license_no",
            marriageIssuedOn: "marriage_issued_on",
            marriageIssuedAt: "marriage_issued_at",
            executiveOrder: "executive_order",
            officerPosition: "officer_position",
            officerReligion: "officer_religion",
            witness1Name: "witness1_name",
            witness2Name: "witness2_name",
            witness3Name: "witness3_name",
            witness4Name: "witness4_name",

            // Page 6
            receivedByName: "received_by_name",
            receivedByTitle: "received_by_title",
            receivedByDate: "received_by_date",
            registrarName: "registrar_name",
            registrarTitle: "registrar_title",
            registrarDate: "registrar_date",
            remarksAnnotation: "remarks_annotation",

            // Page 7
            witness5Name: "witness5_name",
            witness6Name: "witness6_name",
            witness7Name: "witness7_name",
            witness8Name: "witness8_name",
            witness9Name: "witness9_name",
            witness10Name: "witness10_name",
            witness11Name: "witness11_name",
            witness12Name: "witness12_name",
            affidavitOfficerName: "affidavit_officer_name",
            affidavitOfficerOrganization: "affidavit_officer_organization",
            affidavitOfficerAddress: "affidavit_officer_address",
            statement1Party1: "statement1_party1",
            statement1Party2: "statement1_party2",
            statement2a: "statement2a",
            statement2b: "statement2b",
            statement2c: "statement2c",
            statement2cParty1: "statement2c_party1",
            statement2cParty2: "statement2c_party2",
            statement2d: "statement2d",
            statement2e: "statement2e",

            // Page 8
            affidavitDay: "affidavit_day",
            affidavitMonth: "affidavit_month",
            affidavitYear: "affidavit_year",
            affidavitPlace: "affidavit_place",
            swornDay: "sworn_day",
            swornMonth: "sworn_month",
            swornYear: "sworn_year",
            swornAt: "sworn_at",
            swornIssuedOn: "sworn_issued_on",
            swornIssuedOn2: "sworn_issued_on2",
            swornIssuedAt: "sworn_issued_at",
            adminOfficerName: "admin_officer_name",
            adminOfficerTitle: "admin_officer_title",
            adminOfficerAddress: "admin_officer_address",

            // Page 9
            affiantName: "affiant_name",
            affiantCivilStatus: "affiant_civil_status",
            affiantAddress: "affiant_address",
            statement1OptionA: "statement1_option_a",
            statement1MarriageWith: "statement1_marriage_with",
            statement1PlaceA: "statement1_place_a",
            statement1DateA: "statement1_date_a",
            statement1OptionB: "statement1_option_b",
            statement1spouseName1: "statement1_spouse_name_1",
            statement1spouseName2: "statement1_spouse_name_2",
            statement1PlaceB: "statement1_place_b",
            statement1DateB: "statement1_date_b",
            solemnizingOfficer: "solemnizing_officer",
            ceremonyReligious: "ceremony_religious",
            ceremonyCivil: "ceremony_civil",
            ceremonyMuslim: "ceremony_muslim",
            ceremonyTribal: "ceremony_tribal",
            marriageWithLicense: "marriage_with_license",
            marriageLicenseNoPage9: "marriage_license_no_page9",
            marriageIssuedOnPage9: "marriage_issued_on_page9",
            marriageIssuedAtPage9: "marriage_issued_at_page9",
            marriageUnderArticle: "marriage_under_article",
            articleNumber: "article_number",
            citizenApplicant: "citizen_applicant",
            citizenSpouse: "citizen_spouse",
            citizenApplicant2: "citizen_applicant2",
            citizenSpouse2: "citizen_spouse2",
            reasonForDelay: "reason_for_delay",
            affidavitDayPage9: "affidavit_day_page9",
            affidavitMonthPage9: "affidavit_month_page9",
            affidavitYearPage9: "affidavit_year_page9",
            affidavitPlacePage9: "affidavit_place_page9",

            // Page 10
            swornDayPage10: "sworn_day_page10",
            swornMonthPage10: "sworn_month_page10",
            swornYearPage10: "sworn_year_page10",
            swornPlacePage10: "sworn_place_page10",
            swornIssuedOnPage10: "sworn_issued_on_page10",
            swornIssuedOnPage102: "sworn_issued_on_page102",
            swornIssuedAtPage10: "sworn_issued_at_page10",
            administeringOfficerName: "administering_officer_name",
            officerPositionPage10: "officer_position_page10",
            officerAddressPage10: "officer_address_page10",

            // Page 11
            confirmation: "confirmation"
        };  

        // Build SQL columns + values only from mapped fields
        const columns = [];
        const values = [];

        for (const key in flatData) {
            if (fieldMap[key]) {
                columns.push(fieldMap[key]);
                // Convert boolean fields to integers (0 or 1) for SQL
                values.push(typeof flatData[key] === 'boolean' ? (flatData[key] ? 1 : 0) : flatData[key]);
            }
        }

        // Generate placeholders
        const placeholders = columns.map(col => col === 'created_at' || col === 'updated_at' ? col : '?').join(', ');

        const query = `
            INSERT INTO marriage_certificates (${columns.join(', ')})
            VALUES (${placeholders})
        `;

        db.run(query, values.filter(val => val !== 'CURRENT_TIMESTAMP'), function (err) {
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
                message: 'Marriage Certificate Created Successfully',
                id: this.lastID
            });
        });
    } catch (error) {
        writeLog("Unexpected error", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

function getAll(req, res) {
    const query = `
        SELECT 
            id,
            husband_first_name || ' ' || husband_last_name AS husband,
            wife_first_name || ' ' || wife_last_name AS wife,
            date_of_marriage AS date,
            place_of_marriage AS place
        FROM marriage_certificates
        ORDER BY date_of_marriage DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            writeLog("Error fetching marriage certificates", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: rows });
    });
}

function view(req, res) {
    db.get(
      `SELECT * FROM marriage_certificates WHERE id = ?`,
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
    
        const marriage_certificate = row;
    
        res.status(200).json({
          success: true,
          message: 'Marriage Certificate Found',
          data: marriage_certificate,
        });
      }
    );
}

async function upload(req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }
        const filePaths = req.files.map(file => file.path);
        const response = await callPythonOCR(filePaths, "marriage");
        
    } catch (error) {
        writeLog(`[error] [marraige] [upload] ${JSON.stringify(error)}`);
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message || ""
        });
    }
}

module.exports = {
    create,
    getAll,
    view,
    upload
};