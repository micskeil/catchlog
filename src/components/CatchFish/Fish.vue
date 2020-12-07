<template>
  <div class="card shadow mt-3 rounded-0">
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
      v-bind:src="fish.image_src"
      class="card-img-top border-top border-bottom"
      alt="user_img"
    />
    <div class="card-body p-3 d-flex justify-content-between">
      <div class="fish-info d-flex">
        <p class="card-text pr-3 font-weight-bold">{{ fish.species }}</p>
        <p class="card-text pr-3">{{ fish.weight }} kg</p>
        <p class="card-text pr-3">{{ fish.lenght }} cm</p>
      </div>
      <div class="location-info d-flex">
        <p class="card-text pr-3 font-weight-bold">
          {{ fish.location }}
        </p>
        <p class="card-text pr-3 ">on {{ fish.catch_date }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["fish"],
  data() {
    return {};
  },
  mounted() {
    console.log("Image Url betöltve: " + this.fish.downloadUrl);
    console.log(this.fish);
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

.user-img {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #6969d18c;
  padding: 1px;
}
</style>
