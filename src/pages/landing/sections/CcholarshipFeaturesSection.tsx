import React from "react"
import { useTranslation } from "react-i18next"
import FeatureCard from "../../../components/FetureCard"

const ScholarshipFeaturesSection: React.FC = () => {
    const { t } = useTranslation()

    const features = t("scholarshipFeatures.features", { returnObjects: true }) as {
        title: string
        description: string
    }[]

    const icons = ["fileText", "calendar", "fileDown"] as const
    const iconBgColors = ["bg-indigo-600", "bg-emerald-500", "bg-sky-500"]

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-scholarship">
            <div className="max-w-7xl mx-auto text-center mb-24">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-text mb-5">
                    {t("scholarshipFeatures.sectionTitle")}
                </h2>
                <p className="text-lg text-2ndcolor-text max-w-3xl mx-auto">
                    {t("scholarshipFeatures.sectionSubtitle")}
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={icons[index]}
                        iconBgColor={iconBgColors[index]}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </section>
    )
}

export default ScholarshipFeaturesSection
