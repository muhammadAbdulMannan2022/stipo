import React from "react";
import { useTranslation, Trans } from "react-i18next";

interface StepProps {
    labelKey: string;
    titleKey: string;
    descriptionKey: string;
    image: string;
    imageAltKey: string;
    reverse?: boolean;
}

const Steps: React.FC<StepProps> = ({
    labelKey,
    titleKey,
    descriptionKey,
    image,
    imageAltKey,
    reverse = false,
}) => {
    const { t } = useTranslation();

    return (
        <div
            className={`max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center py-10 md:py-16 px-4 sm:px-6 lg:px-8 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
            {/* Left Content Section */}
            <div className={`${reverse ? "md:text-left" : "md:text-right"} text-start px-4 flex-1`}>
                <p className="text-lg font-semibold text-2ndcolor-text mb-2">
                    {t(labelKey)}
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-indigo-500 leading-tight mb-12">
                    <Trans
                        i18nKey={titleKey}
                        components={[<br />]}
                    />
                </h3>

                <p className="text-base sm:text-lg text-2ndcolor-text max-w-xl mx-auto md:mx-0">
                    {t(descriptionKey)}
                </p>
            </div>

            {/* Right Image Section */}
            <div className="flex justify-center md:justify-end px-4 flex-1">
                <img
                    src={image}
                    alt={t(imageAltKey)}
                    width={600}
                    height={400}
                    className="w-auto max-h-[400px] h-full"
                />
            </div>
        </div>
    );
};

export default Steps;