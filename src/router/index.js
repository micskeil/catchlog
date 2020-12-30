import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timeline from "../views/Timeline.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Settings from "../views/Settings.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Timeline",
    component: Timeline,
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
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
    component: Settings,
    meta: { reuiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.auth.isLoggedIn) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
