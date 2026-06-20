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
      <br></br>

      {subscription.preturi && (
        <li className="subscription__data">
          <span className="subscription__data__type">
            {subscription.preturi.numarNou && (
              <span className="subscription__data__type__mod selected">
                Numar Nou
              </span>
            )}
            {subscription.preturi.laPortare && (
              <span className="subscription__data__type__mod">Portare</span>
            )}
            {subscription.preturi.deLaCartela && (
              <span className="subscription__data__type__mod">
                Migrare de la cartela
              </span>
            )}
          </span>
        </li>
      )}
    </ul>
  );
};

export default Subscription;
