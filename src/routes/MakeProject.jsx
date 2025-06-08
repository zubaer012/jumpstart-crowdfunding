import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Stack, Button, Form } from "react-bootstrap";
import validator from "validator";
import { addProject, updateProject } from "../localData";
import "../styles/MakeProject.css";
import { motion } from "framer-motion";

const MakeProject = ({ project = false }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: project ? project.category : "Art",
    title: project ? project.title : "",
    text: project ? project.text : "",
    img_url: project ? project.img_url : "",
    amt_requested: project ? project.amt_requested : "",
    deadline: project ? project.deadline : "",
    company: project ? project.company : "",
  });

  const updateProjectData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateProject = async () => {
    const today = new Date();
    const deadline = new Date(formData.deadline);

    if (
      !formData.title ||
      !formData.text ||
      !formData.img_url ||
      !formData.amt_requested ||
      !formData.deadline ||
      !formData.company
    ) {
      alert("Please fill in all fields!");
      return;
    }

    if (!validator.isURL(formData.img_url)) {
      alert("Please enter a valid image URL!");
      return;
    }

    if (isNaN(formData.amt_requested) || formData.amt_requested <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (deadline < today) {
      alert("Deadline cannot be in the past!");
      return;
    }

    let result;
    if (project) {
      result = updateProject(project.pid, formData);
    } else {
      result = addProject(formData);
    }

    if (result) {
      const daysLeft =
        Math.round(
          (Date.parse(formData.deadline) - today) / (1000 * 60 * 60 * 24)
        ) + 1;
      if (!project) {
        alert(
          "Project Created Successfully! Now go share it with your network."
        );
      } else {
        alert("Project Updated Successfully!");
      }
      navigate(`/discover/${result.pid}/${result.user_id}/${daysLeft}`);
    } else {
      alert(
        "Project cannot be created due to an error. Please try again later."
      );
      navigate(`/discover`);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#272b33";
  }, []);

  return (
    <>
      <Stack className="make-project-container" gap={3}>
        <h2 className="text-center mb-4">
          {project ? "Edit Project" : "Create New Project"}
        </h2>

        <Form.Select
          name="category"
          value={formData.category}
          className="w-50 filter-border mx-auto mb-3"
          onChange={updateProjectData}
        >
          <option value="Art">Art & Crafts</option>
          <option value="Books">Books</option>
          <option value="Games">Games</option>
          <option value="Fashion">Fashion</option>
          <option value="Food">Food</option>
          <option value="Film">Films</option>
          <option value="Life Style">Life Style</option>
          <option value="Nature & Environment">Nature & Environment</option>
          <option value="Technology">Technology</option>
        </Form.Select>

        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          className="w-50 filter-border mx-auto mb-3"
          placeholder="Project Title"
          onChange={updateProjectData}
        />

        <Form.Control
          as="textarea"
          name="text"
          value={formData.text}
          className="w-50 filter-border mx-auto mb-3"
          placeholder="Project Description"
          onChange={updateProjectData}
        />

        <Form.Control
          type="text"
          name="img_url"
          value={formData.img_url}
          className="w-50 filter-border mx-auto mb-3"
          placeholder="Image URL"
          onChange={updateProjectData}
        />

        <Form.Control
          type="number"
          name="amt_requested"
          value={formData.amt_requested}
          className="w-50 filter-border mx-auto mb-3"
          placeholder="Amount Requested"
          onChange={updateProjectData}
        />

        <Form.Control
          type="date"
          name="deadline"
          value={formData.deadline}
          className="w-50 filter-border mx-auto mb-3"
          onChange={updateProjectData}
        />

        <Form.Control
          type="text"
          name="company"
          value={formData.company}
          className="w-50 filter-border mx-auto mb-5"
          placeholder="Company Name"
          onChange={updateProjectData}
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.2 }}
          className="mx-auto"
        >
          <Button
            variant={project ? "outline-danger" : "outline-success"}
            className="jump-start-btn"
            onClick={validateProject}
          >
            {!project && (
              <span className="mono-logo">
                {" "}
                <span className="logo-color">Jump</span>Start your project!
              </span>
            )}
            {project && <span className="mono-logo">Submit Changes</span>}
          </Button>
        </motion.div>
      </Stack>
    </>
  );
};

export default MakeProject;
