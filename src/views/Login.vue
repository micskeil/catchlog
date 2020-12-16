<template>
  <div class="login p-0 ">
    <form
      class="form border d-flex flex-column shadow p-4"
      @submit.prevent="login"
    >
      <h3 class="brand-name pb-3 align-self-center">Pecázunk.hu</h3>

      <div class="form-group">
        <label>E-mail cím:</label>
        <input type="email" class="form-control" v-model.trim="user.email" />
      </div>

      <div class="form-group">
        <label>Jelszó: </label>
        <input
          type="password"
          class="form-control "
          v-model.trim="user.password"
        />
      </div>
      <p v-if="!formIsValid" class="warning">
        Valami baj van a beírt e-maillel vagy jelszóval!
      </p>

      <button type="submit" class="btn btn-dark  mt-3 p-1 btn-block">
        Belépés
      </button>
      <p class="forgot-password text-right">
        Még nem vagy tag?
        <router-link :to="{ name: 'Signup' }">Regisztráj! </router-link>
      </p>

      <p class="forgot-password text-right mt-3 ">
        <router-link to="/forgot-password">Elfelejtett jelszó</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      mode: "login",

      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (
        this.user.email === "" ||
        !this.user.email.includes("@") ||
        this.user.password.lenght < 6
      ) {
        this.formIsValid = false;
        return;
      } else {
        await this.$store.dispatch("login", {
          email: this.user.email,
          password: this.user.password,
        });
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style lang="scss"></style>
