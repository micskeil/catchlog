<template>
  <div class="card shadow mt-5 rounded-0">
    <div
      class="user-bar p-3
     d-flex align-items-center "
    >
      <img
        src="../../../src/assets/img/user_1.png"
        class="user-img
      rounded-circle "
        alt="user_img"
      />
      <div class="user-info pl-3 d-flex flex-nowrap justify-content-between">
        <div class="user-name font-weight-bold">
          {{ getUser }}
        </div>
        <div class="catch-date pl-3 d-flex align-self-center align-content-end">
          {{ getFormattedDate(fish.catch_date) }}
        </div>
      </div>
    </div>
    <img
      v-bind:src="fish.image_src"
      class="card-img pb-3"
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
  </div>
</template>
<script>
export default {
  props: ["fish"],
  computed: {
    getUser() {
      return this.$store.getters.userName;
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
  position: absolute;
  left: -0.1rem;
  right: -0.1rem;
  bottom: -1.3rem;
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
