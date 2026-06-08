"use client";

import { useContext, useEffect, useState } from "react";
import { CheckCircle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
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

  // Mutation hooks
  const [generateData, { isLoading: isGetDataLoading }] =
    useGenerateDataMutation();
  const [pay, { isLoading: isPaymentProcessing }] = useCreatePaymentMutation();

  // States
  const [scholarshipCount, setScholarshipCount] = useState<number | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [accept, setAccept] = useState(false);

  // Fetch data once on mount
  useEffect(() => {
    if (!applicationToken) {
      setErrorMessage("No application token found");
      return;
    }

    generateData({ application_token: applicationToken })
      .unwrap()
      .then((response) => {
        console.log("Success response:", response);

        // Handle both snake_case and camelCase
        const count = response?.success_count ?? response?.successCount;
        if (count !== undefined && count !== null) {
          setScholarshipCount(Number(count));
        } else {
          setErrorMessage("No scholarship count returned");
        }
      })
      .catch((err: any) => {
        console.error("Generate data error:", err);
        setErrorMessage(err?.data?.error || "Failed to load results");
      });
  }, [applicationToken, generateData]);

  const handlePayment = async (pay_type: "klarna" | "card" | "paypal") => {
    if (!accept || !scholarshipCount || scholarshipCount === 0) return;

    const email = localStorage.getItem("email") || "";
    if (!email) return;

    try {
      setErrorMessage(null);

      const response = await pay({
        email,
        pay_type,
        coupon: coupon?.trim() || undefined,
        success_url:
          "https://funny-brigadeiros-2a37bf.netlify.app/start/paymentSuccess",
        cancel_url:
          "https://funny-brigadeiros-2a37bf.netlify.app/start/success",
      }).unwrap();

      if (response.payment_link) {
        window.location.assign(response.payment_link);
      }
    } catch (error: any) {
      if (error?.data?.error === "you have already paid.") {
        setCurrentRoute("/start/paymentSuccess");
        navigate("/start/paymentSuccess");
      } else {
        setErrorMessage(
          error?.data?.error || error?.error || t("success.paymentError"),
        );
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-lg mx-auto overflow-hidden">
      {scholarshipCount !== null && scholarshipCount > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t("success.title")}
          </h2>
        </div>
      )}

      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        {/* Loading State */}
        {isGetDataLoading && (
          <div className="flex flex-col items-center">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <p className="text-gray-600 mt-4">{t("warning")}</p>
          </div>
        )}

        {/* Error State */}
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

        {/* Success: Show Count */}
        {!isGetDataLoading && !errorMessage && scholarshipCount !== null && (
          <>
            {scholarshipCount > 0 ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="bg-green-500 rounded-full p-4">
                    <CheckCircle size={56} className="text-white" />
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-gray-700 mb-3 font-medium max-w-sm">
                  {t("success.message", { count: scholarshipCount })}
                </p>
              </>
            ) : (
              <p className="text-xl text-gray-700 mb-3">{t("noSc")}</p>
            )}
          </>
        )}

        {/* Payment Buttons - Only show if we have results and no error */}
        {!isGetDataLoading &&
          !errorMessage &&
          scholarshipCount !== null &&
          scholarshipCount > 0 && (
            <div className="flex flex-col gap-4 w-full max-w-sm mt-6">
              {/* Accept Terms */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="notRobot"
                  checked={accept}
                  onChange={() => setAccept(!accept)}
                  className="h-5 w-5 mt-1 text-indigo-600"
                />
                <label
                  htmlFor="notRobot"
                  className="ml-3 text-gray-700 text-base text-left"
                >
                  {t("personalForm.notRobot")}{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    className="underline text-blue-600"
                  >
                    {t("personalForm.readMore")}
                  </Link>
                </label>
              </div>

              {/* Coupon */}
              {!showCouponInput ? (
                <p
                  onClick={() => setShowCouponInput(true)}
                  className="text-blue-600 font-medium cursor-pointer hover:underline text-left"
                >
                  {t("success.haveCoupon") || "Have a coupon?"}
                </p>
              ) : (
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder={t("success.enterCoupon") || "Enter coupon code"}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2"
                />
              )}

              {/* Payment Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handlePayment("klarna")}
                  disabled={!accept || isPaymentProcessing}
                  className="py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isPaymentProcessing ? t("success.processing") : t("pk")}
                </button>

                <button
                  onClick={() => handlePayment("card")}
                  disabled={!accept || isPaymentProcessing}
                  className="py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {isPaymentProcessing ? t("success.processing") : t("pc")}
                </button>
              </div>

              <button
                onClick={() => handlePayment("paypal")}
                disabled={!accept || isPaymentProcessing}
                className="py-3 px-6 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
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
