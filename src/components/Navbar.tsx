import React from "react";
import "../styles/Subscription.css";

interface NavbarProps {
  items: string[];
}

const Navbar = ({ items }: NavbarProps) => {
  return (
    <div className="nav">
      <h1 className="nav__title">Compară prețurile abonamentelor mobile</h1>
      <ul className="nav__menu">
        {items?.map((item, index) => (
          <li key={index} className="nav__menu_item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
