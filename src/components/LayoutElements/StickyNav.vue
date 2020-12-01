<template>
  <header
    class="header shadow p-0 m-0 container-fluid d-flex bg-light justify-content-center sticky-top"
  >
    <nav
      class="container navbar navbar-expand-md navbar-light bg-light d-flex justify-content-between"
      v-bind:class="{ navbarOpen: show }"
    >
      <a class="navbar-brand" href="./index.html">
        <img
          src="../../assets/catfish.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        <a class="brand-name p-3">Fishing log</a>
      </a>
      <div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          v-on:click="toggleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          id="navbarNav"
          class="collapse navbar-collapse bg-light "
          v-bind:class="[
            { in: show },
            { show: show },
            { bottomNav: show },
            { shadow: show },
            { border: show },
          ]"
        >
          <ul
            class="navbar-nav  mr-3 mt-1 mt-lg-0"
            v-bind:class="[{ bottomList: show }]"
          >
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img src="../../assets/home.png" alt="home"
              /></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img src="../../assets/home.png" alt="home"
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
  props: {
    msg: String,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    toggleNavbar() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.bottomNav {
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.bottomList {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 80%;
}
img {
  width: 32px;
  opacity: 0.6;
}
</style>
