// backend\server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',   // dev
  'app://.',                 // production Electron/Tauri app
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//this is just a just-in-case
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
      return res.status(500).json({
        success: false,
        message: err.message || 'Database error',
        data: null
      });
    }
    return res.json(result);
  });
});

/**
 * TODO: fetch all users
 */
app.post('/users', (req, res) => {
  const { currentUserId } = req.body;
  usersController.getAllUsers(currentUserId, (err, result) => {
    if (err) {
      console.error('Fetch users error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json({ success: true, data: result });
  });
});

/**
 * TODO: delete the user
 * @param {string} userId
 */
app.post('/user-delete', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'Missing user ID' });
  }

  usersController.deleteUser(userId, (err, result) => {
    if (err) {
      console.error('Delete user error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json(result);
  });
});

/**
 * TODO: get user details by id
 * @param {number} userId
 */
app.post('/get-user-details', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'Missing user ID' });
  }

  usersController.getUserDetails(userId, (err, result) => {
    if (err) {
      console.error('Get user details error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json(result);
  });
});

/**
 * TODO: update user details
 * @param {Object} userDetails
 */
app.post('/update-user-details', (req, res) => {
  const { userDetails } = req.body;
  if (!userDetails || !userDetails.id) {
    return res.status(400).json({ success: false, message: 'Missing user details' });
  }

  usersController.updateUserDetails(userDetails, (err, result) => {
    if (err) {
      console.error('Update user details error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json(result);
  });
});

//TODO: importing /routes birthCertificate
const birthCertificateRoutes = require('./routes/birthCertificate');
app.use('/birth/', birthCertificateRoutes);

//TODO: importing /routes deathCertificate
const deathCertificateRoutes = require('./routes/deathCertificate');
app.use('/death', deathCertificateRoutes);

//TODO: importing /routes marriageCertificate
const marriageCertificateRoutes = require('./routes/marriageCertificate');
app.use('/marriage', marriageCertificateRoutes);

//TODO: import routes visitorLogs
const visitorLogsRoutes = require('./routes/visitorLogs');
app.use('/visitor-logs', visitorLogsRoutes);

//TODO: Start server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

module.exports = server;
