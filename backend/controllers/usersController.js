const db = require('../db');
const bcrypt = require('bcryptjs');

function verifyLogin(loginId, password, callback) {
  db.get(`SELECT * FROM users WHERE login_id = ?`, [loginId], (err, user) => {
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

function updateIsFirstTimeFlg(id, newIsFirstTimeFlag, callback ) {
  const normalizedValue = newIsFirstTimeFlag ? 1 : 0;
  db.run(`UPDATE users SET is_firsttime_flg = ? WHERE id = ?`, [normalizedValue, id], function(err) {
    if (err) return callback(err);
    if (this.changes === 0) {
      return callback(null, { success: false, message: 'No matching user found' });
    }
    callback(null, { success: true });
  });
}

module.exports = { 
  verifyLogin, 
  updateIsFirstTimeFlg 
};