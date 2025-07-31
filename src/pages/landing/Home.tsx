import CallToActionSection from "./sections/CallToAction";
import ScholarshipFeaturesSection from "./sections/CcholarshipFeaturesSection";
import FAQSection from "./sections/FAQ";
import HeroPage from "./sections/Hero";
import HowItWorksSection from "./sections/HowItWorks";
import TestimonialsSection from "./sections/Testimonials";


export default function Home() {
    return (
        <>
            <HeroPage />
            <HowItWorksSection />
            <ScholarshipFeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <CallToActionSection />
        </>
    )
}
