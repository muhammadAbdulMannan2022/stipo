"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { useCreatePaymentMutation, useGenerateDataMutation } from "../../store/api/appSlice"

const Success: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const applicationToken = localStorage.getItem("application_token") || ""
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [pay, { isLoading: isPaymentLoading }] = useCreatePaymentMutation()
    const [generateData, { isLoading: isGetDataLoading }] = useGenerateDataMutation()
    const [scholarshipCount, setScholarships] = useState<number | "loading...">("loading...")
    const fetchData = async () => {
        if (applicationToken) {
            try {
                const response = await generateData({ application_token: applicationToken }).unwrap()
                console.log("Generated data:", response?.success_count)
                setScholarships(Number(response.success_count))
            } catch (error: any) {
                if (error.originalStatus == 500) {
                    setErrorMessage("Internal Server Error")
                } else {
                    setErrorMessage(error?.data?.error || error?.data?.detail || "error")
                }
                console.error("Failed to fetch scholarship data:", error.originalStatus)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handlePayment = async () => {
        const email = localStorage.getItem("email") || ""
        try {
            setErrorMessage(null) // Clear any previous errors
            if (email) {
                const response = await pay({ email, success_url: "http://localhost:5151/start/paymentSuccess", cancel_url: "http://localhost:5151/start/success" }).unwrap() // Replace with dynamic email
                if (response.payment_link) {
                    window.location.assign(response.payment_link)
                } else {
                    setErrorMessage(t("success.paymentFailed"))
                }
            }
        } catch (error: any) {
            console.error("Payment error:", error)
            setErrorMessage(error?.error || error?.data?.error || t("success.paymentError"))
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md min-w-md mx-auto overflow-hidden">
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

                {
                    scholarshipCount === "loading..." ? <div className="w-full"></div> : <p className="text-xl text-gray-800 mb-8">
                        {t("success.message", {
                            count: scholarshipCount,
                            interpolation: { escapeValue: false },
                        })}
                    </p>
                }

                {errorMessage && (
                    <p className="text-red-500 mb-4" aria-live="polite">{errorMessage}</p>
                )}

                {/* Button */}
                <div className="text-center pb-5">
                    <button
                        onClick={handlePayment}
                        disabled={isPaymentLoading || isGetDataLoading}
                        className={`w-full py-3 px-6 rounded-lg font-semibold hover:cursor-pointer text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700
              transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${isPaymentLoading || isGetDataLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isPaymentLoading ? t("success.processing") : t("success.button")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Success