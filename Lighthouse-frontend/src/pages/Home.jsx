import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <Container fluid>
      <Row
        className="align-items-center justify-content-center text-center min-vh-100"
        style={{ marginTop: "-10vh" }}
      >
        <Col md={8}>
          <h1>Welcome to Lighthouse</h1>
          <img
            src="icons8-lighthouse.gif"
            alt="lighthouse"
            className="hero-image"
          />
          <p>
            Your go-to platform for comparing the most popular Large Language
            Models (LLMs) used in various business sectors, especially regulated
            industries.
          </p>
          <Link to="/matrix">
            <Button className="custom-button">Explore the Matrix</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
