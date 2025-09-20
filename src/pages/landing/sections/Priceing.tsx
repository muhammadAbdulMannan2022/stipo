import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type PlanKey = "student" | "phd" | "nonprofit";

const plans: PlanKey[] = ["student", "phd", "nonprofit"];

const PricingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-16 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-text">
          {t("pricing.title")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {/* Optional subtitle if needed */}
        </p>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3 mt-10">
          {plans.map((key) => (
            <div
              key={key}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 p-8 transition-all duration-300 flex flex-col"
            >
              {/* Price */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t(`pricing.plans.${key}.price`)}
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-lg flex-grow leading-relaxed">
                {t(`pricing.plans.${key}.desc`)}
              </p>

              {/* Call to Action */}
              <button
                onClick={() => navigate("/start")}
                className="mt-6 w-full hover:cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 hover:from-blue-600 hover:to-indigo-700 transition-colors"
              >
                {t("getStarted")}
              </button>

              {/* Cool hover glow */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-400/50 transition pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
