"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"

interface BasicInformationFormProps {
    title?: string
    description?: string
    onSubmit?: (formData: Record<string, string>) => void
}
interface formDataInterface {
    whoAreYou: string;
    eligible: string;
    name: string;
    email: string;
    gender: string;
    age: string;
    educationLevel: string;
    eliteAthlete: string;
    insuranceMember: string;
}
const BasicInformationForm: React.FC<BasicInformationFormProps> = ({
    title = "Basic informations",
    description = "Lorem Ipsum is simply dummy text of the printing and type",
    onSubmit,
}) => {
    const [formData, setFormData] = useState<formDataInterface>({
        whoAreYou: "",
        eligible: "",
        name: "",
        email: "",
        gender: "",
        age: "",
        educationLevel: "",
        eliteAthlete: "",
        insuranceMember: "",
    })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSubmit) {
            onSubmit(formData)
        }
        console.log("Form Data:", formData)
        navigate("/start/otp")
    }

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Who are you? */}
                    <div>
                        <label htmlFor="whoAreYou" className="block text-gray-800 text-base font-medium mb-2">
                            Who are you?
                        </label>
                        <div className="relative">
                            <select
                                id="whoAreYou"
                                name="whoAreYou"
                                value={formData.whoAreYou}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            >
                                <option value="">Select one</option>
                                <option value="student">Student</option>
                                <option value="parent">Parent</option>
                                <option value="educator">Educator</option>
                            </select>
                            <ChevronRight
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>

                    {/* Are you eligible? */}
                    <div>
                        <label htmlFor="eligible" className="block text-gray-800 text-base font-medium mb-2">
                            Are you eligible?
                        </label>
                        <div className="relative">
                            <select
                                id="eligible"
                                name="eligible"
                                value={formData.eligible}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            >
                                <option value="">Select one</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <ChevronRight
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-gray-800 text-base font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter here"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-gray-800 text-base font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter here"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-gray-800 text-base font-medium mb-2">
                            Gender
                        </label>
                        <div className="relative">
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            >
                                <option value="">Select one</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <ChevronRight
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>

                    {/* Age */}
                    <div>
                        <label htmlFor="age" className="block text-gray-800 text-base font-medium mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter here"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Level of education currently pursuing */}
                    <div>
                        <label htmlFor="educationLevel" className="block text-gray-800 text-base font-medium mb-2">
                            Level of education currently pursuing
                        </label>
                        <div className="relative">
                            <select
                                id="educationLevel"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            >
                                <option value="">Select one</option>
                                <option value="high-school">High School</option>
                                <option value="undergraduate">Undergraduate</option>
                                <option value="graduate">Graduate</option>
                                <option value="post-graduate">Post-Graduate</option>
                            </select>
                            <ChevronRight
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>

                    {/* Are you an elite athlete? */}
                    <div>
                        <label htmlFor="eliteAthlete" className="block text-gray-800 text-base font-medium mb-2">
                            Are you an elite athlete?
                        </label>
                        <div className="relative">
                            <select
                                id="eliteAthlete"
                                name="eliteAthlete"
                                value={formData.eliteAthlete}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                            >
                                <option value="">Select one</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <ChevronRight
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>
                </div>

                {/* Member of an insurance association or have a valid insurance? */}
                <div>
                    <label htmlFor="insuranceMember" className="block text-gray-800 text-base font-medium mb-2">
                        Member of an insurance association or have a valid insurance?
                    </label>
                    <div className="relative">
                        <select
                            id="insuranceMember"
                            name="insuranceMember"
                            value={formData.insuranceMember}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        >
                            <option value="">Select one</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <ChevronRight
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            size={20}
                        />
                    </div>
                </div>

                {/* I'm not a robot checkbox and reCAPTCHA */}
                <div className="flex items-center justify-between pt-4">
                    <label htmlFor="notRobot" className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="notRobot"
                            name="notRobot"
                            checked={formData.notRobot}
                            onChange={handleChange}
                            className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-800 text-base">I&apos;m not a robot</span>
                    </label>
                    {/* <div className="flex items-center space-x-2 text-gray-500 text-xs">
                        <img src="/placeholder.svg?height=32&width=32" alt="reCAPTCHA logo" width={32} height={32} />
                        <span>
                            reCAPTCHA
                            <br />
                            <a href="#" className="underline hover:text-indigo-600">
                                Privacy
                            </a>{" "}
                            -{" "}
                            <a href="#" className="underline hover:text-indigo-600">
                                Terms
                            </a>
                        </span>
                    </div> */}
                </div>

                {/* Next Button */}
                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:from-purple-700 hover:to-indigo-700
                       transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BasicInformationForm
