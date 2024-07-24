import { Modal, Button } from "react-bootstrap";

const MethodologyModal = ({ showModal, handleClose }) => {
  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Score Calculation Methodology</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Scores for Business Readiness and Perceived Business Value were
          calculated by combining scores from the subcategories shown below.
          Individual scores for subcategories can be found by selecting
          datapoints on the matrix.
        </p>
        <ul>
          <li>
            <strong>Business Readiness</strong>
            <ul>
              <li>
                <strong>Capabilities/features</strong>
                <ul>
                  <li>
                    The range of functions and features offered by the LLM
                  </li>
                </ul>
              </li>
              <li>
                <strong>Safety</strong>
                <ul>
                  <li>
                    The potential for the LLM to produce harmful, dishonest or
                    biased outputs
                  </li>
                </ul>
              </li>
              <li>
                <strong>Performance</strong>
                <ul>
                  <li>
                    The precision and correctness (helpfulness) of the LLM's
                    responses as well as performance on industry-standard
                    benchmarks
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Perceived Business Value</strong>
            <ul>
              <li>
                <strong>Organisation Credibility</strong>
                <ul>
                  <li>
                    The reputation and trustworthiness of the LLM, including the
                    organization behind it
                  </li>
                </ul>
              </li>
              <li>
                <strong>Known Successes</strong>
                <ul>
                  <li>
                    Documented cases where the LLM has successfully been applied
                    in a business context
                  </li>
                </ul>
              </li>
              <li>
                <strong>Popularity</strong>
                <ul>
                  <li>
                    The widespread adoption and usage of the LLM in industries
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-button" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MethodologyModal;
