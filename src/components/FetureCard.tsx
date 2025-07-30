import type React from "react"
import { FileText, Calendar, FileDown } from "lucide-react"

interface FeatureCardProps {
    icon: "fileText" | "calendar" | "fileDown"
    iconBgColor: string // Tailwind class like "bg-indigo-600"
    title: string
    description: string
}

const IconComponent = ({ icon }: { icon: FeatureCardProps["icon"] }) => {
    switch (icon) {
        case "fileText":
            return <FileText size={28} className="text-white" />
        case "calendar":
            return <Calendar size={28} className="text-white" />
        case "fileDown":
            return <FileDown size={28} className="text-white" />
        default:
            return null
    }
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBgColor, title, description }) => {
    return (
        <div className="relative bg-white p-8 pt-16 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full">
            <div className={`absolute -top-8 ${iconBgColor} p-4 rounded-full shadow-md flex items-center justify-center`}>
                <IconComponent icon={icon} />
            </div>
            <h3 className="text-xl font-bold text-2ndcolor-text mt-4 mb-3">{title}</h3>
            <p className="text-base text-2ndcolor-text">{description}</p>
        </div>
    )
}

export default FeatureCard
