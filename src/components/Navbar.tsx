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
          <a href="/portare" key={index} className="nav__menu_item active">
            <MobileIcon />
            <span>{item}</span>
          </a>
        ))}
        <a href="/portare/blog" className="nav__menu_item">
          <MobileIcon />
          <span>Blog</span>
        </a>
      </ul>
    </div>
  );
};

export default Navbar;
