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
        <user-photo class="user-photo" v-bind:uid="uid"></user-photo>
        <div class="user-info-text pl-3 font-weight-bold ">
          <user-name v-bind:uid="uid"></user-name>
        </div>
      </div>
      <slot name="user-info"></slot>
    </div>
    <div class="card-img p-0 d-flex flex-column justify-content-between">
      <slot name="card-img"> </slot>
    </div>

    <div class="card-body p-3 d-flex flex-column justify-content-between">
      <slot name="card-info"> </slot>
    </div>
  </div>
</template>

<script>
import UserName from "../LayoutElements/UserName.vue";
import UserPhoto from "../LayoutElements/UserPhoto.vue";

export default {
  props: {
    uid: {
      type: String,
      required: false,
    },
  },
  components: { UserPhoto, UserName },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.user-photo {
  width: 2rem;
  height: 2rem;
}

.card {
  width: 100%;
}

.user-img {
  width: 2rem;
  height: 2rem;
}

.card-info {
  height: 100%;
}
</style>
