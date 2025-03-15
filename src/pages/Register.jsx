import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'professional',
    institution: '',
    position: '',
    location: '',
    bio: '',
    skills: '',
    profileImage: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map((skill) => skill.trim()) : [],
      };
      await axios.post('http://192.168.235.4:5000/api/auth/register', submitData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <style>
        {`
          /* Reset and base styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
          }

          html, body {
            min-height: 100%;
            background: #1a1a1a;
          }

          /* Main container modifications */
          .register-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 40px 20px;
            position: relative;
            background: #1a1a1a;
            overflow-y: auto;
          }

          /* Background pattern */
          .register-container::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(45deg, 
                transparent 48%, 
                rgba(69, 243, 255, 0.1) 50%, 
                transparent 52%),
              linear-gradient(-45deg, 
                transparent 48%, 
                rgba(255, 39, 112, 0.1) 50%, 
                transparent 52%);
            background-size: 40px 40px;
            animation: moveBackground 20s linear infinite;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }

          /* Box container modifications */
          .register-box {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            background: rgba(45, 45, 57, 0.9);
            border-radius: 20px;
            overflow: visible;
            backdrop-filter: blur(10px);
            z-index: 1;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          }

          /* Form content modifications */
          .form-content {
            position: relative;
            padding: 40px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.5);
            overflow-y: auto;
            max-height: calc(100vh - 80px);
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .register-container {
              padding: 20px 10px;
              align-items: flex-start;
            }

            .register-box {
              margin: 10px;
            }

            .form-content {
              padding: 20px;
              max-height: none;
            }

            .form-header h2 {
              font-size: 1.8em;
            }
          }

          /* Add smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Ensure form sections are visible */
          .form-section {
            position: relative;
            z-index: 2;
            margin-bottom: 30px;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(69, 243, 255, 0.1);
          }

          /* Improve input visibility */
          .input-group {
            position: relative;
            margin-bottom: 20px;
            z-index: 3;
          }

          input, select, textarea {
            width: 100%;
            padding: 15px 20px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(69, 243, 255, 0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 1rem;
            transition: all 0.3s ease;
            position: relative;
            z-index: 3;
          }

          /* Add focus highlight effect */
          input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #45f3ff;
            box-shadow: 0 0 15px rgba(69, 243, 255, 0.3);
            transform: translateY(-2px);
            background: rgba(0, 0, 0, 0.4);
          }

          /* Improve form header visibility */
          .form-header {
            position: relative;
            z-index: 3;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(69, 243, 255, 0.1);
          }

          .form-header h2 {
            font-size: 2.5em;
            color: #45f3ff;
            text-shadow: 0 0 10px #45f3ff;
            margin-bottom: 10px;
          }

          .form-header h2 i {
            animation: iconGlow 2s infinite;
          }

          @keyframes iconGlow {
            0%, 100% { text-shadow: 0 0 10px #45f3ff; }
            50% { text-shadow: 0 0 20px #45f3ff, 0 0 30px #45f3ff; }
          }

          .section-title {
            color: #ff2770;
            font-size: 1.3em;
            margin-bottom: 20px;
            text-shadow: 0 0 5px #ff2770;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 39, 112, 0.3);
          }

          input::placeholder, textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          select {
            cursor: pointer;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2345f3ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1em;
            padding-right: 40px;
          }

          button {
            width: 100%;
            padding: 15px;
            background: #45f3ff;
            color: #1a1a1a;
            border: none;
            border-radius: 8px;
            font-size: 1.2em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
            overflow: hidden;
          }

          button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: 0.5s;
          }

          button:hover::before {
            left: 100%;
          }

          button:hover {
            background: #ff2770;
            color: #fff;
            box-shadow: 0 0 20px #ff2770;
            transform: translateY(-2px);
          }

          .error-message {
            background: rgba(255, 39, 112, 0.1);
            color: #ff2770;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            border: 1px solid rgba(255, 39, 112, 0.3);
            animation: errorShake 0.5s ease-in-out;
          }

          @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }

          .login-link {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .login-link a {
            color: #fff;
            text-decoration: none;
            font-size: 1.1em;
            transition: all 0.3s ease;
          }

          .login-link a:hover {
            color: #45f3ff;
          }

          .neon-text {
            color: #ff2770;
            text-shadow: 0 0 5px #ff2770;
            font-weight: 600;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
          }

          ::-webkit-scrollbar-thumb {
            background: #45f3ff;
            border-radius: 5px;
            transition: all 0.3s ease;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #ff2770;
          }
        `}
      </style>

      <div className="register-box">
        <div className="form-content">
          <div className="form-header">
            <h2>
              <i className="fas fa-user-plus"></i> Create Account
            </h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="professional">Professional</option>
                  <option value="institution">Institution</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Additional Information</h3>
              <div className="input-group">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {formData.userType === 'professional' && (
                <>
                  <div className="input-group">
                    <input
                      type="text"
                      name="position"
                      placeholder="Designation"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="skills"
                      placeholder="Skills (comma-separated)"
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {formData.userType === 'institution' && (
                <div className="input-group">
                  <input
                    type="text"
                    name="institution"
                    placeholder="Institution Name"
                    value={formData.institution}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="input-group">
                <textarea
                  name="bio"
                  placeholder="Bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            <button type="submit">Register</button>
          </form>

          <div className="login-link">
            <Link to="/login">
              Already have an account? <span className="neon-text">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;