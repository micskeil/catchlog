<template>
  <base-card v-if="showSelf()">
    <template v-slot:card-info>
      <div class="session-end pb-3">
        <strong>Befejezted a horgászatot:&nbsp; </strong>
        {{ getFormattedDate(session.end_date) }}
      </div>
    </template>
  </base-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["session"],
  data() {
    return {};
  },

  computed: {
    ...mapGetters("session", {
      getCurrentSession: "getCurrentSession",
    }),
  },

  methods: {
    showEnd(data) {
      if (data.toString !== "Invalid Date") {
        return true;
      } else {
        return false;
      }
    },

    showSelf() {
      if (this.getCurrentSession === this.session.session_id) {
        return false;
      } else {
        return true;
      }
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
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>
