const { data } = require('autoprefixer');
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

/**
 * TODO: update user credentials
 * @param {string} loginId
 * @param {string} newPassword
 */
function updateCredentials(loginId, newPassword, id, callback) {
  if (!loginId || !newPassword || !id) {
    return callback(new Error('Login ID, new password, and user ID are required'));
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  db.run(
    `UPDATE users SET login_id = ?, password = ?, is_firsttime_flg = ? WHERE id = ?`,
    [loginId, hashedPassword, 0, id],
    function (err) {
      if (err) return callback(err);
      if (this.changes === 0) {
        return callback(null, { success: false, message: 'No matching user found' });
      }

      db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return callback(err);
        callback(null, {
          success: true,
          message: 'Credentials updated successfully',
          data: row
        });
      });
    }
  );
}

/**
 * TODO: create users
 * @param {string} loginId
 * @param {string} password
 */
function createUser(loginId, password, role, callback) {
  if (!loginId || !password) {
    return callback(new Error('Login ID and password are required'));
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  db.run(
    `INSERT INTO users (login_id, password, is_firsttime_flg, role) VALUES (?, ?, ?, ?)`,
    [loginId, hashedPassword, 1, role],
    function (err) {
      if (err) return callback(err);
      callback(null, { success: true, message: 'User created successfully', id: this.lastID });
    }
  );
}

/**
 * TODO: fetch all users
 */
function getAllUsers(callback) {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = { 
  verifyLogin, 
  updateIsFirstTimeFlg,
  updateCredentials,
  getAllUsers,
  createUser,
};