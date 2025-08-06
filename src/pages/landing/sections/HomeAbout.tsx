"use client"

import type React from "react"
import { Trans, useTranslation } from "react-i18next"

// const Br = () => <br />;
const AboutUsSection: React.FC = () => {
    const { t } = useTranslation()

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <h1 className="w-full text-center text-3xl md:text-5xl font-bold">{t("aboutUs.title")}</h1>
            <div className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mt-5 md:mt-8 text-center space-y-6">
                <Trans
                    i18nKey="aboutUs.description"
                    components={[
                        <p key="0" className="mt-6" />,
                        <p key="1" className="mt-6" />,
                        <p key="2" className="mt-6" />
                    ]}
                />
            </div>


            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 mt-12">
                <div className="flex flex-col items-center text-center">
                    <img
                        src="/Winqvist.png"
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
                        src="/Svensson.png"
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
