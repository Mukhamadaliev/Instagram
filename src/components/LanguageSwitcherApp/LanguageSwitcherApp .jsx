import React, { createContext, useContext, useState } from "react";

const translations = {
  uz: {
    greeting: "Salom!",
    description: "Bu sahifa tilni o'zgartirish misoli (O'zbekcha).",
    changeLabel: "Tilni tanlang:",
    btn: "Bosish",
  },
  ru: {
    greeting: "Привет!",
    description: "Это пример переключения языка (на русском).",
    changeLabel: "Выберите язык:",
    btn: "Нажать",
  },
  en: {
    greeting: "Hello!",
    description: "This is a language switcher example (English).",
    changeLabel: "Choose language:",
    btn: "Click",
  },
};

// --- Language context ---
const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [lang, setLang] = useState("uz");
  const t = (key) => translations[lang][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// --- Custom hook for convenience ---
function useLang() {
  return useContext(LanguageContext);
}

// --- Language selector component ---
function LangSelect() {
  const { lang, setLang, t } = useLang();
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="font-medium">{t("changeLabel")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="ml-2 rounded-md border px-2 py-1"
      >
        <option value="uz">🇺🇿 O'zbekcha</option>
        <option value="ru">🇷🇺 Русский</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </label>
  );
}

// --- Example content that uses translations ---
function ContentCard() {
  const { t } = useLang();
  return (
    <div className="max-w-md p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-2">{t("greeting")}</h2>
      <p className="mb-4">{t("description")}</p>
      <button className="px-4 py-2 rounded-lg border font-semibold">{t("btn")}</button>
    </div>
  );
}

// --- Main exported component ---
export default function LanguageSwitcherApp() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4 justify-center">
            <LangSelect />
            <p className="text-xs text-gray-500">Tip: siz tilni saqlamoqchi bo'lsangiz, localStorage qo'shish mumkin.</p>
          </div>

          <div className="flex items-center justify-center">
            <ContentCard />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
