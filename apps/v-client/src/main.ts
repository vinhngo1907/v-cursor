import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue"

import router from "./router";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";


const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);
app.config.errorHandler = (error, vm, info) => {
    console.log("error", error, "info", info);
};
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");