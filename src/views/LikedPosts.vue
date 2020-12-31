<template
  ><base-layout>
    <template v-slot:header>
      <sticky-nav> </sticky-nav>
    </template>

    <template v-slot:main>
      <div>
        <loader v-if="isLoading"></loader>

        <div v-for="fish in loadedCatches" v-bind:key="fish.catch_id">
          <Fish v-bind:fish="fish" />
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
      catches: [],
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
    loadCatches() {
      const that = this;

      db.collection("catches/")
        .orderBy("catch_date", "desc")
        .get()
        .then(function(querySnapshot) {
          const results = [];

          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            results.push({
              catch_id: doc.id,
              catch_date: new Date(doc.data().catch_date.seconds * 1000),
              comment: doc.data().comment,
              species: doc.data().species,
              lenght: doc.data().lenght,
              user_id: doc.data().user_id,
              weight: doc.data().weight,
              image_src: doc.data().image_src,
            });
          });

          that.catches = results;
          that.isLoading = false;
        });
    },
  },

  beforeMount() {
    this.loadCatches();
  },
};
</script>
