<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <sticky-nav></sticky-nav>
    <div class=" container row">
      <main class="col-md-8 p-3 d-flex flex-column align-items-center">
        <base-card> </base-card>
        <fishing-sessions></fishing-sessions>
      </main>
      <div class=" col-md-4 p-3">
        <h5>Your friends activity</h5>
        <br />
        <div>Your friends activity will be displayed here</div>

        <br />
        <footer class="footer pt-3">
          ©2020 with ❤ from Lali Micskei
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from "./components/BaseElements/BaseCard.vue";
import StickyNav from "./components/LayoutElements/StickyNav.vue";
import FishingSessions from "./components/FishingSession/FishingSessions.vue";

export default {
  components: {
    "base-card": BaseCard,
    "sticky-nav": StickyNav,
    "fishing-sessions": FishingSessions,
  },
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
