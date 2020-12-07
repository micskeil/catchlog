<template>
  <div v-for="fish in catches.slice().reverse()" v-bind:key="fish.id">
    <Fish v-bind:fish="fish" />
  </div>
</template>

<script>
import Fish from "../CatchFish/Fish.vue";
export default {
  components: { Fish },
  props: ["session"],
  data() {
    return {
      catches: [],
    };
  },
  methods: {
    loadCatches() {
      console.log("Loading catch history for session no. " + this.session.id);
      fetch(
        "https://fishlog-75884.firebaseio.com/sessions/" +
          this.session.id +
          "/catches.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log("data: " + data[0].image_src);
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
          console.log(this.catches);
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
