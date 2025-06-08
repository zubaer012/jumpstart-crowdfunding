import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Form, Table } from "react-bootstrap";
import { getProjectById } from "../localData";
import "../styles/FundViewer.css";

const FundViewer = () => {
  const navigate = useNavigate();
  const { pid, projectTitle } = useParams();
  const [project, setProject] = useState(false);
  const [funds, setFunds] = useState([]);

  // Sort funds by amount
  const sortFunds = (DescOrder) => {
    let sortedData = [...funds];
    if (DescOrder) {
      sortedData.sort((f1, f2) => f2.amt - f1.amt);
    } else {
      sortedData.sort((f1, f2) => f1.amt - f2.amt);
    }
    setFunds(sortedData);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#272b33";

    const getFunds = () => {
      const projectData = getProjectById(pid);
      if (projectData) {
        setProject(projectData);
        // For now, we'll just show the total pledged amount
        setFunds([
          {
            amt: projectData.amt_pledged,
            backer_id: "local_user",
            project_id: pid,
          },
        ]);
      }
    };

    getFunds();
  }, [pid]);

  return (
    <div className="fund-viewer-container">
      <h2 className="text-center mb-4">Funding Details for {projectTitle}</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Backer</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund, index) => (
            <tr key={index}>
              <td>{fund.backer_id}</td>
              <td>${fund.amt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FundViewer;
