<template>
  <base-card>
    <template v-slot:card-img>
      <div v-bind:id="session.id"></div>
    </template>

    <template v-slot:card-info>
      <div class="session-start pb-3">
        <strong>Sikeresen elkezdted a horgászatot: &nbsp; </strong>
        {{ getFormattedDate(session.start_date) }}
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  props: ["session"],
  data() {
    return {};
  },

  methods: {
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
    getFormattedDate(date) {
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;

      var day = date.getDate().toString();
      day = day.length > 1 ? day : "0" + day;

      var hour = date.getHours().toString();
      hour = hour.length > 1 ? hour : "0" + hour;

      var minute = date.getMinutes().toString();
      minute = minute.length > 1 ? minute : "0" + minute;

      return year + "/" + month + "/" + day + " " + hour + ":" + minute;
    },
  },
  // filters: {
  //   moment: function(date) {
  //     return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  //   },
  // },

  mounted() {
    // this.showPosition(this.session.location);
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>
