const bcrypt = require('bcryptjs');
const db = require('../database');

function verifyLogin(username, password) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error('DB error:', err);
        return resolve({ success: false, message: 'Database error' });
      }
      if (!row) {
        return resolve({ success: false, message: 'User not found' });
      }

      const match = bcrypt.compareSync(password, row.password);
      if (!match) {
        return resolve({ success: false, message: 'Invalid password' });
      }

      resolve({ success: true, user: { id: row.id, username: row.username, role: row.role } });
    });
  });
}

module.exports = {
  verifyLogin
};
