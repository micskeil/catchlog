<template
  ><base-layout>
    <template v-slot:header>
      <sticky-nav> </sticky-nav>
    </template>

    <template v-slot:main>
      <div>
        <div v-for="fish in loadedCatches" v-bind:key="fish.catch_id">
          <Fish v-bind:fish="fish" />
        </div>
      </div>
    </template>

    <template v-slot:sidebar> </template>
  </base-layout>
</template>

<script>
import StickyNav from "../components/LayoutElements/StickyNav.vue";
import Fish from "../components/CatchFish/Fish.vue";

import { db } from "../firebase";

export default {
  components: { StickyNav, Fish },
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
              species: doc.data().species,
              lenght: doc.data().lenght,
              weight: doc.data().weight,
              image_src: doc.data().image_src,
            });
          });

          that.catches = results;
          console.log(that.catches);
          that.isLoading = false;
          console.log(that.isLoading);
        });
    },
  },

  beforeMount() {
    this.loadCatches();
  },
};
</script>
