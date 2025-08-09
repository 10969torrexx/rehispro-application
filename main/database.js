// main/database.js
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// DB file stored inside userData path so each machine has its own DB
const { app } = require("electron");
const dbPath = path.join(app.getPath("userData"), "app_database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT,
      forcePasswordChange INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
