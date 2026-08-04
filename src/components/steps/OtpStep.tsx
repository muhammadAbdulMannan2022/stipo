"use client";

import { useCallback, useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  useGoWithEmailMutation,
  useVeryfyOtpMutation,
} from "../../store/api/appSlice";
import toast, { Toaster } from "react-hot-toast";
import { RouteContext } from "../../App";

// Define types for the input element refs
type InputRef = HTMLInputElement | null;

const VerificationCodeInput = () => {
  const { setCurrentRoute }: any = useContext(RouteContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVeryfyOtpMutation();
  const [resendOtp] = useGoWithEmailMutation();
  const email = localStorage.getItem("email") || "";

  const codeLength: number = 6;
  const [code, setCode] = useState<string[]>(new Array(codeLength).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<InputRef[]>(new Array(codeLength).fill(null));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
      if (/^[0-9]$/.test(value) || value === "") {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value !== "" && index < codeLength - 1) {
          inputRefs.current[index + 1]?.focus();
        }

        if (newCode.every((digit) => digit !== "")) {
          // Could call backend here if needed immediately
        }
      }
    },
    [code, codeLength],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && code[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData
        .getData("text/plain")
        .slice(0, codeLength);
      const newCode = pasteData
        .split("")
        .filter((char) => /^[0-9]$/.test(char));

      if (newCode.length === codeLength) {
        setCode(newCode);
      } else {
        const updatedCode = [...code];
        for (let i = 0; i < newCode.length; i++) {
          updatedCode[i] = newCode[i];
        }
        setCode(updatedCode);
        inputRefs.current[Math.min(newCode.length, codeLength - 1)]?.focus();
      }
    },
    [code, codeLength],
  );

  const getOtpErrorMessage = useCallback(
    (error: any) => {
      const backendMessage =
        error?.data?.detail ||
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "";
      const normalizedMessage =
        typeof backendMessage === "string" ? backendMessage.trim() : "";

      const attemptsMatch = normalizedMessage.match(
        /invalid\s+otp\s+code\.?\s*(\d+)\s+attempts?\s+remaining/i,
      );

      if (attemptsMatch) {
        return t("verification.invalidOtpAttempts", {
          attempts: attemptsMatch[1],
        });
      }

      if (
        /no\s+scholarshipapplicant\s+matches\s+the\s+given\s+query/i.test(
          normalizedMessage,
        )
      ) {
        return t("verification.noScholarshipApplicant");
      }

      return (
        t("verification.invalidCode") ||
        "That code doesn't look right. Please check the digits and try again, or request a new code."
      );
    },
    [t],
  );

  const handleNextClick = useCallback(async () => {
    const fullCode = code.join("");
    if (fullCode.length !== codeLength) {
      setErrorMessage(t("verification.incompleteCode"));
      return;
    }
    try {
      setErrorMessage(null); // Clear any previous errors
      const response = await verifyOtp({
        otp: String(fullCode),
        email,
      }).unwrap();
      // Assuming the backend returns a success indicator
      if (response) {
        localStorage.setItem("email", email);
        localStorage.setItem("application_token", response.application_token);
        setCurrentRoute("/start/success");
        navigate("/start/success");
      }
    } catch (error: any) {
      setErrorMessage(getOtpErrorMessage(error));
    }
  }, [
    code,
    codeLength,
    email,
    getOtpErrorMessage,
    navigate,
    setCurrentRoute,
    verifyOtp,
  ]);

  const handleResendCode = useCallback(async () => {
    console.log(email);
    if (email) {
      try {
        const res = await resendOtp({ email, language: i18n.language });
        toast.success(res.data.message || "no data");
      } catch (error: any) {
        toast.error(
          error?.error ||
            error?.data?.error ||
            t("verification.resendFailed") ||
            "We couldn’t resend the code. Please try again.",
        );
      }
    }
    // Handle resend logic
    console.log("Resend clicked");
  }, [email, resendOtp, i18n.language, t]);

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
      <Toaster />
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-2ndcolor-text mb-2">
          {t("verification.title")}
        </h2>
        <p className="text-2ndcolor-text">{t("verification.description")}</p>
      </div>

      <div className="p-6 text-center">
        <p className="text-2ndcolor-text text-lg font-medium mb-4">
          {t("verification.enterCodeLabel")}
        </p>
        <div className="flex justify-center space-x-2 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index)
              }
              onPaste={handlePaste}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-12 text-center text-xl font-bold text-2ndcolor-text border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
              placeholder="*"
              aria-label={`Digit ${index + 1} of verification code`}
            />
          ))}
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <p className="text-2ndcolor-text mb-8">
          {t("verification.resendPrompt")}{" "}
          <button
            onClick={handleResendCode}
            className="text-indigo-600 hover:underline focus:outline-none hover:cursor-pointer"
          >
            {t("verification.resendLink")}
          </button>
        </p>

        <div className="text-center">
          <button
            onClick={handleNextClick}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700 hover:cursor-pointer
              transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? t("verification.loading") : t("verification.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
