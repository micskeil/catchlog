<template>
  <div
    class="card border-0 shadow border border-light mt-3 mb-3
   rounded-0"
  >
    <div class="card-img  d-flex flex-column justify-content-between">
      <slot name="user-info">
        <div
          class="user-info p-3
     d-flex align-items-center"
        >
          <img
            src="../../../src/assets/img/user_1.png"
            class="user-img
      rounded-circle"
            alt="user_img"
          />
          <div class="user-info-text pl-3 font-weight-bold ">
            {{ getUser }}
          </div>
        </div></slot
      >
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
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: fit-content;
}

.user-img {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #6969d18c;
  padding: 1px;
}

.card-info {
  height: 100%;
}
</style>
