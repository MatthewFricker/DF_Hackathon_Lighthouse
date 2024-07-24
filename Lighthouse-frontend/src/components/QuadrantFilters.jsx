import { Row, Col, Form } from "react-bootstrap";

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
          <Form.Control
            as="select"
            value={valueType}
            onChange={handleValueTypeChange}
          >
            <option value="general">Business</option>
            <option value="personal">Employee</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="industry">
          <Form.Label>Select Industry:</Form.Label>
          <Form.Control
            as="select"
            value={industry}
            onChange={handleIndustryChange}
          >
            <option value="default">Default</option>
            <option value="banking">Banking</option>
            <option value="healthcare">Healthcare</option>
            <option value="legal">Legal</option>
            <option value="telecommunication">Telecommunication</option>
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default QuadrantFilters;
