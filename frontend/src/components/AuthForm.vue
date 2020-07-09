<template>
  <v-row align-content="center" justify="center">
    <MessageSnackBar />
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
import MessageSnackBar from '@/components/material/MessageSnackBar';

export default {
  name: 'AuthForm',
  components: { MessageSnackBar },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    ...mapActions('auth', ['signin']),
    ...mapActions('app', ['toggleSnackbar']),
    onSignin() {
      const { email, password } = this;
      this.signin({ email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch((err) => {
          this.toggleSnackbar({
            message: err.message,
            alertType: 'warning'
          });
        });
    }
  }
};
</script>

<style></style>
