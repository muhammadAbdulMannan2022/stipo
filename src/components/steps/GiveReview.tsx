"use client"

import React, { useContext, useState } from "react"
import { Star } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { usePostReviewMutation } from "../../store/api/appSlice"
import { RouteContext } from "../../App"

const GiveReviewForm: React.FC = () => {
    const { setCurrentRoute }: any = useContext(RouteContext)
    const { t } = useTranslation()
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [reviewerName, setReviewerName] = useState("")
    const [reviewerGender, setReviewerGender] = useState("male")
    const navigate = useNavigate()
    const email = localStorage.getItem("email")
    const [giveReview, { isLoading }] = usePostReviewMutation()
    const [error, setError] = useState<string>("")

    const getProfileIcon = (gender: string): string => {
        switch (gender) {
            case "male":
                return "male.png"
            case "female":
                return "female.png"
            case "Non-binary":
                return "Non-binary.png"
            case "prefer to say":
                return "prefer_to_say.png"
            case "others":
                return "others.png"
            default:
                return "others.png"
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!reviewerName.trim() || !rating || !reviewText.trim()) {
            setError(t("review.validationError"))
            return
        }

        try {
            setError("") // clear previous error
            await giveReview({
                description: reviewText,
                email: email || "",
                stars: rating,
                reviewer_name: reviewerName,
                reviewer_gender: reviewerGender,
                profile_icon: getProfileIcon(reviewerGender),
            }).unwrap()

            setRating(0)
            setReviewText("")
            setReviewerName("")
            setReviewerGender("male")
            setCurrentRoute("/start")
            navigate("/")
        } catch (err: any) {
            // check API error shape
            if (err?.data?.error) {
                setError(err.data.error) // backend message
            } else {
                console.error("Failed to submit review:", err)
            }
        }
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
                {/* Reviewer Name */}
                <div className="mb-4">
                    <label htmlFor="reviewer-name" className="block text-gray-800 text-lg font-medium mb-2">
                        {t("review.nameLabel")}
                    </label>
                    <input
                        id="reviewer-name"
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder={t("review.namePlaceholder")}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    />
                </div>

                {/* Reviewer Gender */}
                <div className="mb-4">
                    <label htmlFor="reviewer-gender" className="block text-gray-800 text-lg font-medium mb-2">
                        {t("review.genderLabel")}
                    </label>
                    <select
                        id="reviewer-gender"
                        value={reviewerGender}
                        onChange={(e) => setReviewerGender(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
                    >
                        <option value="male">{t("review.genderOptions.male")}</option>
                        <option value="female">{t("review.genderOptions.female")}</option>
                        <option value="Non-binary">{t("review.genderOptions.nonBinary")}</option>
                        <option value="prefer to say">{t("review.genderOptions.preferToSay")}</option>
                        <option value="others">{t("review.genderOptions.others")}</option>
                    </select>
                </div>

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
                {error && (
                    <p className="mt-4 text-red-600 text-sm text-center mb-3">{error}</p>
                )}

                {/* Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700
              transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer disabled:cursor-not-allowed"
                    >
                        {t("review.submitButton")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GiveReviewForm
