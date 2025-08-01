"use client"
import { useTranslation } from "react-i18next"
import CallToActionSection from "../landing/sections/CallToAction"

export default function ContactUsPage() {
    const { t } = useTranslation()

    return (
        <>
            <main className="bg-[url('/contact.jpg')] bg-cover">
                <div className="bg-[#1F2635CC] w-full h-full flex-grow relative flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
                    <div className="relative z-20 w-full max-w-3xl bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-white mb-2">{t("contact.title")}</h1>
                            <p className="text-gray-300">{t("contact.subtitle")}</p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "firstName",
                                "lastName",
                                "email",
                                "phoneNumber",
                                "town",
                                "location",
                            ].map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className="block text-gray-200 text-sm font-medium mb-2">
                                        {t(`contact.form.${field}`)}
                                    </label>
                                    <input
                                        type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                                        id={field}
                                        name={field}
                                        placeholder={t("contact.form.placeholder")}
                                        className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            ))}

                            <div className="md:col-span-2">
                                <label htmlFor="howCanWeHelp" className="block text-gray-200 text-sm font-medium mb-2">
                                    {t("contact.form.howCanWeHelp")}
                                </label>
                                <textarea
                                    id="howCanWeHelp"
                                    name="howCanWeHelp"
                                    rows={5}
                                    placeholder={t("contact.form.placeholder")}
                                    className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2 text-center">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white
                  bg-gradient-to-t from-[#7C6FF7] to-[#4D37E9]
                  hover:from-[#7C6FF7] hover:to-[#4D37E9]
                  transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:cursor-pointer"
                                >
                                    {t("contact.form.submit")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <CallToActionSection />
        </>
    )
}
