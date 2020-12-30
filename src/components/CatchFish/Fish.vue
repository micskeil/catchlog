<template>
  <base-card v-bind:uid="uid">
    <template v-slot:user-info>
      <div class="catch-date pr-3 d-flex align-self-center align-content-end">
        {{ getFormattedDate(fish.catch_date) }}
      </div>
    </template>
    <template v-slot:card-img>
      <img
        v-bind:src="fish.image_src"
        class="card-img"
        alt="img_uploaded_by_user"
      />
      <div class="fish-info d-flex justify-content-between">
        <div class="species card-text pl-3 font-weight-bold">
          {{ fish.species }}
        </div>

        <div class="size d-flex justify-content-end mr-3  align-content-end">
          <p class="measures align-self-center">
            Méret: &nbsp; {{ fish.weight }} kg, {{ fish.lenght }} cm
          </p>
        </div>
      </div>
      <div class="social d-flex pt-1 justify-content-between ml-3 mr-3">
        <div class="d-flex">
          <like-button v-bind:catchId="catchId"></like-button>
          <img
            class="ml-3"
            src="../../assets/message.png"
            width="24"
            height="24"
            alt="message"
          />
        </div>
        <div>
          <img
            class="ml-3"
            src="../../assets/bookmark.png"
            width="24"
            height="24"
            alt="bookmark"
          />
        </div>
      </div>
      <div v-if="fish.comment" class="comment row pt-3">
        <p class="align-self-center col-12  pl-3 pr-3 ">
          {{ fish.comment }}
        </p>
      </div>
    </template>
    <template v-slot:card-info> </template>
  </base-card>
</template>
<script>
export default {
  props: ["fish"],
  computed: {
    uid() {
      return this.fish.user_id;
    },
    catchId() {
      return this.fish.catch_id;
    },
  },

  methods: {
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

<style lang="scss" scoped>
.user-bar {
  .user-img {
    width: 2rem;
    height: 2rem;
    border: 1px solid #6969d1b7;
  }
  .user-info {
    width: 100%;
  }
  .user-name {
    white-space: nowrap;
  }
  .catch-date {
    white-space: nowrap;
  }
}

.card-img {
  border-radius: 0;
}

.fish-info {
  width: 100%;
  border-top: 1px solid white;
  color: white;
  background-color: #2c3e50;

  .species {
    font-size: 1.5rem;
    width: fit-content;
  }
  .measures {
    font-size: 1rem;
    width: fit-content;
  }
}
</style>
