// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import InstitutionDashboard from './pages/InstitutionDashboard';
import Profile from './pages/Profile';



// Protected Route Component
const ProtectedRoute = ({ children, allowedUserType }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/professional-dashboard" 
          element={
            <ProtectedRoute allowedUserType="professional">
              <ProfessionalDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/institution-dashboard" 
          element={
            <ProtectedRoute allowedUserType="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile/:id" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
       
      </Routes>
    </Router>
  );
};

export default App;