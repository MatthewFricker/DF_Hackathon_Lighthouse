import { useEffect, useState } from "react";
import * as d3 from "d3";
import "./GartnerMagicQuadrant.css";
import { getModels } from "../services/LLM.service.js";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import AdminModal from "./AdminPanel.jsx";

const defaultModifiers = {
  default: {
    businessReadiness: { capability: 1.0, safety: 1.0, performance: 1.0 },
    perceivedBusinessValue: {
      orgCred: 1.0,
      knownSuccess: 1.0,
      popularity: 1.0,
    },
  },
  banking: {
    businessReadiness: { capability: 0.8, safety: 1.2, performance: 1.0 },
    perceivedBusinessValue: {
      orgCred: 1.0,
      knownSuccess: 1.0,
      popularity: 0.8,
    },
  },
  healthcare: {
    businessReadiness: { capability: 0.7, safety: 1.5, performance: 0.8 },
    perceivedBusinessValue: {
      orgCred: 1.2,
      knownSuccess: 1.0,
      popularity: 0.6,
    },
  },
  legal: {
    businessReadiness: { capability: 0.5, safety: 1.5, performance: 0.7 },
    perceivedBusinessValue: {
      orgCred: 1.0,
      knownSuccess: 0.8,
      popularity: 0.5,
    },
  },
  telecommunication: {
    businessReadiness: { capability: 1.0, safety: 0.8, performance: 1.2 },
    perceivedBusinessValue: {
      orgCred: 0.9,
      knownSuccess: 1.1,
      popularity: 0.9,
    },
  },
};

const GartnerMagicQuadrant = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [valueType, setValueType] = useState("general");
  const [industry, setIndustry] = useState("default");
  const [modifiers, setModifiers] = useState(() => {
    const savedModifiers = localStorage.getItem("industryModifiers");
    return savedModifiers ? JSON.parse(savedModifiers) : defaultModifiers;
  });
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (data) {
      CreateGraph(data, valueType, industry, modifiers);
    }
  }, [data, valueType, industry, modifiers]);

  const handleValueTypeChange = (event) => {
    setValueType(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  const isAdmin = localStorage.getItem("role") === "admin";

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="text-center mt-5">No data available</Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Lighthouse Magic Quadrant</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="valueType">
            <Form.Label>Select Use Type:</Form.Label>
            <Form.Control
              as="select"
              value={valueType}
              onChange={handleValueTypeChange}
            >
              <option value="general">Business</option>
              <option value="personal">Employee</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="industry">
            <Form.Label>Select Industry:</Form.Label>
            <Form.Control
              as="select"
              value={industry}
              onChange={handleIndustryChange}
            >
              <option value="default">Default</option>
              <option value="banking">Banking</option>
              <option value="healthcare">Healthcare</option>
              <option value="legal">Legal</option>
              <option value="telecommunication">Telecommunication</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id="magic-quadrant"></div>
        </Col>
      </Row>
      {isAdmin && (
        <>
          <Button variant="primary" onClick={handleShowModal}>
            Open Admin Panel
          </Button>
          <AdminModal
            show={showModal}
            handleClose={handleCloseModal}
            modifiers={modifiers}
            setModifiers={setModifiers}
          />
        </>
      )}
    </Container>
  );
};

