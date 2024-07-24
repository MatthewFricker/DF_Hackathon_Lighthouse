import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createModel } from "../services/LLM.service";
import { useUser } from "../services/UserContext";

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
  const { user } = useUser();
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
    dependencies: [],
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
    org_credibility: 0,
    safety: 0,
    performance: 0,
    business_readiness_general: 0,
    business_readiness_personal: 0,
    capabilities: 0,
    known_successes: 0,
    popularity: 0,
    perceived_business_value_general: 0,
    perceived_business_value_personal: 0,
  });

  const navigate = useNavigate();

  const calculateBusinessReadiness = (capabilities, safety, performance) => {
    return (0.4 * capabilities + 0.35 * safety + 0.25 * performance).toFixed(2);
  };

  const calculatePerceivedBusinessValue = (
    org_credibility,
    known_successes,
    popularity
  ) => {
    return (
      0.4 * org_credibility +
      0.4 * known_successes +
      0.2 * popularity
    ).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value !== "" ? parseFloat(value) : 0;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (["capabilities", "safety", "performance"].includes(name)) {
      updatedFormData.business_readiness_general = calculateBusinessReadiness(
        parseFloat(updatedFormData.capabilities),
        parseFloat(updatedFormData.safety),
        parseFloat(updatedFormData.performance)
      );
    }

    if (["org_credibility", "known_successes", "popularity"].includes(name)) {
      updatedFormData.perceived_business_value_general =
        calculatePerceivedBusinessValue(
          parseFloat(updatedFormData.org_credibility),
          parseFloat(updatedFormData.known_successes),
          parseFloat(updatedFormData.popularity)
        );
    }

    setFormData(updatedFormData);
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
    const modalities = formData.modality ? formData.modality.split(", ") : [];

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

  const handleDependenciesChange = (e) => {
    const { value } = e.target;
    const dependencies = value.split(",").map((dep) => dep.trim());
    setFormData({
      ...formData,
      dependencies,
    });
  };

  const handleUseCasesIndustriesChange = (e) => {
    const { name, checked } = e.target;
    const useCasesIndustries = formData.use_cases_industries
      ? formData.use_cases_industries.split(", ")
      : [];

    if (checked) {
      if (!useCasesIndustries.includes(name)) {
        useCasesIndustries.push(name);
      }
    } else {
      const index = useCasesIndustries.indexOf(name);
      if (index > -1) {
        useCasesIndustries.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      use_cases_industries: useCasesIndustries.join(", "),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      createModel(formData);
      navigate("/catalog");
    } catch (error) {
      console.error(error);
    }
  };

  if (user?.role !== "admin") {
    return <Navigate to="/noaccess" replace />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 className="mb-4">New Model</h1>
            <Form onSubmit={handleSubmit}>
              {/* Required Fields */}
              <Card className="mb-4">
                <Card.Header as="h3">Required Fields</Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Type</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Name</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Organization
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Description
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Created Date
                      </Form.Label>
                    </Col>
                    <Col md={8}>
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
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">URL</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Access</Form.Label>
                    </Col>
                    <Col md={8}>
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
                    </Col>
                  </Row>
                  <Form.Group controlId="modality" className="mb-3">
                    <Row className="mb-3">
                      <Col md={4} className="d-flex align-items-center">
                        <Form.Label className="fw-bold mb-0">
                          Modality
                        </Form.Label>
                      </Col>
                      <Col md={8}>
                        <div>
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Image"
                            name="image"
                            checked={
                              formData.modality
                                ? formData.modality
                                    .split(", ")
                                    .includes("image")
                                : false
                            }
                            onChange={handleModalityChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Text;Image"
                            name="textImage"
                            checked={
                              formData.modality
                                ? formData.modality
                                    .split(", ")
                                    .includes("textImage")
                                : false
                            }
                            onChange={handleModalityChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Text"
                            name="text"
                            checked={
                              formData.modality
                                ? formData.modality.split(", ").includes("text")
                                : false
                            }
                            onChange={handleModalityChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Text;Video"
                            name="textVideo"
                            checked={
                              formData.modality
                                ? formData.modality
                                    .split(", ")
                                    .includes("textVideo")
                                : false
                            }
                            onChange={handleModalityChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group controlId="use_cases_industries" className="mb-3">
                    <Row className="mb-3">
                      <Col md={4} className="d-flex align-items-center">
                        <Form.Label className="fw-bold mb-0">
                          Use Cases Industries
                        </Form.Label>
                      </Col>
                      <Col md={8}>
                        <div>
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Finance"
                            name="Finance"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Finance")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Education"
                            name="Education"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Education")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Customer Support"
                            name="Customer Support"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Customer Support")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Marketing"
                            name="Marketing"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Marketing")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Pharmaceuticals"
                            name="Pharmaceuticals"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Pharmaceuticals")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Technology"
                            name="Technology"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Technology")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Healthcare"
                            name="Healthcare"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Healthcare")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Legal"
                            name="Legal"
                            checked={
                              formData.use_cases_industries
                                ? formData.use_cases_industries
                                    .split(", ")
                                    .includes("Legal")
                                : false
                            }
                            onChange={handleUseCasesIndustriesChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Numbered Fields */}
              <Card className="mb-4">
                <Card.Header as="h3">Scoring</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Row className="mb-3">
                        <Col md={6} className="d-flex align-items-center">
                          <Form.Label className="fw-bold mb-0">
                            Performance
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="performance"
                            value={formData.performance}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6} className="d-flex align-items-center">
                          <Form.Label className="fw-bold mb-0">
                            Safety
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="safety"
                            value={formData.safety}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6} className="d-flex align-items-center">
                          <Form.Label className="fw-bold mb-0">
                            Capabilities
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="capabilities"
                            value={formData.capabilities}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row className="mb-3">
                        <Col md={6} className="d-flex align-items-center">
                          <Form.Label className="fw-bold mb-0">
                            Popularity
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="popularity"
                            value={formData.popularity}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6} className="d-flex align-items-center">
                          <Form.Label className="fw-bold mb-0">
                            Known Successes
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="known_successes"
                            value={formData.known_successes}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6} className="d-flex align-items-center">
                          <Form.Label className="fw-bold mb-0">
                            Org Credibility
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="org_credibility"
                            value={formData.org_credibility}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Other Fields */}
              <Card className="mb-4">
                <Card.Header as="h3">Other Fields</Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Lawsuits</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="number"
                        name="lawsuits"
                        value={formData.lawsuits}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Size</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Sample</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="sample"
                        value={formData.sample}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Analysis</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="analysis"
                        value={formData.analysis}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Dependencies
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="dependencies"
                        value={formData.dependencies.join(", ")}
                        onChange={handleDependenciesChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Quality Control
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="quality_control"
                        value={formData.quality_control}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">License</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="license"
                        value={formData.license}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Intended Uses
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="intended_uses"
                        value={formData.intended_uses}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Prohibited Uses
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="prohibited_uses"
                        value={formData.prohibited_uses}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Monitoring
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="monitoring"
                        value={formData.monitoring}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Feedback</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Model Card
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="model_card"
                        value={formData.model_card}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Training Emissions
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="training_emissions"
                        value={formData.training_emissions}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Training Time
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="training_time"
                        value={formData.training_time}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Training Hardware
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="training_hardware"
                        value={formData.training_hardware}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Monthly Active Users
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="monthly_active_users"
                        value={formData.monthly_active_users}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        User Distribution
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="user_distribution"
                        value={formData.user_distribution}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">Failures</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="failures"
                        value={formData.failures}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} className="d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0">
                        Lawsuit Information
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        name="lawsuit_inf"
                        value={formData.lawsuit_inf}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Button type="submit" className="mt-3 custom-button">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddLLM;
