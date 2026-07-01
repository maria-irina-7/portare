import { type ReactNode } from "react";

import "../styles/components/Banner.css";

interface BannerProps {
  children?: ReactNode;
  className?: string;
}

const Sidebar = ({ children, className: _className }: BannerProps) => {
  return <div className={`banner ${_className}`}>{children}</div>;
};

export default Sidebar;
