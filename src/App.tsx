import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Prenota from "./components/Prenota";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const isAuthenticated = !!localStorage.getItem("currentUser");

  return (
    <Router>
      <div
        className="app-container"
        style={{ minHeight: "100vh", backgroundColor: "#000" }}
      >
        <Routes>
          {/* Rotte Pubbliche */}
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />

          {/* Rotte Protette */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* 3. Nuova rotta per la Prenotazione (Protetta, così sai chi prenota) */}
          <Route
            path="/prenota"
            element={
              <ProtectedRoute>
                <Prenota />
              </ProtectedRoute>
            }
          />

          {/* Reindirizzamenti di sicurezza */}
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
