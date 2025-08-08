import type React from "react"
import { Trans, useTranslation } from "react-i18next"
import TestimonialCard from "../../../components/TestimonialCard"
import { Star } from "lucide-react"

const TestimonialsSection: React.FC = () => {
    const { t } = useTranslation()

    const testimonials = [
        {
            avatarSrc: "/client1.jpg",
            avatarAlt: "Cameron Williamson's avatar",
            name: "Cameron Williamson",
            role: "Designer",
            testimonial:
                "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dores."
        },
        {
            avatarSrc: "/client2.jpg",
            avatarAlt: "Esther Howard's avatar",
            name: "Esther Howard",
            role: "Marketing",
            testimonial:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae."
        },
        {
            avatarSrc: "/client13.jpg",
            avatarAlt: "Devon Lane's avatar",
            name: "Devon Lane",
            role: "Developer",
            testimonial:
                "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est."
        }
    ]

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
                            <p className="text-3xl font-bold text-2ndcolor-text">4.88</p>
                            <p className="text-gray-600">{t("testimonial.overallRating")}</p>
                            <div className="flex justify-center sm:justify-end mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            avatarSrc={testimonial.avatarSrc}
                            avatarAlt={testimonial.avatarAlt}
                            name={testimonial.name}
                            role={testimonial.role}
                            testimonial={testimonial.testimonial}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
