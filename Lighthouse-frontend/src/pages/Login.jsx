import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Card, Form, Button, Toast } from "react-bootstrap";
import { useUser } from "../services/UserContext";
import { login } from "../services/auth.service.js";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const isFormFilled = username && password;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      const decodedToken = jwtDecode(data.user.accessToken);
      localStorage.setItem("accessToken", data.user.accessToken);
      setUser(decodedToken);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 2000);
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
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Card style={{ width: "400px" }} className="mx-auto p-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="custom-button"
                type="submit"
                disabled={!isFormFilled}
              >
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <NavLink to="/register">Don&apos;t have an Account?</NavLink>
            </div>
          </Card.Body>
        </Card>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            bottom: "5rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Login Notification</strong>
          </Toast.Header>
          <Toast.Body>Login successful!</Toast.Body>
        </Toast>
      </Container>
    </div>
  );
};

export default Login;
