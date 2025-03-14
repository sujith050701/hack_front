import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.235.4:5000/api/auth/login', formData);
      const { token, user } = response.data.data;

      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('userType', user.userType);

      // Route based on user type
      if (user.userType === 'professional') {
        navigate('/professional-dashboard');
      } else if (user.userType === 'institution') {
        navigate('/institution-dashboard');
      } else {
        setError('Invalid user type');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="cosmic-container">
      <style>
        {`
          @import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
          @import url("https://use.fontawesome.com/releases/v6.5.1/css/all.css");

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #25252b;
          }

          * {
            font-family: "Poppins", sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @property --a {
            syntax: "<angle>";
            inherits: false;
            initial-value: 0deg;
          }

          .cosmic-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .stellar-box {
            position: relative;
            width: 400px;
            height: 500px;
            background: repeating-conic-gradient(
              from var(--a),
              #ff2770 0%,
              #ff2770 5%,
              transparent 5%,
              transparent 40%,
              #ff2770 50%
            );
            filter: drop-shadow(0 15px 50px #000);
            border-radius: 20px;
            animation: rotating 4s linear infinite;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 20px;
          }

          @keyframes rotating {
            0% {
              --a: 0deg;
            }
            100% {
              --a: 360deg;
            }
          }

          .stellar-box::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(
              from var(--a),
              #45f3ff 0%,
              #45f3ff 5%,
              transparent 5%,
              transparent 40%,
              #45f3ff 50%
            );
            filter: drop-shadow(0 15px 50px #000);
            border-radius: 20px;
            animation: rotating 4s linear infinite;
            animation-delay: -1s;
          }

          .stellar-box::after {
            content: "";
            position: absolute;
            inset: 4px;
            background: #2d2d39;
            border-radius: 15px;
            border: 8px solid #25252b;
          }

          .quantum-wrapper {
            position: absolute;
            inset: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius: 10px;
            background: #00000033;
            color: #fff;
            z-index: 1000;
            box-shadow: inset 0 10px 20px #00000080;
            border-bottom: 2px solid #ffffff80;
            padding: 20px;
            box-sizing: border-box;
            width: calc(100% - 80px);
          }

          .nebula-title {
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.2em;
            margin-bottom: 20px;
          }

          .nebula-title i {
            color: #ff2770;
            text-shadow: 0 0 5px #ff2770, 0 0 20px #ff2770;
          }

          .plasma-text {
            color: #45f3ff;
            text-shadow: 0 0 5px #45f3ff, 0 0 20px #45f3ff;
          }

          .nova-error {
            color: #ff2770;
            margin-bottom: 20px;
            text-align: center;
          }

          .galaxy-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
            box-sizing: border-box;
          }

          .orbit-group {
            position: relative;
            width: 100%;
            box-sizing: border-box;
          }

          .meteor-input {
            width: 100%;
            padding: 10px 20px;
            outline: none;
            border: none;
            font-size: 1em;
            color: #fff;
            background: #0000001a;
            border: 2px solid #fff;
            border-radius: 30px;
            box-sizing: border-box;
          }

          .meteor-input::placeholder {
            color: #999;
          }

          .comet-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff2770);
            animation: animate1 1s linear infinite;
          }

          // @keyframes animate1 {
          //   0% {
          //     left: -100%;
          //   }
          //   50%,
          //   100% {
          //     left: 100%;
          //   }
          //}

          .pulsar-button {
            position: relative;
            padding: 10px 20px;
            background: #45f3ff;
            border: none;
            font-weight: 500;
            color: #111;
            cursor: pointer;
            border-radius: 30px;
            overflow: hidden;
            transition: 0.5s;
          }

          .pulsar-button span {
            position: absolute;
            display: block;
          }

          .pulsar-button span.neutron-1 {
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff2770);
            animation: animate1 1s linear infinite;
          }

          .pulsar-button span.neutron-2 {
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent, #ff2770);
            animation: animate2 1s linear infinite;
            animation-delay: 0.25s;
          }

          @keyframes animate2 {
            0% {
              top: -100%;
            }
            50%,
            100% {
              top: 100%;
            }
          }

          .pulsar-button span.neutron-3 {
            bottom: 0;
            right: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(270deg, transparent, #ff2770);
            animation: animate3 1s linear infinite;
            animation-delay: 0.5s;
          }

          @keyframes animate3 {
            0% {
              right: -100%;
            }
            50%,
            100% {
              right: 100%;
            }
          }

          .pulsar-button span.neutron-4 {
            bottom: -100%;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(360deg, transparent, #ff2770);
            animation: animate4 1s linear infinite;
            animation-delay: 0.75s;
          }

          @keyframes animate4 {
            0% {
              bottom: -100%;
            }
            50%,
            100% {
              bottom: 100%;
            }
          }

          .pulsar-button:hover {
            box-shadow: 0 0 10px #45f3ff, 0 0 40px #45f3ff, 0 0 80px #45f3ff;
          }

          .stargate-link {
            margin-top: 20px;
            text-align: center;
          }

          .stargate-link a {
            color: #fff;
            text-decoration: none;
          }

          .stargate-link a .quasar-text {
            color: #ff2770;
            font-weight: 600;
          }

          @media (max-width: 480px) {
            .stellar-box {
              width: 90%;
              height: auto;
              min-height: 500px;
              margin: 20px;
            }

            .quantum-wrapper {
              inset: 20px;
              width: calc(100% - 40px);
              padding: 15px;
            }

            .meteor-input {
              padding: 8px 15px;
              font-size: 0.9em;
            }
          }
        `}
      </style>
      <div className="stellar-box">
        <div className="quantum-wrapper">
          <h2 className="nebula-title">
            <i className="fas fa-user-astronaut cosmic-icon"></i>
            <span className="plasma-text">Welcome Back</span>
          </h2>

          {error && <div className="nova-error">{error}</div>}

          <form onSubmit={handleSubmit} className="galaxy-form">
            <div className="orbit-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="meteor-input"
                required
              />
              <span className="comet-line"></span>
            </div>

            <div className="orbit-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="meteor-input"
                required
              />
              <span className="comet-line"></span>
            </div>

            <button type="submit" className="pulsar-button">
              <span className="neutron-1"></span>
              <span className="neutron-2"></span>
              <span className="neutron-3"></span>
              <span className="neutron-4"></span>
              Launch Session
            </button>
          </form>

          <div className="stargate-link">
            <Link to="/register">
              New Explorer? <span className="quasar-text">Register Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;