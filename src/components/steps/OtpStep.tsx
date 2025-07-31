"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router"

interface VerificationCodeInputProps {
    title?: string
    description?: string
    messageTitle?: string
    messageDescription?: string
    codeLength?: number
    onCodeComplete?: (code: string) => void
    onResendCode?: () => void
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
    title = "Enter Verification code",
    description = "Lorem Ipsum is simply dummy text of the printing and type",
    messageTitle = "We have sent you an activation code",
    messageDescription = "An email has been sent to you email address containing a code to reset your password.",
    codeLength = 4,
    onCodeComplete,
    onResendCode,
}) => {
    const [code, setCode] = useState<string[]>(new Array(codeLength).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(codeLength).fill(null))

    const navigate = useNavigate()

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const value = e.target.value
            if (/^[0-9]$/.test(value) || value === "") {
                const newCode = [...code]
                newCode[index] = value
                setCode(newCode)

                // Move to next input if a digit is entered
                if (value !== "" && index < codeLength - 1) {
                    inputRefs.current[index + 1]?.focus()
                }

                // If all digits are entered, call onCodeComplete
                if (newCode.every((digit) => digit !== "")) {
                    onCodeComplete?.(newCode.join(""))
                }
            }
        },
        [code, codeLength, onCodeComplete],
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === "Backspace" && code[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus()
            }
        },
        [code],
    )

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault()
            const pasteData = e.clipboardData.getData("text/plain").slice(0, codeLength)
            const newCode = pasteData.split("").filter((char) => /^[0-9]$/.test(char))

            if (newCode.length === codeLength) {
                setCode(newCode)
                onCodeComplete?.(newCode.join(""))
            } else {
                // Fill as much as possible and move focus
                const updatedCode = [...code]
                for (let i = 0; i < newCode.length; i++) {
                    updatedCode[i] = newCode[i]
                }
                setCode(updatedCode)
                inputRefs.current[Math.min(newCode.length, codeLength - 1)]?.focus()
            }
        },
        [codeLength, onCodeComplete, code],
    )

    const handleNextClick = () => {
        const fullCode = code.join("")
        if (fullCode.length === codeLength) {
            onCodeComplete?.(fullCode)
            navigate("/start/success")
        } else {
            // Handle incomplete code submission, e.g., show error
            console.log("Please enter the complete verification code.")
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{messageTitle}</h3>
                <p className="text-gray-600 mb-8">{messageDescription}</p>

                <p className="text-gray-800 text-lg font-medium mb-4">Enter verification code</p>
                <div className="flex justify-center space-x-4 mb-8">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-14 h-14 text-center text-2xl font-bold text-gray-900
                         border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500
                         bg-gray-100"
                            placeholder="*"
                            aria-label={`Digit ${index + 1} of verification code`}
                        />
                    ))}
                </div>

                <p className="text-gray-600 mb-8">
                    If you didn&apos;t receive a code!{" "}
                    <button onClick={onResendCode} className="text-indigo-600 hover:underline focus:outline-none">
                        Click here
                    </button>
                </p>

                {/* Next Button */}
                <div className="text-center">
                    <button
                        onClick={handleNextClick}
                        className="w-full py-3 px-6 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:from-purple-700 hover:to-indigo-700
                       transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerificationCodeInput
