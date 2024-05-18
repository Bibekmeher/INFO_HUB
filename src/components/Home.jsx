import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Website</h1>
          <p className="typewriter-text">
            <Typewriter
              words={[
                "Explore the world of creativity and innovation with us.",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <Link to="/about" className="btn primary-btn">
            Learn More
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/insert-block-concept-illustration_114360-4291.jpg?t=st=1715942508~exp=1715946108~hmac=6f5f32cd487e5f26b5bdb70ea6b4ecd5f9a6f3e81a2725204d0b238a9870f5d6&w=740"
            alt="Hero"
          />
        </div>
      </div>
      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-cogs"></i>
          </div>
          <h2>Our Services</h2>
          <p>Discover our range of services designed to meet your needs.</p>
          <Link to="/services" className="btn secondary-btn">
            Explore Services
          </Link>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-project-diagram"></i>
          </div>
          <h2>Latest Projects</h2>
          <p>
            Take a look at our latest projects and see what we've been working
            on.
          </p>
          <Link to="/projects" className="btn secondary-btn">
            View Projects
          </Link>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h2>Contact Us</h2>
          <p>Have questions or want to get in touch? Reach out to us today!</p>
          <Link to="/contact" className="btn secondary-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
