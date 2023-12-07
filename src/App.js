import Home from "./components/Home";
import List from "./components/Bookmarks";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Bookmarks">Bookmarks</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Bookmarks" element={<List />} />
          </Routes>
        </main>
        <footer>
          <div className="copyright">
            <p>&copy; 2023 COL@. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}