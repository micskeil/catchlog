import { createStore } from "vuex";
import { sessionstates } from "./sessionstates";
import authModule from "./modules/auth/index.js";

export default createStore({
  modules: { auth: authModule, session: sessionstates },
});
