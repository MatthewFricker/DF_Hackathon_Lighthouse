import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { createFeedback } from "../services/feedback.service.js";

const LeaveFeedback = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const feedback = {
      rating,
      description,
      userId,
    };
    console.log(feedback)
    try {
      await createFeedback(feedback);
      alert("Feedback submitted successfully!");
      setRating(0);
      setDescription("");
      navigate("/");
    } catch (error) {
      console.error( error);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={star <= rating ? "text-warning" : "text-muted"}
        style={{ cursor: "pointer", fontSize: "1.5em" }}
        onClick={() => setRating(star)}
      >
        ★
      </span>
    ));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRating">
        <Form.Label>Rating</Form.Label>
        <div>{renderStars()}</div>
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Feedback
      </Button>
    </Form>
  );
};

export default LeaveFeedback;
