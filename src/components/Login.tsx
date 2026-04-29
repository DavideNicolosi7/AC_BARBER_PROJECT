import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/register.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", credentials);
      console.log("Risposta server:", res.data);
      alert(`Bentornato, ${res.data.user.nome}!`);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.error || "Errore durante l'accesso";
      alert(errorMsg);
    }
  };

  return (
    <Container
      fluid
      className="register-wrapper d-flex align-items-center py-5"
    >
      <Row className="justify-content-center w-100 m-0">
        <Col xs={12} sm={10} md={7} lg={5} xl={4}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2
                  className="fw-bold text-uppercase"
                  style={{ letterSpacing: "1px" }}
                >
                  ACbarber
                </h2>
                <p className="text-muted small">
                  Bentornato! Accedi per prenotare
                </p>
              </div>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="latua@email.com"
                    className="py-2 shadow-sm"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Inserisci password"
                    className="py-2 shadow-sm"
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 py-3 fw-bold shadow mb-3 rounded-3"
                >
                  ACCEDI
                </Button>

                <div className="text-center mt-3">
                  <span className="text-muted small">Non hai un account? </span>
                  <Link
                    to="/register"
                    className="text-dark fw-bold text-decoration-none small"
                  >
                    Registrati qui
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
