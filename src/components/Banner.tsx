import { type ReactNode } from "react";

import "../styles/Banner.css";

interface BannerProps {
  children?: ReactNode;
  className?: string;
}

const Sidebar = ({ children, className: _className }: BannerProps) => {
  return <div className={_className}>{children}</div>;
};

export default Sidebar;
