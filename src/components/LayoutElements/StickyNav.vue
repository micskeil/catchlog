<template>
  <header
    class="header container-fluid d-flex bg-light justify-content-center border sticky-top pt-1 pb-1
    "
  >
    <nav
      class="container navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between  align-content-center"
    >
      <div
        class="navbar-brand d-flex align-content-center justify-content-center p-0"
        href="./index.html"
      >
        <a href="/" class="brand-name align-self-center nav-brandname pl-3 "
          >Fishinglog</a
        >
      </div>

      <div>
        <div class="bottomNav bg-light ">
          <ul class="navbar-nav bottomList mr-3  pt-3 pb-3 mt-l">
            <li v-if="!isFishing" class="nav-item active">
              <a class="nav-link" v-on:click="toggleSessionControl()"
                ><img
                  class="nav-icon"
                  src="../../assets/start_fishing.png"
                  alt="home"
              /></a>
            </li>
            <li v-if="isFishing" class="nav-item active">
              <a class="nav-link" v-on:click="toggleSessionControl()"
                ><img
                  class="nav-icon"
                  src="../../assets/stop_fishing.png"
                  alt="home"
              /></a>
            </li>
            <li v-if="isFishing" class="nav-item active">
              <a class="nav-link" v-on:click="toggleSessionControl()"
                ><img
                  class="nav-icon"
                  src="../../assets/add-catch.png"
                  alt="home"
              /></a>
            </li>

            <li class="nav-item">
              <router-link
                class="btn btn-outline-primary pl-1 pr-1 mr-3"
                to="/login"
                v-on:click="logout()"
                >{{ user_name }}</router-link
              >
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="">
                <img
                  src="../../../src/assets/img/user_1.jpg"
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
export default {
  emits: ["toggle-session-control"],
  props: ["isFishing"],
  data() {
    return {
      user_name: "null",
    };
  },

  methods: {
    toggleSessionControl() {
      console.log("Toggle session control!");
      this.$emit("toggle-session-control");
    },

    getUser() {
      console.log("The current user " + this.$store.getters.userName);
      this.user_name = "Hello, " + this.$store.getters.userName + "!";
    },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    let status = "";
    if (this.isFishing) {
      status = "for fishing.";
    } else {
      status = " to start fishing!";
    }
    console.log("Navigation set up " + status);
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
  width: 2rem;
  opacity: 0.6;
}
.user-img {
  width: 2rem;
  border: 1px solid #00243d;
  padding: 1px;
  opacity: 1;
}
</style>
