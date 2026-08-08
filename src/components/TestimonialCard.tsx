import type React from "react";
import { Quote, Star } from "lucide-react";

import defaultUserImage from "../assets/account.png";
import maleUserImage from "../assets/male.png";
import femaleUserImage from "../assets/female.png";

import blueMarkImage from "../assets/check.png";

import type { Review } from "../store/api/appSlice";

interface TestimonialCardProps {
  review: Review;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Top quote */}
      <div className="flex items-center justify-between mb-4">
        <Quote size={40} className="text-gray-300 transform rotate-180" />
      </div>

      {/* Review text */}
      <p
        title={review.description}
        className="text-base text-2ndcolor-text flex-grow line-clamp-5"
      >
        {review.description}
      </p>

      {/* Bottom quote */}
      <div className="flex items-center justify-start rotate-180 mb-4">
        <Quote size={40} className="text-gray-300 transform rotate-180" />
      </div>

      <div>
        {/* Reviewer info */}
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={
              review.reviewer_gender?.toLowerCase() === "male"
                ? maleUserImage
                : review.reviewer_gender?.toLowerCase() === "female"
                  ? femaleUserImage
                  : defaultUserImage
            }
            alt={review.reviewer_name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-primary-text flex gap-x-2 items-center justify-center">
              <span>{review.reviewer_name}</span>
              <img src={blueMarkImage} alt="Verified" className="size-4" />
            </p>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex space-x-1 mt-auto">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < review.stars
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
