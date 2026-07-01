import React from "react";
import "../styles/components/Navbar.css";
import MobileIcon from "../assets/MobileIcon";

interface NavbarProps {
  items: React.ReactNode[];
}

const Navbar = ({ items }: NavbarProps) => {
  return (
    <div className="nav">
      <span className="nav__title">Compară prețurile abonamentelor de:</span>
      <ul className="nav__menu">
        {items?.map((item, index) => (
          <li key={index} className="nav__menu_item active">
            <MobileIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
