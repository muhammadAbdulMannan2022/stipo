"use client";
import { useTranslation } from "react-i18next";
import CallToActionSection from "../landing/sections/CallToAction";
import ReCAPTCHA from "react-google-recaptcha";
import { useCallback, useState } from "react";

export default function ContactUsPage() {
  const { t } = useTranslation();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ captcha?: string }>({});

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!captchaToken) {
        setErrors({
          captcha:
            t("contact.form.errors.captcha") || "Please complete the CAPTCHA.",
        });
        return;
      }

      // Proceed with form submission logic (e.g., API call)
      console.log("Form submitted with CAPTCHA token:", captchaToken);
      setErrors({});
      // Add your form submission logic here (e.g., send data to an API)
    },
    [captchaToken, t]
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
              {["firstName", "email"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-2ndcolor-text text-sm font-medium mb-2"
                  >
                    {t(`contact.form.${field}`)}
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phoneNumber"
                        ? "tel"
                        : "text"
                    }
                    id={field}
                    name={field}
                    placeholder={t("contact.form.placeholder")}
                    className="w-full p-3 rounded-md bg-white/90 border border-black/30 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label
                  htmlFor="howCanWeHelp"
                  className="block text-2ndcolor-text text-sm font-medium mb-2"
                >
                  {t("contact.form.howCanWeHelp")}
                </label>
                <textarea
                  id="howCanWeHelp"
                  name="howCanWeHelp"
                  rows={5}
                  placeholder={t("contact.form.placeholder")}
                  className="w-full resize-none p-3 rounded-md bg-white/90 border border-black/30 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Google reCAPTCHA */}
              <div className="md:col-span-2">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setErrors((prev) => ({ ...prev, captcha: undefined }));
                  }}
                />
                {errors.captcha && (
                  <p className="mt-2 text-sm text-red-400">{errors.captcha}</p>
                )}
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white
                  bg-gradient-to-t from-[#7C6FF7] to-[#4D37E9]
                  hover:from-[#7C6FF7] hover:to-[#4D37E9]
                  transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:cursor-pointer"
                >
                  {t("contact.form.submit")}
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
