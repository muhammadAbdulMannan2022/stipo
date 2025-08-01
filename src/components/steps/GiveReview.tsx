"use client"

import React, { useState } from "react"
import { Star } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const GiveReviewForm: React.FC = () => {
    const { t } = useTranslation()
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate("/")
        // Handle submission here if needed
        setRating(0)
        setReviewText("")
    }

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 p-6 border-b border-gray-200 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("review.title")}</h2>
                <p className="text-gray-600">{t("review.description")}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
                {/* Rating */}
                <div className="mb-6 text-center">
                    <label className="block text-gray-800 text-lg font-medium mb-3">{t("review.ratingLabel")}</label>
                    <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={32}
                                className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    } transition-colors duration-200`}
                                onClick={() => setRating(star)}
                                aria-label={`${star} stars`}
                            />
                        ))}
                    </div>
                </div>

                {/* Textarea */}
                <div className="mb-6">
                    <label htmlFor="review-text" className="block text-gray-800 text-lg font-medium mb-2">
                        {t("review.reviewLabel")}
                    </label>
                    <textarea
                        id="review-text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder={t("review.reviewPlaceholder")}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 resize-none"
                    />
                </div>

                {/* Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700
              transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t("review.submitButton")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GiveReviewForm
