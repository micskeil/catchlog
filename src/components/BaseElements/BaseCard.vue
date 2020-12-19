<template>
  <div
    class="card shadow mt-5
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
      return this.$store.getters.userName;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
}

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
