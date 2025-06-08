import React from "react";
import { Stack } from "react-bootstrap";
import "../styles/About.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Stack className="about-container" gap={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="about-header"
      >
        <h1>About JumpStart</h1>
        <p className="subtitle">Empowering creators through crowdfunding</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="about-section"
      >
        <h2>Our Mission</h2>
        <p>
          JumpStart is dedicated to helping creators bring their innovative
          projects to life. We provide a platform where creative minds can
          connect with supporters who believe in their vision.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="about-section"
      >
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Create</h3>
            <p>Share your project idea and set your funding goal</p>
          </div>
          <div className="step">
            <h3>2. Connect</h3>
            <p>Engage with supporters and build your community</p>
          </div>
          <div className="step">
            <h3>3. Fund</h3>
            <p>Receive funding from backers who believe in your vision</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="about-section"
      >
        <h2>Why Choose JumpStart?</h2>
        <ul>
          <li>Simple and intuitive platform</li>
          <li>No hidden fees</li>
          <li>Direct connection with supporters</li>
          <li>Flexible funding options</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="about-section"
      >
        <h2>Get Started Today</h2>
        <p>
          Join our community of creators and supporters. Whether you're looking
          to fund your next big idea or support innovative projects, JumpStart
          is here to help you make it happen.
        </p>
      </motion.div>
    </Stack>
  );
};

export default About;
