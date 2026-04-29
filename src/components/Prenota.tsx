import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "react-calendar/dist/Calendar.css";
import "../styles/prenota.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Servizio {
  id: number;
  nome: string;
  prezzo: string;
  tempo: string;
}
interface Barbiere {
  id: number;
  nome: string;
  specialita: string;
}

function Prenota() {
  const navigate = useNavigate();
  const [dataSelezionata, setDataSelezionata] = useState<Value>(new Date());
  const [orariOccupati, setOrariOccupati] = useState<string[]>([]);
  const [servizioScelto, setServizioScelto] = useState<number | null>(null);
  const [barbiereScelto, setBarbiereScelto] = useState<number | null>(null);
  const [oraScelta, setOraScelta] = useState<string | null>(null);

  const slotTotali = ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"];
  const servizi: Servizio[] = [
    { id: 1, nome: "Taglio Classico", prezzo: "20€", tempo: "30 min" },
    { id: 2, nome: "Regolazione Barba", prezzo: "15€", tempo: "20 min" },
    { id: 3, nome: "Combo VIP", prezzo: "30€", tempo: "50 min" },
  ];
  const barbieri: Barbiere[] = [
    { id: 1, nome: "Alessandro", specialita: "Sfumature" },
    { id: 2, nome: "Claudio", specialita: "Barba & Relax" },
  ];

  useEffect(() => {
    const caricaOrariOccupati = async () => {
      if (!(dataSelezionata instanceof Date) || !barbiereScelto) return;
      const dataString = dataSelezionata.toLocaleDateString();
      const q = query(
        collection(db, "prenotazioni"),
        where("data", "==", dataString),
        where("barbiereId", "==", barbiereScelto),
      );
      const querySnapshot = await getDocs(q);
      const occupati: string[] = [];
      querySnapshot.forEach((doc) => occupati.push(doc.data().ora));
      setOrariOccupati(occupati);
    };
    caricaOrariOccupati();
  }, [dataSelezionata, barbiereScelto]);

  const handleConferma = async () => {
    if (
      !servizioScelto ||
      !barbiereScelto ||
      !oraScelta ||
      !(dataSelezionata instanceof Date)
    )
      return;

    try {
      const dataString = dataSelezionata.toLocaleDateString();
      const nomeServizio = servizi.find((s) => s.id === servizioScelto)?.nome;

      await addDoc(collection(db, "prenotazioni"), {
        data: dataString,
        ora: oraScelta,
        barbiereId: barbiereScelto,
        servizioId: servizioScelto,
        cliente: localStorage.getItem("currentUser") || "Anonimo",
        dataCreazione: new Date(),
      });

      const infoApp = {
        data: dataString,
        ora: oraScelta,
        servizio: nomeServizio,
      };
      localStorage.setItem("ultimoAppuntamento", JSON.stringify(infoApp));

      navigate("/home");
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore.");
    }
  };

  return (
    <div className="prenota-wrapper bg-black text-white min-vh-100 py-5">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-uppercase">
          Prenota il tuo Posto
        </h2>
        <Row className="g-4">
          <Col lg={4}>
            <h4 className="mb-4 border-bottom pb-2">1. Servizio</h4>
            {servizi.map((s) => (
              <Card
                key={s.id}
                onClick={() => setServizioScelto(s.id)}
                className={`bg-dark text-white border-secondary mb-3 selection-card ${servizioScelto === s.id ? "active-border" : ""}`}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="m-0 fw-bold">{s.nome}</h6>
                    <small className="text-white-50">{s.tempo}</small>
                  </div>
                  <span className="fw-bold">{s.prezzo}</span>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col lg={4}>
            <h4 className="mb-4 border-bottom pb-2">2. Barbiere</h4>
            {barbieri.map((b) => (
              <Card
                key={b.id}
                onClick={() => setBarbiereScelto(b.id)}
                className={`bg-dark text-white border-secondary mb-3 selection-card ${barbiereScelto === b.id ? "active-border" : ""}`}
              >
                <Card.Body>
                  <h6 className="m-0 fw-bold">{b.nome}</h6>
                  <small className="text-white-50">{b.specialita}</small>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col lg={4}>
            <h4 className="mb-4 border-bottom pb-2">3. Quando</h4>
            <Card className="bg-dark text-white border-secondary p-3 shadow">
              <Calendar
                onChange={(val) => setDataSelezionata(val as Date)}
                value={dataSelezionata}
                minDate={new Date()}
                className="custom-ac-calendar"
              />
              <div className="grid-columns-3 mt-4">
                {slotTotali.map((ora) => {
                  const occupato = orariOccupati.includes(ora);
                  return (
                    <Button
                      key={ora}
                      disabled={occupato || !barbiereScelto}
                      variant={oraScelta === ora ? "light" : "outline-light"}
                      onClick={() => setOraScelta(ora)}
                    >
                      {ora}
                    </Button>
                  );
                })}
              </div>
            </Card>
            <Button
              variant="light"
              className="w-100 mt-4 py-3 fw-bold"
              disabled={!servizioScelto || !barbiereScelto || !oraScelta}
              onClick={handleConferma}
            >
              CONFERMA PRENOTAZIONE
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Prenota;
