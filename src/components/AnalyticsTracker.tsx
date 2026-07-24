import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";
import { useCookieConsent } from "../hooks/useCookieConsent";

export const AnalyticsTracker = () => {
  const location = useLocation();
  const { hasConsented } = useCookieConsent();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!hasConsented) return;

    if (!isInitializedRef.current) {
      const measurementId = import.meta.env.VITE_Measurement_ID;
      ReactGA.initialize(measurementId);
      isInitializedRef.current = true;
    }

    // Send pageview when location changes and consent is granted
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location, hasConsented]);

  return null;
};
