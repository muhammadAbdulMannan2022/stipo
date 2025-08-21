import type React from "react"
import { Quote, Star } from "lucide-react"

interface TestimonialCardProps {
    testimonial: string
    review: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, review }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {/* Top quote */}
            <div className="flex items-center justify-between mb-4">
                <Quote size={40} className="text-gray-300 transform rotate-180" />
            </div>

            {/* Review text */}
            <p
                title={testimonial}
                className="text-base text-2ndcolor-text flex-grow line-clamp-5"
            >
                {testimonial}
            </p>

            {/* Bottom quote */}
            <div className="flex items-center justify-start rotate-180 mb-4">
                <Quote size={40} className="text-gray-300 transform rotate-180" />
            </div>

            {/* Stars */}
            <div className="flex space-x-1 mt-auto">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        className={
                            i < review
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default TestimonialCard
