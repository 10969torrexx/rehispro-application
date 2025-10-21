const db = require('../db');
const { writeLog } = require('../utils/logger');
const { callPythonOCR } = require('../services/OCRService');

// CREATE Death Certificate
exports.create = (req, res) => {
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

        const attendant = flatData.attendant;
        const attendantOthersSpecify = flatData.attendantOthersSpecify;
        if(attendant === "Others") {
            flatData.attendant = attendantOthersSpecify;
            delete flatData.attendantOthersSpecify;
        }

        const methodOfDelivery = flatData.methodOfDelivery;
        const methodOfDeliverySpecify = flatData.methodOfDeliverySpecify;

        if(methodOfDelivery === "Others") {
            flatData.methodOfDelivery = methodOfDeliverySpecify;
            delete flatData.methodOfDeliverySpecify;
        }
        
        const attendedDeceased = flatData.attendedDeceased;
        if(attendedDeceased === true) {
            flatData.attendedDeceased = "Yes";
            delete flatData.notAttendedDeceased;
        }
        else {
            flatData.attendedDeceased = "No";
            delete flatData.notAttendedDeceased;
        }
        
        const wasAttended = flatData.wasAttended;        
        if(wasAttended === true) {
            flatData.wasAttended = "Yes";
            delete flatData.wasNotAttended;
        }
        else {
            flatData.wasAttended = "No";
            delete flatData.wasNotAttended;
        }
        
        // Map frontend keys (camelCase) → DB keys (snake_case)
        const fieldMap = {
            // Page 1
            creatorId: "creator_id",
            creationType: "creation_type",
            province: "province",
            city: "city",
            firstName: "first_name",
            middleName: "middle_name",
            lastName: "last_name",
            sex: "sex",
            dateOfDeath: "date_of_death",
            dateOfBirth: "date_of_birth",
            ageYears: "age_years",
            ageMonths: "age_months",
            ageDays: "age_days",
            ageHours: "age_hours",
            ageMinutes: "age_minutes",
            placeOfDeath: "place_of_death",

            // Page 2
            civilStatus: "civil_status",
            religion: "religion",
            citizenship: "citizenship",
            residenceHouse: "residence_house",
            residenceStreet: "residence_street",
            residenceBarangay: "residence_barangay",
            residenceCity: "residence_city",
            residenceProvince: "residence_province",
            residenceCountry: "residence_country",
            occupation: "occupation",

            // Page 3
            fatherFirstName: "father_first_name",
            fatherMiddleName: "father_middle_name",
            fatherLastName: "father_last_name",
            motherFirstName: "mother_first_name",
            motherMiddleName: "mother_middle_name",
            motherLastName: "mother_last_name",

            // Page 4
            agedOfMother: "aged_of_mother",
            methodOfDelivery: "method_of_delivery",
            lengthOfPregnancy: "length_of_pregnancy",
            typeOfBirth: "type_of_birth",
            ifMultipleBirth: "if_multiple_birth",

            mainDiseaseConditionOfInfant: "main_disease_condition_of_infant",
            otherDiseasesConditionsOfInfant: "other_diseases_conditions_of_infant",
            mainMaternalDiseaseConditionAffectingInfant: "main_maternal_disease_condition_affecting_infant",
            otherMaternalDiseaseConditionAffectingInfant: "other_maternal_disease_condition_affecting_infant",
            otherRelevantCircumstances: "other_relevant_circumstances",

            // Page 5
            immediateCause: "immediate_cause",
            antecedentCause: "antecedent_cause",
            underlyingCause: "underlying_cause",
            intervalImmediate: "interval_immediate",
            intervalAntecedent: "interval_antecedent",
            intervalUnderlying: "interval_underlying",
            otherConditions: "other_conditions",
            maternalCondition: "maternal_condition",

            // Page 6
            mannerOfDeath: "manner_of_death",
            autopsy: "autopsy",
            placeOccurrence: "place_occurrence",
            attendant: "attendant",
            attendantFrom: "attendant_from",
            attendantTo: "attendant_to",

            // Page 7
            attendedDeceased: "attended_deceased",
            timeOfDeath: "time_of_death",
            physicianName: "physician_name",
            physicianTitle: "physician_title",
            physicianAddress: "physician_address",
            healthOfficerName: "health_officer_name",

            // Page 8
            disposalType: "disposal_type",
            permitNumber: "permit_number",
            permitDate: "permit_date",
            transferPermit: "transfer_permit",
            transferPermitDate: "transfer_permit_date",
            cemeteryName: "cemetery_name",
            cemeteryAddress: "cemetery_address",

            // Page 9
            informantName: "informant_name",
            informantRelationship: "informant_relationship",
            informantAddress: "informant_address",
            informantDate: "informant_date",
            preparedName: "prepared_name",
            preparedTitle: "prepared_title",
            preparedDate: "prepared_date",

            // Page 10
            receivedName: "received_name",
            receivedTitle: "received_title",
            receivedDate: "received_date",
            registrarName: "registrar_name",
            registrarTitle: "registrar_title",
            registrarDate: "registrar_date",

            // Page 11
            remarks: "remarks",
            officeBoxes: "office_boxes",

            // Page 12
            postmortemCause: "postmortem_cause",
            postmortemName: "postmortem_name",
            postmortemTitle: "postmortem_title",
            postmortemAddress: "postmortem_address",
            postmortemDate: "postmortem_date",
            embalmeredName: "embalmered_name",
            embalmerName: "embalmer_name",
            embalmerTitle: "embalmer_title",
            embalmerAddress: "embalmer_address",
            embalmerLicense: "embalmer_license",
            embalmerIssuedOn: "embalmer_issued_on",
            embalmerIssuedAt: "embalmer_issued_at",
            embalmerExpiry: "embalmer_expiry",

            // Page 13
            affiantName: "affiant_name",
            affiantCivilStatus: "affiant_civil_status",
            address: "address",
            deceasedName: "deceased_name",
            deathDate: "death_date",
            deathPlace: "death_place",
            delayedCemeteryName: "delayed_cemetery_name",
            delayedCemeteryAddress: "delayed_cemetery_address",
            wasAttended: "was_attended",
            attendedBy: "attended_by",
            causeOfDeath: "cause_of_death",
            reasonDelay: "reason_delay",

            // Page 14
            juratDay: "jurat_day",
            juratMonthYear: "jurat_month_year",
            juratPlace: "jurat_place",
            ctcDay: "ctc_day",
            ctcMonthYear: "ctc_month_year",
            ctcPlace: "ctc_place",
            ctcIssuedOn: "ctc_issued_on",
            ctcIssuedAt: "ctc_issued_at",
            adminName: "admin_name",
            adminPosition: "admin_position",
            adminAddress: "admin_address",

            // Page 15
            confirmation: "confirmation"
        };

        // Build SQL columns + values only from mapped fields
        const columns = [];
        const values = [];

        for (const key in flatData) {
            if (fieldMap[key]) {
                columns.push(fieldMap[key]);
                values.push(flatData[key]);
            }
        }

        // Generate placeholders
        const placeholders = columns.map(() => '?').join(', ');

        const query = `
            INSERT INTO deathcertificates (${columns.join(', ')})
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
                message: 'Death Certificate Created Successfully',
                id: this.lastID
            });
        });

    } catch (error) {
        console.error('[Controller Error]', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// LIST Death Certificate
exports.list = (req, res) => {
    db.all(
        `
        SELECT 
          id,
          CONCAT_WS(' ', first_name, NULLIF(middle_name, ''), last_name) AS deceased_name,
          sex,
          DATE(created_at) AS created_at,
          place_of_death,
          city,
          province,
          cause_of_death
        FROM deathcertificates
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
};

// VIEW Death Certificate
exports.view = async (req, res) => {
  console.log("Attempting to fetch death certificate with ID:", req.params.id);

  db.get(
    `SELECT * FROM deathcertificates WHERE id = ?`,
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
  
      const death_certificate = row;
  
      res.status(200).json({
        success: true,
        message: 'Death Certificate Found',
        data: death_certificate,
      });
    }
  );
};
    
//TODO: handle upload and scan
exports.uploadAndScan = async(req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const filePaths = req.files.map(file => file.path);
    const response = await callPythonOCR(filePaths, "death");
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
    writeLog(`[error] [death] [uploadAndScan] ${JSON.stringify(error)}`);
    res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: error.message || ""
    });
  }
}   
