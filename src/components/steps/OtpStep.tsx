"use client"

import { useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router"
import { useVeryfyOtpMutation } from "../../store/api/appSlice"

// Define types for the input element refs
type InputRef = HTMLInputElement | null

const VerificationCodeInput = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [verifyOtp, { isLoading }] = useVeryfyOtpMutation()
    const { email } = useLocation().state || { email: "" }

    const codeLength: number = 4
    const [code, setCode] = useState<string[]>(new Array(codeLength).fill(""))
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const inputRefs = useRef<InputRef[]>(new Array(codeLength).fill(null))

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const value = e.target.value
            if (/^[0-9]$/.test(value) || value === "") {
                const newCode = [...code]
                newCode[index] = value
                setCode(newCode)

                if (value !== "" && index < codeLength - 1) {
                    inputRefs.current[index + 1]?.focus()
                }

                if (newCode.every((digit) => digit !== "")) {
                    // Could call backend here if needed immediately
                }
            }
        },
        [code, codeLength]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === "Backspace" && code[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus()
            }
        },
        [code]
    )

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault()
            const pasteData = e.clipboardData.getData("text/plain").slice(0, codeLength)
            const newCode = pasteData.split("").filter((char) => /^[0-9]$/.test(char))

            if (newCode.length === codeLength) {
                setCode(newCode)
            } else {
                const updatedCode = [...code]
                for (let i = 0; i < newCode.length; i++) {
                    updatedCode[i] = newCode[i]
                }
                setCode(updatedCode)
                inputRefs.current[Math.min(newCode.length, codeLength - 1)]?.focus()
            }
        },
        [code, codeLength]
    )

    const handleNextClick = useCallback(async () => {
        const fullCode = code.join("")
        if (fullCode.length !== codeLength) {
            setErrorMessage(t("verification.incompleteCode"))
            return
        }

        try {
            setErrorMessage(null) // Clear any previous errors
            const response = await verifyOtp({ otp: String(fullCode), email }).unwrap()
            // Assuming the backend returns a success indicator
            if (response) {
                navigate("/start/success")
            }
        } catch (error: any) {
            console.log(error)
            setErrorMessage(error?.data?.detail || error?.data?.error || "An error occurred")
        }
    }, [code, codeLength, navigate, t, verifyOtp])

    const handleResendCode = useCallback(() => {
        // Handle resend logic
        console.log("Resend clicked")
    }, [])

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
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
                <div className="flex justify-center space-x-4 mb-8">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            ref={(el: HTMLInputElement | null) => {
                                inputRefs.current[index] = el
                            }}
                            className="w-14 h-14 text-center text-2xl font-bold text-2ndcolor-text border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
                            placeholder="*"
                            aria-label={`Digit ${index + 1} of verification code`}
                        />
                    ))}
                </div>

                {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                )}

                <p className="text-2ndcolor-text mb-8">
                    {t("verification.resendPrompt")}{" "}
                    <button
                        onClick={handleResendCode}
                        className="text-indigo-600 hover:underline focus:outline-none"
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
    )
}

export default VerificationCodeInput