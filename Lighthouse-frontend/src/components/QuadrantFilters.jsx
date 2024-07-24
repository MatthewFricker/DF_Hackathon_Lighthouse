import {
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const QuadrantFilters = ({
  valueType,
  industry,
  handleValueTypeChange,
  handleIndustryChange,
}) => {
  return (
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="valueType">
          <Form.Label>Select Use Type:</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="valueType"
            value={valueType}
            onChange={handleValueTypeChange}
          >
            <ToggleButton
              id="business"
              value="general"
              className={`custom-toggle-button ${
                valueType === "general" ? "selected" : ""
              }`}
            >
              Business
            </ToggleButton>
            <ToggleButton
              id="employee"
              value="personal"
              className={`custom-toggle-button ${
                valueType === "personal" ? "selected" : ""
              }`}
            >
              Employee
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="industry">
          <Form.Label>Select Industry:</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="industry"
            value={industry}
            onChange={handleIndustryChange}
          >
            <ToggleButton
              id="default"
              value="default"
              className={`custom-toggle-button ${
                industry === "default" ? "selected" : ""
              }`}
            >
              Default
            </ToggleButton>
            <ToggleButton
              id="banking"
              value="banking"
              className={`custom-toggle-button ${
                industry === "banking" ? "selected" : ""
              }`}
            >
              Banking
            </ToggleButton>
            <ToggleButton
              id="healthcare"
              value="healthcare"
              className={`custom-toggle-button ${
                industry === "healthcare" ? "selected" : ""
              }`}
            >
              Healthcare
            </ToggleButton>
            <ToggleButton
              id="legal"
              value="legal"
              className={`custom-toggle-button ${
                industry === "legal" ? "selected" : ""
              }`}
            >
              Legal
            </ToggleButton>
            <ToggleButton
              id="telecommunication"
              value="telecommunication"
              className={`custom-toggle-button ${
                industry === "telecommunication" ? "selected" : ""
              }`}
            >
              Telecommunication
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default QuadrantFilters;
