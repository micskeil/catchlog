import { createStore } from "vuex";
import { sessionstates } from "./sessionstates";
import authModule from "./modules/auth/index.js";
import socialModule from "./modules/Social/index.js";

export default createStore({
  modules: { auth: authModule, social: socialModule, session: sessionstates },
});
