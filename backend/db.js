const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  //TODO: create table for users
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login_id TEXT,
      password TEXT,
      role VARCHAR(255) NOT NULL DEFAULT 'supervisor',
      is_firsttime_flg BOOLEAN NOT NULL DEFAULT 1,
      status VARCHAR(255) NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL
    )
  `);

  //TODO: seed default admin user if not exists
  db.get(`SELECT * FROM users WHERE role = ?`, ['supervisor'], (err, row) => {
    if (!row) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('admin123', salt);

      db.run(
        `INSERT INTO users (login_id, password, role) VALUES (?, ?, ?)`,
        ['supervisor', hashedPassword, 'supervisor'],
        (insertErr) => {
          if (insertErr) {
            console.error('❌ Error seeding admin:', insertErr.message);
          } else {
            console.log('✅ Default admin created with hashed password');
          }
        }
      );
    }
  });

  //TODO: create table for birth certificates
  db.run(`
    CREATE TABLE IF NOT EXISTS birthcertificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creator_id INTEGER NOT NULL,
      creation_type TEXT DEFAULT 'manual',

      -- Page 1 - Child Information
      province TEXT,
      city TEXT,
      child_first_name TEXT,
      child_middle_name TEXT,
      child_last_name TEXT,
      sex TEXT,
      date_of_birth date,
      type_of_birth TEXT,
      multiple_birth_order TEXT,
      birth_order TEXT,
      birth_weight TEXT,

      -- Page 2 - Mother Information
      maiden_first_name TEXT,
      maiden_middle_name TEXT,
      maiden_last_name TEXT,
      citizenship TEXT,
      religion TEXT,
      children_born_alive INTEGER,
      children_still_living INTEGER,
      children_deceased INTEGER,
      occupation TEXT,
      age_at_birth INTEGER,
      residence_house TEXT,
      residence_city TEXT,
      residence_province TEXT,
      residence_country TEXT,

      -- Page 3 - Father Information
      father_first_name TEXT,
      father_middle_name TEXT,
      father_last_name TEXT,
      father_citizenship TEXT,
      father_religion TEXT,
      father_occupation TEXT,
      father_age_at_birth INTEGER,
      father_residence_street TEXT,
      father_residence_city TEXT,
      father_residence_province TEXT,
      father_residence_country TEXT,

      -- Page 4 - Marriage Information
      date_of_marriage TEXT,
      marriage_city TEXT,
      marriage_province TEXT,
      marriage_country TEXT,

      -- Page 5 - Attendant Information
      attendant_physician INTEGER DEFAULT 0,
      attendant_nurse INTEGER DEFAULT 0,
      attendant_midwife INTEGER DEFAULT 0,
      attendant_hilot INTEGER DEFAULT 0,
      attendant_others INTEGER DEFAULT 0,
      attendant_others_specify TEXT,
      date_of_attendance TEXT,
      attendant_name_title TEXT,

      -- Page 6 - Attendant Certification
      birth_time TEXT,
      birth_date TEXT,
      attendant_name TEXT,
      attendant_title TEXT,
      attendant_address TEXT,
      attendant_date_signed TEXT,
      attendant_signature TEXT,

      -- Page 7 - Informant & Prepared By
      informant_name TEXT,
      informant_relationship TEXT,
      informant_address TEXT,
      informant_date TEXT,
      prepared_name TEXT,
      prepared_title TEXT,
      prepared_date TEXT,

      -- Page 8 - Civil Registrar Section
      received_name TEXT,
      received_title TEXT,
      received_date TEXT,
      registrar_signature TEXT,
      registrar_name TEXT,
      registrar_title TEXT,
      registrar_date TEXT,

      -- Page 9 - Remarks / Annotations
      remarks TEXT,
      office_boxes TEXT, -- JSON stored as TEXT

      -- Page 10 - Affidavit of Acknowledgment
      mother_name TEXT,
      father_name TEXT,
      child_name TEXT,
      child_birth_date TEXT,
      child_birth_place TEXT,

      -- Page 11 - Jurat
      jurat_day TEXT,
      jurat_month_year TEXT,
      jurat_affiant1 TEXT,
      jurat_affiant2 TEXT,
      ctc_number TEXT,
      ctc_date_issued TEXT,
      ctc_place_issued TEXT,
      admin_name TEXT,
      admin_position TEXT,
      admin_address TEXT,
      admin_signature TEXT,

      -- Page 12 - Affidavit
      affiant_name TEXT,
      civil_status TEXT,
      address TEXT,

      self_checkbox INTEGER DEFAULT 0,
      self_pob TEXT,
      self_dob TEXT,

      child_checkbox INTEGER DEFAULT 0,
      child_name_affidavit TEXT,
      child_pob TEXT,
      child_dob TEXT,

      affidavit_attendant_name TEXT,
      affidavit_attendant_address TEXT,
      affidavit_citizenship TEXT,

      parents_status TEXT,
      marriage_date TEXT,
      marriage_place TEXT,
      affidavit_father_name TEXT,

      reason_delay TEXT,
      spouse_applicant TEXT,
      spouse_owner TEXT,
      affiant_signature TEXT,

      -- Page 13 - Final Jurat / Affidavit
      final_jurat_day TEXT,
      final_jurat_month_year TEXT,
      final_jurat_place TEXT,
      final_ctc_number TEXT,
      final_ctc_issued_on TEXT,
      final_ctc_issued_at TEXT,
      admin_officer_signature TEXT,
      admin_officer_name TEXT,
      admin_officer_position TEXT,
      admin_officer_address TEXT,

      -- Page 14 - Confirmation
      confirmation INTEGER DEFAULT 0,

      -- Add timestamps
      created_at TIMESTAMP DEFAULT (datetime('now')),
      updated_at TIMESTAMP DEFAULT (datetime('now')),
      deleted_at TIMESTAMP
    );
  `);

  // TODO: Create Table for Marriage Certificate Form
  db.run(`
    CREATE TABLE IF NOT EXISTS marriage_certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      -- Page 1
      province TEXT NOT NULL,
      city TEXT NOT NULL,
      registry INTEGER NOT NULL,
      husbandFirstName TEXT NOT NULL,
      husbandMiddleName TEXT NOT NULL,
      husbandLastName TEXT NOT NULL,
      husbandBirthDate DATE NOT NULL,
      husbandAge INTEGER NOT NULL,
      husbandBirthCity TEXT NOT NULL,
      husbandBirthProvince TEXT NOT NULL,
      husbandBirthCountry TEXT NOT NULL,
      wifeFirstName TEXT NOT NULL,
      wifeMiddleName TEXT NOT NULL,
      wifeLastName TEXT NOT NULL,
      wifeBirthDate DATE NOT NULL,
      wifeAge INTEGER NOT NULL,
      wifeBirthCity TEXT NOT NULL,
      wifeBirthProvince TEXT NOT NULL,
      wifeBirthCountry TEXT NOT NULL,

      -- Page 2
      husbandSex TEXT NOT NULL,
      husbandCitizenship TEXT NOT NULL,
      husbandResidenceBarangay TEXT NOT NULL,
      husbandResidenceCity TEXT NOT NULL,
      husbandResidenceProvince TEXT NOT NULL,
      husbandResidenceCountry TEXT NOT NULL,
      husbandReligion TEXT NOT NULL,
      husbandCivilStatus TEXT NOT NULL,
      husbandFatherNameFirst TEXT NOT NULL,
      husbandFatherNameMiddle TEXT NOT NULL,
      husbandFatherNameLast TEXT NOT NULL,
      wifeSex TEXT NOT NULL,
      wifeCitizenship TEXT NOT NULL,
      wifeResidenceBarangay TEXT NOT NULL,
      wifeResidenceCity TEXT NOT NULL,
      wifeResidenceProvince TEXT NOT NULL,
      wifeResidenceCountry TEXT NOT NULL,
      wifeReligion TEXT NOT NULL,
      wifeCivilStatus TEXT NOT NULL,
      wifeFatherNameFirst TEXT NOT NULL,
      wifeFatherNameMiddle TEXT NOT NULL,
      wifeFatherNameLast TEXT NOT NULL,

      -- Page 3 (example only, continue same style)
      husbandFatherCitizenship TEXT,
      husbandMotherNameFirst TEXT,
      husbandMotherNameMiddle TEXT,
      husbandMotherNameLast TEXT,
      husbandMotherCitizenship TEXT,
      wifeFatherCitizenship TEXT,
      wifeMotherNameFirst TEXT,
      wifeMotherNameMiddle TEXT,
      wifeMotherNameLast TEXT,
      wifeMotherCitizenship TEXT,

      -- Boolean Example (stored as INTEGER 0/1)
      statement2a BOOLEAN,
      statement2b BOOLEAN,
      statement2c BOOLEAN,
      ceremonyReligious BOOLEAN,
      ceremonyCivil BOOLEAN,
      ceremonyMuslim BOOLEAN,
      ceremonyTribal BOOLEAN,
      marriageWithLicense BOOLEAN,
      marriageUnderArticle BOOLEAN,

      -- Page 4 (example)
      placeOfMarriage TEXT,
      dateOfMarriage DATE,
      timeOfMarriage TIME,
      marriageSettlement TEXT,

      -- Meta
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);


});

module.exports = db;
