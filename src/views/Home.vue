<template>
  <div class="home">
    <ContentPage />
  </div>
</template>

<script>
// @ is an alias to /src
import ContentPage from "./ContentPage.vue";

export default {
  name: "Home",
  components: {
    ContentPage,
  },
  mounted() {
    console.log();
  },
};
</script>
