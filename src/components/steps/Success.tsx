"use client"

import React, { useContext, useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { useCreatePaymentMutation, useGenerateDataMutation } from "../../store/api/appSlice"
import { RouteContext } from "../../App"

const Success: React.FC = () => {
    const { setCurrentRoute }: any = useContext(RouteContext)
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
            } finally {

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
                    setCurrentRoute()
                    window.location.assign(response.payment_link)
                } else {
                    setErrorMessage(t("success.paymentFailed"))
                }
            }
        } catch (error: any) {
            if (error?.data?.error === "you have already paid.") {
                setCurrentRoute("/start/paymentSuccess")
                navigate("/start/paymentSuccess")
            } else {
                console.error("Payment error:", error)
                setErrorMessage(error?.error || error?.data?.error || t("success.paymentError"))
            }
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
                    scholarshipCount === "loading..." ? <div className="w-full">
                        <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                            <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24">
                                <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path
                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
                                </path>
                            </svg>
                        </div>
                    </div> : <p className="text-xl text-gray-800 mb-8">
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