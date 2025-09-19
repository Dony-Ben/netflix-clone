import React from "react";
import "./Landing.css";
import heroBg from "/background_banner.jpg";
import logo from "../../assets/logo.png"
import Footer from "../../Component/Footer/Footer.jsx"
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
    <div className="landing">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Netflix" className="logo" />
        <div className="header-actions">
          <div className="lang-select">
            <span className="globe">🌐</span>
            <select>
              <option>English</option>
              <option>हिन्दी</option>
            </select>
          </div>
          <button className="signin-btn" onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Unlimited movies, TV shows and more</h1>
          <h2>Starts at ₹149. Cancel at any time.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="hero-input">
            <input type="email" placeholder="Email address" />
            <button>Get Started &gt;</button>
          </div>
        </div>
      </section>
    </div>
<Footer/>
    </>
  );
}

export default Landing;
