"use client"

import type React from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItemProps {
    question: string
    answer: string
    nestedContent?: React.ReactNode
    isOpen: boolean
    onClick: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, nestedContent, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between hover:cursor-pointer items-center w-full text-left focus:outline-none"
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${question.replace(/\s/g, "-").toLowerCase()}`}
            >
                <span className={`text-lg font-semibold ${isOpen ? "text-primary-text" : "text-2ndcolor-text"}`}>{question}</span>
                {isOpen ? <Minus size={24} className="text-primary-text" /> : <Plus size={24} className="text-2ndcolor-text" />}
            </button>
            {isOpen && (
                <div id={`faq-answer-${question.replace(/\s/g, "-").toLowerCase()}`} className="mt-4 text-gray-700 pr-8">
                    <p className="mb-4">{answer}</p>
                    {nestedContent && <div className="bg-gray-50 p-3 rounded-md text-gray-800 font-medium">{nestedContent}</div>}
                </div>
            )}
        </div>
    )
}

export default FAQItem
