const db = require('../db');
const bcrypt = require('bcryptjs');

function verifyLogin(login_id, password, callback) {
  db.get(`SELECT * FROM users WHERE login_id = ?`, [login_id], (err, user) => {
    if (err) return callback(err, null);
    if (!user) return callback(null, { success: false, message: 'User not found' });

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (passwordMatch) {
      callback(null, { success: true, user });
    } else {
      callback(null, { success: false, message: 'Invalid password' });
    }
  });
}

module.exports = { verifyLogin };
