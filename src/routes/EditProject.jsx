import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MakeProject from "./MakeProject";
import { getProjectById } from "../localData";

const EditProject = () => {
  const { pid } = useParams();
  const [project, setProject] = useState(false);

  useEffect(() => {
    const getProject = () => {
      const projectData = getProjectById(pid);
      setProject(projectData);
    };

    getProject();
  }, [pid]);

  return <>{project && <MakeProject project={project} />}</>;
};

export default EditProject;
