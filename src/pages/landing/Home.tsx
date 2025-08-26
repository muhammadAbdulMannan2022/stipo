import { useLocation } from "react-router";
import CallToActionSection from "./sections/CallToAction";
import FAQSection from "./sections/FAQ";
import HeroPage from "./sections/Hero";
import HowItWorksSection from "./sections/HowItWorks";
import TestimonialsSection from "./sections/Testimonials";
import { useEffect } from "react";
import AboutUsSection from "./sections/HomeAbout";
import PricingPage from "./sections/Priceing";


export default function Home() {
    const location = useLocation()

    useEffect(() => {
        if (location.hash === "#faq") {
            const el = document.getElementById("faq")
            if (el) {
                el.scrollIntoView({ behavior: "smooth" })
            }
        }
        if (location.hash === "#about") {
            const el = document.getElementById("about")
            if (el) {
                el.scrollIntoView({ behavior: "smooth" })
            }
        }

    }, [location])
    return (
        <>
            <HeroPage />
            <HowItWorksSection />
            <PricingPage />
            <AboutUsSection />
            <TestimonialsSection />
            <FAQSection />
            <CallToActionSection />
        </>
    )
}
