import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CircleQuestionMark } from "lucide-react";

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash !== "#faq") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {

      const faqElement = document.getElementById("faq");
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
    <div>
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
  );
}