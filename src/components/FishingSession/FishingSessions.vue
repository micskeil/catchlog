<template>
  <div class="card shadow">
    <div
      class="user-info p-3
     d-flex align-items-center"
    >
      <img
        src="../../../src/assets/img/user_1.jpg"
        class="user-img
      rounded-circle"
        alt="user_img"
      />
      <div class="user-info-text pl-3 font-weight-bold ">
        John Doe
      </div>
    </div>
    <img
      src="../../../src/assets/img/user_1_img_1.jpg"
      class="card-img-top border-top border-bottom"
      alt="user_img"
    />
    <div class="card-body p-3 d-flex justify-content-between">
      <div class="fish-info d-flex">
        <p class="card-text pr-3 font-weight-bold">
          Carp
        </p>
        <p class="card-text pr-3">
          6.9kg
        </p>
        <p class="card-text pr-3">
          45cm
        </p>
      </div>
      <div class="location-info d-flex">
        <p class="card-text pr-3 font-weight-bold">
          Tisza-tó
        </p>
        <p class="card-text pr-3 ">
          2020-09-10
        </p>
      </div>
    </div>
  </div>

  <div v-for="session in sessions" v-bind:key="session.session_id">
    <div class="session-start pt-3">
      Started fishing at {{ session.start_date }} at {{ session.location }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessions: [
        {
          session_id: "1",
          start_date: "2020-10-01 8:26",
          location: "Tisza-tó",
          method: "Casting",
          end_date: "2020-10-01 11:25",
        },
        {
          session_id: "2",
          start_date: "2020-10-01 14:36",
          location: "Tisza-tó",
          method: "Casting",
          end_date: "2020-10-01 20:10",
        },
      ],
    };
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
.session-start {
  width: 100%;
}
</style>
