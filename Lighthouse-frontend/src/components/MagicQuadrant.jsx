import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { getModels } from "../services/LLM.service.js";
import AdminModal from "./AdminModal";
import { useUser } from "../services/UserContext";
import Graph from "./Graph";

const defaultModifiers = {
  default: {
    businessReadiness: { capability: 1.0, safety: 1.0, performance: 1.0 },
    perceivedBusinessValue: {
      orgCred: 1.0,
      knownSuccess: 1.0,
      popularity: 1.0,
    },
  },
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

const MagicQuadrant = ({ valueType, industry }) => {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modifiers, setModifiers] = useState(() => {
    const savedModifiers = localStorage.getItem("industryModifiers");
    return savedModifiers ? JSON.parse(savedModifiers) : defaultModifiers;
  });
  const [showModal, setShowModal] = useState(false);

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

  const isAdmin = user?.role === "admin";

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="text-center mt-5">No data available</Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Graph
            data={data}
            valueType={valueType}
            industry={industry}
            modifiers={modifiers}
          />
        </Col>
      </Row>
      {isAdmin && (
        <>
          <Button className="custom-button" onClick={handleShowModal}>
            Open Admin Panel
          </Button>
          <AdminModal
            show={showModal}
            handleClose={handleCloseModal}
            modifiers={modifiers}
            setModifiers={setModifiers}
          />
        </>
      )}
    </Container>
  );
};

export default MagicQuadrant;
