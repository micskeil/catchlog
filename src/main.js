import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseCard from "./components/BaseElements/BaseCard.vue";

const app = createApp(App);

app.component("base-card", BaseCard);

app.mount("#app");
