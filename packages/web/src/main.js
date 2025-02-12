import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/globals.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import VueDatePicker from "@vuepic/vue-datepicker";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ToastPlugin);
app.component("VueDatePicker", VueDatePicker);
app.use(VueQueryPlugin);

const head = createHead();
app.use(head);

app.mount("#app");
