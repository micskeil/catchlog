<template>
  <div class="home">
    <UserSessions />
  </div>
</template>

<script>
// @ is an alias to /src
import UserSessions from "./UserSessions.vue";

export default {
  name: "Home",
  components: {
    UserSessions,
  },
  mounted() {
    console.log();
  },
};
</script>
