<template>
  <div
    class="card border-0 shadow border border-light mt-4 mb-4
   rounded-0"
  >
    <div class="card-img d-flex flex-row justify-content-between">
      <div
        class="user-info p-3
     d-flex align-items-center"
      >
        <img
          :src="photoURL"
          class="user-img
      rounded-circle"
          alt="user_img"
        />
        <div class="user-info-text pl-3 font-weight-bold ">
          {{ getUser }}
        </div>
      </div>
      <slot name="user-info"></slot>
    </div>
    <div class="card-img p-0 d-flex flex-column justify-content-between">
      <slot name="card-img"> </slot>
    </div>

    <div class="card-body p-3 d-flex justify-content-between">
      <slot name="card-info"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getUser() {
      const user = this.$store.getters.user;
      return user.displayName;
    },
    photoURL() {
      const user = this.$store.getters.user;
      return user.photoURL;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: fit-content;
}

.user-img {
  width: 2rem;
  height: 2rem;
}

.card-info {
  height: 100%;
}
</style>
