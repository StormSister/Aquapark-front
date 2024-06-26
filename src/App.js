import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BuyTickets from './components/BuyTickets';
import Bookroom from './components/Bookroom'; 
import Dashboard from './components/Dashboard';
import WorkerDashboard from './components/WorkerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import Navbar from './components/Navbar';
import YourAccount from './components/YourAccount'; 
import Greeting from './components/Greeting';
import Users from './components/Users';


import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('notLoggedIn');

  useEffect(() => {
    // Sprawdzenie Local Storage po załadowaniu aplikacji
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');
    if (accessToken && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  // Funkcja do ustawienia zalogowanego stanu i roli
  const handleLogin = (accessToken, role) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userRole', role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('notLoggedIn');

    // Call the logout endpoint
    fetch('http://localhost:8080/api/logout', {
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      console.log('User logged out successfully.');
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
  };

  return (
    <Router>
      <div className="App">
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buy-tickets" element={<BuyTickets />} />
          <Route path="/book-room" element={<Bookroom />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/your-account" element={<YourAccount />} /> 
          <Route path="/greeting" element={<Greeting />} />
          <Route path="/manage-users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
