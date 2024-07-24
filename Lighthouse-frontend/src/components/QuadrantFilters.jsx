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
    <>
      <Form.Group controlId="valueType" className="mb-3">
        <Form.Label>Select Use Type:</Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="valueType"
          value={valueType}
          onChange={handleValueTypeChange}
          className="w-100"
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
      <Form.Group controlId="industry">
        <Form.Label>Select Industry:</Form.Label>
        <ToggleButtonGroup
          type="radio"
          name="industry"
          value={industry}
          onChange={handleIndustryChange}
          className="w-100"
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
    </>
  );
};

export default QuadrantFilters;
