import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import "../styles/register.css";

type RegisterForm = {
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<RegisterForm>({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !form.nome.trim() ||
      !form.cognome.trim() ||
      !form.telefono.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setError("Per favore compila tutti i campi, incluso il telefono.");
      return;
    }

    setLoading(true);

    // Endpoint del server
    const API_URL = "http://localhost:3001/register";

    try {
      const res = await axios.post(API_URL, form);

      console.log("✅ Successo:", res.data);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ nome: form.nome, email: form.email }),
      );

      // Reset del form e redirect alla home
      setForm({ nome: "", cognome: "", telefono: "", email: "", password: "" });
      navigate("/home");
    } catch (error: any) {
      console.error("❌ Errore durante la registrazione:", error);

      if (error.code === "ERR_NETWORK") {
        setError(
          "IL SERVER NON RISPONDE: Controlla che il backend di ACBarber sia acceso sulla porta 3001.",
        );
      } else if (error.response) {
        setError(error.response.data.error || "Dati non validi");
      } else {
        setError("Errore imprevisto: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="register-wrapper d-flex align-items-center py-5"
    >
      <Row className="justify-content-center w-100 m-0">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <h2
                className="text-center mb-4 fw-bold text-uppercase"
                style={{ letterSpacing: "1px" }}
              >
                ACbarber
              </h2>
              <p className="text-center text-muted mb-4 small">
                Crea un account per gestire i tuoi appuntamenti
              </p>

              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-dark">
                        Nome
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        placeholder="Es. Mario"
                        className="py-2 shadow-sm"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-dark">
                        Cognome
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="cognome"
                        placeholder="Es. Rossi"
                        className="py-2 shadow-sm"
                        value={form.cognome}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-dark">
                    Telefono
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    placeholder="333 1234567"
                    className="py-2 shadow-sm"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-dark">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="nome@esempio.it"
                    className="py-2 shadow-sm"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-dark">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Scegli una password"
                    className="py-2 shadow-sm"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 py-3 fw-bold shadow mb-3 rounded-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      INVIO IN CORSO...
                    </>
                  ) : (
                    "REGISTRATI ORA"
                  )}
                </Button>

                <div className="text-center mt-3">
                  <span className="text-muted small">Hai già un account? </span>
                  <Link
                    to="/login"
                    className="text-dark fw-bold text-decoration-none small"
                  >
                    Accedi qui
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

export default Register;
