const db = require("./database");
const bcrypt = require("bcryptjs");

function seedSupervisor() {
  db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
    if (err) {
      console.error("Error checking users:", err.message);
    } else if (row.count === 0) {
      const hashedPassword = bcrypt.hashSync("admin123", 10);
      db.run(
        `INSERT INTO users (login_id, password, role, forcePasswordChange)
         VALUES (?, ?, ?, ?)`,
        ["admin", hashedPassword, "supervisor", 1],
        (err) => {
          if (err) console.error("Error inserting supervisor:", err.message);
          else console.log("Default supervisor account created: admin/admin123");
        }
      );
    }
  });
}

seedSupervisor();
