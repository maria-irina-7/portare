import React from "react";
import "../styles/Subscription.css";
import type { JSONType } from "astro/zod";

interface SubscriptionData {
  provider?: string;
  numePlan?: string;
  preturi?: {
    numarNou?: boolean;
    laPortare?: boolean;
    deLaCartela?: boolean;
  };
}

interface SubscriptionProp {
  subscription: SubscriptionData;
}

const Subscription = ({ subscription }: SubscriptionProp) => {
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
