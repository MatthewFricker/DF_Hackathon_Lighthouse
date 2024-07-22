import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

import { getModels } from "../services/LLM.service.js";

// import data from "../assets/LLMData4.json";

const Detail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModels();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const llm = data.find((item) => item.name === name);

  if (!llm) {
    return <div>Model not found</div>;
  }

  const renderField = (label, value) => {
    return value && value !== "unknown" ? (
      <Card.Text style={{ textAlign: "left" }}>
        <strong>{label}: </strong>
        {value}
      </Card.Text>
    ) : null;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col>
            <Card>
              <Card.Header>{llm.name}</Card.Header>
              <Card.Body>
                <Card.Title>{llm.organization}</Card.Title>
                <div className="d-flex justify-content-center">
                  <Table size="sm" bordered striped="columns">
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}>
                          Business Readiness:{" "}
                          {llm.business_readiness.toFixed(2)}
                        </th>
                        <th style={{ width: "50%" }}>
                          Perceived Business Value:{" "}
                          {llm.perceived_business_value.toFixed(2)}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: "50%" }}>
                          Performance: {llm.performance}
                        </td>
                        <td style={{ width: "50%" }}>
                          Popularity: {llm.popularity}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>Safety: {llm.safety}</td>
                        <td style={{ width: "50%" }}>
                          Known Successes: {llm.known_successes}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50%" }}>
                          Org Credibility: {llm.org_credibility}
                        </td>
                        <td style={{ width: "50%" }}>
                          Capabilities: {llm.capabilities}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                {renderField("Description", llm.description)}
                {renderField("Created Date", llm.created_date)}
                {renderField(
                  "URL",
                  llm.url && (
                    <a href={llm.url} target="_blank" rel="noopener noreferrer">
                      {llm.url}
                    </a>
                  )
                )}
                {renderField("Datasheet", llm.datasheet)}
                {renderField("Modality", llm.modality)}
                {renderField("Size", llm.size)}
                {renderField("Sample", llm.sample)}
                {renderField("Analysis", llm.analysis)}
                {renderField("Included", llm.included)}
                {renderField("Excluded", llm.excluded)}
                {renderField("Quality Control", llm.quality_control)}
                {renderField("Access", llm.access)}
                {renderField("License", llm.license)}
                {renderField("Intended Uses", llm.intended_uses)}
                {renderField("Prohibited Uses", llm.prohibited_uses)}
                {renderField("Monitoring", llm.monitoring)}
                {renderField("Feedback", llm.feedback)}
                {renderField("Model Card", llm.model_card)}
                {renderField("Training Emissions", llm.training_emissions)}
                {renderField("Training Time", llm.training_time)}
                {renderField("Training Hardware", llm.training_hardware)}
                {renderField("Monthly Active Users", llm.monthly_active_users)}
                {renderField("User Distribution", llm.user_distribution)}
                {renderField("Failures", llm.failures)}
                {renderField("Lawsuits", llm.lawsuits)}
                {renderField("Lawsuit Information", llm.lawsuit_inf)}

                <Link to="/catalog">
                  <Button variant="primary" className="mt-3">
                    Back to Catalog
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detail;
