import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseCard from "./components/BaseElements/BaseCard.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

const app = createApp(App)
  .use(store)
  .use(router);

app.component("base-card", BaseCard);

app.mount("#app");

var firebaseConfig = {
  apiKey: "AIzaSyBMcAaU42QOoiUFcW_SidKxHg7JtbOQ-f8",
  authDomain: "fishlog-75884.firebaseapp.com",
  databaseURL: "https://fishlog-75884.firebaseio.com",
  projectId: "fishlog-75884",
  storageBucket: "fishlog-75884.appspot.com",
  messagingSenderId: "831395729631",
  appId: "1:831395729631:web:193cb736a420dfed0e996a",
};

firebase.initializeApp(firebaseConfig);
