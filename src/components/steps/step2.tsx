"use client";

import { useCallback, useContext, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useSubmitNewFormMutation,
  type SubmitForm,
} from "../../store/api/appSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { RouteContext } from "../../App";

interface FormDataInterface {
  whoAreYou: string;
  name: string;
  organizationName?: string;
  organizationId?: string;
  email: string;
  gender: string;
  age: string;
  educationLevel: string;
  eliteAthlete: string;
  municipality: string;
  sport: string;
  notRobot?: string;
  sportName?: string;
  educationLevelOption?: string;
  educationLevelOther?: string;
  purposeoffunding?: string;
  includeMunicipalityFilter: boolean;
}

interface FormErrors {
  whoAreYou?: string;
  name?: string;
  organizationName?: string;
  organizationId?: string;
  email?: string;
  gender?: string;
  age?: string;
  educationLevel?: string;
  eliteAthlete?: string;
  municipality?: string;
  notRobot?: string;
  captcha?: string;
  submit?: string;
  sport?: string;
  sportName?: string;
  educationLevelOption?: string;
  educationLevelOther?: string;
  purposeoffunding?: string;
  includeMunicipalityFilter?: boolean;
}

const PersonalForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCurrentRoute }: any = useContext(RouteContext);
  const [submitNewForm, { isLoading }] = useSubmitNewFormMutation();
  const lang = localStorage.getItem("i18nextLng") || "en";

  const [formData, setFormData] = useState<FormDataInterface>({
    whoAreYou: "",
    name: "",
    organizationName: "",
    organizationId: "",
    email: "",
    gender: "",
    age: "",
    educationLevel: "",
    eliteAthlete: "",
    municipality: "",
    sport: "",
    notRobot: "false",
    sportName: "",
    educationLevelOption: "",
    educationLevelOther: "",
    purposeoffunding: "",
    includeMunicipalityFilter: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const education = t("personalForm.education", { returnObjects: true }) as {
    upperSecondary: { [key: string]: string };
    universityPrograms: { [key: string]: string };
    masterPrograms: { [key: string]: string };
    phdPrograms: { [key: string]: string };
    postSecondaryPrograms: { [key: string]: string };
  };
  const upperSecondaryOptions = education.upperSecondary;
  const universityOptions = education.universityPrograms;
  const masterOptions = education.masterPrograms;
  const phdOptions = education.phdPrograms;
  const postSecondaryOptions = education.postSecondaryPrograms;

  const getPurposeExamples = () => {
    if (formData.whoAreYou === t("personalForm.organization")) {
      return lang === "sv"
        ? "arrangera cup, match eller träningsresa.."
        : "Organizing a tournament, match, or training trip..";
    } else if (formData.educationLevel === t("personalForm.phd")) {
      return lang === "sv"
        ? "Forskningsområde, doktorsavhandlingens ämnesområde.."
        : "Area of research, doctoral thesis subject..";
    } else {
      return lang === "sv"
        ? "intresserad av att studera ingenjörsrelaterade ämnen för min kandidatexamen ..."
        : "intersted to study in engineering related subjects for my undergraduation ...";
    }
  };

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    console.log(formData.notRobot);
    if (!formData.whoAreYou) {
      newErrors.whoAreYou = t("personalForm.errors.whoAreYou");
    }

    if (formData.whoAreYou === t("personalForm.individual")) {
      if (!formData.name.trim()) {
        newErrors.name = t("personalForm.errors.name");
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

      if (!formData.municipality) {
        newErrors.municipality = t("personalForm.errors.municipality");
      }

      if (!formData.purposeoffunding?.trim()) {
        newErrors.purposeoffunding = t("personalForm.errors.purposeoffundingRequired");
      } else if (formData.purposeoffunding.trim().length < 50) {
        newErrors.purposeoffunding = t("personalForm.errors.purposeoffundingMinLength");
      }

      if (!captchaToken) {
        newErrors.captcha = t("personalForm.errors.captcha");
      }
    } else {
      if (!formData.organizationName?.trim()) {
        newErrors.organizationName = t("personalForm.errors.organizationName");
      }
      if (!formData.organizationId?.trim()) {
        newErrors.organizationId = t("personalForm.errors.organizationId");
      } else if (!/^\d{6}-\d{4}$/.test(formData.organizationId.trim())) {
        newErrors.organizationId = t("personalForm.errors.organizationIdInvalid");
      }
      if (!formData.email.trim()) {
        newErrors.email = t("personalForm.errors.email");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t("personalForm.errors.emailInvalid");
      }
      if (!formData.municipality) {
        newErrors.municipality = t("personalForm.errors.municipality");
      }
      if (!formData.purposeoffunding?.trim()) {
        newErrors.purposeoffunding = t("personalForm.errors.purposeoffundingRequired");
      } else if (formData.purposeoffunding.trim().length < 50) {
        newErrors.purposeoffunding = t("personalForm.errors.purposeoffundingMinLength");
      }
      if (!captchaToken) {
        newErrors.captcha = t("personalForm.errors.captcha");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, captchaToken, t]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = e.target;
      const { name, value, type } = target;

      const isCheckbox = type === "checkbox";

      setFormData((prev) => ({
        ...prev,
        [name]: isCheckbox ? (target as HTMLInputElement).checked : value,
      }));

      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const lang = localStorage.getItem("i18nextLng") || "";
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      let submitData: SubmitForm;
      if (formData.whoAreYou !== t("personalForm.organization")) {
        submitData = {
          role: formData.whoAreYou,
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          age: parseInt(formData.age) || 0,
          study_level: formData.educationLevel,
          elite_athlete: formData.eliteAthlete,
          municipality: formData.municipality,
          sport: formData.sport,
          sport_name: formData.sportName || "",
          education_level_option: formData.educationLevelOption || "",
          education_level_other: formData.educationLevelOther || "",
          purpose_of_funding: formData.purposeoffunding || "",
          language: lang,
          include_municipality_filter:
            formData.includeMunicipalityFilter || false,
        };
      } else {
        submitData = {
          role: formData.whoAreYou,
          name: formData.name,
          email: formData.email,
          organizationName: formData.organizationName || "",
          organizationId: formData.organizationId || "",
          municipality: formData.municipality || "",
          elite_athlete: formData.eliteAthlete || "",
          sport: formData.sport || "",
          sport_name: formData.sportName || "",
          purpose_of_funding: formData.purposeoffunding || "",
          language: lang,
          include_municipality_filter:
            formData.includeMunicipalityFilter || false,
        };
      }

      try {
        await submitNewForm(submitData).unwrap();
        setCurrentRoute("/start/otp");
        if (formData.whoAreYou === t("personalForm.organization")) {
          localStorage.setItem("role", "organization");
        } else {
          localStorage.setItem("role", "individual");
        }
        localStorage.setItem("email", formData.email);
        navigate("/start/otp", { state: { email: formData.email } });
      } catch (error) {
        console.error("Form submission failed:", error);
        setErrors((prev) => ({
          ...prev,
          submit: t("personalForm.errors.submit"),
        }));
      }
    },
    [formData, navigate, submitNewForm, captchaToken, t, validateForm],
  );

  const renderSelect = useCallback(
    (
      name: keyof FormDataInterface,
      labelKey: string,
      options: { [key: string]: string },
      useKeyAsValue: boolean = false,
      helperText?: string,
    ) => (
      <div className="max-w-3xl">
        <label
          htmlFor={name}
          className="block text-gray-700 text-base font-medium mb-2"
        >
          {t(`personalForm.${labelKey}`)}
        </label>
        <div className="relative">
          <select
            id={name}
            name={name}
            // @ts-ignore
            value={formData[name]}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 max-h-60 overflow-y-auto`}
            size={1}
          >
            <option value="">{t("personalForm.placeholder.select")}</option>
            {Object.entries(options).map(([key, value]) => (
              <option key={key} value={useKeyAsValue ? key : value}>
                {value}
              </option>
            ))}
          </select>
          <ChevronRight
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
            size={20}
          />
        </div>
        {helperText && (
          <p className="mt-1 text-xs text-gray-500 italic">{helperText}</p>
        )}
        {errors[name] && (
          <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
        )}
      </div>
    ),
    [formData, handleChange, t, errors],
  );

  const municipalityOptions = t("list", { returnObjects: true }) as {
    [key: string]: string;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          {t("personalForm.title")}
        </h2>
        <p className="text-gray-700 mb-3">{t("personalForm.description")}</p>
        <div className="text-sm">
          <span className="text-gray-600">{t("personalForm.resumeText") || "Already started?"} </span>
          <button
            type="button"
            onClick={() => {
              setCurrentRoute("/start");
              navigate("/start");
            }}
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline hover:cursor-pointer focus:outline-none"
          >
            {t("personalForm.resumeLink") || "Resume progress"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {errors.submit && (
          <p className="text-red-500 text-center">{errors.submit}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderSelect("whoAreYou", "whoAreYou", {
            individual: t("personalForm.individual"),
            organization: t("personalForm.organization"),
          })}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-base font-medium mb-2"
            >
              {t("personalForm.name")}
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("personalForm.placeholder.name") || ""}
              className={`w-full p-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        </div>

        {formData.whoAreYou === t("personalForm.organization") && (
          <>
            <div>
              <label
                htmlFor="organizationName"
                className="block text-gray-700 text-base font-medium mb-2"
              >
                {t("personalForm.organizationName")}
              </label>
              <input
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder={
                  t("personalForm.placeholder.organizationName") || ""
                }
                className={`w-full p-3 border ${
                  errors.organizationName ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.organizationName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.organizationName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="organizationId"
                className="block text-gray-700 text-base font-medium mb-2"
              >
                {t("personalForm.organizationId")}
              </label>
               <input
                id="organizationId"
                name="organizationId"
                value={formData.organizationId}
                onChange={handleChange}
                placeholder={t("personalForm.placeholder.organizationId") || ""}
                className={`w-full p-3 border ${
                  errors.organizationId ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              <p className="text-gray-500 text-xs mt-1 italic">
                {t("personalForm.organizationIdHelper")}
              </p>
              {errors.organizationId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.organizationId}
                </p>
              )}
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-base font-medium mb-2"
          >
            {t("personalForm.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("personalForm.placeholder.email") || ""}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {formData.whoAreYou !== t("personalForm.organization") && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSelect("gender", "gender", {
                male: t("personalForm.male"),
                female: t("personalForm.female"),
                non_binary: t("personalForm.nonBinary"),
                preferNotSay: t("personalForm.noSay"),
                other: t("personalForm.otherGender"),
              })}
              <div>
                <label
                  htmlFor="age"
                  className="block text-gray-700 text-base font-medium mb-2"
                >
                  {t("personalForm.age")}
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder={t("personalForm.placeholder.age") || ""}
                  className={`w-full p-3 border ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </div>
            </div>

            <div className="max-w-3xl">
              {renderSelect("educationLevel", "educationLevel", {
                universityUndergraduate: t(
                  "personalForm.universityUndergraduate",
                ),
                universityMasters: t("personalForm.universityMasters"),
                phd: t("personalForm.phd"),
              })}
            </div>

            {formData.educationLevel && (
              <div>
                {formData.educationLevel === t("personalForm.upperSecondary") &&
                  renderSelect(
                    "educationLevelOption",
                    "educationLevelOption",
                    upperSecondaryOptions,
                  )}

                {formData.educationLevel ===
                  t("personalForm.universityUndergraduate") &&
                  renderSelect(
                    "educationLevelOption",
                    "educationLevelOption",
                    universityOptions,
                  )}

                {formData.educationLevel ===
                  t("personalForm.universityMasters") &&
                  renderSelect(
                    "educationLevelOption",
                    "educationLevelOption",
                    masterOptions,
                  )}

                {formData.educationLevel === t("personalForm.postSecondary") &&
                  renderSelect(
                    "educationLevelOption",
                    "educationLevelOption",
                    postSecondaryOptions,
                  )}

                {formData.educationLevel === t("personalForm.phd") &&
                  renderSelect(
                    "educationLevelOption",
                    "educationLevelOption",
                    phdOptions,
                  )}
              </div>
            )}

            {formData.educationLevelOption ===
              t("personalForm.sports.other") && (
              <div>
                <label
                  htmlFor="educationLevelOther"
                  className="block text-gray-700 text-base font-medium mb-2"
                >
                  {t("personalForm.subjectName")}
                </label>
                <input
                  id="educationLevelOther"
                  name="educationLevelOther"
                  type="text"
                  value={formData.educationLevelOther || ""}
                  onChange={handleChange}
                  placeholder={t("personalForm.sports.SportsName") || ""}
                  className={`w-full p-3 border ${
                    errors.sport ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.sport && (
                  <p className="mt-1 text-sm text-red-500">{errors.sport}</p>
                )}
              </div>
            )}
          </>
        )}
        <div>
          <label
            htmlFor="purposeoffunding"
            className="block text-gray-700 text-base font-medium mb-2"
          >
            {t("personalForm.purposeoffunding")}
          </label>
          <input
            id="purposeoffunding"
            name="purposeoffunding"
            type="text"
            value={formData.purposeoffunding || ""}
            onChange={handleChange}
            placeholder={t("personalForm.purposeoffunding") || ""}
            className={`w-full p-3 border ${
              errors.purposeoffunding ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          <p className="text-gray-500 italic text-sm mt-1">
            Examples: {getPurposeExamples()}
          </p>
          {errors.purposeoffunding && (
            <p className="mt-1 text-sm text-red-500">
              {errors.purposeoffunding}
            </p>
          )}
        </div>

        {renderSelect(
          "municipality",
          "municipality",
          municipalityOptions,
          true,
          formData.whoAreYou === t("personalForm.organization")
            ? t("personalForm.municipalityHelperOrg")
            : t("personalForm.municipalityHelperInd")
        )}

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

        {/* Delivery Time Notice Box */}
        {formData.whoAreYou && (
          <div className="p-4 mb-4 border border-indigo-100 rounded-lg bg-indigo-50/50 text-indigo-900 text-center font-medium shadow-sm transition-all duration-300">
            {formData.whoAreYou === t("personalForm.organization")
              ? t("personalForm.deliveryMessageOrganization")
              : t("personalForm.deliveryMessageIndividual")}
          </div>
        )}

        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            {isLoading ? t("personalForm.submitting") : t("personalForm.next")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalForm;
