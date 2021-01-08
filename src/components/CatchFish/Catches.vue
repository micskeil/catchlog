<template>
  <div>
    <div v-for="postId in loadedCatches" v-bind:key="postId">
      <Fish v-bind:postId="postId" />
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import Fish from "../CatchFish/Fish.vue";

export default {
  components: { Fish },
  props: { session: { type: String, required: true } },
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
      const user = this.$store.getters.user;
      const session_id = this.session.session_id;

      db.collection("catches/")
        .where("user_id", "==", user.uid)
        .where("session_id", "==", session_id)
        .orderBy("catch_date", "desc")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            that.catches.push(doc.id);
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
