import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import data from "../assets/LLMData.json";

const Detail = () => {
  const { name } = useParams();
  const llm = data.find((item) => item.name === name);

  if (!llm) {
    return <div>Model not found</div>;
  }

  const renderField = (label, value) => {
    return value ? (
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
                {renderField("Dependencies", llm.dependencies)}
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
                {renderField("Adaptation", llm.adaptation)}
                {renderField("Output Space", llm.output_space)}
                {renderField("Terms of Service", llm.terms_of_service)}
                {renderField("Monthly Active Users", llm.monthly_active_users)}
                {renderField("User Distribution", llm.user_distribution)}
                {renderField("Failures", llm.failures)}
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
