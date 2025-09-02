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
      creation_type VARCHAR(50) DEFAULT 'manual',

      -- Page 1 - Child Information
      province VARCHAR(100),
      city VARCHAR(100),
      child_first_name VARCHAR(100),
      child_middle_name VARCHAR(100),
      child_last_name VARCHAR(100),
      sex VARCHAR(10),
      date_of_birth DATE,
      type_of_birth VARCHAR(50),
      multiple_birth_order VARCHAR(50),
      birth_order VARCHAR(50),
      birth_weight VARCHAR(20),

      -- Page 2 - Mother Information
      maiden_first_name VARCHAR(100),
      maiden_middle_name VARCHAR(100),
      maiden_last_name VARCHAR(100),
      citizenship VARCHAR(50),
      religion VARCHAR(50),
      children_born_alive INT,
      children_still_living INT,
      children_deceased INT,
      occupation VARCHAR(100),
      age_at_birth INT,
      residence_house VARCHAR(150),
      residence_city VARCHAR(100),
      residence_province VARCHAR(100),
      residence_country VARCHAR(100),

      -- Page 3 - Father Information
      father_first_name VARCHAR(100),
      father_middle_name VARCHAR(100),
      father_last_name VARCHAR(100),
      father_citizenship VARCHAR(50),
      father_religion VARCHAR(50),
      father_occupation VARCHAR(100),
      father_age_at_birth INT,
      father_residence_street VARCHAR(150),
      father_residence_city VARCHAR(100),
      father_residence_province VARCHAR(100),
      father_residence_country VARCHAR(100),

      -- Page 4 - Marriage Information
      date_of_marriage DATE,
      marriage_city VARCHAR(100),
      marriage_province VARCHAR(100),
      marriage_country VARCHAR(100),

      -- Page 5 - Attendant Information
      attendant_physician BOOLEAN,
      attendant_nurse BOOLEAN,
      attendant_midwife BOOLEAN,
      attendant_hilot BOOLEAN,
      attendant_others BOOLEAN,
      attendant_others_specify VARCHAR(150),
      date_of_attendance DATE,
      attendant_name_title VARCHAR(100),

      -- Page 6 - Attendant Certification
      birth_time TIME,
      birth_date DATE,
      attendant_name VARCHAR(100),
      attendant_title VARCHAR(100),
      attendant_address VARCHAR(150),
      attendant_date_signed DATE,
      attendant_signature TEXT,

      -- Page 7 - Informant & Prepared By
      informant_name VARCHAR(100),
      informant_relationship VARCHAR(100),
      informant_address VARCHAR(150),
      informant_date DATE,
      prepared_name VARCHAR(100),
      prepared_title VARCHAR(100),
      prepared_date DATE,

      -- Page 8 - Civil Registrar Section
      received_name VARCHAR(100),
      received_title VARCHAR(100),
      received_date DATE,
      registrar_signature TEXT,
      registrar_name VARCHAR(100),
      registrar_title VARCHAR(100),
      registrar_date DATE,

      -- Page 9 - Remarks / Annotations
      remarks TEXT,
      office_boxes JSONB, -- since it’s an array

      -- Page 10 - Affidavit of Acknowledgment
      mother_name VARCHAR(100),
      father_name VARCHAR(100),
      child_name VARCHAR(100),
      child_birth_date DATE,
      child_birth_place VARCHAR(150),

      -- Page 11 - Jurat
      jurat_day VARCHAR(20),
      jurat_month_year VARCHAR(20),
      jurat_affiant1 VARCHAR(100),
      jurat_affiant2 VARCHAR(100),
      ctc_number VARCHAR(50),
      ctc_date_issued DATE,
      ctc_place_issued VARCHAR(100),
      admin_name VARCHAR(100),
      admin_position VARCHAR(100),
      admin_address VARCHAR(150),
      admin_signature TEXT,

      -- Page 12 - Affidavit
      affiant_name VARCHAR(100),
      civil_status VARCHAR(50),
      address VARCHAR(150),

      self_checkbox BOOLEAN,
      self_pob VARCHAR(150),
      self_dob DATE,

      child_checkbox BOOLEAN,
      child_name_affidavit VARCHAR(100),
      child_pob VARCHAR(150),
      child_dob DATE,

      affidavit_attendant_name VARCHAR(100),
      affidavit_attendant_address VARCHAR(150),
      affidavit_citizenship VARCHAR(50),

      parents_status VARCHAR(20),
      marriage_date DATE,
      marriage_place VARCHAR(150),
      affidavit_father_name VARCHAR(100),

      reason_delay TEXT,
      spouse_applicant VARCHAR(100),
      spouse_owner VARCHAR(100),
      affiant_signature TEXT,

      -- Page 13 - Final Jurat / Affidavit
      final_jurat_day VARCHAR(20),
      final_jurat_month_year VARCHAR(20),
      final_jurat_place VARCHAR(100),
      final_ctc_number VARCHAR(50),
      final_ctc_issued_on DATE,
      final_ctc_issued_at VARCHAR(100),
      admin_officer_signature TEXT,
      admin_officer_name VARCHAR(100),
      admin_officer_position VARCHAR(100),
      admin_officer_address VARCHAR(150),

      -- Page 14 - Confirmation
      confirmation BOOLEAN DEFAULT FALSE

      -- Add timestamps
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL
    );
  `);
});

module.exports = db;
