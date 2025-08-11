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
  const { login_id, value } = req.body;

  if (!login_id || value === undefined) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  usersController.updateIsFirstTimeFlg(login_id, value, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.json(result);
  });
});


// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
