"use client"

import type React from "react"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"

const Footer: React.FC = () => {
    const { t } = useTranslation()

    return (
        <footer className="bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-gray-700">
                    {/* Brand/Address */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-xl font-bold text-white mb-4">{t("footer.brand")}</h3>
                        <p className="text-sm">
                            {t("footer.address.line1")}
                            <br />
                            {t("footer.address.line2")}
                        </p>
                        <p className="mt-4">
                            <strong>{t("footer.contact.title")}</strong>
                            <br />
                            {t("footer.contact.email")}
                            <br />
                            {t("footer.contact.phone")}
                            <br />
                            {t("footer.contact.hours")}
                        </p>
                        <button
                            type="button"
                            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                        >
                            {t("footer.findScholarships")}
                        </button>
                    </div>

                    {/* Terms/Condition */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.terms.title")}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/integrity-policy" className="hover:text-white transition-colors duration-200">
                                    {t("footer.terms.integrityPolicy")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
                                    {t("footer.terms.privacyPolicy")}
                                </Link>
                            </li>
                        </ul>
                        <h4 className="text-lg font-semibold text-white mt-6 mb-4">{t("footer.terms.userConditionTitle")}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/user-conditions" className="hover:text-white transition-colors duration-200">
                                    {t("footer.terms.userCondition")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About Us */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.about.title")}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="hover:text-white transition-colors duration-200">
                                    {t("footer.about.aboutUs")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* FAQ */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.faq.title")}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/#faq" className="hover:text-white transition-colors duration-200">
                                    {t("footer.faq.faq")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.followUs")}</h4>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Facebook size={24} />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Instagram size={24} />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Twitter size={24} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-sm text-gray-500 space-y-4 sm:space-y-0">
                    <p>{t("footer.email")}</p>
                    <p>{t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
