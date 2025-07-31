import type React from "react";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
    avatarSrc: string;
    avatarAlt: string;
    name: string;
    role: string;
    testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatarSrc, avatarAlt, name, role, testimonial }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-[58px] h-[58px] border border-gray-200 rounded-full overflow-hidden">
                        <img
                            src={avatarSrc}
                            alt={avatarAlt}
                            width={56}
                            height={56}
                            className="min-h-14 min-w-14"
                            onError={(e) => (e.currentTarget.src = '/dum.png')}
                            style={{ imageRendering: 'crisp-edges' }}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-2ndcolor-text text-lg">{name}</h4>
                        <p className="text-sm text-2ndcolor-text">{role}</p>
                    </div>
                </div>
                <Quote size={40} className="text-gray-300 transform rotate-180" />
            </div>
            <p title={testimonial} className="text-base text-2ndcolor-text flex-grow line-clamp-5">{testimonial}</p>
        </div>
    );
};

export default TestimonialCard;