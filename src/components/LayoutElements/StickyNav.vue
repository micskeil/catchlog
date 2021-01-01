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
        href="/timeline"
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
          <ul class="navbar-nav bottomList   pt-3 pb-3 mt-l">
            <li class="nav-item active" v-on:click="goTimeline">
              <a class="nav-link"
                ><img class="nav-icon" src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li class="nav-item active" v-on:click="goLikes">
              <a class="nav-link"
                ><img
                  class="nav-icon"
                  src="../../assets/heart-menu.png"
                  alt="home"
              /></a>
            </li>
            <li class="nav-item active" v-on:click="goHome">
              <a class="nav-link"
                ><img class="nav-icon" src="../../assets/fishing.png" alt="home"
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
                <div
                  class="nav-icon user-img
      rounded-circle"
                >
                  <user-photo v-bind:uid="uid"></user-photo>
                </div>
              </a>
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
    return {};
  },
  computed: {
    ...mapGetters("session", {
      getIsFishing: "getIsFishing",
    }),

    uid() {
      if (this.$store.getters.user == null) {
        return "Guest";
      } else {
        return this.$store.getters.user.uid;
      }
    },
  },

  methods: {
    ...mapActions("session", {
      startFishing: "startFishing",
      endFishing: "endFishing",
      registerCatch: "registerCatch",
    }),

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
    goTimeline() {
      this.$router.push({ name: "Timeline" });
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
    goLikes() {
      this.$router.push({ name: "Likes" });
    },
  },
  mounted() {},
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
  margin-left: 1rem !important ;
  cursor: pointer;
  width: 1.5rem;
  opacity: 0.6;
}
.user-img {
  width: 2.5rem;
  border: 1px solid white;
  opacity: 1;
}
</style>
