<template>
  <div class="login p-0">
    <form class="form   d-flex flex-column shadow p-5" @submit.prevent="signUp">
      <h3>Regisztráció!</h3>

      <div class="form-group pt-3  mt-3">
        <input
          type="text"
          class="form-control "
          placeholder="Felhasználónév"
          v-model="name"
        />
      </div>

      <div class="form-group pt-3">
        <input
          type="email"
          class="form-control"
          placeholder="E-mail-cím"
          v-model="email"
        />
      </div>

      <div class="form-group pt-3">
        <input
          type="password"
          class="form-control"
          placeholder="Jelszó"
          v-model="password"
        />
      </div>
      <p v-if="!formIsValid" class="text-warning">
        Kérlek adj meg érvényes e-mail címet és jelszót!
      </p>

      <base-button type="submit" class="">
        REGISZTRÁL
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
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    signUp() {
      // const that = this;
      if (
        this.name === "" ||
        this.email === "" ||
        !this.email.includes("@") ||
        this.password < 6
      ) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("registerUser", {
          email: this.email,
          password: this.password,
          name: this.name,
        });

        alert("A regisztráció sikeres! Már be is jelentkezhetsz.");

        this.$router.push("/login");
      }
    },
  },
};
</script>
