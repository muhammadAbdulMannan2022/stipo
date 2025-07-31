"use client"

import type React from "react"
import { CheckCircle } from "lucide-react"

interface PaymentConfirmedCardProps {
    title?: string
    confirmationTitle?: string
    message?: string
    timeHighlight?: string
    buttonText?: string
    onButtonClick?: () => void
}

const PaymentConfirmedCard: React.FC<PaymentConfirmedCardProps> = ({
    title = "List of Scholarships",
    confirmationTitle = "Payment confirmed!!",
    message = "Your eligible scholarships list will be sent to your Email within [time] Thanks for using our service",
    timeHighlight = "2hours",
    buttonText = "Back to home page",
    onButtonClick,
}) => {
    const parts = message.split(`[time]`)

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-600 rounded-full p-3 flex items-center justify-center">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-indigo-600 mb-4">{confirmationTitle}</h3>
                <p className="text-xl text-gray-800 mb-8">
                    {parts[0]}
                    <span className="font-extrabold text-green-600">{timeHighlight}</span>
                    {parts[1]}
                </p>

                {/* Button */}
                <div className="text-center">
                    <button
                        onClick={onButtonClick}
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:from-purple-700 hover:to-indigo-700
                       transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentConfirmedCard
