<template>
  <div v-for="fish in catches.slice().reverse()" v-bind:key="fish.id">
    <Fish v-bind:fish="fish" />
  </div>
</template>

<script>
import Fish from "../CatchFish/Fish.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Fish },
  props: ["session"],
  data() {
    return {
      catches: [],
    };
  },
  computed: {
    ...mapGetters("session", {
      getTotalNumberOfSessions: "getTotalNumberOfSessions",
    }),
  },
  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateTotalNumberOfSessions: "updateTotalNumberOfSessions",
    }),

    loadCatches() {
      const userID = this.$store.getters.userID;

      fetch(
        "https://fishlog-75884.firebaseio.com/catches/" +
          userID +
          "/" +
          this.session.id +
          ".json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const results = [];
          for (const id in data) {
            results.push({
              catch_date: data[id].catch_date,
              species: data[id].species,
              lenght: data[id].lenght,
              weight: data[id].weight,
              image_src: data[id].image_src,
            });
          }
          this.catches = results;
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },
  mounted() {
    this.loadCatches();
  },
};
</script>

<style scoped>
div {
  width: 100%;
}

.card {
  height: fit-content;
}

.user-img {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #6969d18c;
  padding: 1px;
}

.card-info {
  height: 100%;
}
</style>
