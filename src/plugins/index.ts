import { createPinia } from "pinia";
import type { App } from "vue";
import vuetify from "./vuetify";
import router from "@/router";
import i18n from "./i18n";

const pinia = createPinia();

export function registerPlugins(app: App) {
  app.use(i18n).use(vuetify).use(router).use(pinia);
}
