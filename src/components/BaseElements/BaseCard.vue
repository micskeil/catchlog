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
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.user-img {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #6969d18c;
  padding: 1px;
}
</style>
