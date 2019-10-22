import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


import ar from "./locales/ar/index"
import en from "./locales/en/index"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        resources: {
            "ar": ar,
            "en": en,
        },

        interpolation: {
            escapeValue: false,
        }
    })


export default i18n;
