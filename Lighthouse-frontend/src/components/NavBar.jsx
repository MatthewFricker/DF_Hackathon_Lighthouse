import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-between p-3">
      <Navbar.Brand>
        {/* <img
          src="/icons8-lighthouse-96.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Lighthouse logo"
        /> */}
        Lighthouse
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/catalog">Catalog</Nav.Link>

          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>

      <Form className="inline">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button
              type="submit"
              className={searchQuery ? "btn-primary" : "btn-secondary"}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default NavBar;
