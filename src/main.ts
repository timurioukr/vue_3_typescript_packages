import { registerPlugins } from "@/plugins";
import { createApp } from "vue";
import ModalWindow from "@/components/ModalWindow.vue";
import App from "@/App.vue";

const app = createApp(App);

registerPlugins(app);

app.component("ModalWindow", ModalWindow);
app.mount("#app");
