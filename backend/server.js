const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//TODO: handle user login
app.post('/login', (req, res) => {
  const { login_id, password } = req.body;

  if (!login_id || !password) {
    return res.status(400).json({ success: false, message: 'Missing login credentials' });
  }

  usersController.verifyLogin(login_id, password, (err, result) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(result);
  });
});

app.get('/', (req, res) => {
  res.send('Backend API is running 🚀');
});

//TODO: handle update user credentials
app.post('/update-firsttime-login', (req, res) => {
  const { id, newIsFirstTimeFlag } = req.body;

  if (!id || newIsFirstTimeFlag === undefined) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  usersController.updateIsFirstTimeFlg(id, newIsFirstTimeFlag, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json(result);
  });
});


/**
 * TODO: update user credentials
 * @param {string} loginId
 * @param {string} newPassword
 */
app.post('/update-credentials', (req, res) => {
  const { loginId, new_password, id } = req.body;
  if (!loginId || !new_password || !id) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  usersController.updateCredentials(loginId, new_password, id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json(result);
  });
});

/**
 * TODO: create user
 * @param {string} loginId
 * @param {string} password
 */
app.post('/create-user', (req, res) => {
  const { loginId, password, role } = req.body;
  if (!loginId || !password || !role) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  usersController.createUser(loginId, password, role, (err, result) => {
    if (err) {
      if (err.message.includes("SQLITE_CONSTRAINT")) {
        return res.status(400).json({ success: false, message: "Duplicate user found" });
      }
      return res.status(500).json({ success: false, message: err.message || 'Database error' });
    }
    return res.json(result);
  });
});

//TODO: Start server
const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

module.exports = server;
