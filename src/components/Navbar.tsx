import React from "react";
import "../styles/Navbar.css";

interface NavbarProps {
  items: string[];
}

const Navbar = ({ items }: NavbarProps) => {
  return (
    <div className="nav">
      <span className="nav__title">Compară prețurile abonamentelor de</span>
      <ul className="nav__menu">
        {items?.map((item, index) => (
          <li key={index} className="nav__menu_item active">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
