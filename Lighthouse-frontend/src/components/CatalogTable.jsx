import { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import data from "../assets/LLMData2.json";
import "./CatalogTable.css";

const CatalogTable = () => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === "created_date") {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === "ascending"
        ? dateA - dateB
        : dateB - dateA;
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

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th
            onClick={() => requestSort("name")}
            className="red-cell left-header"
          >
            Name {getClassNamesFor("name") === "ascending" ? "▲" : "▼"}
          </th>
          <th onClick={() => requestSort("organization")}>
            Organization{" "}
            {getClassNamesFor("organization") === "ascending" ? "▲" : "▼"}
          </th>
          <th>Description</th>
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
        {sortedData.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={() => handleRowClick(item.name)}
            className={
              rowIndex === 0
                ? "yellow-row"
                : rowIndex % 2 === 1
                ? "red-row"
                : "white-row"
            }
            style={{ cursor: "pointer" }}
          >
            <td className="left-column">{item.name}</td>
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
