<template>
  <div class="d-flex justify-content-center mt-5 mb-5">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.loader {
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #2c3e50; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
