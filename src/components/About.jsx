import React from 'react';
import './About.css';
// import companyLogo from './company-logo.png';

const About = () => {
  return (
    <div className="container">
      <h1 className="heading">About Us</h1>
      <div className="about-image-wrapper">
        {/* <img src={} alt="Company Logo" className="about-image" /> */}
      </div>
      <p className="paragraph">Welcome to the forefront of digital innovation.</p>
      <p className="paragraph">At [Your Company Name], we are architects of the digital future, harnessing cutting-edge technologies to revolutionize industries and empower businesses worldwide.</p>
      <p className="paragraph">With a multidisciplinary team of seasoned experts, we specialize in developing bespoke solutions tailored to the unique challenges and opportunities of our clients. From scalable web applications to immersive virtual reality experiences, we combine technical prowess with creative vision to deliver unparalleled results.</p>
      <p className="paragraph">Our ethos is built on a foundation of innovation, collaboration, and relentless pursuit of excellence. We thrive on pushing boundaries, exploring the uncharted, and transforming bold ideas into reality.</p>
      <p className="paragraph">Driven by a passion for innovation and a commitment to quality, we partner with forward-thinking organizations to define the future of technology. Our holistic approach integrates strategy, design, and engineering to create solutions that not only meet but exceed expectations.</p>
      <p className="paragraph thank-you">Thank you for considering [Your Company Name]. Join us on this journey as we shape the digital landscape and inspire positive change.</p>
    </div>
  );
};

export default About;
