import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MagicQuadrant from "../components/MagicQuadrant";
import ScoreMethodologyModal from "../components/ScoreMethodologyModal";
import QuadrantFilters from "../components/QuadrantFilters";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [valueType, setValueType] = useState("general");
  const [industry, setIndustry] = useState("default");

  const handleValueTypeChange = (value) => setValueType(value);
  const handleIndustryChange = (value) => setIndustry(value);

  return (
    <>
      <h1 className="text-center mt-3">
        Compare the most popular Large Language Models (LLM)
      </h1>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <MagicQuadrant valueType={valueType} industry={industry} />
          </Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <QuadrantFilters
                valueType={valueType}
                industry={industry}
                handleValueTypeChange={handleValueTypeChange}
                handleIndustryChange={handleIndustryChange}
              />
              <div className="mt-4">
                <p className="text-center">
                  <br />
                  <br />
                  Click below to see our score calculation methodology
                </p>
                <Button className="custom-button mt-2" onClick={handleShow}>
                  Methodology
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <ScoreMethodologyModal
          showModal={showModal}
          handleClose={handleClose}
        />
      </Container>
      <div className="text-center mt-4">
        <Link to="/catalog">
          <Button className="custom-button mt-2">
            Discover the LLM catalog
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
