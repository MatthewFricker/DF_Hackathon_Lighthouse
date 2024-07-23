import { useEffect, useState } from "react";
import * as d3 from "d3";
import "./GartnerMagicQuadrant.css";
import { getModels } from "../services/LLM.service.js";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";

const GartnerMagicQuadrant = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [valueType, setValueType] = useState("general");
  const [industry, setIndustry] = useState("default");

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
      CreateGraph(data, valueType, industry);
    }
  }, [data, valueType, industry]);

  const handleValueTypeChange = (event) => {
    setValueType(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

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
    </Container>
  );
};

const industryModifiers = {
  default: { businessReadiness: 1.0, perceivedBusinessValue: 1.0 },
  banking: { businessReadiness: 0.6, perceivedBusinessValue: 0.7 },
  healthcare: { businessReadiness: 0.7, perceivedBusinessValue: 0.6 },
  legal: { businessReadiness: 0.5, perceivedBusinessValue: 0.5 },
  telecommunication: { businessReadiness: 0.8, perceivedBusinessValue: 0.9 },
};

const CreateGraph = (data, valueType, industry) => {
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

  // Apply industry-specific modifiers
  const modifiers = industryModifiers[industry];

  // Add points
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) =>
      xScale(
        Math.min(
          d[`business_readiness_${valueType}`] * modifiers.businessReadiness,
          10
        )
      )
    )
    .attr("cy", (d) =>
      yScale(
        Math.min(
          d[`perceived_business_value_${valueType}`] *
            modifiers.perceivedBusinessValue,
          10
        )
      )
    )
    .attr("r", 5)
    .attr("fill", "blue")
    .style("cursor", "pointer")
    .on("mouseover", function (event, d) {
      d3.select(this).transition().attr("r", 7).attr("fill", "orange");
      tooltip.transition().style("opacity", 1);
      tooltip
        .html(
          `Name: ${d.name}<br>Business Readiness: ${
            d[`business_readiness_${valueType}`] * modifiers.businessReadiness
          }<br>Perceived Business Value: ${
            d[`perceived_business_value_${valueType}`] *
            modifiers.perceivedBusinessValue
          }`
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
      (d) =>
        xScale(
          Math.min(
            d[`business_readiness_${valueType}`] * modifiers.businessReadiness,
            10
          )
        ) + 5
    )
    .attr(
      "y",
      (d) =>
        yScale(
          Math.min(
            d[`perceived_business_value_${valueType}`] *
              modifiers.perceivedBusinessValue,
            10
          )
        ) - 5
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
