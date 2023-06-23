import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//Language files
import EnglishLang from "./translations/english.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: EnglishLang,
        },
        np: {
            translation: {
                "Welcome to React": "Welcome to React in Nepali",
            },
        },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
