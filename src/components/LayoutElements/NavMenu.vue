<template>
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
    <div id="navbarNav" class="collapse navbar-collapse">
      <ul class="navbar-nav  mr-auto mt-2 mt-lg-0">
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
img {
  width: 24px;
}
.show {
  display: none;
}
</style>
