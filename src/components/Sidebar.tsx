import { type ReactNode } from "react";

import "../styles/components/Sidebar.css";

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return <aside className="sidebar">{children}</aside>;
};

export default Sidebar;
