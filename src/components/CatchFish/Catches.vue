<template>
  <div>
    <div v-for="fish in loadedCatches" v-bind:key="fish.catch_id">
      <Fish v-bind:fish="fish" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Fish from "../CatchFish/Fish.vue";

export default {
  components: { Fish },
  props: ["session"],
  data() {
    return {
      catches: [],
    };
  },
  computed: {
    loadedCatches() {
      return this.catches;
    },
  },

  methods: {
    loadCatches() {
      const that = this;
      const userID = this.$store.getters.userID;
      const session_id = this.session.session_id;

      firebase
        .firestore()
        .collection("catches/")
        .where("user_id", "==", userID)
        .where("session_id", "==", session_id)
        .orderBy("catch_date", "desc")
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
          const results = [];
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            results.push({
              catch_id: doc.id,
              catch_date: new Date(doc.data().catch_date.seconds * 1000),
              species: doc.data().species,
              lenght: doc.data().lenght,
              weight: doc.data().weight,
              image_src: doc.data().image_src,
            });
            console.log(doc.id, " => ", doc.data());
            that.catches = results;
          });
        })
        .catch((error) => {
          console.log(error);
          console.log("Error");
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },
  beforeMount() {
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
