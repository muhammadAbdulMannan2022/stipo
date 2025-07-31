"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import FAQItem from "../../../components/FaqItems"

const FAQSection: React.FC = () => {
    const { t } = useTranslation()
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const faqs = t("faq.items", { returnObjects: true }) as {
        question: string
        answer: string
        nestedContent?: string
    }[]

    const handleItemClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Content Section */}
                <div className="text-center lg:text-left lg:pr-12">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-2ndcolor-text mb-6">
                        {t("faq.title")}
                    </h2>
                    <p className="text-lg text-2ndcolor-text mb-4">
                        {t("faq.subtitle")}
                    </p>
                    <Link to={`mailto:${t("faq.email")}`} className="text-lg text-primary-text hover:underline">
                        {t("faq.email")}
                    </Link>
                </div>

                {/* Right FAQ Items Section */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            nestedContent={faq.nestedContent}
                            isOpen={activeIndex === index}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQSection
