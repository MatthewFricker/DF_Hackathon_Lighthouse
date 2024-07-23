import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const AdminPanel = ({ show, handleClose, modifiers, setModifiers }) => {
  const [localModifiers, setLocalModifiers] = useState(modifiers);

  const handleInputChange = (industry, type, field, event) => {
    const value = parseFloat(event.target.value);
    setLocalModifiers((prevModifiers) => ({
      ...prevModifiers,
      [industry]: {
        ...prevModifiers[industry],
        [type]: {
          ...prevModifiers[industry][type],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    setModifiers(localModifiers);
    localStorage.setItem("industryModifiers", JSON.stringify(localModifiers));
    handleClose();
  };

  const handleReset = () => {
    setLocalModifiers(defaultModifiers);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Admin Panel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {Object.keys(localModifiers).map((industry) => (
            <Card key={industry} className="mb-4">
              <Card.Header>
                <h4>{industry.charAt(0).toUpperCase() + industry.slice(1)}</h4>
              </Card.Header>
              <Card.Body>
                {["businessReadiness", "perceivedBusinessValue"].map((type) => (
                  <div key={type}>
                    <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
                    {Object.keys(localModifiers[industry][type]).map(
                      (field) => (
                        <Row key={field} className="mb-3">
                          <Col md={4}>
                            <Form.Label>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Form.Label>
                          </Col>
                          <Col md={8}>
                            <Form.Control
                              type="number"
                              step="0.1"
                              value={localModifiers[industry][type][field]}
                              onChange={(event) =>
                                handleInputChange(industry, type, field, event)
                              }
                            />
                          </Col>
                        </Row>
                      )
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleReset}>
          Reset to Default
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminPanel;
