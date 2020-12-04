<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <StickyNav />
    <div class=" container  d-flex justify-content-between row">
      <main class="col-md-8 p-3 d-flex flex-column align-items-center">
        <FishingSessions />
      </main>
      <div class=" col-md-4 p-3">
        <h5>Activity in your arrea</h5>
        <br />
        <div>Other users' catches will be here</div>

        <br />
        <footer class="footer pt-3">
          ©2020 with ❤ from Lali Micskei
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import StickyNav from "./components/LayoutElements/StickyNav";
import FishingSessions from "./components/FishingSession/FishingSessions";

export default {
  components: {
    StickyNav,
    FishingSessions,
  },
  data() {
    return {
      activeSession: "",
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
#app {
  * {
    padding: 0;
    margin: 0;
  }
  .footer {
    font-size: 0.75rem;
  }
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
