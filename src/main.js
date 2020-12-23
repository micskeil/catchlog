import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth, db } from "./firebase";

// Import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/style.css";

// Global components
import BaseCard from "./components/BaseElements/BaseCard.vue";
import BaseButton from "./components/BaseElements/BaseButton.vue";
import BaseOverlay from "./components/BaseElements/BaseOverlay.vue";
import BaseLayout from "./components/BaseElements/BaseLayout.vue";
import StickyNav from "./components/LayoutElements/StickyNav.vue";
import Loader from "./components/BaseElements/Loader.vue";
import UserPhoto from "./components/LayoutElements/UserPhoto.vue";
import UserName from "./components/LayoutElements/UserName.vue";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(auth)
  .use(db);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-overlay", BaseOverlay);
app.component("base-layout", BaseLayout);
app.component("sticky-nav", StickyNav);
app.component("loader", Loader);
app.component("user-photo", UserPhoto);
app.component("user-name", UserName);

app.mount("#app");
