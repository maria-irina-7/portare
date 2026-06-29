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
      i4G?: {
        download?: number;
        upload?: number;
        unitate?: string;
      };
      i5G?: {
        download?: number;
        upload?: number;
        unitate?: string;
      };
      dupaLimita?: {
        download?: number;
        upload?: number;
        unitate?: string;
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

      <hr className="subscription__hr"></hr>

      {subscription.internetNational && (
        <>
          <li className="subscription__data">
            <span>Intenet:</span>
            <span>
              {subscription.internetNational.volum}
              {subscription.internetNational.politicaUtilizareRezonabila && (
                <>
                  {"* ("}
                  {subscription.internetNational.politicaUtilizareRezonabila}
                  {")"}
                </>
              )}
            </span>
          </li>
          <li className="subscription__data">
            <span>Viteze 5G:</span>
            <span>
              {subscription.internetNational.vitezeMaxime?.i5G?.download}
              {subscription.internetNational.vitezeMaxime?.i5G?.unitate} down
              <br></br>
              {subscription.internetNational.vitezeMaxime?.i5G?.upload}
              {subscription.internetNational.vitezeMaxime?.i5G?.unitate} up
            </span>
          </li>
          <li className="subscription__data">
            <span>Viteze 4G:</span>
            <span>
              {subscription.internetNational.vitezeMaxime?.i4G?.download}
              {subscription.internetNational.vitezeMaxime?.i4G?.unitate} down
              <br></br>
              {subscription.internetNational.vitezeMaxime?.i4G?.upload}
              {subscription.internetNational.vitezeMaxime?.i4G?.unitate} up
            </span>
          </li>
        </>
      )}

      <br></br>
    </ul>
  );
};

export default Subscription;
