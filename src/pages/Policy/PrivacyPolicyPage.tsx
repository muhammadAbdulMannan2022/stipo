"use client";

import { useTranslation } from "react-i18next";

export default function TermsAndConditionsPage() {
  const { t } = useTranslation();

  const privacyContent = t("legal.privacyPolicyContent", {
    returnObjects: true,
  }) as string[];
  const rightsList = t("legal.rightsList", { returnObjects: true }) as string[];
  const disclaimer = t("legal.disclaimer.content", {
    returnObjects: true,
  }) as string[];
  const termsOfPurchaseSections = t("legal.termsOfPurchase.sections", {
    returnObjects: true,
  }) as {
    heading: string;
    text: string;
  }[];
  const termsOfUseSections = t("legal.termsOfUse.sections", {
    returnObjects: true,
  }) as {
    heading: string;
    text: string;
  }[];

  return (
    <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Privacy Policy */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          {t("legal.privacyPolicyTitle")}
        </h1>
        {privacyContent.map((paragraph, idx) => (
          <p key={idx} className="text-2ndcolor-text mb-4 whitespace-pre-line">
            {paragraph}
          </p>
        ))}

        {/* GDPR Rights */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {t("legal.yourRights")}
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-2ndcolor-text mb-8">
          {rightsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* Disclaimer */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {t("legal.disclaimer.title")}
        </h2>
        {disclaimer.map((line, idx) => (
          <p key={idx} className="text-2ndcolor-text mb-4 whitespace-pre-line">
            {line}
          </p>
        ))}

        {/* Terms of Purchase */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-16 mb-6">
          {t("legal.termsOfPurchase.title")}
        </h1>
        {termsOfPurchaseSections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {section.heading}
            </h2>
            <p className="text-2ndcolor-text whitespace-pre-line">
              {section.text}
            </p>
          </div>
        ))}

        {/* Terms of Use */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-16 mb-6">
          {t("legal.termsOfUse.title")}
        </h1>
        {termsOfUseSections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {section.heading}
            </h2>
            <p className="text-2ndcolor-text whitespace-pre-line">
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
