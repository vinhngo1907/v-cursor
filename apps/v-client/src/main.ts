import { createApp } from "vue";
import { createPinia } from "pinia";
import './style.css'
import App from './App.vue'


const app = createApp(App);
app.config.errorHandler = (error, vm, info) => {
    console.log("error", error, "info", info);
};
app.mount("#app");