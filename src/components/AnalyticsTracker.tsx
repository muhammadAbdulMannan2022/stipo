import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview when location changes
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};
