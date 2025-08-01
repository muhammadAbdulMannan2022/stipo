"use client"

import React from "react"
import { CheckCircle } from "lucide-react"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const PaymentConfirmedCard: React.FC = () => {
    const { t } = useTranslation()
    const timeHighlight = "2 hours"
    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-2ndcolor-text">{t("payment.title")}</h2>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-600 rounded-full p-3 flex items-center justify-center">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-primary-text mb-4">{t("payment.confirmationTitle")}</h3>

                <p className="text-xl text-2ndcolor-text mb-8">
                    <Trans
                        i18nKey="payment.message"
                        values={{ time: timeHighlight }}
                        components={[<span className="font-extrabold text-green-600" />]}
                    />

                </p>

                {/* Button */}
                <div className="text-center flex flex-col gap-2">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700
              transition-all hover:cursor-pointer duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t("payment.button")}
                    </button>
                    <button
                        onClick={() => navigate("/start/review")}
                        className="w-full py-3 px-6 rounded-lg font-semibold text-gray-900
    bg-gradient-to-r from-gray-300 to-gray-400
    hover:from-gray-400 hover:to-gray-500
    transition-all hover:cursor-pointer duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                        {t("payment.review")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentConfirmedCard
