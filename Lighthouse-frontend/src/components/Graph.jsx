import { useEffect } from "react";
import * as d3 from "d3";
import "./Graph.css";

const Graph = ({ data, valueType, industry, modifiers }) => {
  useEffect(() => {
    CreateGraph(data, valueType, industry, modifiers);
  }, [data, valueType, industry, modifiers]);

  return <div id="magic-quadrant"></div>;
};

const CreateGraph = (data, valueType, industry, modifiers) => {
  const width = 600;
  const height = 600;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

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

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "#333")
    .text("Business Readiness");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "#333")
    .text("Perceived Business Value");

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
          `Name: ${
            d.name
          }<br>Business Readiness: ${values.businessReadiness.toFixed(
            2
          )}<br>Perceived Business Value: ${values.perceivedBusinessValue.toFixed(
            2
          )}`
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

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
};

export default Graph;
