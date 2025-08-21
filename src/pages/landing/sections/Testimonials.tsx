import type React from "react"
import { Trans, useTranslation } from "react-i18next"
import TestimonialCard from "../../../components/TestimonialCard"
import { Star } from "lucide-react"
import { useGetReviewQuery } from "../../../store/api/appSlice"

const TestimonialsSection: React.FC = () => {
    const { t } = useTranslation()
    const { data, isLoading } = useGetReviewQuery(null)

    if (isLoading) return <div>loading....</div>
    if (!data) return null

    const averageRating = data.average_rating?.stars__avg ?? 0
    const reviews = data.reviews ?? []

    return (
        <section className="py-16 md:pt-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-text mb-6 md:mb-0">
                        <Trans i18nKey="testimonial.question" components={[<span />, <br />]} />
                    </h2>
                    <div className="flex flex-row sm:space-x-8 space-y-4 sm:space-y-0 text-center md:text-right items-start justify-between">
                        <div className="text-start md:text-center">
                            <p className="text-3xl font-bold text-primary-text">10m+</p>
                            <p className="text-gray-600">{t("testimonial.happyPeople")}</p>
                        </div>
                        <div className="text-end md:text-center">
                            <p className="text-3xl font-bold text-2ndcolor-text">{averageRating.toFixed(2)}</p>
                            <p className="text-gray-600">{t("testimonial.overallRating")}</p>
                            <div className="flex justify-center sm:justify-end mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={
                                            i < Math.round(averageRating)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review: any, index: number) => (
                        <TestimonialCard
                            key={index}
                            testimonial={review.description}
                            review={review.stars}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
