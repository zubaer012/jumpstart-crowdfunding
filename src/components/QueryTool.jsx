import React, { useState, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { getProjects } from "../localData";
import "../styles/menu.css";
import { motion } from "framer-motion";

const QueryTool = ({ resultSet, setResultSet, manage = false }) => {
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    category: "all",
  });

  const [filterFundDesc, setFundFilter] = useState(false);

  const handleFilters = (e) => {
    const newSearchQuery = {
      ...searchQuery,
      [e.target.name]: e.target.value,
    };
    setSearchQuery(newSearchQuery);
    applyFilters(newSearchQuery, filterFundDesc);
  };

  const handleFundFilter = (isDesc) => {
    setFundFilter(isDesc);
    applyFilters(searchQuery, isDesc);
  };

  const applyFilters = (query, fundDesc) => {
    let projects = getProjects();

    // Apply category filter
    if (query.category !== "all") {
      projects = projects.filter(
        (project) => project.category === query.category
      );
    }

    // Apply search filter
    if (query.search !== "") {
      const searchTerm = query.search.trim().toLowerCase();
      projects = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.company.toLowerCase().includes(searchTerm)
      );
    }

    // Calculate fund ratio for each project
    projects = projects.map((project) => {
      const diff = project.amt_requested - project.amt_pledged;
      project.fundRatio =
        diff > 0
          ? Math.trunc((project.amt_pledged * 100) / project.amt_requested)
          : 100;
      return project;
    });

    // Apply funding filter if needed
    if (fundDesc) {
      projects.sort((a, b) => b.fundRatio - a.fundRatio);
    }

    setResultSet(projects);
  };

  const handleReset = () => {
    setSearchQuery({
      search: "",
      category: "all",
    });
    setFundFilter(false);
    setResultSet(getProjects());
  };

  return (
    <>
      <Stack direction="vertical" data-bs-theme="dark">
        <motion.h3
          className={`kanit-bold ${
            manage ? manage.headerMarginTop : "mt-4"
          } text-center`}
          style={{ color: "white" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {manage ? manage.header : "Discover & Bring Projects to Life."}
        </motion.h3>
        <Stack direction="horizontal" className="p-3" gap={3}>
          <Form.Select
            className="w-50 search-bar"
            name="category"
            value={searchQuery.category}
            onChange={handleFilters}
          >
            <option value="all">Select Category</option>
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
            className="me-auto search-bar"
            name="search"
            type="text"
            value={searchQuery.search}
            onChange={handleFilters}
            placeholder="Search projects and businesses"
          />

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.0 }}>
            <Button variant="outline-danger" onClick={handleReset}>
              Reset
            </Button>
          </motion.div>
        </Stack>
        <hr style={{ borderColor: "white" }} />
      </Stack>

      <div className="d-flex flex-row-reverse">
        <div className="p-3">
          <Form.Check
            type="switch"
            onChange={(e) => handleFundFilter(e.target.checked)}
            label="Most Funded"
            style={{ color: "white" }}
          />
        </div>
      </div>
    </>
  );
};

export default QueryTool;
