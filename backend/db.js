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
      is_firsttime_flg INTEGER DEFAULT 0 NOT NULL DEFAULT 1,
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
      registry_number TEXT,
      child_first_name TEXT,
      child_middle_name TEXT,
      child_last_name TEXT,
      sex TEXT,
      date_of_birth date,
      place_of_birth_barangay TEXT,
      place_of_birth_city TEXT,
      place_of_birth_province TEXT,
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
      attendant TEXT,
      date_of_attendance TEXT,
      attendant_name_title TEXT,

      -- Page 6 - Attendant Certification
      birth_time TEXT,
      birth_date TEXT,
      attendant_name TEXT,
      attendant_title TEXT,
      attendant_address TEXT,
      attendant_date_signed TEXT,

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

      -- Page 13 - Final Jurat / Affidavit
      final_jurat_day TEXT,
      final_jurat_month_year TEXT,
      final_jurat_place TEXT,
      final_ctc_number TEXT,
      final_ctc_issued_on TEXT,
      final_ctc_issued_at TEXT,
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

// db.run(`DROP TABLE IF EXISTS deathcertificates`);

  //TODO: create table for death certificates

  db.run(`
    CREATE TABLE IF NOT EXISTS deathcertificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creator_id INTEGER NOT NULL,
      creation_type TEXT DEFAULT 'manual',
  
      -- Page 1 - Deceased Information
      province TEXT,
      city TEXT,
      first_name TEXT,
      middle_name TEXT,
      last_name TEXT,
      sex TEXT,
      date_of_death DATE,
      date_of_birth DATE,
      age_years INTEGER,
      age_months INTEGER,
      age_days INTEGER,
      age_hours INTEGER,
      age_minutes INTEGER,
      place_of_death TEXT,
  
      -- Page 2 - Status & Residence
      civil_status TEXT,
      religion TEXT,
      citizenship TEXT,
      residence_house TEXT,
      residence_street TEXT,
      residence_barangay TEXT,
      residence_city TEXT,
      residence_province TEXT,
      residence_country TEXT,
      occupation TEXT,
  
      -- Page 3 - Parents' Information
      father_first_name TEXT,
      father_middle_name TEXT,
      father_last_name TEXT,
      mother_first_name TEXT,
      mother_middle_name TEXT,
      mother_last_name TEXT,

      -- Page 4 - For Children Aged 0 to 7 Days
      aged_of_mother TEXT,
      method_of_delivery TEXT,
      length_of_pregnancy TEXT,
      type_of_birth TEXT,
      if_multiple_birth TEXT,

      main_disease_condition_of_infant TEXT,
      other_diseases_conditions_of_infant TEXT,
      main_maternal_disease_condition_affecting_infant TEXT,
      other_maternal_disease_condition_affecting_infant TEXT,
      other_relevant_circumstances TEXT,
  
      -- Page 5 - Medical Certificate
      immediate_cause TEXT,
      antecedent_cause TEXT,
      underlying_cause TEXT,
      interval_immediate TEXT,
      interval_antecedent TEXT,
      interval_underlying TEXT,
      other_conditions TEXT,
      maternal_condition TEXT,
  
      -- Page 6 - Manner of Death & Attendant
      manner_of_death TEXT,
      autopsy TEXT,
      place_occurrence TEXT,
      attendant TEXT,
      attendant_from DATE,
      attendant_to DATE,
  
      -- Page 7 - Certification of Death
      attended_deceased TEXT,
      time_of_death TEXT,
      physician_name TEXT,
      physician_title TEXT,
      physician_address TEXT,
      health_officer_name TEXT,
  
      -- Page 8 - Corpse Disposal
      disposal_type TEXT,
      permit_number TEXT,
      permit_date DATE,
      transfer_permit TEXT,
      transfer_permit_date DATE,
      cemetery_name TEXT,
      cemetery_address TEXT,
  
      -- Page 9 - Informant & Prepared By
      informant_name TEXT,
      informant_relationship TEXT,
      informant_address TEXT,
      informant_date DATE,
      prepared_name TEXT,
      prepared_title TEXT,
      prepared_date DATE,
  
      -- Page 10 - Received & Registered By
      received_name TEXT,
      received_title TEXT,
      received_date DATE,
      registrar_name TEXT,
      registrar_title TEXT,
      registrar_date DATE,
  
      -- Page 11 - Remarks / Annotations
      remarks TEXT,
      office_boxes TEXT, -- JSON stored as TEXT
  
      -- Page 12 - Postmortem & Embalmer
      postmortem_cause TEXT,
      postmortem_name TEXT,
      postmortem_title TEXT,
      postmortem_address TEXT,
      postmortem_date DATE,
      embalmer_name TEXT,
      embalmer_title TEXT,
      embalmer_address TEXT,
      embalmer_license TEXT,
      embalmer_issued_on DATE,
      embalmer_issued_at TEXT,
      embalmer_expiry DATE,
  
      -- Page 13 - Affidavit for Delayed Registration
      affiant_name TEXT,
      affiant_civil_status TEXT,
      address TEXT,
      deceased_name TEXT,
      death_date DATE,
      death_place TEXT,
      attended_by TEXT,
      not_attended INTEGER DEFAULT 0,
      cause_of_death TEXT,
      reason_delay TEXT,
  
      -- Page 14 - Affidavit Jurat
      jurat_day TEXT,
      jurat_month_year TEXT,
      jurat_place TEXT,
      ctc_number TEXT,
      ctc_issued_on DATE,
      ctc_issued_at TEXT,
      admin_name TEXT,
      admin_position TEXT,
      admin_address TEXT,
  
      -- Page 15 - Confirmation
      confirmation INTEGER DEFAULT 0,
  
      -- Add timestamps
      created_at TIMESTAMP DEFAULT (datetime('now')),
      updated_at TIMESTAMP DEFAULT (datetime('now')),
      deleted_at TIMESTAMP
    );
  `);

  // db.run  (`DROP TABLE IF EXISTS marriage_certificates`);
  // TODO: Create Table for Marriage Certificate Form
  db.run(`
    CREATE TABLE IF NOT EXISTS marriage_certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        creator_id INTEGER NOT NULL,
        creation_type TEXT DEFAULT 'manual',

        -- Page 1: Province, City, and Registry No.
        province TEXT,
        city TEXT,
        registry TEXT,

        -- Page 1: Husband Information
        husband_first_name TEXT,
        husband_middle_name TEXT,
        husband_last_name TEXT,
        husband_birth_date TEXT,
        husband_birth_city TEXT,
        husband_birth_province TEXT,
        husband_birth_country TEXT,
        husband_age TEXT,

        -- Page 1: Wife Information
        wife_first_name TEXT,
        wife_middle_name TEXT,
        wife_last_name TEXT,
        wife_birth_date TEXT,
        wife_birth_city TEXT,
        wife_birth_province TEXT,
        wife_birth_country TEXT,
        wife_age TEXT,

        -- Page 2: Husband Information
        husband_sex TEXT,
        husband_citizenship TEXT,
        husband_residence_barangay TEXT,
        husband_residence_city TEXT,
        husband_residence_province TEXT,
        husband_residence_country TEXT,
        husband_religion TEXT,
        husband_civil_status TEXT,
        husband_father_name_first TEXT,
        husband_father_name_middle TEXT,
        husband_father_name_last TEXT,

        -- Page 2: Wife Information
        wife_sex TEXT,
        wife_citizenship TEXT,
        wife_residence_barangay TEXT,
        wife_residence_city TEXT,
        wife_residence_province TEXT,
        wife_residence_country TEXT,
        wife_religion TEXT,
        wife_civil_status TEXT,
        wife_father_name_first TEXT,
        wife_father_name_middle TEXT,
        wife_father_name_last TEXT,

        -- Page 3: Husband Information
        husband_father_citizenship TEXT,
        husband_mother_name_first TEXT,
        husband_mother_name_middle TEXT,
        husband_mother_name_last TEXT,
        husband_mother_citizenship TEXT,
        husband_consent_name_first TEXT,
        husband_consent_name_middle TEXT,
        husband_consent_name_last TEXT,
        husband_relationship TEXT,
        husband_consent_person_barangay TEXT,
        husband_consent_person_city TEXT,
        husband_consent_person_province TEXT,
        husband_consent_person_country TEXT,

        -- Page 3: Wife Information
        wife_father_citizenship TEXT,
        wife_mother_name_first TEXT,
        wife_mother_name_middle TEXT,
        wife_mother_name_last TEXT,
        wife_mother_citizenship TEXT,
        wife_consent_name_first TEXT,
        wife_consent_name_middle TEXT,
        wife_consent_name_last TEXT,
        wife_relationship TEXT,
        wife_consent_person_barangay TEXT,
        wife_consent_person_city TEXT,
        wife_consent_person_province TEXT,
        wife_consent_person_country TEXT,

        -- Page 4: Marriage Details
        place_of_marriage TEXT,
        date_of_marriage TEXT,
        time_of_marriage TEXT,
        cert_husband_name TEXT,
        cert_wife_name TEXT,
        marriage_settlement TEXT,
        cert_day TEXT,
        cert_month TEXT,
        cert_year TEXT,

        -- Page 5: Certification and Officer Details
        certification TEXT,
        marriage_license_no TEXT,
        marriage_issued_on TEXT,
        marriage_issued_at TEXT,
        executive_order TEXT,
        officer_position TEXT,
        officer_religion TEXT,
        witness1_name TEXT,
        witness2_name TEXT,
        witness3_name TEXT,
        witness4_name TEXT,

        -- Page 6: Registrar Details
        received_by_name TEXT,
        received_by_title TEXT,
        received_by_date TEXT,
        registrar_name TEXT,
        registrar_title TEXT,
        registrar_date TEXT,
        remarks_annotation TEXT,
        civil_registrar TEXT,

        -- Page 7: Additional Witnesses and Affidavit
        witness5_name TEXT,
        witness6_name TEXT,
        witness7_name TEXT,
        witness8_name TEXT,
        witness9_name TEXT,
        witness10_name TEXT,
        witness11_name TEXT,
        witness12_name TEXT,
        affidavit_officer_name TEXT,
        affidavit_officer_organization TEXT,
        affidavit_officer_address TEXT,
        statement1_party1 TEXT,
        statement1_party2 TEXT,
        statement2a INTEGER DEFAULT 0,
        statement2b INTEGER DEFAULT 0,
        statement2c INTEGER DEFAULT 0,
        statement2c_party1 TEXT,
        statement2c_party2 TEXT,
        statement2d INTEGER DEFAULT 0,
        statement2e INTEGER DEFAULT 0,

        -- Page 8: Affidavit and Sworn Details
        affidavit_day TEXT,
        affidavit_month TEXT,
        affidavit_year TEXT,
        affidavit_place TEXT,
        sworn_day TEXT,
        sworn_month TEXT,
        sworn_year TEXT,
        sworn_at TEXT,
        sworn_issued_on TEXT,
        sworn_issued_on2 TEXT,
        sworn_issued_at TEXT,
        admin_officer_name TEXT,
        admin_officer_title TEXT,
        admin_officer_address TEXT,

        -- Page 9: Affiant and Ceremony Details
        affiant_name TEXT,
        affiant_civil_status TEXT,
        affiant_address TEXT,
        statement1_option_a INTEGER DEFAULT 0,
        statement1_marriage_with TEXT,
        statement1_place_a TEXT,
        statement1_date_a TEXT,
        statement1_option_b INTEGER DEFAULT 0,
        statement1_spouse_name_1 TEXT,
        statement1_spouse_name_2 TEXT,
        statement1_place_b TEXT,
        statement1_date_b TEXT,
        solemnizing_officer TEXT,
        ceremony_religious INTEGER DEFAULT 0,
        ceremony_civil INTEGER DEFAULT 0,
        ceremony_muslim INTEGER DEFAULT 0,
        ceremony_tribal INTEGER DEFAULT 0,
        marriage_with_license INTEGER DEFAULT 0,
        marriage_license_no_page9 TEXT,
        marriage_issued_on_page9 TEXT,
        marriage_issued_at_page9 TEXT,
        marriage_under_article INTEGER DEFAULT 0,
        article_number TEXT,
        citizen_applicant TEXT,
        citizen_spouse TEXT,
        citizen_applicant2 TEXT,
        citizen_spouse2 TEXT,
        reason_for_delay TEXT,
        affidavit_day_page9 TEXT,
        affidavit_month_page9 TEXT,
        affidavit_year_page9 TEXT,
        affidavit_place_page9 TEXT,

        -- Page 10: Sworn Details
        sworn_day_page10 TEXT,
        sworn_month_page10 TEXT,
        sworn_year_page10 TEXT,
        sworn_place_page10 TEXT,
        sworn_issued_on_page10 TEXT,
        sworn_issued_on_page102 TEXT,
        sworn_issued_at_page10 TEXT,
        administering_officer_name TEXT,
        officer_position_page10 TEXT,
        officer_address_page10 TEXT,

        -- Page 11: Confirmation
        confirmation INTEGER DEFAULT 0,

        -- Add timestamps
        created_at TIMESTAMP DEFAULT (datetime('now')),
        updated_at TIMESTAMP DEFAULT (datetime('now')),
        deleted_at TIMESTAMP
    );
`);


});

module.exports = db;
