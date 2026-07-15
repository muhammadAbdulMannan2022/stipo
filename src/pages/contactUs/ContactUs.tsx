"use client";
import { useTranslation } from "react-i18next";
import CallToActionSection from "../landing/sections/CallToAction";
import ReCAPTCHA from "react-google-recaptcha";
import { useCallback, useState } from "react";
import { useSubmitContactFormMutation } from "../../store/api/appSlice";

export default function ContactUsPage() {
  const { t, i18n } = useTranslation();
  const [submitContactForm, { isLoading }] = useSubmitContactFormMutation();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    captcha?: string;
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });
  const captchaLanguage = i18n.language?.startsWith("sv") ? "sv" : "en";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setSubmitMessage({ type: null, text: "" });
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors: typeof errors = {};

      if (!formValues.name.trim()) {
        newErrors.name =
          t("contact.form.errors.name") || "Please enter your name.";
      }

      if (!formValues.email.trim()) {
        newErrors.email =
          t("contact.form.errors.email") || "Please enter your email.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
        newErrors.email =
          t("contact.form.errors.emailInvalid") ||
          "Please enter a valid email address.";
      }

      if (!formValues.message.trim()) {
        newErrors.message =
          t("contact.form.errors.message") || "Please enter your message.";
      }

      if (!captchaToken) {
        newErrors.captcha =
          t("contact.form.errors.captcha") || "Please complete the CAPTCHA.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      setSubmitMessage({ type: null, text: "" });

      try {
        await submitContactForm({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          message_body: formValues.message.trim(),
          token: captchaToken,
        }).unwrap();

        setSubmitMessage({
          type: "success",
          text:
            t("contact.form.success") ||
            "Your message has been sent successfully.",
        });
        setFormValues({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        setCaptchaKey((prev) => prev + 1);
      } catch {
        setSubmitMessage({
          type: "error",
          text:
            t("contact.form.error") ||
            "We couldn't send your message. Please try again.",
        });
      }
    },
    [
      captchaToken,
      formValues.email,
      formValues.message,
      formValues.name,
      submitContactForm,
      t,
    ],
  );

  return (
    <>
      <main className="">
        <div className=" w-full h-full flex-grow relative flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="relative z-20 w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-black mb-2">
                {t("contact.title")}
              </h1>
              <p className="text-gray-900">{t("contact.subtitle")}</p>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-2ndcolor-text text-sm font-medium mb-2"
                >
                  {t("contact.form.firstName")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder={t("contact.form.placeholder")}
                  className="w-full p-3 rounded-md bg-white/90 border border-black/30 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-2ndcolor-text text-sm font-medium mb-2"
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder={t("contact.form.placeholder")}
                  className="w-full p-3 rounded-md bg-white/90 border border-black/30 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-2ndcolor-text text-sm font-medium mb-2"
                >
                  {t("contact.form.howCanWeHelp")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.placeholder")}
                  className="w-full resize-none p-3 rounded-md bg-white/90 border border-black/30 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Google reCAPTCHA */}
              <div className="md:col-span-2">
                <ReCAPTCHA
                  key={`${captchaLanguage}-${captchaKey}`}
                  hl={captchaLanguage}
                  sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setErrors((prev) => ({ ...prev, captcha: undefined }));
                  }}
                  onExpired={() => {
                    setCaptchaToken(null);
                  }}
                />
                {errors.captcha && (
                  <p className="mt-2 text-sm text-red-400">{errors.captcha}</p>
                )}
                {submitMessage.text && (
                  <p
                    className={`mt-2 text-sm ${
                      submitMessage.type === "success"
                        ? "text-green-600"
                        : "text-red-400"
                    }`}
                  >
                    {submitMessage.text}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white
                  bg-gradient-to-t from-[#7C6FF7] to-[#4D37E9]
                  hover:from-[#7C6FF7] hover:to-[#4D37E9]
                  transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : t("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <CallToActionSection />
    </>
  );
}
