import { useState } from "react";
import MagicQuadrant from "../components/MagicQuadrant";
import ScoreMethodologyModal from "../components/ScoreMethodologyModal";
import { Button } from "react-bootstrap";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MagicQuadrant />
      <Button className="custom-button" onClick={handleShow}>
        View Score Calculation Methodology
      </Button>
      <ScoreMethodologyModal showModal={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Home;
