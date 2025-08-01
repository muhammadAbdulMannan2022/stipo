import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../locales/en.json'
import swedish from '../locales/swedish.json'

const resources = {
    en: { translation: en },
    sv: { translation: swedish }
}


const savedLanguage = localStorage.getItem('i18nextLng') || 'sv'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'sv',
        debug: false,
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    })

export default i18n
