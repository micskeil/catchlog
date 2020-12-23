<template>
  <div class="container-fluid d-flex flex-column align-items-center ">
    <StickyNav />
    <div class=" container  d-flex justify-content-between row">
      <main
        class="content col-md-8 d-flex flex-column align-items-center m-0 pr-2 pl-2"
      >
        <FishingSessions />
      </main>
      <div class="side-bar d-none d-md-block col-md-4 p-3 pl-3">
        <div class="side-bar-content">
          <h5>Ez történt a környékeden</h5>
          <br />
          <div>Itt lesz majd a barátok fogásai</div>

          <br />
          <footer class="footer pt-3">
            ©2020 ❤-el készítette
            <a href="mailto:micskeil@gmail.com">Lali Micskei</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StickyNav from "../components/LayoutElements/StickyNav";
import FishingSessions from "../components/FishingSession/FishingSessions";

export default {
  name: "Home",
  components: {
    StickyNav,
    FishingSessions,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.side-bar-content {
  position: sticky;
  top: 2rem;
}

.footer {
  font-size: 0.75rem;
}
</style>
