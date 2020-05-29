<template>
  <v-row align-content="center" justify="center">
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="alertType">
      <span>{{ message }}</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-col cols="10" sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar>
          <v-toolbar-title>Bugtracker</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Login"
              type="email"
              placeholder="exemple@email.com"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              placeholder="******"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn align-center justify-center @click="onSignin">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthForm',
  data() {
    return {
      email: null,
      password: null,
      message: '',
      alertType: '',
      snackbar: false
    };
  },
  methods: {
    ...mapActions('auth', ['signin']),
    onSignin() {
      const { email, password } = this;
      this.signin({ email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch((err) => {
          this.message = err.message;
          this.alertType = 'warning';
          this.snackbar = true;
        });
    }
  }
};
</script>

<style></style>
