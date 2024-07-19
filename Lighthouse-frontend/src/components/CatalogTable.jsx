import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getModels } from "../services/LLM.service.js";

// import data from "../assets/LLMData4.json";

const CatalogTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

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
    return <div>Loading...</div>;
  }

  if (!data) {
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
          <th>Description </th>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CatalogTable;