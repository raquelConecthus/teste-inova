import conecthusLogo from "./assets/logo_conectus.png";
import salcompLogo from "./assets/logo_salcomp.png";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Permissions } from "./pages/Permissions";
import { CreateCredential } from "./pages/CreateCredential";

function App() {
  return (
    <Router>
      <div>
        <a href="https://www.conecthus.org.br/" target="_blank">
          <img src={conecthusLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={salcompLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Gerenciamento de NPI</h2>
      <div className="card">
        <div className="links">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
          <Link to="/permissions">
            <button>Permissions</button>
          </Link>
          <Link to="/create-credential">
            <button>Create Credential</button>
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/create-credential" element={<CreateCredential />} />
        </Routes>
      </div>
      <p className="read-the-docs">
        <a
          href="https://github.com/raquelConecthus/teste-inova"
          target="_blank"
        >
          Link do repositorio
        </a>
      </p>
    </Router>
  );
}

export default App;