const CreateGraph = (data, valueType, industry, modifiers) => {
  const width = 600;
  const height = 600;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  // Clear previous SVG content
  d3.select("#magic-quadrant").selectAll("*").remove();

  const svg = d3
    .select("#magic-quadrant")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);

  // Add background rectangles for quadrants
  svg
    .append("rect")
    .attr("x", width / 2)
    .attr("y", 0)
    .attr("width", width / 2)
    .attr("height", height / 2)
    .attr("fill", "lightblue")
    .attr("opacity", 0.3);

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width / 2)
    .attr("height", height / 2)
    .attr("fill", "lightgreen")
    .attr("opacity", 0.3);

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", height / 2)
    .attr("width", width / 2)
    .attr("height", height / 2)
    .attr("fill", "lightyellow")
    .attr("opacity", 0.3);

  svg
    .append("rect")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("width", width / 2)
    .attr("height", height / 2)
    .attr("fill", "lightcoral")
    .attr("opacity", 0.3);

  // Add X and Y axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  svg.append("g").call(d3.axisLeft(yScale));

  // Add X axis label
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "#333")
    .text("Business Readiness");

  // Add Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "#333")
    .text("Perceived Business Value");

  // Add quadrant labels inside quadrants
  const addLabel = (x, y, text) => {
    const labelGroup = svg
      .append("g")
      .attr("transform", `translate(${xScale(x)},${yScale(y)})`);

    const textElement = labelGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("fill", "#333")
      .attr("class", "quadrant-label")
      .text(text);

    // Ensure textElement is created before accessing its bounding box
    if (textElement.node()) {
      const bbox = textElement.node().getBBox();
      labelGroup
        .insert("rect", "text")
        .attr("x", bbox.x - 5)
        .attr("y", bbox.y - 5)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 10)
        .attr("fill", "white")
        .attr("stroke", "#ccc")
        .attr("rx", 3)
        .attr("ry", 3)
        .lower();
    }
  };

  addLabel(7.5, 9.5, "Leaders");
  addLabel(2.5, 9.5, "Respected");
  addLabel(2.5, 0.5, "Niche Players");
  addLabel(7.5, 0.5, "Emerging Opportunities");

  // Function to calculate business readiness and perceived business value
  const calculateValues = (d, valueType) => {
    let businessReadiness, perceivedBusinessValue;

    if (valueType === "general") {
      businessReadiness =
        0.4 *
          d.capabilities *
          modifiers[industry].businessReadiness.capability +
        0.35 * d.safety * modifiers[industry].businessReadiness.safety +
        0.25 *
          d.performance *
          modifiers[industry].businessReadiness.performance;
      perceivedBusinessValue =
        0.4 *
          d.org_credibility *
          modifiers[industry].perceivedBusinessValue.orgCred +
        0.4 *
          d.known_successes *
          modifiers[industry].perceivedBusinessValue.knownSuccess +
        0.2 *
          d.popularity *
          modifiers[industry].perceivedBusinessValue.popularity;
    } else {
      businessReadiness =
        0.5 *
          d.capabilities *
          modifiers[industry].businessReadiness.capability +
        0.1 * d.safety * modifiers[industry].businessReadiness.safety +
        0.4 * d.performance * modifiers[industry].businessReadiness.performance;
      perceivedBusinessValue =
        (1 / 3) *
          d.org_credibility *
          modifiers[industry].perceivedBusinessValue.orgCred +
        (1 / 3) *
          d.known_successes *
          modifiers[industry].perceivedBusinessValue.knownSuccess +
        (1 / 3) *
          d.popularity *
          modifiers[industry].perceivedBusinessValue.popularity;
    }

    return {
      businessReadiness: Math.min(businessReadiness, 10),
      perceivedBusinessValue: Math.min(perceivedBusinessValue, 10),
    };
  };

  // Add points
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(calculateValues(d, valueType).businessReadiness))
    .attr("cy", (d) =>
      yScale(calculateValues(d, valueType).perceivedBusinessValue)
    )
    .attr("r", 5)
    .attr("fill", "blue")
    .style("cursor", "pointer")
    .on("mouseover", function (event, d) {
      d3.select(this).transition().attr("r", 7).attr("fill", "orange");
      tooltip.transition().style("opacity", 1);
      const values = calculateValues(d, valueType);
      tooltip
        .html(
          `Name: ${d.name}<br>Business Readiness: ${values.businessReadiness}<br>Perceived Business Value: ${values.perceivedBusinessValue}`
        )
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      d3.select(this).transition().attr("r", 5).attr("fill", "blue");
      tooltip.transition().style("opacity", 0);
    })
    .on("click", function (event, d) {
      window.location.href = `/model/${d.name}`;
    });

  // Add labels
  svg
    .selectAll("text.label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr(
      "x",
      (d) => xScale(calculateValues(d, valueType).businessReadiness) + 5
    )
    .attr(
      "y",
      (d) => yScale(calculateValues(d, valueType).perceivedBusinessValue) - 5
    )
    .text((d) => d.name);

  // Add tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
};

export default GartnerMagicQuadrant;
