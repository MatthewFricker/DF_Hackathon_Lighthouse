import { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "./FeedbackTable.css";

import { getFeedback, deleteFeedback } from "../services/feedback.service.js";

const FeedbackTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "ascending",
  });
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeedback();
        console.log(response);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFeedback({ id });
      setData((prevData) => prevData.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error("Failed to delete feedback", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleRatingChange = (rating) => {
    setSelectedRatings((prevSelectedRatings) => {
      if (prevSelectedRatings.includes(rating)) {
        return prevSelectedRatings.filter((r) => r !== rating);
      } else {
        return [...prevSelectedRatings, rating];
      }
    });
  };

  const filteredData = data.filter((feedback) => {
    if (selectedRatings.length === 0) {
      return true;
    }
    return selectedRatings.includes(feedback.rating);
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (dateA < dateB) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (dateA > dateB) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = () => {
    let direction = "ascending";
    if (sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: "createdAt", direction });
  };

  const getClassNamesFor = () => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.direction;
  };

  return (
    <div className="p-4">
      <Form>
        {["1", "2", "3", "4", "5"].map((rating) => (
          <Form.Check
            key={rating}
            inline
            label={rating}
            type="checkbox"
            id={`rating-${rating}`}
            onChange={() => handleRatingChange(parseInt(rating))}
          />
        ))}
      </Form>
      <Table striped bordered hover className="feedback-table mt-3">
        <thead>
          <tr>
            <th onClick={requestSort} className="sortable">
              Date Created {getClassNamesFor() === "ascending" ? "▲" : "▼"}
            </th>
            <th>Username</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((feedback) => (
            <tr key={feedback._id}>
              <td>{new Date(feedback.createdAt).toLocaleString()}</td>
              <td>{feedback.username}</td>
              <td>{feedback.email}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.description}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FeedbackTable;
