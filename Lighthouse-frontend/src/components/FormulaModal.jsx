import { Modal, Button, Container, Row, Col, Table } from "react-bootstrap";

const FormulaModal = ({ showModal, handleClose }) => {
  const defaultModifiers = {
    banking: {
      businessReadiness: { capability: 0.7, safety: 1.8, performance: 0.9 },
      perceivedBusinessValue: {
        orgCred: 1.2,
        knownSuccess: 1.0,
        popularity: 0.8,
      },
    },
    healthcare: {
      businessReadiness: { capability: 0.6, safety: 2.2, performance: 0.7 },
      perceivedBusinessValue: {
        orgCred: 1.3,
        knownSuccess: 1.1,
        popularity: 0.6,
      },
    },
    legal: {
      businessReadiness: { capability: 0.5, safety: 2.5, performance: 0.6 },
      perceivedBusinessValue: {
        orgCred: 1.1,
        knownSuccess: 0.9,
        popularity: 0.5,
      },
    },
    telecommunication: {
      businessReadiness: { capability: 1.1, safety: 1.0, performance: 1.2 },
      perceivedBusinessValue: {
        orgCred: 1.0,
        knownSuccess: 1.1,
        popularity: 1.0,
      },
    },
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Calculation Formulas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h5>Business Use</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Business Readiness</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Capabilities/features</td>
                    <td>40%</td>
                  </tr>
                  <tr>
                    <td>Safety</td>
                    <td>35%</td>
                  </tr>
                  <tr>
                    <td>Performance</td>
                    <td>25%</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Perceived Business Value</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Org Credibility</td>
                    <td>40%</td>
                  </tr>
                  <tr>
                    <td>Known Successes</td>
                    <td>40%</td>
                  </tr>
                  <tr>
                    <td>Popularity</td>
                    <td>20%</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <h5>Employee Use</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Business Readiness</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Capabilities/features</td>
                    <td>50%</td>
                  </tr>
                  <tr>
                    <td>Safety</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>Performance</td>
                    <td>40%</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Perceived Business Value</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Org Credibility</td>
                    <td>33.3%</td>
                  </tr>
                  <tr>
                    <td>Known Successes</td>
                    <td>33.3%</td>
                  </tr>
                  <tr>
                    <td>Popularity</td>
                    <td>33.3%</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <h5 className="mt-4">Modifiers by Industry</h5>
          <Row>
            {Object.keys(defaultModifiers).map((industry) => (
              <Col md={6} key={industry} className="mb-3">
                <h6>{industry.charAt(0).toUpperCase() + industry.slice(1)}</h6>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Business Readiness</th>
                      <th>Modifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Capabilities/features</td>
                      <td>
                        {
                          defaultModifiers[industry].businessReadiness
                            .capability
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Safety</td>
                      <td>
                        {defaultModifiers[industry].businessReadiness.safety}
                      </td>
                    </tr>
                    <tr>
                      <td>Performance</td>
                      <td>
                        {
                          defaultModifiers[industry].businessReadiness
                            .performance
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Perceived Business Value</th>
                      <th>Modifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Org Credibility</td>
                      <td>
                        {
                          defaultModifiers[industry].perceivedBusinessValue
                            .orgCred
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Known Successes</td>
                      <td>
                        {
                          defaultModifiers[industry].perceivedBusinessValue
                            .knownSuccess
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Popularity</td>
                      <td>
                        {
                          defaultModifiers[industry].perceivedBusinessValue
                            .popularity
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-button" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormulaModal;
