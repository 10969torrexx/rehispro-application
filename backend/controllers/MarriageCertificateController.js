// backend\controllers\MarriageCertificateController.js
const db = require('../db');
const { writeLog } = require('../utils/logger');
const { logQuery, interpolateQuery } = require('../utils/querytrace');

const flattenFormData = (formData) => {
    return {
        ...formData.page1,
        ...formData.page2,
        ...formData.page3,
        ...formData.page4,
        ...formData.page5,
        ...formData.page6,
        ...formData.page7,
        ...formData.page8,
        ...formData.page9,
        ...formData.page10,
    };
};

function create(req, res) {
    try {
        const formData = req.body;
        const flatData = flattenFormData(formData);

        const query = `
          INSERT INTO marriage_certificates (
            province, city, registry,
            husbandFirstName, husbandMiddleName, husbandLastName,
            husbandBirthDate, husbandAge, husbandBirthCity, husbandBirthProvince, husbandBirthCountry,
            wifeFirstName, wifeMiddleName, wifeLastName,
            wifeBirthDate, wifeAge, wifeBirthCity, wifeBirthProvince, wifeBirthCountry,
            husbandSex, husbandCitizenship, husbandResidenceBarangay, husbandResidenceCity,
            husbandResidenceProvince, husbandResidenceCountry, husbandReligion, husbandCivilStatus,
            husbandFatherNameFirst, husbandFatherNameMiddle, husbandFatherNameLast,
            wifeSex, wifeCitizenship, wifeResidenceBarangay, wifeResidenceCity,
            wifeResidenceProvince, wifeResidenceCountry, wifeReligion, wifeCivilStatus,
            wifeFatherNameFirst, wifeFatherNameMiddle, wifeFatherNameLast,
            husbandFatherCitizenship, husbandMotherNameFirst, husbandMotherNameMiddle, husbandMotherNameLast,
            husbandMotherCitizenship, wifeFatherCitizenship, wifeMotherNameFirst, wifeMotherNameMiddle,
            wifeMotherNameLast, wifeMotherCitizenship,
            placeOfMarriage, dateOfMarriage, timeOfMarriage, marriageSettlement,
            statement2a, statement2b, statement2c, ceremonyReligious, ceremonyCivil, ceremonyMuslim, ceremonyTribal,
            marriageWithLicense, marriageUnderArticle,
            created_at, updated_at
          )
          VALUES (
            ?,?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
          )
        `;

        const values = [
            flatData.province, flatData.city, flatData.registry,
            flatData.husbandFirstName, flatData.husbandMiddleName, flatData.husbandLastName,
            flatData.husbandBirthDate, flatData.husbandAge, flatData.husbandBirthCity, flatData.husbandBirthProvince, flatData.husbandBirthCountry,
            flatData.wifeFirstName, flatData.wifeMiddleName, flatData.wifeLastName,
            flatData.wifeBirthDate, flatData.wifeAge, flatData.wifeBirthCity, flatData.wifeBirthProvince, flatData.wifeBirthCountry,
            flatData.husbandSex, flatData.husbandCitizenship, flatData.husbandResidenceBarangay, flatData.husbandResidenceCity,
            flatData.husbandResidenceProvince, flatData.husbandResidenceCountry, flatData.husbandReligion, flatData.husbandCivilStatus,
            flatData.husbandFatherNameFirst, flatData.husbandFatherNameMiddle, flatData.husbandFatherNameLast,
            flatData.wifeSex, flatData.wifeCitizenship, flatData.wifeResidenceBarangay, flatData.wifeResidenceCity,
            flatData.wifeResidenceProvince, flatData.wifeResidenceCountry, flatData.wifeReligion, flatData.wifeCivilStatus,
            flatData.wifeFatherNameFirst, flatData.wifeFatherNameMiddle, flatData.wifeFatherNameLast,
            flatData.husbandFatherCitizenship, flatData.husbandMotherNameFirst, flatData.husbandMotherNameMiddle, flatData.husbandMotherNameLast,
            flatData.husbandMotherCitizenship, flatData.wifeFatherCitizenship, flatData.wifeMotherNameFirst, flatData.wifeMotherNameMiddle,
            flatData.wifeMotherNameLast, flatData.wifeMotherCitizenship,
            flatData.placeOfMarriage, flatData.dateOfMarriage, flatData.timeOfMarriage, flatData.marriageSettlement,
            flatData.statement2a ? 1 : 0,
            flatData.statement2b ? 1 : 0,
            flatData.statement2c ? 1 : 0,
            flatData.ceremonyReligious ? 1 : 0,
            flatData.ceremonyCivil ? 1 : 0,
            flatData.ceremonyMuslim ? 1 : 0,
            flatData.ceremonyTribal ? 1 : 0,
            flatData.marriageWithLicense ? 1 : 0,
            flatData.marriageUnderArticle ? 1 : 0,
        ];

        logQuery(interpolateQuery(query, values));

        db.run(query, values, function (err) {
            if (err) {
                writeLog("Error inserting marriage certificate", err);
                return res.status(500).json({ success: false, error: err.message });
            }
            res.status(201).json({ success: true, id: this.lastID });
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
            husbandFirstName || ' ' || husbandLastName AS husband,
            wifeFirstName || ' ' || wifeLastName AS wife,
            dateOfMarriage AS date,
            placeOfMarriage AS place
        FROM marriage_certificates
        ORDER BY dateOfMarriage DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            writeLog("Error fetching marriage certificates", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: rows });
    });
}

module.exports = {
    create,
    getAll,
};


