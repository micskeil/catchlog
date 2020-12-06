<template>
  <header
    class="header shadow p-0 m-0 container-fluid d-flex bg-light justify-content-center border sticky-top"
  >
    <nav
      class="container navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between  align-content-center"
    >
      <div
        class="navbar-brand d-flex align-content-center p-0"
        href="./index.html"
      >
        <img src="../../assets/logo.png" class="logo" alt="logo" />
        <a class="brand-name nav-brandname pl-3">Fishing log</a>
      </div>

      <div>
        <div class="bottomNav bg-light ">
          <ul class="navbar-nav bottomList mr-3 mt-1 mt-lg-0">
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

  methods: {
    toggleSessionControl() {
      console.log("Toggle session control!");
      this.$emit("toggle-session-control");
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
  },
};
</script>

<style scoped>
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
  font-size: 1.75rem;
  color: #3c3c3c;
  text-decoration: none;
  opacity: 0.6;
}
.nav-icon {
  width: 2rem;
  opacity: 0.6;
}
.user-img {
  width: 2rem;
  border: 1px solid #6969d18c;
  padding: 1px;
  opacity: 1;
}
</style>
