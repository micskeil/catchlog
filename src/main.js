import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth, db } from "./firebase";

// Import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/style.css";

// This is the main template for content elements
import BaseCard from "./components/BaseElements/BaseCard.vue";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(auth)
  .use(db);

app.component("base-card", BaseCard);

app.mount("#app");
