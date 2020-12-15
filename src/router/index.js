import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Settings from "../views/Settings.vue";

import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) {
        next({ name: "Login" });
        console.log("Login before continue...");
      } else next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/settings",
    name: "Settings",
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) {
        next({ name: "Login" });
        console.log("Login before continue...");
      } else next();
    },
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = store.state.isLoggedIn;
//   if (to.name !== "Login" && isLoggedIn) {
//     next({ name: "Login" });
//     console.log("Login before continue...");
//   } else next();
// });

export default router;
