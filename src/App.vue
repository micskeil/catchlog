<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style lang="scss">
$color: #2c3e50;

$breakpoint-tablet: 768px;

#app {
  * {
    padding: 0;
    margin: 0;
  }

  font-family: "Questrial", Sans-Serif;
  // font-family: "Alegreya", Serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $color;
}
</style>
