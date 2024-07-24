import { Modal, Button } from "react-bootstrap";

const ScoreMethodologyModal = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Score Calculation Methodology</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Scores for Business Readiness and Perceived Business Value were
          calculated by combining scores from subcategories which are explained
          below. Individual scores for subcategories can be found by selecting a
          model’s matrix datapoint.
        </p>
        <ul>
          <li>
            <strong>Business Readiness</strong>
            <ul>
              <li>
                <strong>Credibility</strong>: The reputation and trustworthiness
                of the LLM, including the organization behind it
              </li>
              <li>
                <strong>Risk</strong>: The potential for the LLM to produce
                harmful, dishonest or biased outputs
              </li>
              <li>
                <strong>Performance</strong>: The precision and correctness
                (helpfulness) of the LLM’s responses as well as performance on
                industry-standard benchmarks
              </li>
            </ul>
          </li>
          <li>
            <strong>Perceived Business Value</strong>
            <ul>
              <li>
                <strong>Capabilities</strong>: The range of functions and
                features offered by the LLM
              </li>
              <li>
                <strong>Known successes</strong>: Documented cases where the LLM
                has successfully been applied in a business context
              </li>
              <li>
                <strong>Popularity</strong>: The widespread adoption and usage
                of the LLM in industries
              </li>
            </ul>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScoreMethodologyModal;
