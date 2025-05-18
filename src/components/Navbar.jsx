import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png"; 

function Navbar() {
  return (
    //brukte header for semantisk struktur.
    <header className="navbar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Billettlyst logo" className="logo-img" />
      </Link>
      <nav>
        <ul className="nav-links">
          <li><Link to="/category/musikk">Musikk</Link></li>
          <li><Link to="/category/sport">Sport</Link></li>
          <li><Link to="/category/teater">Teater</Link></li>
          <li><Link to="/dashboard">Logg inn</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
