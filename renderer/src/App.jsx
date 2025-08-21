import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Dashboard, UsersManagement, NotFound } from '@pages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      setIsFirstTimeUser(storedUser.is_firsttime_flg);
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
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/user-management" element={isLoggedIn ? <UsersManagement /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
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
