import { useState, useEffect } from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Login, Dashboard, UsersManagement, NotFound, BirthCertificate, DeathCertificate, MarriageCertificate, VisitorLogs } from '@pages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
      setIsFirstTimeUser(JSON.parse(localStorage.getItem("user")).is_firsttime_flg);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={() => {setIsLoggedIn(true);}} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UsersManagement />} />
          <Route path="/birth-certificates" element={<BirthCertificate />} />
          <Route path="/death-certificates" element={<DeathCertificate />} />
          <Route path="/marriage-certificates" element={<MarriageCertificate />} />
          <Route path="/visitor-logs" element={<VisitorLogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
