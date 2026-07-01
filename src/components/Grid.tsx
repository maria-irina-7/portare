import type React from "react";
import "../styles/components/Grid.css";

interface SubscriptionsGridProp {
  children: React.ReactNode;
}

const Grid = ({ children }: SubscriptionsGridProp) => {
  return <div className="subscriptions-grid">{children}</div>;
};

export default Grid;
