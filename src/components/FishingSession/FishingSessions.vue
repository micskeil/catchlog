<template>
  <div v-for="session in sessions.slice().reverse()" v-bind:key="session.id">
    <FishingSessionEnd v-bind:session="session" />
    <FishingSessionStart v-bind:session="session" />
  </div>
</template>

<script>
import FishingSessionStart from "./FishingSessionStart.vue";
import FishingSessionEnd from "./FishingSessionEnd.vue";

export default {
  components: { FishingSessionStart, FishingSessionEnd },
  data() {
    return {
      sessions: [],
    };
  },
  methods: {
    loadSessions() {
      this.isLoading = true;
      fetch("https://fishlog-75884.firebaseio.com/sessions.json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;

          const results = [];

          for (const id in data) {
            results.push({
              id: id,
              start_date: data[id].start_date,
              location: data[id].location,
            });
          }

          this.sessions = results;
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },
  mounted() {
    this.loadSessions();
  },
};
</script>

<style scoped>
div {
  width: 100%;
}

.session-start {
  width: 100%;
}

.user-img {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #6969d18c;
  padding: 1px;
}
</style>
