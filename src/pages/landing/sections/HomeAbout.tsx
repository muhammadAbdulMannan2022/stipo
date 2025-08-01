"use client"

import type React from "react"
import { useTranslation } from "react-i18next"

const AboutUsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-text mb-4">
                    {t("aboutUs.title")}
                </h2>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mt-5 md:mt-8">
                    {t("aboutUs.description")}
                </p>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 mt-12">
                <div className="flex flex-col items-center text-center">
                    <img
                        src="/alexander-winqvist.jpg"
                        alt="Alexander Winqvist"
                        width={200}
                        height={200}
                        className="rounded-full object-cover w-48 h-48 mb-4 shadow-md"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">
                        {t("aboutUs.alexanderWinqvist.name")}
                    </h3>
                    <p className="text-gray-600">{t("aboutUs.alexanderWinqvist.role")}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <img
                        src="/alexander-svensson.jpg"
                        alt="Alexander Svensson"
                        width={200}
                        height={200}
                        className="rounded-full object-cover w-48 h-48 mb-4 shadow-md"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">
                        {t("aboutUs.alexanderSvensson.name")}
                    </h3>
                    <p className="text-gray-600">{t("aboutUs.alexanderSvensson.role")}</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection
