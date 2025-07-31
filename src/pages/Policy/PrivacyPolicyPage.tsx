"use client"

import { Trans, useTranslation } from "react-i18next"

export default function PrivacyPolicyPage() {
    const { t } = useTranslation()

    return (
        <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                    <Trans
                        i18nKey="privacy.title"
                        components={[<span key="highlight" className="text-primary-text" />]}
                    />
                </h1>

                <p
                    className="text-2ndcolor-text mb-6"
                    dangerouslySetInnerHTML={{
                        __html: t("privacy.effectiveDate", { date: "31 july 2025" }),
                    }}
                />
                <p className="text-2ndcolor-text mb-8">{t("privacy.intro")}</p>

                {/* Section 1 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.sections.1.title")}</h2>
                    <p className="text-2ndcolor-text mb-2">{t("privacy.sections.1.intro")}</p>
                    <ul className="list-disc list-inside text-2ndcolor-text space-y-2 pl-4">
                        {Array.isArray(t("privacy.sections.1.items", { returnObjects: true })) &&
                            t("privacy.sections.1.items", { returnObjects: true }).map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                    </ul>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.sections.2.title")}</h2>
                    <p className="text-2ndcolor-text mb-2">{t("privacy.sections.2.intro")}</p>
                    <ul className="list-disc list-inside text-2ndcolor-text space-y-2 pl-4">
                        {Array.isArray(t("privacy.sections.2.items", { returnObjects: true })) &&
                            t("privacy.sections.2.items", { returnObjects: true }).map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                    </ul>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.sections.3.title")}</h2>
                    <p className="text-2ndcolor-text mb-2">{t("privacy.sections.3.intro")}</p>
                    <ul className="list-disc list-inside text-2ndcolor-text space-y-2 pl-4">
                        {Array.isArray(t("privacy.sections.3.items", { returnObjects: true })) &&
                            t("privacy.sections.3.items", { returnObjects: true }).map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                    </ul>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.sections.4.title")}</h2>
                    <p className="text-2ndcolor-text mb-2">{t("privacy.sections.4.intro")}</p>
                    <ul className="list-disc list-inside text-2ndcolor-text space-y-2 pl-4">
                        {Array.isArray(t("privacy.sections.4.items", { returnObjects: true })) &&
                            t("privacy.sections.4.items", { returnObjects: true }).map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                    </ul>
                    <p className="text-2ndcolor-text mt-4">{t("privacy.sections.4.contact")}</p>
                </div>

                {/* Sections 5 to 9 */}
                {[5, 6, 7, 8, 9].map((num) => (
                    <div className="mb-8" key={num}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t(`privacy.sections.${num}.title`)}</h2>
                        <p className="text-2ndcolor-text">{t(`privacy.sections.${num}.text`)}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
