import { useState } from "react";
import { Table } from "react-bootstrap";

import data from "../assets/LLMData.json";


const CatalogTable = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
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

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort("name")}>
            Name {getClassNamesFor("name") === "ascending" ? "▲" : "▼"}
          </th>
          <th onClick={() => requestSort("organization")}>
            Organization{" "}
            {getClassNamesFor("organization") === "ascending" ? "▲" : "▼"}
          </th>
          <th onClick={() => requestSort("description")}>
            Description{" "}
            {getClassNamesFor("description") === "ascending" ? "▲" : "▼"}
          </th>
          <th onClick={() => requestSort("created_date")}>
            Created Date{" "}
            {getClassNamesFor("created_date") === "ascending" ? "▲" : "▼"}
          </th>
          <th onClick={() => requestSort("modality")}>
            Modality {getClassNamesFor("modality") === "ascending" ? "▲" : "▼"}
          </th>
          <th onClick={() => requestSort("access")}>
            Access {getClassNamesFor("access") === "ascending" ? "▲" : "▼"}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.organization}</td>
            <td>{item.description}</td>
            <td>{item.created_date}</td>
            <td>{item.modality}</td>
            <td>{item.access}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CatalogTable;
