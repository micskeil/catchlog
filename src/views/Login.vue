<template>
  <div class="login p-0 m-0">
    <form class="form d-flex shadow flex-column p-5" @submit.prevent="login">
      <div
        class="brand d-flex flex-column pb-5 justify-content-around
      align-items-center "
      >
        <img class="" src="../assets/logo.png" width="64" height="64" />
        <h3 class="brand-name pt-3 ">Pecázunk.hu</h3>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="E-mail"
          v-model.trim="user.email"
        />
      </div>

      <div class="form-group pt-3">
        <input
          type="password"
          class="form-control "
          placeholder="Password"
          v-model.trim="user.password"
        />
      </div>
      <p v-if="!formIsValid" class="text-warning">
        Valami baj van a beírt e-maillel vagy jelszóval!
      </p>

      <base-button type="submit" class="">
        BELÉPÉS
      </base-button>
      <p class="forgot-password text-right pt-3">
        Még nem vagy tag?
        <router-link :to="{ name: 'Signup' }">Regisztráj! </router-link>
      </p>

      <p class="forgot-password text-right mt-3 ">
        <router-link to="/forgot-password">Elfelejtett jelszó!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      isLoading: false,
      error: null,

      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const that = this;
      if (this.user.email === "" || !this.user.email.includes("@")) {
        this.formIsValid = false;
        return;
      } else {
        try {
          this.isLoading = true;
          await this.$store.dispatch("login", {
            email: this.user.email,
            password: this.user.password,
          });
        } catch (error) {
          this.formIsValid = false;
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage);
          that.formIsValid = false;
        }

        this.isLoading = false;
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style lang="scss">
$color: #2c3e50;

$breakpoint-tablet: 768px;

.login {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/bg.jpg");
  background-size: cover;

  @media (max-width: $breakpoint-tablet) {
    background-image: none;
    height: 90vh;
  }

  .form {
    input {
      border: none;
      border-bottom: 1px solid $color;
      border-radius: 0;
    }
    select {
      border: none;
      border-bottom: 1px solid $color;
      border-radius: 0;
    }
    font-size: 1rem;
    width: 400px;
    max-width: 100vw;
    background-color: rgb(255, 255, 255);
    @media (max-width: $breakpoint-tablet) {
      box-shadow: none !important;
      max-width: 100vw;
    }
  }
}
</style>
