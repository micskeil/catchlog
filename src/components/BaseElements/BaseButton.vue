<template>
  <button class="p-2 mt-3 button ">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
$color: #2c3e50;
$color2: #c79136;

.button {
  width: 100%;
  background-color: $color;
  border-radius: 0;
  color: white;
  border: none;

  &:hover {
    background-color: $color2;
    opacity: 0.8;
  }
}
</style>
