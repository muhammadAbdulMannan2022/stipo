import { Outlet, useLocation } from "react-router";
import { createContext, useEffect, useState, type ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CircleQuestionMark } from "lucide-react";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { CookieConsentProvider } from "./hooks/useCookieConsent";

type RouteContextType = {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
};

export const RouteContext = createContext<RouteContextType | undefined>(
  undefined,
);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<string>("/start"); // default starting route

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

// 4️⃣ App component
export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;

      if (hash) {
        const element = document.getElementById(hash.slice(1));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // run on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (hash !== "#faq" && hash !== "#about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash == "#faq") {
      const faqElement = document.getElementById("faq");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    } else if (hash == "#about") {
      const faqElement = document.getElementById("about");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  const scrollToFaq = () => {
    const faqElement = document.getElementById("faq");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CookieConsentProvider>
      <AnalyticsTracker />
      <RouteProvider>
        {/* <div className="bg-[url('/Pattern.jpg')] bg-contain"> */}
        <div className="bg-[url('/unnamed.jpg')] bg-cover">
          <div className="bg-white/60">
            <Navbar />
            <Outlet />
            <Footer />

            {/* button fixed to bottom right */}
            <button
              className="fixed hover:cursor-pointer bottom-4 right-4 bg-primary-text text-white p-3 rounded-full shadow-lg hover:bg-primary-text transition-all"
              onClick={scrollToFaq}
              aria-label="Help"
            >
              <CircleQuestionMark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </RouteProvider>

      {/* Cookie consent banner – global, outside router context */}
      <CookieConsentBanner />
    </CookieConsentProvider>
  );
}
