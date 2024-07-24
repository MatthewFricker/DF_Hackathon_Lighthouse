import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MagicQuadrant from "../components/MagicQuadrant";
import FormulaModal from "../components/FormulaModal";
import MethodologyModal from "../components/MethodologyModal";
import QuadrantFilters from "../components/QuadrantFilters";

const Matrix = () => {
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const handleMethodologyClose = () => setShowMethodologyModal(false);
  const handleMethodologyShow = () => setShowMethodologyModal(true);

  const handleFormulaClose = () => setShowFormulaModal(false);
  const handleFormulaShow = () => setShowFormulaModal(true);

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
              <div className="mt-5 pt-5 text-center">
                <p>
                  Click below to see our score calculation methodology or
                  weightings
                </p>
                <Button
                  className="custom-button mt-2"
                  onClick={handleMethodologyShow}
                >
                  Methodology
                </Button>
                <br />
                <Button
                  className="custom-button mt-2"
                  onClick={handleFormulaShow}
                >
                  Weighting
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <MethodologyModal
          showModal={showMethodologyModal}
          handleClose={handleMethodologyClose}
        />
        <FormulaModal
          showModal={showFormulaModal}
          handleClose={handleFormulaClose}
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

export default Matrix;
