import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ToggleSwitch = () => {
    const { i18n } = useTranslation()
    const [isChecked, setIsChecked] = useState(false)

    // Load saved language from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('i18nextLng')
        const isSV = savedLang === 'sv'
        setIsChecked(isSV)
        i18n.changeLanguage(savedLang || 'en') // default to 'en' if not set
    }, [i18n])

    // Toggle language and persist in localStorage
    const toggleLanguage = () => {
        const newLang = isChecked ? 'en' : 'sv'
        i18n.changeLanguage(newLang)
        localStorage.setItem('i18nextLng', newLang)
        setIsChecked(!isChecked)
    }

    return (
        <div className="flex justify-center items-center">
            <div
                onClick={toggleLanguage}
                className="relative w-20 h-10 bg-gray-200 rounded-full p-1 hover:cursor-pointer"
            >
                <input
                    type="checkbox"
                    id="toggle"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    checked={isChecked}
                    readOnly
                />
                <div
                    className="w-full h-full rounded-full flex items-center justify-between px-3 text-primary-text font-semibold bg-[#EDEBF6]"
                >
                    <span className={`${isChecked ? 'opacity-100' : 'opacity-0'}`}>
                        SV
                    </span>
                    <div
                        className={`absolute w-8 h-8 border bg-primary-text rounded-full transition-all duration-300 ${isChecked ? 'left-[calc(100%-2.4rem)]' : 'left-1'
                            }`}
                    />
                    <span className={`${isChecked ? 'opacity-0' : 'opacity-100'}`}>
                        EN
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ToggleSwitch
