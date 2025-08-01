"use client"

import { useTranslation } from "react-i18next"

export default function TermsAndConditionsPage() {
    const { t } = useTranslation()

    const privacyContent = t("legal.privacyPolicyContent", { returnObjects: true }) as string[]
    const rightsList = t("legal.rightsList", { returnObjects: true }) as string[]
    const disclaimerContent = t("legal.disclaimer.content", { returnObjects: true }) as string[]
    const termsSections = t("legal.termsOfUse.sections", { returnObjects: true }) as { heading: string; text: string }[]

    return (
        <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                    {t("legal.privacyPolicyTitle")}
                </h1>

                {/* Privacy Content */}
                {privacyContent.map((para, idx) => (
                    <p key={idx} className="text-2ndcolor-text mb-4">{para}</p>
                ))}

                {/* GDPR Rights */}
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{t("legal.yourRights")}</h2>
                <ul className="list-disc list-inside text-2ndcolor-text mb-8">
                    {rightsList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>

                {/* Disclaimer */}
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{t("legal.disclaimer.title")}</h2>
                {disclaimerContent.map((line, idx) => (
                    <p key={idx} className="text-2ndcolor-text mb-4">{line}</p>
                ))}

                {/* Terms of Use */}
                <h2 className="text-4xl font-extrabold text-gray-900 mt-12 mb-6">{t("legal.termsOfUse.title")}</h2>
                {termsSections.map((section, idx) => (
                    <div key={idx} className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.heading}</h3>
                        <p className="text-2ndcolor-text">{section.text}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
