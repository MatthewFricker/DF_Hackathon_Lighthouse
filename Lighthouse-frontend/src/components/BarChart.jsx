import * as d3 from "d3";
import { useEffect } from "react";

const BarChart = ({ data }) => {
  useEffect(() => {
    if (data) {
      const chartData = [
        {
          group: "Business Readiness",
          label: "Performance",
          value: data.performance,
        },
        { group: "Business Readiness", label: "Safety", value: data.safety },
        {
          group: "Business Readiness",
          label: "Capabilities",
          value: data.capabilities,
        },
        {
          group: "Perceived Business Value",
          label: "Popularity",
          value: data.popularity,
        },

        {
          group: "Perceived Business Value",
          label: "Known Successes",
          value: data.known_successes,
        },
        {
          group: "Perceived Business Value",
          label: "Org Credibility",
          value: data.org_credibility,
        },
      ];

      const margin = { top: 20, right: 30, bottom: 100, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      d3.select("#bar-chart").selectAll("*").remove();

      const svg = d3
        .select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x0 = d3
        .scaleBand()
        .domain(["Business Readiness", "Perceived Business Value"])
        .range([0, width])
        .padding(0.1);

      const x1 = d3
        .scaleBand()
        .domain(chartData.map((d) => d.label))
        .range([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([0, 10]) // Fixing the y-axis to always range from 0 to 10
        .nice()
        .range([height, 0]);

      const color = d3
        .scaleOrdinal()
        .domain(chartData.map((d) => d.label))
        .range([
          "#949EB0", // Complementary colors for Business Readiness
          "#79869E",
          "#5E6E8C",
          "#CD6675", // Complementary colors for Perceived Business Value
          "#B65361",
          "#A23F4D",
        ]);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x0).tickSize(0));

      const yAxis = (g) =>
        g.call(d3.axisLeft(y)).call((g) => g.select(".domain").remove());

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);

      const group = svg
        .selectAll(".group")
        .data(d3.group(chartData, (d) => d.group))
        .join("g")
        .attr("class", "group")
        .attr("transform", (d) => `translate(${x0(d[0])},0)`);

      group
        .selectAll("rect")
        .data((d) => d[1])
        .join("rect")
        .attr("x", (d) => x1(d.label))
        .attr("y", (d) => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", (d) => y(0) - y(d.value))
        .attr("fill", (d) => color(d.label));

      // Adding labels to the bars
      group
        .selectAll("text")
        .data((d) => d[1])
        .join("text")
        .attr("x", (d) => x1(d.label) + x1.bandwidth() / 2)
        .attr("y", (d) => y(d.value) + (y(0) - y(d.value)) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) =>
            `rotate(-90, ${x1(d.label) + x1.bandwidth() / 2}, ${
              y(d.value) + (y(0) - y(d.value)) / 2
            })`
        )
        .style("fill", "black")
        .text((d) => d.label);

      // Center the x-axis labels on the center bar of each group
      svg
        .selectAll(".x-axis-label")
        .data(["Business Readiness", "Perceived Business Value"])
        .join("text")
        .attr("class", "x-axis-label")
        .attr("x", (d) => x0(d) + x0.bandwidth() / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text((d) => d);
    }
  }, [data]);

  return <div id="bar-chart"></div>;
};

export default BarChart;
