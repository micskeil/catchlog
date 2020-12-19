<template>
  <div class="login p-0">
    <form class="form   d-flex flex-column shadow p-5" @submit.prevent="signUp">
      <h3>Regisztráció!</h3>

      <div class="form-group pt-3  mt-3">
        <input
          type="text"
          class="form-control "
          placeholder="Felhasználónév"
          v-model="user.name"
        />
      </div>

      <div class="form-group pt-3">
        <input
          type="email"
          class="form-control"
          placeholder="E-mail-cím"
          v-model="user.email"
        />
      </div>

      <div class="form-group pt-3">
        <input
          type="password"
          class="form-control"
          placeholder="Jelszó"
          v-model="user.password"
        />
      </div>
      <p v-if="!formIsValid" class="text-warning">
        Valami baj van a beírt e-maillel vagy jelszóval!
      </p>

      <base-button type="submit" class="">
        ELKÜLD
      </base-button>

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
      formIsValid: true,
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    signUp() {
      // const that = this;
      if (
        this.user.name === "" ||
        this.user.email === "" ||
        !this.user.email.includes("@")
      ) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("registerUser", {
          email: this.user.email,
          password: this.user.password,
          name: this.user.neme,
        });

        alert("A regisztráció sikeres! Kérlek jelentkezz be.");

        this.$router.push("/login");
      }
    },
  },
};
</script>
