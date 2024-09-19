import "../css/header.css";
import logo from "../images/logo.png";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="My Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <a href="#1">Våre tjenester</a>
        <a href="#2">Hjelp</a>
        <a href="#3">Kontakt</a>
      </nav>
    </header>
  );
};
