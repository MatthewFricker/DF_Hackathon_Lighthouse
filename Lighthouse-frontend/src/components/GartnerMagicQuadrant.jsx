import { useEffect } from "react";
import * as d3 from "d3";
import "./GartnerMagicQuadrant.css";

import data from "../assets/LLMData2.json";


const GartnerMagicQuadrant = () => {
  const CreateGraph = () => {
    const width = 600;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

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
    };

    addLabel(7.5, 9.5, "Leaders");
    addLabel(2.5, 9.5, "Visionaries");
    addLabel(2.5, 0.5, "Niche Players");
    addLabel(7.5, 0.5, "Underdogs");

    // Add points
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.business_readiness))
      .attr("cy", (d) => yScale(d.perceived_business_value))
      .attr("r", 5)
      .attr("fill", "blue")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().attr("r", 7).attr("fill", "orange");
        tooltip.transition().style("opacity", 1);
        tooltip
          .html(
            `Name: ${d.name}<br>Business Readiness: ${d.business_readiness}<br>Perceived Business Value: ${d.perceived_business_value}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().attr("r", 5).attr("fill", "blue");
        tooltip.transition().style("opacity", 0);
      })
      .on("click", function (event, d) {
        window.location.href = `/${d.name}`;
      });

    // Add labels
    svg
      .selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.business_readiness) + 5)
      .attr("y", (d) => yScale(d.perceived_business_value) - 5)
      .text((d) => d.name);

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  useEffect(() => {
    CreateGraph();
  }, []);

  return (
    <div className="container">
      <h2>Gartner Magic Quadrant</h2>
      <div id="magic-quadrant"></div>
    </div>
  );
};

export default GartnerMagicQuadrant;
