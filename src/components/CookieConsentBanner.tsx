import { useEffect, useState } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { useTranslation } from "react-i18next";

export default function CookieConsentBanner() {
  const { showBanner, accept, decline } = useCookieConsent();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Delay mount animation so CSS transition fires
  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [showBanner]);

  const handleAccept = () => {
    setLeaving(true);
    setTimeout(() => {
      accept();
      setLeaving(false);
    }, 350);
  };

  const handleDecline = () => {
    setLeaving(true);
    setTimeout(() => {
      decline();
      setLeaving(false);
    }, 350);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("cookie.bannerAriaLabel") || "Cookie consent"}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        transform: visible && !leaving ? "translateY(0)" : "translateY(110%)",
        opacity: visible && !leaving ? 1 : 0,
        transition:
          "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
        pointerEvents: showBanner ? "auto" : "none",
      }}
    >
      {/* Backdrop blur strip */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(247,247,253,0.98) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(91,71,237,0.15)",
          boxShadow:
            "0 -8px 40px 0 rgba(77,55,233,0.13), 0 -2px 8px 0 rgba(0,0,0,0.06)",
          padding: "20px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Cookie icon */}
        <div
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7C6FF7 0%, #4D37E9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(91,71,237,0.35)",
          }}
        >
          <span style={{ fontSize: 22 }}>🍪</span>
        </div>

        {/* Text block */}
        <div style={{ flex: "1 1 260px", minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "#1a1a2e",
              lineHeight: 1.6,
            }}
          >
            {t("cookie.bannerText") ||
              'We use cookies, including Google Analytics to analyze website traffic and Google reCAPTCHA to protect our contact form from spam. These services collect usage, hardware, and software information. By clicking "Accept", you consent to the use of analytics and security cookies. See our '}
            <a
              href="/privacy"
              style={{
                color: "#5B47ED",
                fontWeight: 600,
                textDecoration: "underline",
                textDecorationColor: "rgba(91,71,237,0.35)",
              }}
            >
              {t("cookie.privacyLink") || "Privacy Policy"}
            </a>
            {t("cookie.bannerTextSuffix") || " for details."}
          </p>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <button
            id="cookie-decline-btn"
            onClick={handleDecline}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "1.5px solid rgba(91,71,237,0.3)",
              background: "transparent",
              color: "#5B47ED",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(91,71,237,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {t("cookie.decline") || "Decline"}
          </button>

          <button
            id="cookie-accept-btn"
            onClick={handleAccept}
            style={{
              padding: "9px 24px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #7C6FF7 0%, #4D37E9 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(77,55,233,0.35)",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("cookie.accept") || "Accept All Cookies"}
          </button>
        </div>
      </div>
    </div>
  );
}
