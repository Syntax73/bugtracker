<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="8" sm8 md4>
            <v-card>
              <MessageSnackBar />
              <v-toolbar>
                <v-toolbar-title>Contas de Teste</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text class="d-flex justify-space-around align-center">
                <div class="d-flex flex-column align-center">
                  <v-avatar size="120">
                    <v-icon size="120">mdi-account-circle</v-icon>
                  </v-avatar>
                  <p>Conta de teste do tipo developer.</p>
                  <v-btn @click="signinAccountOne">Conta 1</v-btn>
                </div>
                <div class="d-flex flex-column align-center">
                  <v-avatar size="120">
                    <v-icon size="120">mdi-account-circle</v-icon>
                  </v-avatar>
                  <p>Conta de teste do tipo admin.</p>
                  <v-btn @click="signinAccountTwo">Conta 2</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import MessageSnackBar from '@/components/material/MessageSnackBar';

export default {
  name: 'TestAccounts',
  components: {
    MessageSnackBar
  },
  methods: {
    ...mapActions('auth', ['signin']),
    ...mapActions('app', ['toggleSnackbar', 'appLoading']),

    async signinAccountOne() {
      try {
        await this.signin({ email: 'test@email.com', password: '123445678' });
        this.$router.push('/dashboard');
      } catch (err) {
        this.appLoading();
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    },
    async signinAccountTwo() {
      try {
        await this.signin({ email: 'test2@email.com', password: '123445678' });
        this.$router.push('/dashboard');
      } catch (err) {
        this.appLoading();
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    }
  }
};
</script>

<style></style>
