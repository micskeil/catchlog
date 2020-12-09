<template>
  <div class="login p-0 ">
    <form
      class="form border d-flex flex-column shadow p-5"
      @submit.prevent="login"
    >
      <h3 class="brand-name pb-3 align-self-center">Fishlog</h3>

      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="user.email"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="user.password"
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg mt-3 btn-block">
        Sign In
      </button>
      <p class="forgot-password text-right">
        Not a member yet?
        <router-link :to="{ name: 'Signup' }">Sign up now!</router-link>
      </p>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        email: this.user.email,
        password: this.user.password,
      });

      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss">
.login {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  .form {
    width: 450px;
    max-width: 100vw;
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
