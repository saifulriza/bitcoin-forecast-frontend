import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue3-apexcharts";
import { FontAwesomeIcon } from "@/plugins/font-awesome";

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .component("fa", FontAwesomeIcon)
  .mount("#riza");
