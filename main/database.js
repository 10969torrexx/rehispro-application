const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const { app, BrowserWindow, ipcMain } = require("electron");
const dbPath = path.join(__dirname, "database.sqlite");

/**
 * TODO: import controllers
 */
const usersController = require('./controllers/usersController');

ipcMain.handle('login', async (event, credentials) => {
  return await usersController.verifyLogin(credentials.username, credentials.password);
});

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login_id TEXT UNIQUE,
      password TEXT,
      role TEXT,
      forcePasswordChange INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
