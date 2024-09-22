import "../css/header.css";
import logo from "../images/logo.png";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="My Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <a href="">Våre tjenester</a>
        <a href="">Hjelp</a>
        <a href="">Kontakt</a>
      </nav>
    </header>
  );
};
