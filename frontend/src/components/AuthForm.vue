<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
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
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthForm',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions('auth', ['signin']),
    onSignin() {
      const { email, password } = this;
      this.signin({ email, password })
        .then(joj => console.log(joj))
        .catch(err => console.log(err));
    },
  },
};
</script>

<style></style>
