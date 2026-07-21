import { useState, useEffect } from "react";

export type ConsentStatus = "accepted" | "declined" | null;

const CONSENT_KEY = "stipo_cookie_consent";

export function useCookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "declined") return stored;
    } catch {
      // localStorage not available
    }
    return null;
  });

  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    // Only show banner if no decision has been made yet
    if (consentStatus === null) {
      setShowBanner(true);
    }
  }, [consentStatus]);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // ignore
    }
    setConsentStatus("accepted");
    setShowBanner(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "declined");
    } catch {
      // ignore
    }
    setConsentStatus("declined");
    setShowBanner(false);
  };

  const reset = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // ignore
    }
    setConsentStatus(null);
    setShowBanner(true);
  };

  const hasConsented = consentStatus === "accepted";

  return { consentStatus, showBanner, hasConsented, accept, decline, reset };
}
