import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { login } from "../services/auth.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isFormFilled = username && password;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      console.log(data.user);
      localStorage.setItem("user", data.user.user.username);
      localStorage.setItem("userId", data.user.user._id);
      localStorage.setItem("accessToken", data.user.accessToken);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: "400px" }} className="mx-auto p-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!isFormFilled}>
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <NavLink to="/register">Don&apos;t have an Account?</NavLink>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
