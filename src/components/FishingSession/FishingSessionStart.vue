<template>
  <div class="card shadow mt-3 rounded-0">
    <base-card>
      <template v-slot:card-img>
        <div v-bind:id="session.id"></div>
      </template>

      <template v-slot:card-info>
        <div class="session-start pb-3">
          <strong>Started fishing </strong>on
          {{ session.start_date }}
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ["session"],
  data() {
    return {};
  },

  methods: {
    formatTime() {},
    showPosition(latlon) {
      var x = document.getElementById(this.session.id);

      x.innerHTML =
        `<iframe
          width="100%"
           height="250"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC-I8MZCRc1JQgZeC7SdhTt-PjqHuBn5J8
                &q=location="` +
        latlon +
        ` allowfullscreen>
        </iframe>`;
    },
  },
  // filters: {
  //   moment: function(date) {
  //     return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  //   },
  // },

  mounted() {
    this.showPosition(this.session.location);
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>
