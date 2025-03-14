import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <style>
        {`
          @import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
          @import url("https://use.fontawesome.com/releases/v6.5.1/css/all.css");

          body {
            margin: 0;
            padding: 0;
            background: #25252b;
            min-height: 100vh;
            font-family: "Poppins", sans-serif;
            overflow-y: auto;
          }

          * {
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
          }

          @property --a {
            syntax: "<angle>";
            inherits: false;
            initial-value: 0deg;
          }

          .home-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            overflow-y: auto;
          }

          .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(
              from var(--a),
              #ff2770 0%,
              #ff2770 5%,
              transparent 5%,
              transparent 40%,
              #ff2770 50%
            );
            filter: drop-shadow(0 15px 50px #000);
            animation: rotating 4s linear infinite;
            z-index: 0;
          }

          @keyframes rotating {
            0% {
              --a: 0deg;
            }
            100% {
              --a: 360deg;
            }
          }

          .content {
            position: relative;
            z-index: 1;
            text-align: center;
            color: #fff;
            padding: 2rem;
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
          }

          .title {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }

          .neon-text {
            color: #ff2770;
            text-shadow: 0 0 5px #ff2770, 0 0 20px #ff2770;
          }

          .neon-text-alt {
            color: #45f3ff;
            text-shadow: 0 0 5px #45f3ff, 0 0 20px #45f3ff;
          }

          .subtitle {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 2rem;
          }

          .features {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 2rem;
            margin: 3rem 0;
          }

          .feature-card {
            background: #2d2d39;
            padding: 1.5rem;
            border-radius: 10px;
            width: calc(33.33% - 2rem);
            min-width: 280px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-5px);
          }

          .neon-icon {
            color: #ff2770;
            text-shadow: 0 0 5px #ff2770, 0 0 20px #ff2770;
          }

          .neon-icon-alt {
            color: #45f3ff;
            text-shadow: 0 0 5px #45f3ff, 0 0 20px #45f3ff;
          }

          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .cta-button {
            position: relative;
            padding: 1rem 2rem;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.1em;
            overflow: hidden;
            border-radius: 30px;
            transition: 0.5s;
          }

          .cta-button span {
            position: absolute;
            display: block;
          }

          .cta-button span:nth-child(1) {
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff2770);
            animation: animate1 1s linear infinite;
          }

          @keyframes animate1 {
            0% {
              left: -100%;
            }
            50%,
            100% {
              left: 100%;
            }
          }

          .cta-button span:nth-child(2) {
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

          .cta-button span:nth-child(3) {
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

          .cta-button span:nth-child(4) {
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

          .register-btn {
            background: #ff2770;
          }

          .login-btn {
            background: #45f3ff;
          }

          .cta-button:hover {
            box-shadow: 0 0 10px #ff2770, 0 0 40px #ff2770, 0 0 80px #ff2770;
          }

          .login-btn:hover {
            box-shadow: 0 0 10px #45f3ff, 0 0 40px #45f3ff, 0 0 80px #45f3ff;
          }

          .about-section {
            background: #2d2d39;
            padding: 3rem;
            margin: 3rem auto;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            width: 90%;
            max-width: 1200px;
          }

          .about-section h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #ff2770;
            text-shadow: 0 0 5px #ff2770, 0 0 20px #ff2770;
          }

          .about-section p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #fff;
          }

          /* Media Queries for Responsiveness */
          @media (max-width: 968px) {
            .feature-card {
              width: calc(50% - 2rem);
            }
          }

          @media (max-width: 768px) {
            .feature-card {
              width: 100%;
            }

            .title {
              font-size: 3rem;
            }

            .about-section {
              padding: 2rem;
              width: 95%;
            }

            .cta-buttons {
              flex-direction: column;
              gap: 1rem;
            }
          }
        `}
      </style>
      <div className="animated-background"></div>
      <div className="content">
        <h1 className="title">
          <span className="neon-text">Skill</span>
          <span className="neon-text-alt">Verify</span>
        </h1>
        
        <p className="subtitle">Professional Endorsement Platform</p>
        
        <div className="features">
          <div className="feature-card">
            <i className="fas fa-certificate neon-icon"></i>
            <h3>Verified Skills</h3>
            <p>Get your professional skills endorsed by trusted institutions</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-building neon-icon-alt"></i>
            <h3>Institution Network</h3>
            <p>Connect with leading educational institutions and organizations</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt neon-icon"></i>
            <h3>Trusted Platform</h3>
            <p>Secure and reliable skill verification system</p>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/register" className="cta-button register-btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register Now
          </Link>
          <Link to="/login" className="cta-button login-btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign In
          </Link>
        </div>

        {/* About Institution Endorsement Section */}
        <div className="about-section">
          <h2>About Institution Endorsement</h2>
          <p>
            SkillVerify partners with leading educational institutions and organizations to provide verified endorsements for your professional skills. Our platform ensures that your skills are recognized and validated by trusted entities, giving you a competitive edge in the job market.
          </p>
          <p>
            Institutions can seamlessly integrate with our system to endorse their students' or employees' skills, ensuring transparency and credibility. With SkillVerify, you can showcase your verified skills to potential employers and collaborators worldwide.
          </p>
          <p>
            Join our network of institutions today and empower your community with recognized and trusted skill endorsements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;