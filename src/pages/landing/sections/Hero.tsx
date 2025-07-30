"use client"

import { useTranslation, Trans } from "react-i18next"

export default function HomePage() {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col min-h-[92vh]">
            <main className="flex-grow bg-gradient-to-b from-white to-[#F7F6FD] relative overflow-hidden flex items-center justify-center py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
                {/* Decorative elements */}
                <div className="absolute top-8 left-1/4 w-16 h-4 bg-blue-200 rounded-full opacity-30 transform rotate-12 hidden md:block"></div>
                <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-blue-100 rounded-full opacity-20 hidden md:block"></div>
                <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-purple-200 rounded-full opacity-20 hidden md:block"></div>
                <div className="absolute top-1/2 left-0 w-32 h-32 bg-blue-50 rounded-full opacity-10 hidden md:block"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-50 rounded-full opacity-10 hidden md:block"></div>
                <div className="absolute top-16 right-16 text-blue-100 text-opacity-50 text-4xl font-bold hidden md:block">
                    <span className="block leading-none">. . . .</span>
                    <span className="block leading-none">. . . .</span>
                    <span className="block leading-none">. . . .</span>
                    <span className="block leading-none">. . . .</span>
                </div>
                <div className="absolute bottom-16 left-16 text-purple-100 text-opacity-50 text-4xl font-bold hidden md:block">
                    <span className="block leading-none">. . . .</span>
                    <span className="block leading-none">. . . .</span>
                    <span className="block leading-none">. . . .</span>
                    <span className="block leading-none">. . . .</span>
                </div>
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-200 text-opacity-50 text-6xl hidden md:block">
                    <span className="block leading-none">~ ~ ~ ~</span>
                </div>
                <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-purple-200 text-opacity-50 text-6xl hidden md:block">
                    <span className="block leading-none">~ ~ ~ ~</span>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
                    {/* Left Content Section */}
                    <div className="text-center md:text-left px-4">
                        <p className="text-lg font-semibold text-main-text mb-2">
                            {t("home.tagline")}
                        </p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-main-text leading-tight mb-6">
                            <Trans
                                i18nKey="home.heading"
                                components={[<span className="text-primary-text" />]}
                            />
                        </h1>

                        <p className="text-base sm:text-lg text-2ndcolor-text mb-8 max-w-xl mx-auto md:mx-0">
                            {t("home.description")}
                        </p>
                        <button className="bg-primary-text hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer">
                            {t("home.cta")}
                        </button>
                    </div>

                    {/* Right Image Section */}
                    <div className="flex justify-center md:justify-end px-4">
                        <img
                            src="/heroIcon.png"
                            alt={t("home.img_alt")}
                            width={600}
                            height={650}
                            className="max-w-full h-auto"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
