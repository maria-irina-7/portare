import React from "react";
import "../styles/Subscription.css";

const Subscription = ({ subscription }) => {
  if (!subscription) return null;

  return (
    <ul className="subscription">
      {subscription.provider && (
        <li className="subscription__data">
          <span>Provider:</span> <span>{subscription.provider}</span>
        </li>
      )}

      {subscription.numePlan && (
        <li className="subscription__data">
          <span>Nume Abonament:</span>
          <span>{subscription.numePlan}</span>
        </li>
      )}

      {subscription.preturi?.numarNou && (
        <li className="subscription__data privacy-spaced">
          <span>Pret:</span>
          <span>
            Numar nou - {subscription.preturi.numarNou.standard}{" "}
            {subscription.preturi.moneda}
          </span>
        </li>
      )}
    </ul>
  );
};

export default Subscription;
