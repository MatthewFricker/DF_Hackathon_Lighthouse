import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Container,
  Button,
  Collapse,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getModels } from "../services/LLM.service.js";
// import { FaArrowRight } from "react-icons/fa";
import "./Catalog.css"; 

const Catalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [filters, setFilters] = useState({
    useCases: [],
    modality: [],
    access: [],
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModels();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <img src="icons8-lighthouse.gif" alt="loading" />
        Loading...
      </>
    );
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === "created_date") {
      const dateA = new Date(
        parseInt(a.created_date.split("/")[2]), // year
        parseInt(a.created_date.split("/")[1]) - 1, // month (zero-indexed)
        parseInt(a.created_date.split("/")[0]) // day
      );
      const dateB = new Date(
        parseInt(b.created_date.split("/")[2]), // year
        parseInt(b.created_date.split("/")[1]) - 1, // month (zero-indexed)
        parseInt(b.created_date.split("/")[0]) // day
      );

      if (dateA < dateB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleRowClick = (itemName) => {
    navigate(`/model/${itemName}`);
  };

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((filter) => filter !== value)
        : [...prev[type], value],
    }));
  };

  const filteredData = sortedData.filter((item) => {
    const useCasesFilter =
      !filters.useCases.length ||
      filters.useCases.every((filter) =>
        item.use_cases_industries
          ?.toLowerCase()
          .split(", ")
          .includes(filter.toLowerCase())
      );
    const modalityFilter =
      !filters.modality.length ||
      filters.modality.every((filter) =>
        item.modality?.split(", ").includes(filter)
      );
    const accessFilter =
      !filters.access.length || filters.access.includes(item.access);

    return useCasesFilter && modalityFilter && accessFilter;
  });

  const capitalize = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const allUseCases = Array.from(
    new Set(
      data.flatMap((item) =>
        item.use_cases_industries
          ? item.use_cases_industries
              .split(", ")
              .map((uc) => uc.trim().toLowerCase())
          : []
      )
    )
  )
    .map((useCase) => capitalize(useCase))
    .sort((a, b) => a.localeCompare(b));

  const allModality = Array.from(
    new Set(
      data.flatMap((item) => (item.modality ? item.modality.split(", ") : []))
    )
  ).sort((a, b) => a.localeCompare(b));

  const allAccess = Array.from(new Set(data.map((item) => item.access))).sort(
    (a, b) => a.localeCompare(b)
  );

  return (
    <div className="p-4">
      <Container fluid>
        <Row>
          <Col md={3} className={`border-right ${open ? "bg-filter" : ""}`}>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="mt-3 w-100 custom-button"
            >
              {open ? "Hide Filters" : "Show Filters"}
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text" className="p-3">
                <Card className="mb-3">
                  <Card.Header>Use Cases/Industries</Card.Header>
                  <Card.Body>
                    <Form>
                      {allUseCases.map((useCase, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          value={useCase}
                          label={useCase}
                          onChange={(e) => handleFilterChange(e, "useCases")}
                        />
                      ))}
                    </Form>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Modality</Card.Header>
                  <Card.Body>
                    <Form>
                      {allModality.map((modality, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          value={modality}
                          label={modality}
                          onChange={(e) => handleFilterChange(e, "modality")}
                        />
                      ))}
                    </Form>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Header>Access</Card.Header>
                  <Card.Body>
                    <Form>
                      {allAccess.map((access, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          value={access}
                          label={access}
                          onChange={(e) => handleFilterChange(e, "access")}
                        />
                      ))}
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </Collapse>
          </Col>
          <Col md={open ? 9 : 12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th onClick={() => requestSort("name")} className="clickable">
                    Name {getClassNamesFor("name") === "ascending" ? "▲" : "▼"}
                  </th>
                  <th
                    onClick={() => requestSort("organization")}
                    className="clickable"
                  >
                    Organization{" "}
                    {getClassNamesFor("organization") === "ascending"
                      ? "▲"
                      : "▼"}
                  </th>
                  <th>Description</th>
                  <th
                    onClick={() => requestSort("created_date")}
                    className="clickable"
                  >
                    Created Date{" "}
                    {getClassNamesFor("created_date") === "ascending"
                      ? "▲"
                      : "▼"}
                  </th>
                  <th>Modality</th>
                  <th>Access</th>
                  <th>Use Cases/Industries</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(item.name)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{item.name}</td>
                    <td>{item.organization}</td>
                    <td>{item.description}</td>
                    <td>{item.created_date}</td>
                    <td>{item.modality}</td>
                    <td>{item.access}</td>
                    <td>{item.use_cases_industries}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Catalog;
