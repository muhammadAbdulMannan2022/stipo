import type React from "react";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
    testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <Quote size={40} className="text-gray-300 transform rotate-180" />
            </div>
            <p title={testimonial} className="text-base text-2ndcolor-text flex-grow line-clamp-5">{testimonial}</p>
            <div className="flex items-center justify-start rotate-180 mb-4">
                <Quote size={40} className="text-gray-300 transform rotate-180" />
            </div>
        </div>
    );
};

export default TestimonialCard;