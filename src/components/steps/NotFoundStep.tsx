"use client"

import type React from "react"
import { XCircle } from "lucide-react"

interface AnalysisResultFailureCardProps {
    title?: string
    sorryText?: string
    message?: string
    buttonText?: string
    onButtonClick?: () => void
}

const AnalysisResultFailureCard: React.FC<AnalysisResultFailureCardProps> = ({
    title = "Analysis result",
    sorryText = "Sorry!",
    message = "You are not eligible for any Scholarships Now",
    buttonText = "Try later",
    onButtonClick,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500 rounded-full p-3 flex items-center justify-center">
                        <XCircle size={48} className="text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-red-600 mb-4">{sorryText}</h3>
                <p className="text-xl text-gray-800 mb-8">{message}</p>

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

export default AnalysisResultFailureCard
