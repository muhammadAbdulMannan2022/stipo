import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ConsentStatus = "accepted" | "declined" | null;

const CONSENT_KEY = "stipo_cookie_consent";

interface CookieConsentContextType {
  consentStatus: ConsentStatus;
  showBanner: boolean;
  hasConsented: boolean;
  accept: () => void;
  decline: () => void;
  reset: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "declined") return stored;
    } catch {
      // localStorage not available
    }
    return null;
  });

  const [showBanner, setShowBanner] = useState<boolean>(consentStatus === null);

  useEffect(() => {
    if (consentStatus === null) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
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

  return React.createElement(
    CookieConsentContext.Provider,
    { value: { consentStatus, showBanner, hasConsented, accept, decline, reset } },
    children
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
