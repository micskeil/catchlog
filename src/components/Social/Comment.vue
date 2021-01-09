<template>
  <div>
    <form class="container row">
      <label class="font-weight-bold col-12 d-none" for="comment"
        >Komment:</label
      >
      <div class="d-flex">
        <input
          class="pr-3"
          type="text"
          id="comment"
          name="comment"
          placeholder="Hozzászólás írása..."
        />
        <img class="ml-3 " src="../../assets/send.png" width="24" height="24" />
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$color: #2c3e50;
div {
  width: 100%;

  form {
    width: 100%;
    div {
      input {
        border: none;
        width: 100%;
        border-bottom: 1px solid $color;
        border-radius: 0px;
      }
      img {
        opacity: 0.9;
      }
      select {
        border: none;
        border-bottom: 1px solid $color;
        border-radius: 0;
      }
    }
    .warning {
      color: white;
      background-color: #c79136;
    }
  }
}
</style>
