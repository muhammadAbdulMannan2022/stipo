"use client";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useGoWithEmailMutation } from "../../store/api/appSlice";
import { RouteContext } from "../../App";

const EmailInputCard: React.FC = () => {
  const { setCurrentRoute }: any = useContext(RouteContext);
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [sendOtp, { isLoading }] = useGoWithEmailMutation();

  //   const handleStartNewAnalysis = () => {
  //     setEmail("");
  //     setCurrentRoute("/start/2");
  //     navigate("/start/2");
  //   };

  const getFriendlyErrorMessage = (err: any, fallback: string) => {
    const payload = err?.data ?? err;

    if (typeof payload === "string") {
      return payload;
    }

    if (payload?.detail) {
      return payload.detail;
    }

    if (payload?.message) {
      return payload.message;
    }

    if (payload?.error) {
      return payload.error;
    }

    if (payload?.status) {
      return fallback;
    }

    return fallback;
  };

  const handleNext = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return setError(t("emailCard.error"));
    }

    try {
      setError(null);
      await sendOtp({ email: normalizedEmail }).unwrap();
      setEmail("");
      setCurrentRoute("/start/otp");
      navigate("/start/otp");
      localStorage.setItem("email", normalizedEmail);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err, t("emailCard.failed")));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-2ndcolor-text mb-2">
          {t("emailCard.title")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <label
            htmlFor="email-input"
            className="block text-2ndcolor-text text-lg font-medium mb-2"
          >
            {t("emailCard.label")}
          </label>
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailCard.placeholder")}
            className="w-full md:min-w-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <p className="text-sm text-gray-500 mt-2">
            {t("emailCard.helperText")}
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* <p className="text-gray-600 text-sm mb-8">{t("emailCard.subtitle")}</p> */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* <button
                        onClick={handleStartNewAnalysis}
                        className="hover:cursor-pointer flex-1 py-3 px-6 rounded-lg border border-primary-text text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {t("emailCard.startNew")}
                    </button> */}
          <button
            onClick={handleNext}
            className="hover:cursor-pointer flex-1 py-3 px-6 rounded-lg bg-primary-text text-white font-semibold hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? t("emailCard.loading") : t("emailCard.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailInputCard;
