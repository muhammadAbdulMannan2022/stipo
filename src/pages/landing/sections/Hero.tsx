"use client";

import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[92vh] ">
      <main className="flex-grow relative overflow-hidden flex items-center justify-center py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}

        <div className="max-w-7xl mx-auto flex justify-between flex-col-reverse md:flex-row gap-12 items-center z-10">
          {/* Left Content Section */}
          <div className="text-center flex-1 md:text-left px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold  text-[#4133ac] leading-tight mb-6">
              <Trans
                i18nKey="home.heading"
                components={[<span className="text-primary-text" />]}
              />
            </h1>

            <p className="text-base sm:text-lg text-2ndcolor-text mb-8 max-w-xl mx-auto md:mx-0">
              {t("home.description")}
            </p>
            <Link
              to="/start"
              className="bg-primary-text hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer"
            >
              {t("home.cta")}
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="flex flex-1 justify-center md:justify-end px-4">
            <img
              src="/test.jpg"
              alt={t("home.img_alt")}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-full shadow-md shadow-indigo-300"
            />
            {/* <img
                            src="/student1.png"
                            alt={t("home.img_alt")}
                            width={600}
                            height={800}
                            className="max-w-full h-auto"
                        /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
