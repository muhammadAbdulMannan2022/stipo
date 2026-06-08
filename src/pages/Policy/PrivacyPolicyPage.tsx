"use client";

import { useTranslation } from "react-i18next";

export default function TermsAndConditionsPage() {
  const { t } = useTranslation();

  const privacyTitle = t("legal.privacyPolicyTitle");
  const privacyContent = t("legal.privacyPolicyContent", {
    returnObjects: true,
  }) as string[];
  const termsOfPurchaseTitle = t("legal.termsOfPurchaseTitle");
  const termsOfPurchaseContent = t("legal.termsOfPurchaseContent", {
    returnObjects: true,
  }) as string[];
  const termsOfUseTitle = t("legal.termsOfUseTitle");
  const termsOfUseContent = t("legal.termsOfUseContent", {
    returnObjects: true,
  }) as string[];

  function renderLegalBlock(block: string, index: number) {
    // 1. Table Detection
    if (block.startsWith("|")) {
      const lines = block.trim().split("\n");
      const rows = lines.map((line) =>
        line
          .split("|")
          .map((cell) => cell.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      );

      const headerRow = rows[0];
      const dataRows = rows.slice(2); // Skip separator row at index 1

      return (
        <div key={index} className="overflow-x-auto my-6 border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headerRow.map((cell, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={rIdx % 2 === 1 ? "bg-gray-50/50" : "bg-white"}
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-6 py-4 text-sm text-gray-700 whitespace-pre-line border-b border-gray-200"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 2. Heading Detection (e.g. "1.1 Data Controller" or "1. Privacy Policy")
    const isHeading = /^[0-9]\.[0-9]+|^[0-9]\.\s/.test(block);
    if (isHeading) {
      const isSub = /^[0-9]\.[0-9]+/.test(block);
      return isSub ? (
        <h2
          key={index}
          className="text-2xl font-bold text-gray-900 mt-10 mb-4 border-b border-gray-100 pb-2"
        >
          {block}
        </h2>
      ) : (
        <h1
          key={index}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-16 mb-6"
        >
          {block}
        </h1>
      );
    }

    // 3. List Detection (individual items starting with "–" separated by \n)
    if (block.startsWith("–") || block.includes("\n–")) {
      const items = block.split("\n").map((item) =>
        item.replace(/^[–-•]\s*/, "").trim()
      );
      return (
        <ul key={index} className="list-disc pl-5 space-y-2 text-gray-700 my-4">
          {items.map((item, idx) => (
            <li key={idx} className="whitespace-pre-line">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    // 4. Regular Paragraph
    return (
      <p
        key={index}
        className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line"
      >
        {block}
      </p>
    );
  }

  return (
    <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Privacy Policy */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          {privacyTitle}
        </h1>
        {privacyContent.map((block, idx) => renderLegalBlock(block, idx))}

        {/* Terms of Purchase */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-16 mb-6">
          {termsOfPurchaseTitle}
        </h1>
        {termsOfPurchaseContent.map((block, idx) => renderLegalBlock(block, idx))}

        {/* Terms of Use */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-16 mb-6">
          {termsOfUseTitle}
        </h1>
        {termsOfUseContent.map((block, idx) => renderLegalBlock(block, idx))}
      </div>
    </main>
  );
}
