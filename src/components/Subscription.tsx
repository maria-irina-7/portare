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

  internetNational?: {
    volum?: string | number;
    este5G?: boolean;
    politicaUtilizareRezonabila?: string;
    vitezeMaxime?: {
      dupaLimita?: {
        download?: 1;
        upload?: 0.5;
        unitate?: "Mbps";
      };
    };
  };
}

interface SubscriptionProp {
  subscription: SubscriptionData;
}
const Subscription = ({ subscription }: SubscriptionProp) => {
  if (!subscription) return null;

  return (
    <ul className="subscription">
      <img
        className="subscription__logo"
        src={`./public/portare/assets/companies/${subscription.provider}.png`}
        alt={`${subscription.provider} logo`}
      ></img>

      <hr className="subscription__hr"></hr>

      {subscription.numePlan && (
        <li className="subscription__data">
          <span>Nume Abonament:</span>
          <span>{subscription.numePlan}</span>
        </li>
      )}

      {subscription.internetNational && (
        <li className="subscription__data">
          <span>Intenet:</span>
          <span>{subscription.internetNational.volum}</span>
        </li>
      )}

      <br></br>

      {subscription.preturi && (
        <li className="subscription__data">
          {/* <span className="subscription__data__type">
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
          </span> */}
        </li>
      )}
    </ul>
  );
};

export default Subscription;
