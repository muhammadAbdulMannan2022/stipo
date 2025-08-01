"use client";

import { useCallback, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface FormDataInterface {
    whoAreYou: string;
    name: string;
    organizationName?: string;
    email: string;
    gender: string;
    age: string;
    educationLevel: string;
    eliteAthlete: string;
    municipality: string;
    notRobot?: string;
}

const PersonalForm: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormDataInterface>({
        whoAreYou: "",
        name: "",
        organizationName: "",
        email: "",
        gender: "",
        age: "",
        educationLevel: "",
        eliteAthlete: "",
        municipality: "",
        notRobot: "true",
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const target = e.target;
            const { name, value, type } = target;

            const isCheckbox = target instanceof HTMLInputElement && type === "checkbox";
            const checkedValue = isCheckbox ? String((target as HTMLInputElement).checked) : value;

            setFormData((prev) => ({
                ...prev,
                [name]: checkedValue,
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("Form Data:", formData);
            navigate("/start/otp");
        },
        [formData, navigate]
    );

    const renderSelect = useCallback(
        (
            name: keyof FormDataInterface,
            labelKey: string,
            options: { [key: string]: string }
        ) => (
            <div className="max-w-3xl">
                <label htmlFor={name} className="block text-gray-700 text-base font-medium mb-2">
                    {t(`personalForm.${labelKey}`)}
                </label>
                <div className="relative">
                    <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 max-h-60 overflow-y-auto"
                        size={1}
                    >
                        <option value="">{t("personalForm.placeholder.select")}</option>
                        {Object.entries(options).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>

                    <ChevronRight
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                        size={20}
                    />
                </div>
            </div>
        ),
        [formData, handleChange, t]
    );

    // Cast t("list") to the expected type
    const municipalityOptions = t("list", { returnObjects: true }) as { [key: string]: string };

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                    {t("personalForm.title")}
                </h2>
                <p className="text-gray-700">{t("personalForm.description")}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect("whoAreYou", "whoAreYou", {
                        individual: t("personalForm.individual"),
                        organization: t("personalForm.organization"),
                        other: t("personalForm.other"),
                    })}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-base font-medium mb-2">
                            {t("personalForm.name")}
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("personalForm.placeholder.name") || ""}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>



                {formData.whoAreYou === "organization" && (
                    <div>
                        <label htmlFor="organizationName" className="block text-gray-700 text-base font-medium mb-2">
                            {t("personalForm.organizationName")}
                        </label>
                        <input
                            id="organizationName"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleChange}
                            placeholder={t("personalForm.placeholder.organizationName") || ""}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-gray-700 text-base font-medium mb-2">
                        {t("personalForm.email")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("personalForm.placeholder.email") || ""}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect("gender", "gender", {
                        male: t("personalForm.male"),
                        female: t("personalForm.female"),
                        other: t("personalForm.otherGender"),
                    })}
                    <div>
                        <label htmlFor="age" className="block text-gray-700 text-base font-medium mb-2">
                            {t("personalForm.age")}
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder={t("personalForm.placeholder.age") || ""}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    {renderSelect("educationLevel", "educationLevel", {
                        universityUndergraduate: t("personalForm.universityUndergraduate"),
                        universityMasters: t("personalForm.universityMasters"),
                        postSecondary: t("personalForm.postSecondary"),
                        upperSecondary: t("personalForm.upperSecondary"),
                        compulsory: t("personalForm.compulsory"),
                    })}
                    {renderSelect("eliteAthlete", "eliteAthlete", {
                        yes: t("personalForm.yes"),
                        no: t("personalForm.no"),
                    })}
                </div>

                {renderSelect("municipality", "municipality", municipalityOptions)}

                <div className="pt-4">
                    <label htmlFor="notRobot" className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="notRobot"
                            name="notRobot"
                            checked={formData.notRobot === "true"}
                            onChange={handleChange}
                            className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700 text-base">
                            {t("personalForm.notRobot")}
                        </span>
                    </label>
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                        {t("personalForm.next")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalForm;