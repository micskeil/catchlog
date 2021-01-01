<template
  ><base-layout>
    <template v-slot:header>
      <sticky-nav> </sticky-nav>
    </template>

    <template v-slot:main>
      <div>
        <loader v-if="isLoading"></loader>

        <div v-for="postId in likedPostIds" v-bind:key="postId">
          <Fish v-bind:postId="postId" />
        </div>
      </div>
    </template>

    <template v-slot:sidebar> </template>
  </base-layout>
</template>

<script>
import Fish from "../components/CatchFish/Fish.vue";
import { db } from "../firebase";

export default {
  name: "LikedPosts",
  components: { Fish },

  data() {
    return {
      isLoading: true,
      likedPostIds: [],
    };
  },
  computed: {
    statusLoading() {
      return this.isLoading;
    },
  },
  methods: {
    loadLikedPosts() {
      const that = this;
      const uid = this.$store.getters.user.uid;

      db.collection("users/" + uid + "/likedPosts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            that.likedPostIds.push(doc.id);
          });
        })
        .then((that.isLoading = false))
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
  },
  beforeMount() {
    this.loadLikedPosts();
  },
};
</script>
