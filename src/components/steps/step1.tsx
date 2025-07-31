"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"

interface EmailInputCardProps {
    title?: string
    description?: string
    emailPlaceholder?: string
    infoText?: string
    onStartNewAnalysis?: (email: string) => void
    onNext?: (email: string) => void
}

const EmailInputCard: React.FC<EmailInputCardProps> = ({
    title = "Enter Email",
    description = "Lorem Ipsum is simply dummy text of the printing and type",
    emailPlaceholder = "Enter here",
    infoText = "If you already filled up data, then enter email Or start new analysis",
    onStartNewAnalysis,
    onNext,
}) => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleStartNewAnalysis = () => {
        if (onStartNewAnalysis) {
            onStartNewAnalysis(email)
        }
        setEmail("")
        navigate("/start/2")
    }

    const handleNext = () => {
        if (onNext) {
            onNext(email)
        }
        // Optionally navigate
    }

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-2ndcolor-text mb-2">{title}</h2>
                <p className="text-2ndcolor-text">{description}</p>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="mb-6">
                    <label htmlFor="email-input" className="block text-2ndcolor-text text-lg font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={emailPlaceholder}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    />
                </div>

                <p className="text-gray-600 text-sm mb-8">{infoText}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button
                        onClick={handleStartNewAnalysis}
                        className="hover:cursor-pointer flex-1 py-3 px-6 rounded-lg border border-primary-text text-indigo-600 font-semibold
                       hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Start New Analysis
                    </button>
                    <button
                        onClick={handleNext}
                        className="hover:cursor-pointer flex-1 py-3 px-6 rounded-lg bg-primary-text text-white font-semibold
                       hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailInputCard
