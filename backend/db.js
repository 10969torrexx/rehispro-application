const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login_id TEXT UNIQUE,
      password TEXT,
      role VARCHAR(255) NOT NULL DEFAULT 'supervisor',
      is_firsttime_flg BOOLEAN NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.get(`SELECT * FROM users WHERE login_id = ?`, ['admin'], (err, row) => {
    if (!row) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('admin123', salt);

      db.run(
        `INSERT INTO users (login_id, password, role) VALUES (?, ?, ?)`,
        ['admin', hashedPassword, 'supervisor'],
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
});

module.exports = db;
