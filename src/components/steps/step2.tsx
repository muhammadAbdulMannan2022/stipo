"use client";

import { useCallback, useContext, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useSubmitNewFormMutation } from "../../store/api/appSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { RouteContext } from "../../App";

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

interface FormErrors {
    whoAreYou?: string;
    name?: string;
    organizationName?: string;
    email?: string;
    gender?: string;
    age?: string;
    educationLevel?: string;
    eliteAthlete?: string;
    municipality?: string;
    notRobot?: string;
    captcha?: string;
    submit?: string;
}

const PersonalForm: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setCurrentRoute }: any = useContext(RouteContext)
    const [submitNewForm, { isLoading }] = useSubmitNewFormMutation();

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

    const [errors, setErrors] = useState<FormErrors>({});
    // const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const validateForm = useCallback(() => {
        const newErrors: FormErrors = {};

        if (!formData.whoAreYou) {
            newErrors.whoAreYou = t("personalForm.errors.whoAreYou");
        }

        if (!formData.name.trim()) {
            newErrors.name = t("personalForm.errors.name");
        }

        if (formData.whoAreYou === t("personalForm.organization") && !formData.organizationName?.trim()) {
            newErrors.organizationName = t("personalForm.errors.organizationName");
        }

        if (!formData.email.trim()) {
            newErrors.email = t("personalForm.errors.email");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t("personalForm.errors.emailInvalid");
        }

        if (!formData.gender) {
            newErrors.gender = t("personalForm.errors.gender");
        }

        if (!formData.age) {
            newErrors.age = t("personalForm.errors.age");
        } else if (parseInt(formData.age) < 0 || parseInt(formData.age) > 150) {
            newErrors.age = t("personalForm.errors.ageInvalid");
        }

        if (!formData.educationLevel) {
            newErrors.educationLevel = t("personalForm.errors.educationLevel");
        }

        if (!formData.eliteAthlete) {
            newErrors.eliteAthlete = t("personalForm.errors.eliteAthlete");
        }

        if (!formData.municipality) {
            newErrors.municipality = t("personalForm.errors.municipality");
        }

        if (!captchaToken) {
            newErrors.captcha = t("personalForm.errors.captcha");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, captchaToken, t]);

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

            // Clear error for this field when user starts typing
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // if (!acceptedTerms) {
            //     alert(t("personalForm.acceptTermsAlert"));
            //     return;
            // }

            if (!validateForm()) {
                return;
            }

            const submitData = {
                role: formData.whoAreYou,
                name: formData.name,
                email: formData.email,
                gender: formData.gender,
                age: parseInt(formData.age) || 0,
                study_level: formData.educationLevel,
                elite_athlete: formData.eliteAthlete,
                municipality: formData.municipality,
            };
            // captcha: captchaToken,

            try {
                await submitNewForm(submitData).unwrap();
                setCurrentRoute("/start/otp")
                localStorage.setItem("email", formData.email)
                navigate("/start/otp", { state: { email: formData.email } });
            } catch (error) {
                console.error("Form submission failed:", error);
                setErrors((prev) => ({
                    ...prev,
                    submit: t("personalForm.errors.submit"),
                }));
            }
        },
        [formData, navigate, submitNewForm, captchaToken, t, validateForm]
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
                        className={`w-full p-3 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 max-h-60 overflow-y-auto`}
                        size={1}
                    >
                        <option value="">{t("personalForm.placeholder.select")}</option>
                        {Object.entries(options).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <ChevronRight
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                        size={20}
                    />
                </div>
                {errors[name] && (
                    <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                )}
            </div>
        ),
        [formData, handleChange, t, errors]
    );

    const municipalityOptions = t("list", { returnObjects: true }) as { [key: string]: string };

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">{t("personalForm.title")}</h2>
                <p className="text-gray-700">{t("personalForm.description")}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {errors.submit && (
                    <p className="text-red-500 text-center">{errors.submit}</p>
                )}
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
                            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>
                </div>

                {formData.whoAreYou === t("personalForm.organization") && (
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
                            className={`w-full p-3 border ${errors.organizationName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.organizationName && (
                            <p className="mt-1 text-sm text-red-500">{errors.organizationName}</p>
                        )}
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
                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect("gender", "gender", {
                        male: t("personalForm.male"),
                        female: t("personalForm.female"),
                        non_binary: t("personalForm.nonBinary"),
                        preferNotSay: t("personalForm.noSay"),
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
                            className={`w-full p-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.age && (
                            <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    {renderSelect("educationLevel", "educationLevel", {
                        upperSecondary: t("personalForm.upperSecondary"),
                        universityUndergraduate: t("personalForm.universityUndergraduate"),
                        universityMasters: t("personalForm.universityMasters"),
                        postSecondary: t("personalForm.postSecondary"),
                        compulsory: t("personalForm.compulsory"),
                    })}
                    {renderSelect("eliteAthlete", "eliteAthlete", {
                        yes: t("personalForm.yes"),
                        no: t("personalForm.no"),
                    })}
                </div>

                {renderSelect("municipality", "municipality", municipalityOptions)}

                {/* notRobot checkbox */}
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
                        <span className="ml-3 text-gray-700 text-base">{t("personalForm.notRobot")}</span>
                    </label>
                </div>

                {/* Google reCAPTCHA */}
                <div className="pt-4">
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                        onChange={(token) => {
                            setCaptchaToken(token);
                            setErrors((prev) => ({ ...prev, captcha: undefined }));
                        }}
                    />
                    {errors.captcha && (
                        <p className="mt-1 text-sm text-red-500">{errors.captcha}</p>
                    )}
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                    >
                        {isLoading ? t("personalForm.submitting") : t("personalForm.next")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalForm;