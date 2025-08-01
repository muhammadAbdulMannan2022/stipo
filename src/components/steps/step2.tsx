"use client"

import React, { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"

interface formDataInterface {
    whoAreYou: string
    eligible: string
    name: string
    email: string
    gender: string
    age: string
    educationLevel: string
    eliteAthlete: string
    insuranceMember: string
}

const BasicInformationForm: React.FC = () => {
    const [formData, setFormData] = useState<formDataInterface>({
        whoAreYou: "",
        eligible: "",
        name: "",
        email: "",
        gender: "",
        age: "",
        educationLevel: "",
        eliteAthlete: "",
        insuranceMember: ""
    })

    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? String(checked) : value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form Data:", formData)
        navigate("/start/otp")
    }

    const renderSelect = (
        name: keyof formDataInterface,
        label: string,
        options: { [key: string]: string }
    ) => (
        <div className="max-w-3xl">
            <label htmlFor={name} className="block text-2ndcolor-text text-base font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2ndcolor-text"
                >
                    <option value="">{t("form.placeholders.select")}</option>
                    {Object.entries(options).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                <ChevronRight
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-2ndcolor-text pointer-events-none"
                    size={20}
                />
            </div>
        </div>
    )

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-2ndcolor-text mb-2">{t("form.title")}</h2>
                <p className="text-2ndcolor-text">{t("form.description")}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect("whoAreYou", t("form.labels.whoAreYou"), t("form.options.whoAreYou", { returnObjects: true }))}
                    {renderSelect("eligible", t("form.labels.eligible"), {
                        yes: t("form.options.yes"),
                        no: t("form.options.no")
                    })}
                </div>

                <div>
                    <label htmlFor="name" className="block text-2ndcolor-text text-base font-medium mb-2">
                        {t("form.labels.name")}
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.enter")}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-2ndcolor-text text-base font-medium mb-2">
                        {t("form.labels.email")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.enter")}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect("gender", t("form.labels.gender"), t("form.options.gender", { returnObjects: true }))}
                    <div>
                        <label htmlFor="age" className="block text-2ndcolor-text text-base font-medium mb-2">
                            {t("form.labels.age")}
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder={t("form.placeholders.enter")}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect(
                        "educationLevel",
                        t("form.labels.educationLevel"),
                        t("form.options.educationLevel", { returnObjects: true })
                    )}
                    {renderSelect("eliteAthlete", t("form.labels.eliteAthlete"), {
                        yes: t("form.options.yes"),
                        no: t("form.options.no")
                    })}
                </div>

                {renderSelect("insuranceMember", t("form.labels.insuranceMember"), {
                    yes: t("form.options.yes"),
                    no: t("form.options.no")
                })}

                <div className="pt-4">
                    <label htmlFor="notRobot" className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="notRobot"
                            name="notRobot"
                            checked={true}
                            readOnly
                            className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-2ndcolor-text text-base">{t("form.labels.notRobot")}</span>
                    </label>
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                        {t("form.next")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BasicInformationForm
