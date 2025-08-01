"use client"

import React from "react"
import { CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

const Success: React.FC = () => {
    const { t } = useTranslation()
    const eligibleScholarshipsCount = 10

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-2ndcolor-text">{t("success.title")}</h2>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 rounded-full p-3 flex items-center justify-center">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-green-600 mb-4">{t("success.congrats")}</h3>

                <p className="text-xl text-gray-800 mb-8">
                    {t("success.message", {
                        count: eligibleScholarshipsCount,
                        interpolation: { escapeValue: false }
                    })}
                </p>

                {/* Button */}
                <div className="text-center pb-5">
                    <Link to="/start/paymentSuccess"
                        onClick={() => console.log("Clicked")}
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
            bg-gradient-to-r from-purple-600 to-indigo-600
            hover:from-purple-700 hover:to-indigo-700
            transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t("success.button")}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Success
