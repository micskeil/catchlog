<template>
  <header
    class="header container-fluid d-flex bg-light justify-content-center pt-1 pb-1
    "
  >
    <nav
      class="container navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between  align-content-center"
    >
      <div
        class="navbar-brand d-flex align-content-center justify-content-center p-0"
        href="./index.html"
      >
        <img
          class="ml-1 
          brand-logo"
          src="../../assets/logo.png"
          width="48 "
          height="48"
        />
        <a href="/" class="brand-name  align-self-center nav-brandname pl-3">
          Pecázunk.hu</a
        >
      </div>

      <div>
        <div class="bottomNav bg-light ">
          <ul class="navbar-nav bottomList mr-3  pt-3 pb-3 mt-l">
            <li class="nav-item active" v-on:click="startFishing">
              <a class="nav-link"
                ><img class="nav-icon" src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li
              v-if="!getIsFishing"
              class="nav-item "
              v-on:click="startFishing"
            >
              <a class="nav-link"
                ><img
                  class="nav-icon"
                  src="../../assets/start_fishing.png"
                  alt="start_fishing_icon"
              /></a>
            </li>
            <li
              v-if="getIsFishing"
              class="nav-item active"
              v-on:click="endFishing"
            >
              <a class="nav-link"
                ><img
                  class="nav-icon"
                  src="../../assets/stop_fishing.png"
                  alt="stop_fishing"
              /></a>
            </li>
            <li
              v-if="getIsFishing"
              class="nav-item active"
              v-on:click="registerCatch"
            >
              <a class="nav-link"
                ><img
                  class="nav-icon"
                  src="../../assets/add-catch.png"
                  alt="add_new_catch"
              /></a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#/settings">
                <img
                  src="../../../src/assets/img/user_1.png"
                  class="nav-icon user-img
      rounded-circle"
                  alt="user_img"
              /></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  emits: ["toggle-session-control"],
  props: ["isFishing"],
  data() {
    return {
      user_name: "Guest",
    };
  },
  computed: {
    ...mapGetters("session", {
      getIsFishing: "getIsFishing",
    }),
  },

  methods: {
    ...mapActions("session", {
      startFishing: "startFishing",
      endFishing: "endFishing",
      registerCatch: "registerCatch",
    }),

    getUser() {
      this.user_name = "Hello, " + this.$store.getters.userName + "!";
    },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped>
.bg-light {
  background-color: white !important;
}

@media screen and (max-width: 576px) {
  .bottomNav {
    z-index: 1200;
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0px;
    left: 0px;
    width: 100%;
    border: 1px solid #dee2e6;
  }
  .bottomList {
    padding: 0.5rem 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
  }
}
.logo {
  width: 3rem;
  height: 3rem;
}
.nav-brandname {
  font-size: 1.25rem;
  font-weight: 500;
  color: #00243d;
  text-decoration: none;
  opacity: 1;
}
.nav-icon {
  margin-right: 1rem !important ;
  cursor: pointer;
  width: 1.5rem;
  opacity: 0.6;
}
.user-img {
  width: 2rem;
  border: 1px solid #00243d;
  padding: 1px;
  opacity: 1;
}
</style>
