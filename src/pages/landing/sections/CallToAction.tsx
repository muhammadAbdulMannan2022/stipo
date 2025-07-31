import type React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

const CallToActionSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F4F4F7] text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-2ndcolor-text leading-tight mb-6">
                    {t("cta.title")}
                </h2>
                <p className="text-lg sm:text-xl text-2ndcolor-text mb-10 max-w-2xl mx-auto">
                    {t("cta.description")}
                </p>
                <Link to="/start" className="bg-primary-text hover:bg-primary-text text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:cursor-pointer transition-transform transform hover:scale-105 ">
                    {t("cta.button")}
                </Link>
            </div>
        </section>
    )
}

export default CallToActionSection
