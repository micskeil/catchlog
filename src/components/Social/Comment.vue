<template>
  <div>
    <form>
      <label class="font-weight-bold" for="fname">Komment:</label><br />
      <input type="text" id="comment" name="comment" /><br />
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
    input {
      border: none;
      width: 100%;
      border-bottom: 1px solid $color;
      border-radius: 0;
    }
    select {
      border: none;
      border-bottom: 1px solid $color;
      border-radius: 0;
    }
    .warning {
      color: white;
      background-color: #c79136;
    }
  }
}
</style>
