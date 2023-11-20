import { createI18n } from "vue-i18n";
import en from "../localization/en.json";
import ua from "../localization/ua.json";

type MessageSchema = typeof en;

const translations = {
  en: en,
  ua: ua,
};

const messages = Object.assign(translations);

const i18n = createI18n<[MessageSchema], "en" | "ua">({
  legacy: false,
  locale: localStorage.getItem("lang") || "ua",
  messages,
});

export default i18n;
