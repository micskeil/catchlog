<template
  ><base-layout>
    <template v-slot:header>
      <sticky-nav> </sticky-nav>
    </template>

    <template v-slot:main>
      <div class="main">
        <loader v-if="isLoading"></loader>
        <div v-for="postId in postIds" v-bind:key="postId">
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
  name: "Timeline",
  components: { Fish },
  data() {
    return {
      isLoading: true,
      postIds: [],
    };
  },
  computed: {
    loadedCatches() {
      return this.catches;
    },

    statusLoading() {
      return this.isLoading;
    },
  },
  methods: {
    loadPosts() {
      const that = this;

      db.collection("catches/")
        .orderBy("catch_date", "desc")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            that.postIds.push(doc.id);
          });
          that.isLoading = false;
        });
    },
  },

  beforeMount() {
    this.loadPosts();
  },
};
</script>

<style scoped></style>
