import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Stack, Button, ProgressBar } from "react-bootstrap";
import { getProjectById, addFund } from "../localData";
import "../styles/ProjectPage.css";
import { motion } from "framer-motion";

const ProjectPage = () => {
  const { pid, user_id, daysLeft } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [fundAmount, setFundAmount] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = getProjectById(pid);
      if (projectData) {
        setProject(projectData);
      } else {
        navigate("/discover");
      }
    };
    fetchProject();
  }, [pid, navigate]);

  const handleFund = () => {
    if (!fundAmount || isNaN(fundAmount) || fundAmount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    const success = addFund(pid, parseFloat(fundAmount));
    if (success) {
      alert("Thank you for your contribution!");
      setFundAmount("");
      // Refresh project data
      const updatedProject = getProjectById(pid);
      setProject(updatedProject);
    } else {
      alert("Failed to process funding. Please try again later.");
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  const progress = (project.pledged / project.amt_requested) * 100;

  return (
    <div className="project-page-container">
      <motion.div
        className="left-section"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="project-header">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-company">by {project.company}</p>
        </div>

        <div className="project-image-container">
          <img
            src={project.img_url}
            alt={project.title}
            className="project-image"
          />
        </div>

        <div className="project-stats">
          <div className="stat-item">
            <h3>${project.pledged}</h3>
            <p>pledged of ${project.amt_requested} goal</p>
          </div>
          <div className="stat-item">
            <h3>{daysLeft}</h3>
            <p>days left</p>
          </div>
          <div className="stat-item">
            <h3>{project.backers}</h3>
            <p>backers</p>
          </div>
        </div>

        <div className="progress-container">
          <ProgressBar now={progress} className="funding-progress" />
        </div>

        <div className="funding-section">
          <input
            type="number"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            placeholder="Enter amount to fund"
            className="fund-input"
          />
          <Button onClick={handleFund} className="fund-button">
            Fund Project
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="right-section"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="project-description">
          <h2>About this project</h2>
          <p>{project.text}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectPage;
