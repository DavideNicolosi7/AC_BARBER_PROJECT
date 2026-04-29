import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [appuntamento, setAppuntamento] = useState<any>(null);

  useEffect(() => {
    const salvato = localStorage.getItem("ultimoAppuntamento");
    if (salvato) {
      try {
        const parsed = JSON.parse(salvato);
        setAppuntamento(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Array di servizi offerti
  const servizi = [
    { nome: "Taglio Classico", prezzo: "20€", icon: "✂️" },
    { nome: "Regolazione Barba", prezzo: "15€", icon: "🪒" },
    { nome: "Combo VIP", prezzo: "30€", icon: "👑" },
  ];

  // galleria di tagli
  const gallery = [
    "https://res.cloudinary.com/dddnbcscx/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/ar_3:4,c_auto/taglio2_hgpfx4.jpg",
    "https://res.cloudinary.com/dddnbcscx/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/ar_3:4,c_auto/TAGLIO_vauveo.jpg",
    "https://res.cloudinary.com/dddnbcscx/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/v1775984855/TAGLIO3_ltsu2l.jpg",
  ];

  return (
    <div className="home-wrapper">
      {/* BADGE FISSO PER PROMEMORIA */}
      {appuntamento && (
        <div className="appuntamento-badge shadow-lg">
          <div className="d-flex align-items-center gap-3">
            <span className="fs-4 pulsate-icon">📅</span>
            <div>
              <p
                className="m-0 text-white-50 text-uppercase fw-bold"
                style={{ fontSize: "0.65rem" }}
              >
                Prossimo Appuntamento
              </p>
              <h6 className="m-0 fw-bold">
                {appuntamento.data} alle {appuntamento.ora}
              </h6>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <header className="hero-section d-flex align-items-center justify-content-center text-center">
        <Container>
          <h1 className="display-2 fw-bold mb-0">
            AC <span className="text-gold">BARBER</span>
          </h1>
          <p className="lead text-white-50 mb-4">
            L'eccellenza nel cuore della città.
          </p>
          <Link to="/prenota">
            <Button size="lg" className="cta-button rounded-pill px-5 py-3">
              PRENOTA ORA
            </Button>
          </Link>
        </Container>
      </header>

      {/* SEZIONE SERVIZI */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h3 className="fw-bold m-0 border-gold ps-3">I Servizi</h3>
            <Link
              to="/prenota"
              className="text-gold small text-decoration-none"
            >
              Listino →
            </Link>
          </div>
          <div className="services-scroll">
            {servizi.map((s, i) => (
              <Card
                key={i}
                className="service-card text-white rounded-4 border-0"
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div className="fs-1 mb-2">{s.icon}</div>
                  <h6 className="fw-bold m-0">{s.nome}</h6>
                  <span className="text-gold">{s.prezzo}</span>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* GALLERY ORIZZONTALE */}
      <section className="py-5">
        <div className="px-3 mb-4">
          <h3 className="fw-bold m-0 border-gold ps-3">I Nostri Lavori</h3>
        </div>

        <div className="gallery-scroll ps-3">
          {gallery.map((img, i) => (
            <div key={i} className="gallery-item">
              <div className="gallery-img-container shadow-sm">
                <img
                  src={img}
                  alt={`Lavoro ACBarber ${i}`}
                  className="gallery-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-5 text-center text-white-50 border-top border-dark">
        <p className="small m-0">Via Roma 123, Milano | 02 1234567</p>
        <p className="x-small m-0 mt-2 text-uppercase">© 2024 ACBarber</p>
      </footer>
    </div>
  );
}

export default Home;
