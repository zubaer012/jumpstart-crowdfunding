import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, ButtonGroup, Button, ProgressBar } from "react-bootstrap";
import { deleteProject } from "../localData";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/menu.css";

const ProjectCard = ({ project, manage = false }) => {
  const navigate = useNavigate();
  const today = new Date();
  const daysLeft =
    Math.round((Date.parse(project.deadline) - today) / (1000 * 60 * 60 * 24)) +
    1;
  const singleDay = daysLeft === 1 ? true : false;

  const redirectProjectPage = (e) => {
    if (e.target.name === "view")
      navigate(`/discover/${project.pid}/${project.user_id}/${daysLeft}`);
    else if (e.target.name === "edit") navigate(`/manage/edit/${project.pid}`);
    else if (e.target.name === "funds")
      navigate(`/manage/funds/${project.pid}/${project.title}`);
  };

  const handleDeleteProject = () => {
    const remove = window.confirm(
      `Are you sure to delete project "${project.title}"?`
    );

    if (remove) {
      deleteProject(project.pid);
      window.location.reload();
    }
  };

  return (
    <Card className="project-card">
      <Card.Img variant="top" src={project.img_url} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {project.company}
        </Card.Subtitle>
        <Card.Text>{project.text}</Card.Text>
        <ProgressBar
          now={project.fundRatio}
          label={`${project.fundRatio}%`}
          variant="success"
        />
        <div className="d-flex justify-content-between mt-2">
          <span>${project.amt_pledged} pledged</span>
          <span>${project.amt_requested} goal</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>
            {daysLeft} {singleDay ? "day" : "days"} left
          </span>
          <span>{project.category}</span>
        </div>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup className="w-100">
          <Button
            variant="outline-success"
            name="view"
            onClick={redirectProjectPage}
          >
            View
          </Button>
          {manage && (
            <>
              <Button
                variant="outline-warning"
                name="edit"
                onClick={redirectProjectPage}
              >
                Edit
              </Button>
              <Button
                variant="outline-info"
                name="funds"
                onClick={redirectProjectPage}
              >
                Funds
              </Button>
              <Button variant="outline-danger" onClick={handleDeleteProject}>
                Delete
              </Button>
            </>
          )}
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
