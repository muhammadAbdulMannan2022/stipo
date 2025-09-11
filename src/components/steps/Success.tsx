"use client";

import { useContext, useEffect, useState } from "react";
import { CheckCircle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  useCreatePaymentMutation,
  useGenerateDataMutation,
} from "../../store/api/appSlice";
import { RouteContext } from "../../App";

interface RouteContextType {
  setCurrentRoute: (route: string) => void;
}

const Success: React.FC = () => {
  const { setCurrentRoute } = useContext(RouteContext) as RouteContextType;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const applicationToken = localStorage.getItem("application_token") || "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pay] = useCreatePaymentMutation();
  const [generateData, { isLoading: isGetDataLoading }] =
    useGenerateDataMutation();
  const [scholarshipCount, setScholarships] = useState<number | "loading...">(
    "loading..."
  );
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // coupon toggle + input state
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [coupon, setCoupon] = useState<string>("");

  const fetchData = async () => {
    if (applicationToken) {
      try {
        const response = await generateData({
          application_token: applicationToken,
        }).unwrap();
        const count = Number(response.success_count);
        if (!isNaN(count)) {
          setScholarships(count);
        } else {
          setErrorMessage("Invalid scholarship count received");
        }
      } catch (error: any) {
        setErrorMessage(error?.data?.error || "error");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePayment = async (pay_type: "klarna" | "card" | "paypal") => {
    const email = localStorage.getItem("email") || "";
    try {
      setErrorMessage(null);
      if (!email) return;

      setIsPaymentProcessing(true);

      const response = await pay({
        email,
        pay_type,
        coupon: coupon?.trim() || undefined, // only send if user entered one
        success_url: "http://localhost:5151/start/paymentSuccess",
        cancel_url: "http://localhost:5151/start/success",
      }).unwrap();

      if (response.payment_link) {
        window.location.assign(response.payment_link);
      } else {
        setErrorMessage(t("success.paymentFailed"));
      }
    } catch (error: any) {
      if (error?.data?.error === "you have already paid.") {
        setCurrentRoute("/start/paymentSuccess");
        navigate("/start/paymentSuccess");
      } else {
        setErrorMessage(
          error?.error || error?.data?.error || t("success.paymentError")
        );
      }
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-lg mx-auto overflow-hidden">
      {typeof scholarshipCount === "number" && scholarshipCount > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t("success.title")}
          </h2>
        </div>
      )}

      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        {!errorMessage &&
          typeof scholarshipCount === "number" &&
          scholarshipCount > 0 && (
            <div className="flex justify-center mb-6">
              <div className="bg-green-500 rounded-full p-4 flex items-center justify-center">
                <CheckCircle size={56} className="text-white" />
              </div>
            </div>
          )}

        {!errorMessage && scholarshipCount === "loading..." ? (
          <div className="flex flex-col items-center">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <p className="text-gray-600 mt-4">{t("warning")}</p>
          </div>
        ) : typeof scholarshipCount === "number" && scholarshipCount < 1 ? (
          <p className="text-xl text-gray-700 mb-8">{t("noSc")}</p>
        ) : typeof scholarshipCount === "number" ? (
          <p className="text-xl text-gray-700 mb-8 font-medium">
            {t("success.message", { count: scholarshipCount })}
          </p>
        ) : null}

        {errorMessage && (
          <div className="flex flex-col items-center justify-center">
            <img src="/img.jpg" width={150} height={150} alt="Error" />
            <RotateCcw
              className="hover:cursor-pointer my-6 text-blue-600 font-bold hover:scale-110 transition-transform duration-200"
              size={32}
              onClick={() => window.location.reload()}
            />
            <p className="text-red-500 text-lg">{errorMessage}</p>
          </div>
        )}

        {!errorMessage && scholarshipCount !== "loading..." && (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {/* Coupon section */}
            {!showCouponInput ? (
              <p
                onClick={() => setShowCouponInput(true)}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                {t("success.haveCoupon") || "Have a coupon?"}
              </p>
            ) : (
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder={t("success.enterCoupon") || "Enter coupon code"}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handlePayment("klarna")}
                disabled={isPaymentProcessing || isGetDataLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md ${
                  isPaymentProcessing || isGetDataLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isPaymentProcessing ? t("success.processing") : t("pk")}
              </button>

              <button
                onClick={() => handlePayment("card")}
                disabled={isPaymentProcessing || isGetDataLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md ${
                  isPaymentProcessing || isGetDataLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isPaymentProcessing ? t("success.processing") : t("pc")}
              </button>
            </div>

            <button
              onClick={() => handlePayment("paypal")}
              disabled={isPaymentProcessing || isGetDataLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300 shadow-md ${
                isPaymentProcessing || isGetDataLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isPaymentProcessing ? t("success.processing") : t("pl")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
