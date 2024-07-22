import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createModel } from "../services/LLM.service";

const formatDate = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const AddLLM = () => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    organization: "",
    description: "",
    created_date: "",
    url: "",
    modality: "",
    size: "",
    sample: "",
    analysis: "",
    dependencies: "",
    quality_control: "",
    access: "",
    license: "",
    intended_uses: "",
    prohibited_uses: "",
    monitoring: "",
    feedback: "",
    model_card: "",
    training_emissions: "",
    training_time: "",
    training_hardware: "",
    monthly_active_users: "",
    user_distribution: "",
    failures: "",
    lawsuits: 0,
    lawsuit_inf: "",
    credibility: 0,
    risk: 0,
    benchmarks: 0,
    business_readiness: 0,
    capabilities: 0,
    success_stories: 0,
    popularity: 0,
    perceived_business_value: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      created_date: formatDate(date),
    });
  };

  const handleAccessChange = (e) => {
    setFormData({
      ...formData,
      access: e.target.value,
    });
  };

  const handleModalityChange = (e) => {
    const { name, checked } = e.target;
    const modalities = (formData.modality || "").split(", ");

    if (checked) {
      if (!modalities.includes(name)) {
        modalities.push(name);
      }
    } else {
      const index = modalities.indexOf(name);
      if (index > -1) {
        modalities.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      modality: modalities.join(", "),
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      createModel(formData)
      navigate("/catalog");
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1>Data Entry Form</h1>
          <Form onSubmit={handleSubmit}>
            {/* Required Fields */}
            <h3>Required Fields</h3>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="organization">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="created_date">
              <Form.Label>Created Date</Form.Label>
              <DatePicker
                selected={
                  formData.created_date
                    ? parseDate(formData.created_date)
                    : null
                }
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Select a date"
                required
              />
            </Form.Group>
            <Form.Group controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="access">
              <Form.Label>Access</Form.Label>
              <Form.Control
                as="select"
                name="access"
                value={formData.access}
                onChange={handleAccessChange}
                required
              >
                <option value="">Select Access</option>
                <option value="limited">Limited</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </Form.Control>
            </Form.Group>

            {/* Modality Checkboxes */}
            <Form.Group controlId="modality">
              <Form.Label>Modality</Form.Label>
              <Form.Check
                type="checkbox"
                label="Image"
                name="image"
                checked={formData.modality.split(", ").includes("image")}
                onChange={handleModalityChange}
              />
              <Form.Check
                type="checkbox"
                label="Text;Image"
                name="textImage"
                checked={formData.modality.split(", ").includes("textImage")}
                onChange={handleModalityChange}
              />
              <Form.Check
                type="checkbox"
                label="Text"
                name="text"
                checked={formData.modality.split(", ").includes("text")}
                onChange={handleModalityChange}
              />
              <Form.Check
                type="checkbox"
                label="Text;Video"
                name="textVideo"
                checked={formData.modality.split(", ").includes("textVideo")}
                onChange={handleModalityChange}
              />
            </Form.Group>

            {/* Numbered Fields */}
            <h3 className="mt-4">Numbered Fields</h3>
            <Form.Group controlId="lawsuits">
              <Form.Label>Lawsuits</Form.Label>
              <Form.Control
                type="number"
                name="lawsuits"
                value={formData.lawsuits}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="credibility">
              <Form.Label>Credibility</Form.Label>
              <Form.Control
                type="number"
                name="credibility"
                value={formData.credibility}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="risk">
              <Form.Label>Risk</Form.Label>
              <Form.Control
                type="number"
                name="risk"
                value={formData.risk}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="benchmarks">
              <Form.Label>Benchmarks</Form.Label>
              <Form.Control
                type="number"
                name="benchmarks"
                value={formData.benchmarks}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="business_readiness">
              <Form.Label>Business Readiness</Form.Label>
              <Form.Control
                type="number"
                name="business_readiness"
                value={formData.business_readiness}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="capabilities">
              <Form.Label>Capabilities</Form.Label>
              <Form.Control
                type="number"
                name="capabilities"
                value={formData.capabilities}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="success_stories">
              <Form.Label>Success Stories</Form.Label>
              <Form.Control
                type="number"
                name="success_stories"
                value={formData.success_stories}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="popularity">
              <Form.Label>Popularity</Form.Label>
              <Form.Control
                type="number"
                name="popularity"
                value={formData.popularity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="perceived_business_value">
              <Form.Label>Perceived Business Value</Form.Label>
              <Form.Control
                type="number"
                name="perceived_business_value"
                value={formData.perceived_business_value}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Other Fields */}
            <h3 className="mt-4">Other Fields</h3>
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="sample">
              <Form.Label>Sample</Form.Label>
              <Form.Control
                type="text"
                name="sample"
                value={formData.sample}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="analysis">
              <Form.Label>Analysis</Form.Label>
              <Form.Control
                type="text"
                name="analysis"
                value={formData.analysis}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dependencies">
              <Form.Label>Dependencies</Form.Label>
              <Form.Control
                type="text"
                name="dependencies"
                value={formData.dependencies}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="quality_control">
              <Form.Label>Quality Control</Form.Label>
              <Form.Control
                type="text"
                name="quality_control"
                value={formData.quality_control}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="license">
              <Form.Label>License</Form.Label>
              <Form.Control
                type="text"
                name="license"
                value={formData.license}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="intended_uses">
              <Form.Label>Intended Uses</Form.Label>
              <Form.Control
                type="text"
                name="intended_uses"
                value={formData.intended_uses}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="prohibited_uses">
              <Form.Label>Prohibited Uses</Form.Label>
              <Form.Control
                type="text"
                name="prohibited_uses"
                value={formData.prohibited_uses}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="monitoring">
              <Form.Label>Monitoring</Form.Label>
              <Form.Control
                type="text"
                name="monitoring"
                value={formData.monitoring}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                type="text"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="model_card">
              <Form.Label>Model Card</Form.Label>
              <Form.Control
                type="text"
                name="model_card"
                value={formData.model_card}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="training_emissions">
              <Form.Label>Training Emissions</Form.Label>
              <Form.Control
                type="text"
                name="training_emissions"
                value={formData.training_emissions}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="training_time">
              <Form.Label>Training Time</Form.Label>
              <Form.Control
                type="text"
                name="training_time"
                value={formData.training_time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="training_hardware">
              <Form.Label>Training Hardware</Form.Label>
              <Form.Control
                type="text"
                name="training_hardware"
                value={formData.training_hardware}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="monthly_active_users">
              <Form.Label>Monthly Active Users</Form.Label>
              <Form.Control
                type="text"
                name="monthly_active_users"
                value={formData.monthly_active_users}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="user_distribution">
              <Form.Label>User Distribution</Form.Label>
              <Form.Control
                type="text"
                name="user_distribution"
                value={formData.user_distribution}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="failures">
              <Form.Label>Failures</Form.Label>
              <Form.Control
                type="text"
                name="failures"
                value={formData.failures}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lawsuit_inf">
              <Form.Label>Lawsuit Information</Form.Label>
              <Form.Control
                type="text"
                name="lawsuit_inf"
                value={formData.lawsuit_inf}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddLLM;