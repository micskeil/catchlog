<template>
  <div class="login p-0">
    <form
      class="form  border d-flex flex-column shadow p-5"
      @submit.prevent="signUp"
    >
      <h3>Regisztráció!</h3>

      <div class="form-group pt-3">
        <label>Felhasználónév:</label>
        <input type="text" class="form-control " v-model="user.name" />
      </div>

      <div class="form-group">
        <label>E-mail:</label>
        <input type="email" class="form-control " v-model="user.email" />
      </div>

      <div class="form-group">
        <label>Jelszó (legalább 8 karakter):</label>
        <input type="password" class="form-control " v-model="user.password" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg mt-3 btn-block">
        Sign Up
      </button>

      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'Login' }">sign in?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        formIsValid: false,
      },
    };
  },
  methods: {
    signUp() {
      // const that = this;
      if (
        this.user.email === "" ||
        !this.user.email.includes("@") ||
        this.user.password.lenght < 8
      ) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("registerUser", {
          email: this.user.email,
          password: this.user.password,
        });
        alert("A regisztráció sikeres! Kérlek jelentkezz be.");

        this.$router.push("/login");
      }
    },
  },
};
</script>
