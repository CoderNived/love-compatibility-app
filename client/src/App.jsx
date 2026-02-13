import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              ❤️ Love Analyzer
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <footer className="footer">
          <p>Made with ❤️ | Love Compatibility Analyzer © 2025</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
