import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { default as en } from "./en.json";
import { default as es } from "./es.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { en, es },
    lng: "es",
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
