import React, { FC, createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ILang {
    selectedLang: "de" | "en" | "es" | "fr" | "ja" | "zh";
}
const initialState: ILang = {
    selectedLang: "en",
};

export const LanguageContext = createContext(initialState.selectedLang);

export const LanguageProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(initialState.selectedLang);

    useEffect(() => {
        const handleLanguageChange = (lang: string): void => {
            i18n.changeLanguage(lang);
        };
    }, [i18n, lang]);

    return (
        <LanguageContext.Provider value={{ setLang, lang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
