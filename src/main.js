import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueApexCharts from "vue3-apexcharts";
import { router } from "./router";
import { createPinia } from "pinia";
import EasySlider from "vue-easy-slider";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import JsonCSV from "vue-json-csv";

const pinia = createPinia();
const app = createApp(App);
app
  .use(VueApexCharts)
  .use(VueSweetalert2)
  .use(EasySlider)
  .use(pinia)
  .use(router)
  .component("downloadCsv", JsonCSV)
  .mount("#app");
