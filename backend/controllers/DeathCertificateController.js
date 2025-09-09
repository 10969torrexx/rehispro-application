const db = require('../db');

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
            immediateCause: "immediate_cause",
            antecedentCause: "antecedent_cause",
            underlyingCause: "underlying_cause",
            intervalImmediate: "interval_immediate",
            intervalAntecedent: "interval_antecedent",
            intervalUnderlying: "interval_underlying",
            otherConditions: "other_conditions",
            maternalCondition: "maternal_condition",

            // Page 5
            mannerOfDeath: "manner_of_death",
            autopsy: "autopsy",
            placeOccurrence: "place_occurrence",
            attendantPrivatePhysician: "attendant_private_physician",
            attendantPublicHealth: "attendant_public_health",
            attendantHospital: "attendant_hospital",
            attendantNone: "attendant_none",
            attendantOthers: "attendant_others",
            attendantOthersSpecify: "attendant_others_specify",
            attendantFrom: "attendant_from",
            attendantTo: "attendant_to",

            // Page 6
            physicianName: "physician_name",
            physicianTitle: "physician_title",
            physicianAddress: "physician_address",
            healthOfficerName: "health_officer_name",

            // Page 7
            disposalType: "disposal_type",
            permitNumber: "permit_number",
            permitDate: "permit_date",
            transferPermit: "transfer_permit",
            cemeteryName: "cemetery_name",
            cemeteryAddress: "cemetery_address",

            // Page 8
            informantName: "informant_name",
            informantRelationship: "informant_relationship",
            informantAddress: "informant_address",
            informantDate: "informant_date",
            preparedName: "prepared_name",
            preparedTitle: "prepared_title",
            preparedDate: "prepared_date",

            // Page 9
            receivedName: "received_name",
            receivedTitle: "received_title",
            receivedDate: "received_date",
            registrarName: "registrar_name",
            registrarTitle: "registrar_title",
            registrarDate: "registrar_date",

            // Page 10
            remarks: "remarks",
            officeBoxes: "office_boxes",

            // Page 11
            postmortemCause: "postmortem_cause",
            postmortemName: "postmortem_name",
            postmortemTitle: "postmortem_title",
            postmortemAddress: "postmortem_address",
            postmortemDate: "postmortem_date",
            embalmerName: "embalmer_name",
            embalmerLicense: "embalmer_license",
            embalmerIssuedOn: "embalmer_issued_on",
            embalmerIssuedAt: "embalmer_issued_at",
            embalmerExpiry: "embalmer_expiry",

            // Page 12
            affiantName: "affiant_name",
            affiantCivilStatus: "affiant_civil_status",
            address: "address",
            deceasedName: "deceased_name",
            deathDate: "death_date",
            deathPlace: "death_place",
            attendedBy: "attended_by",
            notAttended: "not_attended",
            causeOfDeath: "cause_of_death",
            reasonDelay: "reason_delay",

            // Page 13
            juratDay: "jurat_day",
            juratMonthYear: "jurat_month_year",
            juratPlace: "jurat_place",
            ctcNumber: "ctc_number",
            ctcIssuedOn: "ctc_issued_on",
            ctcIssuedAt: "ctc_issued_at",
            adminName: "admin_name",
            adminPosition: "admin_position",
            adminAddress: "admin_address",

            // Page 14
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

        console.log("🟢 Columns:", columns.length, columns);
        console.log("🟢 Values:", values.length);
        console.log("🟢 Query:", query);

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

// Placeholder for other CRUD operations
exports.read = (req, res) => {};
exports.update = (req, res) => {};
exports.remove = (req, res) => {};
exports.find = (req, res) => {};
