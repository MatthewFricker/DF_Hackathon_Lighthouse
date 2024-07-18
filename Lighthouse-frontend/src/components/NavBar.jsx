import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

import data from "../assets/LLMData2.json";

function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();

      const uniqueMatches = new Map();
      data.forEach((item) => {
        let matchSource = null;
        if (item.name.toLowerCase().includes(lowerCaseQuery)) {
          matchSource = "name";
        } else if (item.organization.toLowerCase().includes(lowerCaseQuery)) {
          matchSource = "organization";
        }

        if (matchSource && !uniqueMatches.has(item.id)) {
          uniqueMatches.set(item.id, { ...item, matchSource });
        }
      });

      setFilteredData(Array.from(uniqueMatches.values()));
    } else {
      setFilteredData([]);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleSelect = (model) => {
    navigate(`/model/${model.name}`);
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-between p-3">
      <Navbar.Brand >
        Lighthouse
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/catalog">Catalog</Nav.Link>

          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout} href="/">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>

      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col>
            <div className="d-flex justify-content-end">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="me-2"
              />
              {filteredData.length > 0 && (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Search Results
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filteredData.map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => handleSelect(item)}
                      >
                        {item.matchSource === "organization"
                          ? item.organization
                          : item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default NavBar;
